import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import SingleEntry from './pages/SingleEntry';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Header />
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/profile"
              element={<Profile />}
            />
            <Route
              path="/signup"
              element={<SignUp />}
            />
            < Route
              path="/login"
              element={<Login />}
            />
            <Route
              path='*'
              element={<h1>Success!</h1>}
            />
            <Route
              path='/entry/:id'
              element={<SingleEntry />}
            />
          </Routes>
          <Footer />
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
