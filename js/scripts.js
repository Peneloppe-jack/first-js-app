alert('Hello world');

//creating a pokemon respository in which I included the pokemon´s list

let PokemonRepository = (function () {
let PokemonList= [
  {
    name:'chamander',
    height: 0.6,
    type:  ['fire fang' , 'body slam']
  },

  {
    name: 'pidgey',
    height: 0.3,
    type: ['takle' , 'aerial ace']
  },

  {
    name: 'rattata',
    height: 0.3,
    type:['sucker punch' , 'blizzard']
  },

  {
    name:'fearow',
    height:1.2,
    type: ['growl' , 'curse']
  },

  {
    name: 'pikachu',
    height: 0.4,
    type: ['thundershock' , 'thunder']
  },

  {
    name:'vulpix',
    height: 0.6,
    type: ['roar' , 'flame burst']
  },

  {
    name:'meowth',
    height: 0.4,
    type: ['bite' , 'nasty plot']
  }

];

  function add (pokemon) {
  PokemonList.push(pokemon);
}

  function getAll() {
    return PokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

//* The code above is wrapped into an IIFE which protects your code and executes it automatically thanks to the ()


PokemonRepository.add({
        name:'wigglytuff',
        height: 1,
        type: ['sing' , 'nasty cute-charm']});
console.log(PokemonRepository.getAll());

//* The code above (thanks to the function add) adds a single Item into the  repository saved in the IFFE
//* The getAll function returns an array in the console


//After adding a pokemon to the main list  with the function add or push
//I wrote a function PokemonRepository.getAll().forEach  to access the IFFE + the new item and writes them all on the page
PokemonRepository.getAll().forEach (function(Pokemon) {
  document.write('<P>' + Pokemon.name + ' Height : ' + Pokemon.height +'<P>');
});
