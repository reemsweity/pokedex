function getQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function fetchData(id){
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
            throw new Error("Could not fetch data");
        }

        const data = await response.json();

        document.getElementById("pokemonSprite").src = data.sprites.front_default;
        document.getElementById("pokemonSprite").style.display = "block";
        document.getElementById("titel_name").innerText = data.name;
        document.getElementById("id").innerText = data.id;
        document.getElementById("type").innerText = data.types[0].type.name;
        document.getElementById("species").innerText = data.species.name;
        document.getElementById("height").innerText = data.height;
        document.getElementById("weight").innerText = data.weight;
        document.getElementById("abilities_1").innerText = data.abilities[0].ability.name;

        if (data.abilities[1]) {
            document.getElementById("abilities_2").innerText = data.abilities[1].ability.name;
        } else {
            document.getElementById("abilities_2").innerText = "None";
        }
    } catch (error) {
        console.error("Error fetching Pokémon details: ", error);
    }
}


const pokemonId = getQueryParams();
if (pokemonId) {
    fetchData(pokemonId);
}

async function fetchDataNew(){
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20`);
        if (!response.ok) {
            throw new Error("Could not fetch data");
        }

        for (let i = 0; i < 20; i++) {
            const pokeResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
            const data = await pokeResponse.json();
            const imgElement = document.getElementById("lists");
            
           
            imgElement.innerHTML += 
            `<a class="text-decoration-none" href="main.html?id=${data.id}">
                <div class="card m-3" style="width: 18rem;">
                    <img src="${data.sprites.front_default}" class="card-img-top" alt="${data.name}">
                    <div class="card-body">
                        <h5 class="card-title p-3">${data.name}</h5>
                    </div>
                </div>
            </a>`;
        }
    } catch (error) {
        console.error("Error fetching Pokémon list: ", error);
    }
}

fetchDataNew();
