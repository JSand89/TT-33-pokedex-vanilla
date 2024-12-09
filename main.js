const pokemonList = document.getElementById("pokemonList")
const pokemonDetail = document.getElementById("pokemonDetail")
const backBTN = document.getElementById("backBTN")
const pokemonInfo = document.getElementById("pokemonInfo")
const searchInput = document.getElementById("searchInput")
const searchBtn = document.getElementById("searchBtn")
let query = ""
async function fetchPokemonData(pokemonID) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}/`)
    const pokemon = await response.json()
    return pokemon
}

function displayPokemon(pokemon){
    const pokemonCard = document.createElement("div")
    pokemonCard.classList.add("pokemonCard")
    pokemonCard.innerHTML =`
    <h3>${pokemon.name}</h3>
    <img src=${pokemon.sprites.front_default}  alt="${pokemon.name}">
    `
    pokemonCard.addEventListener("click",()=>showPokemonDetail(pokemon))
    pokemonList.appendChild(pokemonCard)
}
function showPokemonDetail(pokemon){
    console.log(pokemon)
    pokemonList.style.display ="none"
    pokemonDetail.style.display = "block"
    let abilities = " "
    for(let i=0;i<pokemon.abilities.length;i++){
        abilities = abilities+pokemon.abilities[i].ability.name + " "
    }
    let statsToPrint = ""
    pokemon.stats.forEach(stat => {
        statsToPrint =statsToPrint + `<li class="stats">${stat.stat.name}: ${stat.base_stat}</li>`
    })
    pokemonInfo.innerHTML =`    
        <h3>${pokemon.name}</h3>
        <img src=${pokemon.sprites.front_default}  alt="${pokemon.name}">
        <h4>${abilities}</h4>
        <h4>stats</h4>
        <ul>
        ${statsToPrint}
        </ul>
    `
}
backBTN.addEventListener("click",()=>{
    pokemonDetail.style.display = "none"
    pokemonList.style.display = "block"
})
searchInput.addEventListener("input",(evento)=>{
    query = evento.target.value;
})
async function searchPokemon() {
    try {
        const pokemon = await fetchPokemonData(query)
        showPokemonDetail(pokemon)
    } catch (error) {
        alert("Pokemon no encontrado, intenta con otro ID o nombre")
    }
}
searchBtn.addEventListener("click",()=>{
    console.log(query)
    searchPokemon()
})
async function loadPokedex() {
    for(let i =1;i<3;i++){
        dato = await fetchPokemonData(i)
        displayPokemon(dato)
    }
}
loadPokedex()

