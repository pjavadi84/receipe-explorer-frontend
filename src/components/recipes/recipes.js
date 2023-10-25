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
