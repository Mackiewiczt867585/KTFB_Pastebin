import React, { useReducer, useState,useEffect, createContext, useContext} from 'react'
import jwtDecode from 'jwt-decode';
import { USER_BY_EMAIL } from '../../GraphQL/Queries';
import { useQuery} from "@apollo/client";
import { useNavigate} from 'react-router-dom';

const initialState = {
    user: null,
    // userInfo: null
};

if (localStorage.getItem('jwtToken')){
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));

    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwtToken');
    } else {
        initialState.user = decodedToken;
    }
}

console.log(initialState)
const AuthContext = createContext({
    user: null,
    // userInfo: null,
    login: (userData) => {},
    logout: () => {}
});

// function UserInfo() {
//     const {user} = useContext(AuthContext);
//     const {error, loading, data } = useQuery( USER_BY_EMAIL, {
//     variables: { email: user.email},
//   });
//   const [profile, setProfile] = useState([]);
//   useEffect(() => {
//     if (data) {
//       setProfile(data.userEmail);
//       initialState.userInfo = data
//     } else { 
//     }
//   }, [data, loading, error]);
// }



function authReducer(state, action){
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                user: action.payload
            };
            case 'LOGOUT':
                return {
                    ...state,
                    user: null
                };
        default:
            return state;
        }
    }
    
    function AuthProvider(props){
        const[state, dipsatch] = useReducer(authReducer, initialState);

        function login (userData){
            localStorage.setItem('jwtToken', userData.token)
            dipsatch({
                type: 'LOGIN',
            payload: userData
        });
    }

function logout(){
    localStorage.removeItem('jwtToken');
    dipsatch({ type: 'LOGOUT'});
}
return (
    <AuthContext.Provider
            value={{ user: state.user, login, logout}}
            {...props}
            />
    );
}


export { AuthContext, AuthProvider};