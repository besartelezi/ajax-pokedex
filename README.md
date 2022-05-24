# Pokémon, gotta code 'em all!
Want to know what type of Pokémon Gengar is? [Well try out my very own Pokédex!](https://besartelezi.github.io/ajax-pokedex/) </br> 
If you're reading this and you're not very familiar with Pokémon, then you're probably wondering to yourself: "What in the actual pancakes do any of the words mean that I just read?" </br>

I'll try to explain it to you as short and sweet as possible. Pokémon is a very popular game and anime, where the objective is to catch these mystical creatures known as Pokémon. </br> 
Each and every single Pokémon is unique, some breathe fire, some live at the bottom of the sea, and some are even capable of commiting tax fraud (looking at you Meowth, the IRS is on to you). </br>

Once the player has captured a Pokémon, they can see all possible information regarding that species of Pokémon on a neat little device called the Pokédex. So a Pokédex is basically an encyclopedia for Pokémon. </br>

If this is all still a bit confusing, then try out my Pokédex and play with it for a while. Sometimes things just make **way** more sense if you see it in action for yourself, instead of just reading some words. </br>

There are more fun stuff to discover about the world of Pokémon, but this is basically everything that you need to know for this project.

## Episode 1 : "I Choose You!"
As someone who is **extremely** familiar with Pokémon, I'm most certain that I will enjoy this assignment very much. The biggest challenge will definitely be working with an API. </br>

I don't have a lot of experience with API's, but I'm excited to learn how to use them. </br>

I will start out by creating all necessary files, and then playing around with the API for a bit. I want to figure out how to access certain data from it and show it on the website. In order to really understand how something works, I need to take my sweet time with something and check out all the fun possibilities it presents. </br>

Only when that task has been done, will I try and figure out my next move

## Episode 2: "Besart used API! It's not very effective..."
After having lots and lots and **lots** of trouble with my code, I finally understood what went wrong. And to make sure I'll never ever forget this lesson, I will write it down here:
#### If you wrote your code flawlessly, you don't see anything wrong with it, but it's not working as intended. Well, chances are you placed outside it of your function, so it's doing weird stuff. </br>

The positioning of your code is always of utmost importance, but it is especially important when working with API's. I'm extremely glad that I learned this important lesson now, instead of later when I'm working for a high-end Web Development Company. Hurray for mistakes!

## Episode 3: "Showdown in Javascript City!"
With the user input, I'm now able to get the Pokémon's name, ID number, the image URL, 4 moves, and the typing. I'm still not able to get the previous evolution yet though. I was finally able to access the entire evolution tree, by fetching another API. </br>

Now I need to create DOM elements in order to make everything visible, once that is out of the way, I have to make the Pokédex look as amazing as possible.

## Episode 4: "The Path to the HTML League!"
In order to make the Pokédex look as good as possible, I need to have a clear structure in mind for my HTML. So I kept in mind how I want it to look while adding all the HTML elements. </br>

Now that I'm more experienced in Javascript as well, I knew what to add and where in order to place all the information of the Pokémon that will appear in an orderly and fun way.

## Episode 5: "CSS: (The) Cerulean City Seashore!" 
The first thing I did before starting on the styling of the page, was make a color scheme that was based on the Pokédex. You can find [the colorscheme here!](https://coolors.co/1f2025-a10001-eb5352-fef3ef-88c9f1-5182ac-7bc87a) </br>
Afterwards, I played around for a bit in paint in order to have a clear view of how I'd like my Pokédex to look like.

![ScreenShot](/images/pokedex-example.png)


## Episode 6: "The TriumDonphan Return to Javascript City!"
After a lot of experimenting, I was finally able to show the entire evolutionary line of every searched Pokémon on the Pokédex. So if you're looking for Amoonguss, the entire Amoonguss evolutionary line will show up! You're probably asking yourself, how did this Sussy Baka figure out how to do that? Well, do not fret, because this Sussy Baka will explain it to you! </br>
```
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
```
I started out by fetching the species data from the API, because in that API, you can find the evolution chain ID number of the Pokémon the user has searched for. I then fetch the evolution-chain API. My next step, is to get the names from those Pokémon in the evolution-chain, and fetch **THEIR** API's so that I can access their images. And this is how I went about doing that:
```
  else if (GetPokemonEvolutionChain.chain.evolves_to[0].evolves_to.length === 0) {
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
```
This is the code I used for all Pokémon species that can evolve only one time. So this only works for Pokémon like Foongus and it's evolution Amoonguss, who's Pokémon evolution-chain consist of only two Pokémon.

## Fun Features I would like to add
- [x] Show typing of Pokémon
- [x] Change background image of the website to a wallpaper that closely represents the Pokémons type
  * For example, a green background when the Pokémon shown on the Pokédex is a grass Pokémon
- [x] Show the entire evolutionary tree of the Pokémon
- [ ] Show the abilities of Pokémon
- [x] Let the Pokédex do something special when Pokémon #591 appears.
  * Try out this fun feature!
- [ ] Add a "Previously Searched button", so that the user can go back to the previously viewed Pokémon
  * I think I'll do this by adding an array that will be used to store the date of the Pokémon once the user has clicked on the button that will show them the Pokémon they searched for.
- [ ] Adding a "next" and "previous" button, so the user can just scroll through the Pokédex even when they're a little unfamiliar with Pokémon.
- [ ] Once I'm more familiar with animations, I'd like to revisit this project and when people open the website, they're greeted by a closed Pokédex. Then, when they click on a button on the left side of the Pokédex, it opens.