let PokemonRepository = (function () {
let PokemonList= [];
let ApiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; 
let searchBar = document.getElementById('searchBar');

/*let searchBar = document.querySelector ('.searchBar'); */
searchBar.addEventListener('keyup', (e) => { 
    const searchString = e.target.value.toLowerCase();
    const filteredPokemons = PokemonList.filter((pokemon) => {
        return (
            pokemon.name.toLowerCase().includes(searchString) 
        );
    });
    listPokemons(filteredPokemons);
  });

let pokemonList = document.getElementById('pokemonList')
  function add (pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon)
    {PokemonList.push(pokemon);} 
    else {console.log("pokemon is not correct");}}
    function getAll() {
      return pokemonList;
  }


  function addListItem (pokemon) {
    let PokemonList = document.querySelector('.list-group');
    let ListPokemon = document.createElement('li');

    let Button = document.createElement('Button');
    Button.innerText = pokemon.name;
    Button.classList.add('list-group-item','list-group-item-action','text-center');
    Button.setAttribute('data-toggle', 'modal');
    Button.setAttribute('data-target', '#pokemonModal');
  
    Button.classList.add('btnbtn-primary');
    ListPokemon.classList.add('list-group-item');
    
    ListPokemon.appendChild(Button);
    PokemonList.appendChild(ListPokemon);  
    Button.addEventListener('click', function () {
    showDetails (pokemon); 
})
}


function listPokemons(pokemons) {
  /*let*/
  pokemonList.innerHTML = ""
  pokemons.forEach((pokemon) => addListItem (pokemon));
}


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
          listPokemons(PokemonList) 
          } catch (e) {
          console.error(e);
          }
          }


          async function loadDetails(item) {
          let url = item.detailsUrl;
          try {
          const response = await fetch(url);
          const details = await response.json();

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


function showDetails(item) {
   PokemonRepository.loadDetails(item).then(function () {
     showModal(item);
   });
 }


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
    getAll: getAll,
    add: add,
    listPokemons: listPokemons, 
    addListItem : addListItem,
    loadList : loadList,
    loadDetails : loadDetails,
    showDetails : showDetails,
    showModal : showModal 
  };
})(); 

PokemonRepository.loadList();

