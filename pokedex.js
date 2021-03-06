    const PokemonSearchButton = document.getElementById("PokemonSearchButton");
    PokemonSearchButton.onclick = async function getPokedexData(){
        const EvolutionRow = document.getElementById("EvolutionRow");

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

        //Fetching the specified Pokemon's evolution chain
        let FetchPokemonEvolutionChain = await fetch(
            GetPokemonSpeciesData.evolution_chain.url
        )
        let GetPokemonEvolutionChain = await FetchPokemonEvolutionChain.json()

        //Getting all Pokémon descriptions
        let PokemonAllDescriptionsArray = GetPokemonSpeciesData.flavor_text_entries
        //Filters out all the other languages, leaving only the English ones in a new array
        let EnglishDescriptionArray = PokemonAllDescriptionsArray.filter(function (e){
            return e.language.name === "en"
        })
        //InnerHTML'ing a random English Pokémon description
        let PokemonDescription = document.getElementById("PokemonDescriptionText");
        PokemonDescription.innerHTML = EnglishDescriptionArray[Math.floor(Math.random()*EnglishDescriptionArray.length)].flavor_text

        //Shows all Eeveelutions in console log, need to figure out a way to show them all
        if (GetPokemonEvolutionChain.chain.evolves_to.length > 1){
            while (EvolutionRow.firstChild){
                EvolutionRow.firstChild.remove()
            }
            let FetchFirstForm = await fetch(
                APIPokemon + GetPokemonEvolutionChain.chain.species.name
            );
            let GetFirstForm = await FetchFirstForm.json();
            let PokemonFirstFormIMG = document.createElement("img");
            PokemonFirstFormIMG.src = GetFirstForm.sprites.front_default;
            EvolutionRow.appendChild(PokemonFirstFormIMG)
            for (i=0; i < GetPokemonEvolutionChain.chain.evolves_to.length; i++){
                //fetching API of the second Pokémon on the evolutionary line
                let FetchSecondForm = await fetch(
                    APIPokemon + GetPokemonEvolutionChain.chain.evolves_to[i].species.name
                );
                let GetSecondForm = await FetchSecondForm.json();
                let PokemonSecondFormIMG = document.createElement("img");
                PokemonSecondFormIMG.src = GetSecondForm.sprites.front_default;
                EvolutionRow.appendChild(PokemonSecondFormIMG)

                for (j=0; j < GetPokemonEvolutionChain.chain.evolves_to[i].evolves_to.length; j++) {
                    let FetchSecondForm = await fetch(
                        APIPokemon + GetPokemonEvolutionChain.chain.evolves_to[i].evolves_to[j].species.name
                    );
                    let GetSecondForm = await FetchSecondForm.json();
                    let PokemonSecondFormIMG = document.createElement("img");
                    PokemonSecondFormIMG.src = GetSecondForm.sprites.front_default;
                    EvolutionRow.appendChild(PokemonSecondFormIMG)
                    }
                }
        }

        else if (GetPokemonEvolutionChain.chain.evolves_to.length === 0) {
            while (EvolutionRow.firstChild){
                EvolutionRow.firstChild.remove()
            }

            let PokemonFirstFormIMG = document.createElement("img");
            PokemonFirstFormIMG.src = GetPokemonData.sprites.front_default;
            EvolutionRow.appendChild(PokemonFirstFormIMG)
        }

        else if (GetPokemonEvolutionChain.chain.evolves_to[0].evolves_to.length === 0) {
            while (EvolutionRow.firstChild){
                EvolutionRow.firstChild.remove()
            }
            //fetching API of the first Pokémon on the evolutionary line
            let FetchFirstForm = await fetch(
                APIPokemon + GetPokemonEvolutionChain.chain.species.name
            );
            let GetFirstForm = await FetchFirstForm.json();
            let PokemonFirstFormIMG = document.createElement("img");
            PokemonFirstFormIMG.src = GetFirstForm.sprites.front_default;
            EvolutionRow.appendChild(PokemonFirstFormIMG)

            //fetching API of the second Pokémon on the evolutionary line
            let FetchSecondForm = await fetch(
                APIPokemon + GetPokemonEvolutionChain.chain.evolves_to[0].species.name
            );
            let GetSecondForm = await FetchSecondForm.json();
            let PokemonSecondFormIMG = document.createElement("img");
            PokemonSecondFormIMG.src = GetSecondForm.sprites.front_default;
            EvolutionRow.appendChild(PokemonSecondFormIMG)
        }
        else {
            while (EvolutionRow.firstChild){
                EvolutionRow.firstChild.remove()
            }
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
        PokemonPicture.src = GetPokemonData.sprites.other.home.front_default;

        //Will change this to the images instead of just text
        const Typing = document.getElementById("TypingTitle")
        if (GetPokemonData.types.length>1) {
            while (Typing.firstChild){
                Typing.firstChild.remove()
            }
            let TypeOne = document.createElement("img");
            TypeOne.src = "images/types/"+GetPokemonData.types[0].type.name+".png"
            Typing.appendChild(TypeOne)
            let TypeTwo = document.createElement("img");
            TypeTwo.src = "images/types/"+GetPokemonData.types[1].type.name+".png"
            Typing.appendChild(TypeTwo)
        }
        else {
            while (Typing.firstChild){
                Typing.firstChild.remove()
            }
            let TypeOne = document.createElement("img");
            TypeOne.src = "images/types/"+GetPokemonData.types[0].type.name+".png"
            Typing.appendChild(TypeOne)
        }

        //Pokémon Abilities
        const AbilityOne = document.getElementById("Ability1");
        const AbilityTwo = document.getElementById("Ability2");
        if (GetPokemonData.abilities.length === 1){
            document.getElementById("AbilityTitles").innerHTML = GetPokemonData.name + " can have the following ability"
            AbilityOne.innerHTML = GetPokemonData.abilities[0].ability.name.replace("-"," ")
            AbilityTwo.innerHTML = ""
        }
        else {
            document.getElementById("AbilityTitles").innerHTML = GetPokemonData.name + " can have the following abilities:"
            AbilityOne.innerHTML = GetPokemonData.abilities[0].ability.name.replace("-"," ")
            AbilityTwo.innerHTML = GetPokemonData.abilities[1].ability.name.replace("-"," ")
        }

        //Shows Pokémon moves

        if (GetPokemonData.moves.length === 1){
            document.getElementById('PokemonMovesTitle').innerHTML = GetPokemonData.name + " can learn the following move:"
            document.getElementById("PokemonMove1").innerHTML = GetPokemonData.moves[0].move.name.replace("-"," ")
            document.getElementById("PokemonMove2").innerHTML = " ";
            document.getElementById("PokemonMove3").innerHTML = " ";
            document.getElementById("PokemonMove4").innerHTML = " ";
        }
        else {
            document.getElementById('PokemonMovesTitle').innerHTML = GetPokemonData.name + " can learn the following moves:"
            document.getElementById("PokemonMove1").innerHTML = GetPokemonData.moves[0].move.name.replace("-"," ")
            document.getElementById("PokemonMove2").innerHTML = GetPokemonData.moves[1].move.name.replace("-"," ")
            document.getElementById("PokemonMove3").innerHTML = GetPokemonData.moves[2].move.name.replace("-"," ")
            document.getElementById("PokemonMove4").innerHTML = GetPokemonData.moves[3].move.name.replace("-"," ")
        }
        //need to add all background images as jpeg files
        let PokemonTypeBackground = GetPokemonData.types[0].type.name;
        document.body.style.backgroundImage = "url(images/"+PokemonTypeBackground+".jpg)";

        //Fun Amoonguss feature
        if (GetPokemonData.name ==="amoonguss"){
            const Amoonguss = new Audio('audio/amongus.mp3');
            Amoonguss.play();
        }

    }