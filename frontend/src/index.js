import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
<<<<<<< HEAD
<<<<<<< HEAD
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink, from} from "@apollo/client";
import { setContext } from '@apollo/client/link/context'
import { onError } from "@apollo/client/link/error";
import 'react-toastify/dist/ReactToastify.css';
=======
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink} from "@apollo/client";
import { setContext } from '@apollo/client/link/context'

>>>>>>> 683e323 (update fn)
=======
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink, from} from "@apollo/client";
import { setContext } from '@apollo/client/link/context'
import { onError } from "@apollo/client/link/error";
import 'react-toastify/dist/ReactToastify.css';
>>>>>>> cda914f (errors for login and register)



const httpLink = createHttpLink({
  uri: "http://localhost:5432/graphql"
});

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> cda914f (errors for login and register)

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
    if (networkError) console.log(`[Network error]: ${networkError}`);
<<<<<<< HEAD
});

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem('token');
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Basic ${token}` : "",
//     }
//   }
// });


const client = new ApolloClient({
  link: from([errorLink, httpLink]),
=======
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Basic ${token}` : "",
    }
  }
=======
>>>>>>> cda914f (errors for login and register)
});

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem('token');
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Basic ${token}` : "",
//     }
//   }
// });


const client = new ApolloClient({
<<<<<<< HEAD
  link: authLink.concat(httpLink),
>>>>>>> 683e323 (update fn)
=======
  link: from([errorLink, httpLink]),
>>>>>>> cda914f (errors for login and register)
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
