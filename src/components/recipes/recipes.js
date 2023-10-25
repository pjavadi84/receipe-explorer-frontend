import { useQuery, gql } from '@apollo/client';

const GET_RECIPES = gql`
  query {
    recipes {
      id
      title
      ingredients
    }
  }
`;

function RecipeList() {
  const { loading, error, data } = useQuery(GET_RECIPES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <InfiniteScroll
    dataLength={data.recipes.length}
    next={() => {
      fetchMore({
        variables: {
          offset: data.recipes.length
        }
      });
    }}
    hasMore={true} // determine this based on your data
    loader={<h4>Loading...</h4>}
    >
        
    {data.recipes.map(recipe => (
       <div>
        {data.recipes.map(recipe => (
            <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.ingredients}</p>
            </div>
        ))}
        </div>
    ))}
  </InfiniteScroll>
  );
}
