import React, { useReducer, useState,useEffect, createContext, useContext} from 'react'
import jwtDecode from 'jwt-decode';
import { ME, USER_BY_EMAIL } from '../../GraphQL/Queries';
import { useQuery, useLazyQuery} from "@apollo/client";
import { useNavigate} from 'react-router-dom';

const initialState = {
    user: null,
};

if (localStorage.getItem('jwtToken')){
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));

    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwtToken');
    } else {
        initialState.user = decodedToken;
    }
}


const AuthContext = createContext({
    user: null,
    userInfo: null,
    login: (userData) => {},
    logout: () => {}
});



// function UserInfo(looking) {
    
//     const {error, loading, data } = useQuery(
//         ['users', looking.email],
//         USER_BY_EMAIL,
//         {
//         enabled: !! looking==null}
//     );
    
//     const [profile, setProfile] = useState([]);
//     useEffect(() => {
//         if (data) {
//             setProfile(data.userEmail);
//             initialState.userInfo = data
//             console.log(profile)

//     } else { 
//     }
//   }, [data, loading, error]);
//   return profile;
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
                    user: null,
                };
        default:
            return state;
        }
    }
    
    function AuthProvider(props){
        const[state, dipsatch] = useReducer(authReducer, initialState);

        function login (userData){
            console.log(userData)
            localStorage.setItem('jwtToken', userData.token)
            dipsatch({
                type: 'LOGIN',
            payload: jwtDecode(userData.token)
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