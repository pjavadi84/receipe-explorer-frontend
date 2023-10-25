import logo from './logo.svg';
import './App.css';
import client from './services/apollo';
import RecipesList from './components/recipes/recipes';
import { ApolloProvider } from '@apollo/client';

function App() {
  return (
    <ApolloProvider client={client}>
        <div className="App">
          <RecipesList />
        </div>
    </ApolloProvider>
   
  );
}

export default App;
