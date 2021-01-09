import logo from './logo.svg';
import './App.css';

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
let handleSubmit = async (e) => {
  e.preventDefault();
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
    // Display results to the web page
  }

  // fetch(fetchQuery)
  //   .then((res) => console.log(res.json()))
  //   .catch((err) => console.error(err));
};
function App() {
  return (
    <div className='App my-2'>
      <div className='container'>
        <h1 className='text-center mb-3'>Recipe search app</h1>

        <div className='col-sm-12 col-md-6 mx-auto'>
          <form onSubmit={handleSubmit} method='POST'>
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

        <h2 className='mb-3'>Results</h2>
      </div>
    </div>
  );
}

export default App;
