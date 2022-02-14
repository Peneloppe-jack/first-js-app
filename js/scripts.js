alert('Hello world');
//creating a pokemon respository in which I included the pokemon´s list

let PokemonRepository = (function () {
let PokemonList= [];
let ApiUrl = 'https://pokeapi.co/api/v2/pokemon/';

// The pokenomonlist is an empty Array linked to the Pokemon API 
// This allows me to switch from the static list that I made to A complete list of Pokemon 

  function add (pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ){
      PokemonList.push(pokemon);
    } else {
       console.log("pokemon is not correct");
      }
    }
// the code above creates a function, condition, loop, to verify the type of object inserted into code 
  function getAll() {
  return PokemonList;
}

  function addListItem (pokemon) {
    let PokemonList = document.querySelector('.pokemon-list');
    let ListPokemon = document.createElement('li');
    let Button = document.createElement('Button');
    Button.innerText = pokemon.name;
    Button.classList.add('button-class');
    ListPokemon.appendChild(Button);
    PokemonList.appendChild(ListPokemon);
    Button.addEventListener('click', function () {
      showDetails (pokemon);
});
}
// the code above creates a button, event listener that is called,logged at every click 

  async function loadList() {
  try {
    const response = await fetch(ApiUrl);
    const json = await response.json();
    json.results.forEach(function (item) {
      let pokemon = {
        name: item.name,
        detailsUrl: item.url
      };
      add(pokemon);
    });
  } catch (e) {
    console.error(e);
  }
}
// this is an Asnyc function using the fetch method to get pokemonlist from the "ApiUrl"
// the result = the "response" = a "promise" = the Json function passed as a parameter of the fetch ()?

  async function loadDetails(item) {
  let url = item.detailsUrl;
  try {
    const response = await fetch(url);
    const details = await response.json();
    // let details to item =
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;
  } catch (e) {
    console.error(e);
  }
}

// this is an Asnyc function using the fetch method to get pokemon details from the "ApiUrl"
// the result = the "response" = a "promise" = the Json function passed as a parameter passed as a parameter of the fetch ()?

function showDetails(item) {
   PokemonRepository.loadDetails(item).then(function () {
     console.log(item);
   });
 }

 // this is a show details function in which the loadDetails function is passed ass a parameter

  return {
    add: add,
    getAll: getAll,
    addListItem : addListItem,
    loadList : loadList,
    loadDetails : loadDetails,
    showDetails : showDetails
  };
})();

// The code above is wrapped into an IIFE which protects your code and executes it automatically thanks to the ()
// while creating a function inside an IIFE remember to call it again in the return part of the function right before closing the function with extra ()
// this goes for all the previously created fucntion in the IFFE

PokemonRepository.loadList().then(function () {
  PokemonRepository.getAll().forEach(function (pokemon) {
    PokemonRepository.addListItem(pokemon);
  });
});

// forEach loop that access the IFFE to load list, details, add Pokemon 
