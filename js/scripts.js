alert('Hello world');

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

]

console.log(PokemonList);

// The hardest part here is to make sure that all the correct signs are well placed
// remember no ; at the end of the conditional // Pay attention to the () {} []
// Make sure to use  double "" when using \ for 'S  and single '' for the whole quote then
// Have a break when you take more than 30 min to solve anything !!!

// In this This Loop + conditional I just specify that the pokemon with a height bigger than 1 should have the message appearing

for (var i = 0; i < PokemonList.length; i++) {
 if (PokemonList[i].height >= 1.0) {
    document.write('<P>' +  PokemonList[i].name + ( ', height: ' )+ PokemonList[i].height + ( " (Wow, That\'s big !!)") + '<P>');
 } else {
   document.write('<P>' +  PokemonList[i].name + ( ', height: ' )+ PokemonList[i].height + '<P>')
  }
}
