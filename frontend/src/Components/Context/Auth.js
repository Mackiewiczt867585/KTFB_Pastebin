import React, {
  useReducer,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import jwtDecode from "jwt-decode";
import { ME, USER_BY_EMAIL } from "../../GraphQL/Queries";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const initialState = {
  user: null,
};

if (localStorage.getItem("token")) {
  const decodedToken = jwtDecode(localStorage.getItem("token"));

  if (decodedToken.exp * 10000 < Date.now()) {
    localStorage.removeItem("token");
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  userInfo: null,
  login: (userData) => {},
  logout: () => {},
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

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dipsatch] = useReducer(authReducer, initialState);

  function login(userData) {
    localStorage.setItem("token", userData.token);
    dipsatch({
      type: "LOGIN",
      payload: jwtDecode(userData.token),
    });
  }

  function logout() {
    localStorage.removeItem("token");
    dipsatch({ type: "LOGOUT" });
  }
  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
