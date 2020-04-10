import React, { useEffect, useState } from "react";
import Recipe from './Recipe';
import './App.css';

const App = () => {
  const APP_ID = "bd62a5a9";
  const APP_KEY = "5327cfc8be583fcee62252455f06c605";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('pork ribs');

  useEffect(() => {
    getRecipes();
}, ([query]);

const getRecipes = async () => {
  const response = await fetch(
    `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
  const data = await response.json();
  setRecipes(data.hits);
};

const getSearch = e => {
  e.preventDefault();
  setQuery("");
};
const updateSearch = e => {
  setSearch(e.target.value);
  console.log(search);
};

return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input 
        className="search-bar" 
        type="text" 
        value={search} 
        onchange={updateSearch} 
        />
        <button className="search-button" type ="submit">
          Search
          </button>
      </form>
      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        />
      ))}
    </div>
  );
};

export default App;
