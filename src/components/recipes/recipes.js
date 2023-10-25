import { useSubscription, useQuery, gql } from '@apollo/client';



const GET_RECIPES = gql`
  query {
    recipes {
      id
      title
      ingredients
    }
  }
`;


const NEW_RECIPE_ADDED = gql`
  subscription {
    recipeAdded {
      id
      title
      ingredients
    }
  }
`;



function RecipeList() {
  const { loading, error, data } = useQuery(GET_RECIPES);
  const { data: subscriptionData } = useSubscription(NEW_RECIPE_ADDED);

  const [recipes, setRecipes] = useState([]);

// Update state when initial query data is fetched
  useEffect(() => {
    if (queryData) {
      setRecipes(queryData.recipes);
    }
  }, [queryData]);


  // Handle new recipes from the subscription
  useEffect(() => {
    if (subscriptionData) {
      const newRecipe = subscriptionData.recipeAdded;
      setRecipes(prevRecipes => [newRecipe, ...prevRecipes]); // Add new recipe to the top of the list
    }
  }, [subscriptionData]);

  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.recipes.map(recipe => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.ingredients}</p>
        </div>
      ))}
    </div>
  );
}
