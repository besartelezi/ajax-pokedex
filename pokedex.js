(() => {


    const PokemonSearchButton = document.getElementById("PokemonSearchButton");
    PokemonSearchButton.onclick = async function getPokedexData(){
        let Input = document.getElementById("SearchPokemon").value.toLowerCase();

        //API to all general Pokémon information
        let APIPokemon = "https://pokeapi.co/api/v2/pokemon/";
        //API to the general species information, where you can find the evolutionary tree of all Pokémon
        let APIPokemonSpecies = "https://pokeapi.co/api/v2/pokemon-species/";

        //Fetching all general Pokémon data
        let FetchPokemonData = await fetch(
            APIPokemon + Input
        );
        let GetPokemonData = await FetchPokemonData.json();

        //Fetching all Pokémon species data
        let FetchPokemonSpeciesData = await fetch (
            APIPokemonSpecies + Input
        );
        let GetPokemonSpeciesData = await FetchPokemonSpeciesData.json();


        //Pokémon name
        const PokemonName = document.getElementById("Name");
        PokemonName.innerHTML = GetPokemonData.name;

        // Pokémon ID number
        const PokemonID = document.getElementById("IDNumber");
        PokemonID.innerHTML = GetPokemonData.id;

        //Image of Pokemon
        const PokemonPicture = document.getElementById("PokemonPicture");
        PokemonPicture.src = GetPokemonData.sprites.front_default;

        //Will change this to the images instead of just text
        const TypeOne = document.getElementById("Type1");
        const TypeTwo = document.getElementById("Type2");
        if (GetPokemonData.types.length>1) {
            TypeOne.innerHTML = GetPokemonData.types[0].type.name;
            TypeTwo.innerHTML = GetPokemonData.types[1].type.name;
            console.log(GetPokemonData.types[0].type);
            console.log(GetPokemonData.types[GetPokemonData.types.length -1].type);
        }
        else {
            TypeOne.innerHTML = GetPokemonData.types[0].type.name;
            TypeTwo.innerHTML = "This Pokémon has no secondary typing";
        }

        //Shows Pokémon moves
        document.getElementById('PokemonMovesTitle').innerHTML = GetPokemonData.name + " can learn the following moves:"
        if (GetPokemonData.moves.length>10){
            document.getElementById("PokemonMove1").innerHTML = GetPokemonData.moves[0].move.name
            document.getElementById("PokemonMove2").innerHTML = GetPokemonData.moves[1].move.name
            document.getElementById("PokemonMove3").innerHTML = GetPokemonData.moves[2].move.name
            document.getElementById("PokemonMove4").innerHTML = GetPokemonData.moves[3].move.name
            document.getElementById("PokemonMove5").innerHTML = GetPokemonData.moves[4].move.name
            document.getElementById("PokemonMove6").innerHTML = GetPokemonData.moves[5].move.name
            document.getElementById("PokemonMove7").innerHTML = GetPokemonData.moves[6].move.name
            document.getElementById("PokemonMove8").innerHTML = GetPokemonData.moves[7].move.name
            document.getElementById("PokemonMove9").innerHTML = GetPokemonData.moves[8].move.name
            document.getElementById("PokemonMove10").innerHTML = GetPokemonData.moves[9].move.name
            console.log(GetPokemonData.moves[0])

        }

        //need to add all background images as jpeg files
        let PokemonTypeBackground = GetPokemonData.types[0].type.name;
        document.body.style.backgroundImage = "url(images/"+PokemonTypeBackground+".jpg)";






//        //The first 4 moves of the Pokémon; I might change this later to something more interesting
//         console.log(GetPokemonData.moves[0].move.name,GetPokemonData.moves[1].move.name,GetPokemonData.moves[2].move.name,GetPokemonData.moves[3].move.name)
//         //The Pokémons evolutionary tree
//         console.log(GetPokemonSpeciesData.evolution_chain)





    }

})();
