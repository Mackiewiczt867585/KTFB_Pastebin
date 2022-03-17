import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: "http://localhost:5432/graphql",
  cache: new InMemoryCache(),
})

ReactDOM.render(
<ApolloProvider client={client}>
<App />
</ApolloProvider>,
  document.getElementById('root')
);

