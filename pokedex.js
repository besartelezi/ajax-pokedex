(() => {


    const PokemonSearchButton = document.getElementById("PokemonSearchButton");
    PokemonSearchButton.onclick = async function getPokedexData(){
        const EvolutionRow = document.getElementById("EvolutionRow");
        while (EvolutionRow.firstChild){
            EvolutionRow.firstChild.remove()
        }

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

        let FetchPokemonEvolutionChain = await fetch(
            GetPokemonSpeciesData.evolution_chain.url
        )
        let GetPokemonEvolutionChain = await FetchPokemonEvolutionChain.json()


        //Shows all Eeveelutions
        if (GetPokemonEvolutionChain.chain.evolves_to.length === 8){
            console.log(GetPokemonEvolutionChain.chain.species.name)
            console.log(GetPokemonEvolutionChain.chain.evolves_to[0].species.name)
            console.log(GetPokemonEvolutionChain.chain.evolves_to[1].species.name)
            console.log(GetPokemonEvolutionChain.chain.evolves_to[2].species.name)
            console.log(GetPokemonEvolutionChain.chain.evolves_to[3].species.name)
            console.log(GetPokemonEvolutionChain.chain.evolves_to[4].species.name)
            console.log(GetPokemonEvolutionChain.chain.evolves_to[5].species.name)
            console.log(GetPokemonEvolutionChain.chain.evolves_to[6].species.name)
            console.log(GetPokemonEvolutionChain.chain.evolves_to[7].species.name)
        }

        else if (GetPokemonEvolutionChain.chain.evolves_to.length === 0) {
            let PokemonFirstFormIMG = document.createElement("img");
            PokemonFirstFormIMG.src = GetPokemonData.sprites.front_default;
            EvolutionRow.appendChild(PokemonFirstFormIMG)
        }

        else if (GetPokemonEvolutionChain.chain.evolves_to[0].evolves_to.length === 0) {
            let FetchFirstForm = await fetch(
                APIPokemon + GetPokemonEvolutionChain.chain.species.name
            );
            let GetFirstForm = await FetchFirstForm.json();
            let PokemonFirstFormIMG = document.createElement("img");
            PokemonFirstFormIMG.src = GetFirstForm.sprites.front_default;
            EvolutionRow.appendChild(PokemonFirstFormIMG)

            let FetchSecondForm = await fetch(
                APIPokemon + GetPokemonEvolutionChain.chain.evolves_to[0].species.name
            );
            let GetSecondForm = await FetchSecondForm.json();
            let PokemonSecondFormIMG = document.createElement("img");
            PokemonSecondFormIMG.src = GetSecondForm.sprites.front_default;
            EvolutionRow.appendChild(PokemonSecondFormIMG)
        }
        else {
            let FetchFirstForm = await fetch(
                APIPokemon + GetPokemonEvolutionChain.chain.species.name
            );
            let GetFirstForm = await FetchFirstForm.json();
            let PokemonFirstFormIMG = document.createElement("img");
            PokemonFirstFormIMG.src = GetFirstForm.sprites.front_default;
            EvolutionRow.appendChild(PokemonFirstFormIMG)

            let FetchSecondForm = await fetch(
                APIPokemon + GetPokemonEvolutionChain.chain.evolves_to[0].species.name
            );
            let GetSecondForm = await FetchSecondForm.json();
            let PokemonSecondFormIMG = document.createElement("img");
            PokemonSecondFormIMG.src = GetSecondForm.sprites.front_default;
            EvolutionRow.appendChild(PokemonSecondFormIMG)

            let FetchThirdForm = await fetch(
                APIPokemon + GetPokemonEvolutionChain.chain.evolves_to[0].evolves_to[0].species.name
            );
            let GetThirdForm = await FetchThirdForm.json();
            let PokemonThirdFormIMG = document.createElement("img");
            PokemonThirdFormIMG.src = GetThirdForm.sprites.front_default;
            EvolutionRow.appendChild(PokemonThirdFormIMG)
        }
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

        }
        else {
            TypeOne.innerHTML = GetPokemonData.types[0].type.name;
            TypeTwo.innerHTML = "";
        }

        //Shows Pokémon moves
        if (GetPokemonData.moves.length>10){
            document.getElementById('PokemonMovesTitle').innerHTML = GetPokemonData.name + " can learn the following moves:"
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
        }
        else if (GetPokemonData.moves.length === 1){
            document.getElementById('PokemonMovesTitle').innerHTML = GetPokemonData.name + " can learn the following move:"
            document.getElementById("PokemonMove1").innerHTML = GetPokemonData.moves[0].move.name
        }

        //need to add all background images as jpeg files
        let PokemonTypeBackground = GetPokemonData.types[0].type.name;
        document.body.style.backgroundImage = "url(images/"+PokemonTypeBackground+".jpg)";



    }

})();
