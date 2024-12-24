import { Heart, HeartPulse, Search } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const [searches, setSearches] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searches}`
      );
      setRecipes(response.data.meals || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError("Unable to fetch recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


   useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favorites);
  }, []);
    const addRecipeToFavorites = (recipe) => {
      const isRecipeInFavorites = favorites.some((fav) => fav.idMeal === recipe.idMeal);
    if (isRecipeInFavorites) {
      const updatedFavorites = favorites.filter((fav) => fav.idMeal !== recipe.idMeal);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...favorites, recipes];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  }
  
  return (
    <div className="bg-[#faf9fe] p-10 flex-1">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="font-bold text-3cl pb-4 md:text-5xl mt-4">
          Recipe search
        </h1>
        <label className="input shadow-md flex items-center gap-2">
          <Search size={"24"} />
          <input
            type="text"
            placeholder="search"
            value={searches}
            onChange={(e) => setSearches(e.target.value)}
            className="text-sm md:text-md grow"
          />
          <button
            onClick={fetchRecipes}
            className="bg-[#f9f9f9] text-slate-500 hover:bg-slate-500 hover:text-white px-4 py-2 rounded-md"
          >
            search
          </button>
          {loading && <p>loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </label>

        <div className="flex flex-col gap-4">
          {recipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              className="flex flex-col rounded-md bg-gray-100
              overflow-hidden p-3 relative mt-4"
            >
              <h2 className="font-bold text-[30px] pl-4">{recipe.strMeal}</h2>
              <div>
                <div className="hero-content flex-col lg:flex-row">
                  <img
                    src={recipe.strMealThumb}
                    alt=""
                    className="max-w-sm rounded-lg shadow-2xl"
                  />
                  <div className="absolute bottom-7 right-8 bg-white rounded-full p-1 cursor-pointer" onClick={(e)=>{
                    e.preventDefault();
                    addRecipeToFavorites(recipe)
                  }}>
                    {!favorites.some((fav) => fav.idMeal === recipe.idMeal) && <Heart
                      size={"50"}
                      className="hover:fill-red-500 hover:text-red-500"
                    />}
                    {favorites.some((fav) => fav.idMeal === recipe.idMeal) && <Heart
                      size={"50"}
                      className="fill-red-500 text-red-500"
                    />}
                  </div>
                  <div>
                    <p className="text-slate-500 font-semibold m-1 p-2 text-sm tracking-tight">
                      {recipe.strInstructions.slice(0, 10000)}
                    </p>
                    <div className="flex gap-2 mt-auto p-2">
                      <div className="flex gap-1 bg-[#d6f497] items-center p-1 rounded-md">
                        <HeartPulse size={16} />
                        <span className="text-sm tracking-tighter font-semibold">
                          Recommended for you
                        </span>
                      </div>
                      <div className="flex gap-1 bg-[#d6f497] items-center p-1 rounded-md">
                        <HeartPulse size={16} />
                        <span className="text-sm tracking-tighter font-semibold">
                          Glutton-free
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
 
export default HomePage;
