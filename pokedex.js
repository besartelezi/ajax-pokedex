(() => {

    const PokemonSearchButton = document.getElementById("PokemonSearchButton");
    PokemonSearchButton.onclick = async function getPokedexData(){
        let Input = document.getElementById("SearchPokemon").value

        let URLofAPI = "https://pokeapi.co/api/v2/pokemon/"
        console.log(Input)
             let FetchPokemonData = await fetch(
                 URLofAPI + Input
             );
             let GetPokemonData = await FetchPokemonData.json();
             console.log(GetPokemonData)
             console.log(GetPokemonData.name)
             console.log(GetPokemonData.types[0].type)
         }

})();
