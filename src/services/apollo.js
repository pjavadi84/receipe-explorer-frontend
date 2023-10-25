import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql' // your GraphQL server URL
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

// websocket subscription link for realtime updates of recipes

const wsLink = new WebSocketLink({
    uri: `ws://localhost:3000/graphql`,
    options: {
      reconnect: true
    }
  });
  
export default client;
