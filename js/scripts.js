//creating a pokemon respository in which the pokemon´s list is included
let PokemonRepository = (function () {
let PokemonList= [];
let ApiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
let modalContainer = document.querySelector('#modal-container'); 

// adding search function 
let pokemons;
let filteredPokemons = [];
let pokemonList = document.getElementById('pokemonList')
// adding search function

// The pokemonlist is an empty Array linked to the Pokemon API 
// This allows me to switch from the static list I made to A complete list of Pokemon e.g ApiUrl 
//modal at the top so all funtions can access this variable
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
// trying to add a search function 
function listPokemons(pokemons) {
  pokemonList.innerHTML = ""
  pokemons.forEach((pokemon) => addListItem (pokemon));
}


  function addListItem (pokemon) {
    let PokemonList = document.querySelector('.list-group');
    let ListPokemon = document.createElement('li');

    let Button = document.createElement('Button');
    Button.innerText = pokemon.name;
    //just added this to trigger the modal and it seems to work 
    Button.classList.add('list-group-item','list-group-item-action','text-center');
    Button.setAttribute('data-toggle', 'modal');
    Button.setAttribute('data-target', '#pokemonModal');
  
  // How do I get to have MAJ on Pokemon' NAMESsss?

    Button.classList.add('btnbtn-primary');// or btn btprimary.addclass with jQuery
    ListPokemon.classList.add('list-group-item'); // to be confirmed 
    
    ListPokemon.appendChild(Button);
    PokemonList.appendChild(ListPokemon);  
    Button.addEventListener('click', function () {
    showDetails (pokemon); 
})
}
//creates a button, a eListener that is called,logged at every click 
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
    listPokemons(PokemonList) //Loading list item and calllback to searchB async.
  } catch (e) {
    console.error(e);
  }
}
//Asnyc function using the fetch method to get pokemonlist from the "ApiUrl"
//result = response = promise= the Json function passed as a parameter of the fetch ()
  async function loadDetails(item) {
  let url = item.detailsUrl;
  try {
    const response = await fetch(url);
    const details = await response.json();
    // let details to item =
  
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = [];
    for (let i = 0; i < details.types.length; i++) {
      item.types.push(details.types[i].type.name);
    }
    item.weight = details.weight;
    item.abilities = [];
    for (let i = 0; i < details.abilities.length; i++) {
      item.abilities.push(details.abilities[i].ability.name);
    }
  } catch (e) {
    console.error(e);
  }
}


//Asnyc function using the fetch method to get pokemonlist from the "ApiUrl"
//result = response = promise= the Json function passed as a parameter of the fetch ()
function showDetails(item) {
   PokemonRepository.loadDetails(item).then(function () {
     showModal(item);
   });
 }

// trying to add a search function 

searchBar.addEventListener('keyup', (e) => {
  
  const searchString = e.target.value.toLowerCase();
  console.log(searchString)
  const filteredPokemons = PokemonList.filter((pokemon) => {
      return (
          pokemon.name.toLowerCase().includes(searchString) 
      );
  });
  listPokemons(filteredPokemons);
});

// trying to add a search function 

function showModal(item) { 
  let modalBody = $(".modal-body");
  let modalTitle = $(".modal-title");
    
  modalTitle.empty ();
  modalBody.empty ();
  
  let nameElement = $ ("<p> " + "Name : " + item.name + "</p> ");
  
  let imageElement = document.createElement('img');
  imageElement.setAttribute ("src", item.imageUrl);
  
  let heightElement = $ ("<p> " + "Height : " + item.height + "</p> ");
  let weightElement = $ ("<p> " + "Weight : " + item.weight + "</p> ");
  let typesElement = $ ("<p> " + "Types : " + item.types + "</p> ");
  let abilitiesElement = $ ("<p> " + "Abilities : " + item.abilities + "</p> ");
  
  modalTitle.append(nameElement);
  modalBody.append(imageElement);
  modalBody.append(heightElement);
  modalTitle.append(weightElement);
  modalBody.append(typesElement);
  modalBody.append(abilitiesElement);

}

  return {
    add: add,
    addListItem : addListItem,
    loadList : loadList,
    loadDetails : loadDetails,
    showDetails : showDetails,
    showModal : showModal // call back the modal as all previous functions 
  };
})(); 
// The code above is wrapped into an IIFE which protects your code and executes it automatically thanks to the ()
// while creating a function inside an IIFE remember to call it again in the return part of the function right before closing the function with extra ()
// this goes for all the previously created fucntion in the IFFE

PokemonRepository.loadList()

