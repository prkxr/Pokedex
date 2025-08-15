// fetch("https://pokeapi.co/api/v2/pokemon/charizard")
//     .then(response =>response.json())
//     .then(data=>console.log(data.abilities))
//     .catch(error=>console.error(error))

// fetchData();

const typeColors = {
    fire:   { bg: "#cf4e26ff", border: "#ce3405ff", text: "#fff3e0" },
    water:  { bg: "#046096ff", border: "#01579b", text: "#e1f5fe" },
    grass:  { bg: "#2e7d32", border: "#1b5e20", text: "#e8f5e9" },
    electric: { bg: "#c5a61bff", border: "#fbc02d", text: "#fffde7" },
    psychic: { bg: "#821191ff", border: "#530866ff", text: "#fce4ec" },
    ice:    { bg: "#00acc1", border: "#006064", text: "#e0f7fa" },
    dragon: { bg: "#581880ff", border: "#2c0b53ff", text: "#f3e5f5" },
    dark:   { bg: "#212121", border: "#000000", text: "#e0e0e0" },
    fairy:  { bg: "#f56a98ff", border: "#cf4a76ff", text: "#fce4ec" },
    fighting: { bg: "#a3320fff", border: "#e2410fff", text: "#fbe9e7" },
    normal: { bg: "#8d6e63", border: "#5d4037", text: "#efebe9" },
    ghost:  { bg: "#4527a0", border: "#311b92", text: "#ede7f6" },
    rock:   { bg: "#707070ff", border: "#4d4d4dff", text: "#efebe9" },
    steel:  { bg: "#607d8b", border: "#455a64", text: "#eceff1" },
    ground: { bg: "#a1887f", border: "#6d4c41", text: "#efebe9" },
    poison: { bg: "#8e24aa", border: "#6a1b9a", text: "#f3e5f5" },
    bug:    { bg: "#558b2f", border: "#33691e", text: "#f1f8e9" }
};

async function fetchData(){
    try{

        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if(!response.ok){
            throw new Error("Could not fetch resource");
        }

        //Sprite
        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite");
        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";
        // console.log(data);

        //Stats

        const statsContainer = document.getElementById("pokemonStats");
        statsContainer.innerHTML = ""; 

        data.stats.forEach(stat => {
            const statItem = document.createElement("p");
            statItem.textContent = `${stat.stat.name.toUpperCase()}: ${stat.base_stat}`;
            statsContainer.appendChild(statItem);
        });

        const mainType = data.types[0].type.name;
        if (typeColors[mainType]) {
            const colors = typeColors[mainType];
            document.body.style.backgroundColor = colors.bg;
            document.body.style.color = colors.text;

            imgElement.style.borderColor = colors.border;
            statsContainer.style.borderColor = colors.border;

            // Change buttons and inputs
            document.querySelector("input").style.borderColor = colors.border;
            document.querySelector("button").style.borderColor = colors.border;
            document.querySelector("button").style.color = colors.border;
        }
    }

    catch(error){
        console.log(error);
    }
}