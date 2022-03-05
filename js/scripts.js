alert('Hello world');
//creating a pokemon respository in which the pokemon´s list is included

let PokemonRepository = (function () {
let PokemonList= [];
let ApiUrl = 'https://pokeapi.co/api/v2/pokemon/';
let modalContainer = document.querySelector('#modal-container'); 

// The pokenomonlist is an empty Array linked to the Pokemon API 
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
//function, condition, loop, to verify the type of object inserted into code 

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
      showDetails (pokemon,); // (,modalContainer)to be  added the modal container
});
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
    item.types = details.types
  } catch (e) {
    console.error(e);
  }
}
//Asnyc function using the fetch method to get pokemonlist from the "ApiUrl"
//result = response = promise= the Json function passed as a parameter of the fetch ()


function showDetails(item) {
   PokemonRepository.loadDetails(item).then(function () {
    //console.log(item);
     showModal(item); // once you updated this one the modal appeared on screen on Pokemon click
   });
 }
// this is a showdetails function in which the loadDetails function is passed ass a parameter
// be mindfull to change the  show details function so the modal appears on screen instead of console log
// still has object and undefined apppearing but it works
// you need to give correct attibutes to picture, title, and content


//creating a modal to overlay pokemon details on page
//remember you created a button in Html that you can delete now?????????????
function showModal(item) { //(title, text) at first but then you change to item as you refer to it later
  modalContainer.innerHTML = '';
  let modal = document.createElement('div');
  modal.classList.add('modal');

  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';

  closeButtonElement.addEventListener('click', hideModal); 
  // eListener added once hide()defined

  let titleElement = document.createElement('h1'); // title =  pokemon.name
  titleElement.innerText = item.name;//title, as you change previously 


let imageElement = document.createElement('img');
imageElement.setAttribute ("src", item.imageUrl);
//setting attribute for the src of the image o you can collect pics from API was confusing !!!
// for no reason!!! 

  let heightElement = document.createElement('p');
  heightElement.innerText = item.height;

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(imageElement);
  modal.appendChild(heightElement);
  modalContainer.appendChild(modal);


  modalContainer.classList.add('is-visible');
}

function hideModal() {
  modalContainer.classList.remove('is-visible');
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();  
  } // keydown predefined eListner for any key pressed but, here recording ESC as requested
});

modalContainer.addEventListener('click', (e) => {
  // Since this is also triggered when clicking INSIDE the modal
  // We only want to close if the user clicks directly on the overlay
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});


// PB with the picture source Ooopssssssssssss document.querySelector('#show-modal').addEventListener('click', () => {
  //showModal('Modal title', 'This is the modal content!');
//});
// modal works now I need my pics and a for each loop to implement the modal on each poke


  return {
    add: add,
    getAll: getAll,
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

PokemonRepository.loadList().then(function () {
  PokemonRepository.getAll().forEach(function (pokemon) {
    PokemonRepository.addListItem(pokemon);
  });
});

// forEach loop that access the IFFE to load list, details, add Pokemon 

