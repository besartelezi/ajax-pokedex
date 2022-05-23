(() => {


    const PokemonSearchButton = document.getElementById("PokemonSearchButton");
    PokemonSearchButton.onclick = async function getPokedexData(){
        let Input = document.getElementById("SearchPokemon").value.toLowerCase()

        //API to all general Pokémon information
        let APIPokemon = "https://pokeapi.co/api/v2/pokemon/"
        //API to the general species information, where you can find the evolutionary tree of all Pokémon
        let APIPokemonSpecies = "https://pokeapi.co/api/v2/pokemon-species/"

        //Fetching all general Pokémon data
        let FetchPokemonData = await fetch(
            APIPokemon + Input
        );
        let GetPokemonData = await FetchPokemonData.json();

        //Fetching all Pokémon species data
        let FetchPokemonSpeciesData = await fetch (
            APIPokemonSpecies + Input
        );
        let GetPokemonSpeciesData = await FetchPokemonSpeciesData.json()

        //entire array
        console.log(GetPokemonData)
        //Pokémon name
        console.log(GetPokemonData.name)
        //getting both Pokémon types
        console.log(GetPokemonData.types[0].type)
        console.log(GetPokemonData.types[GetPokemonData.types.length -1].type)
        //Pokémon ID number
        console.log(GetPokemonData.id)
        //Image of Pokémon
        console.log(GetPokemonData.sprites.front_default)
        //The first 4 moves of the Pokémon; I might change this later to something more interesting
        console.log(GetPokemonData.moves[0].move.name,GetPokemonData.moves[1].move.name,GetPokemonData.moves[2].move.name,GetPokemonData.moves[3].move.name)
        //The Pokémons evolutionary tree
        console.log(GetPokemonSpeciesData.evolution_chain)





    }

})();
