import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink} from "@apollo/client";





const httpLink = createHttpLink({
  uri: "http://localhost:5432/graphql"
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
