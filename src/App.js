// src/App.js
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.graphqlplaceholder.com',
  cache: new InMemoryCache(),
});

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
    }
  }
`;

function PostsList() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Posts</h1>
        <PostsList />
      </div>
    </ApolloProvider>
  );
}

export default App;
