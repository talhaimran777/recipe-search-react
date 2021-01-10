import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

let getIngredients = () => {
  // We gonna use vanilla js to get the ingredients from the input element

  let input = document.querySelector('#input');
  let userInput = input.value;

  if (userInput.includes(',')) {
    let x = userInput
      .split(',')
      .map((individualInput) => individualInput.trim());

    let q = '';

    for (let i = 0; i < x.length; i++) {
      if (i === x.length - 1) {
        q = q + x[i];
      } else {
        q = q + x[i] + '+';
      }
    }

    return q;
  } else {
    return userInput;
  }
};

let getRecipies = async (q) => {
  try {
    let result = await fetch(q);
    let jsonFormat = await result.json();

    const { hits } = jsonFormat;

    return hits;
  } catch (err) {
    console.log(err);
  }
};
let handleSubmit = async (setRecipes, e) => {
  e.preventDefault();

  // console.log('Testing things out!', setRecipes);
  // Extract individual ingredients from the input element
  let q = getIngredients();

  // Build a fresh query
  let fetchQuery = `https://api.edamam.com/search?q=${q}&app_id=f09c801f&app_key=
  bf2a75cae365a78abe4f3330eaf9c3ae`;

  // Request for the data

  let recipes = await getRecipies(fetchQuery);
  if (recipes.length === 0) {
    console.log('Could not find any recipes');
  } else if (recipes) {
    // We gonna update our state of the app
    setRecipes(recipes);
  }

  // fetch(fetchQuery)
  //   .then((res) => console.log(res.json()))
  //   .catch((err) => console.error(err));
};

// function setStateofApp(recipes) {
//   setRecipes(recipes);
// }
function App() {
  console.log('Rendered!');
  const [recipes, setRecipes] = useState([]);
  return (
    <div className='App my-2'>
      <div className='container'>
        <h1 className='text-center mb-3'>Recipe search app</h1>

        <div className='col-sm-12 col-md-6 mx-auto mb-4'>
          <form onSubmit={handleSubmit.bind(this, setRecipes)} method='POST'>
            <label htmlFor='input'>Enter ingredients</label>
            <input
              id='input'
              className='form-control mb-4'
              type='text'
              placeholder='chicken, tomatto e.g.'
            />

            <button className='btn btn-outline-primary w-100'>Search</button>
          </form>
        </div>

        <div className='row row-eq-height'>
          {recipes.map((recipeObject) => {
            const { recipe } = recipeObject;
            const { ingredients, label, image } = recipe;
            //console.log(recipe);

            return (
              <div className='big-card rounded py-5 align-self-top col-sm-12 col-lg-6 my-4'>
                <div
                  className='card card-body h-100'
                  style={{ width: '25rem', margin: '0 auto' }}
                >
                  <img className='img-fluid rounded mb-3' src={image} alt='' />
                  <div className='card-title'>
                    <h3 className='text-secondary'>
                      {' '}
                      <strong>{label}</strong>{' '}
                    </h3>
                  </div>

                  <p>
                    <strong>Ingredients</strong>
                  </p>
                  <ul>
                    {ingredients.map((ingredient) => {
                      return <li>{ingredient.text}</li>;
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
          {/* <div className='align-self-center col-sm-12 col-md-6 col-lg-4 my-4'>
            <div className='card card-body'>
              <img
                className='img-fluid rounded mb-3'
                src='https://www.edamam.com/web-img/df4/df4f89fc0a672769ed90d2b06255bc25.jpg'
                alt=''
              />
              <div className='card-title'>
                <h3 className='text-secondary'>
                  {' '}
                  <strong>Chicken Dish</strong>{' '}
                </h3>
              </div>

              <div className='card-body'>
                <ol>
                  <li>Soup</li>
                  <li>Soup</li>
                  <li>Soup</li>
                  <li>Soup</li>
                </ol>
              </div> 
            </div>
          </div>
          {/* <div className='align-self-center col-sm-12 col-md-6 col-lg-4 my-4'>
            <div className='card card-body'>
              <p>Hello World</p>
            </div>
          </div>
          <div className='align-self-center col-sm-12 col-md-6 col-lg-4 my-4'>
            <div className='card card-body'>
              <p>Hello World</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
