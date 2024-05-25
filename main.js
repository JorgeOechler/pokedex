const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";
const allPokemon = [];
const TOTAL_POKEMON = 1015; // Adjust the total number of Pokémon if necessary

// Fetch all Pokémon data
async function fetchAllPokemon() {
    for (let i = 1; i <= TOTAL_POKEMON; i++) {
        try {
            const response = await fetch(`${URL}${i}`);
            const data = await response.json();
            allPokemon.push(data);
        } catch (error) {
            console.error(`Error fetching Pokémon ID ${i}:`, error);
        }
    }

    // Sort the fetched Pokémon by ID
    allPokemon.sort((a, b) => a.id - b.id);
    displayPokemon(allPokemon);
}

function displayPokemon(pokemonArray) {
    listaPokemon.innerHTML = "";
    pokemonArray.forEach(poke => mostrarPokemon(poke));
}

function mostrarPokemon(poke) {
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`).join('');
    let pokeId = poke.id.toString().padStart(3, "0");
    let altura = (poke.height * 0.1).toFixed(2);
    let peso = (poke.weight * 0.1).toFixed(2);

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">https://chat.openai.com/share/9594c261-accf-4a9b-ba0a-48c28e5d259f
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">Altura: ${altura}m</p>
                <p class="stat">Peso: ${peso}kg</p>
            </div>
        </div>
    `;

    // Event listener para mostrar detalles al hacer clic
    div.addEventListener("click", function() {
        mostrarDetallesPokemon(poke, div);
    });

    listaPokemon.appendChild(div);
}

function mostrarDetallesPokemon(poke, div) {
    const habilidades = poke.abilities.map((ability) => ability.ability.name).join(', ');
    const estadisticas = poke.stats.map((stat) => `${stat.stat.name}: ${stat.base_stat}`).join('<br>');

    const detallesDiv = document.createElement("div");
    detallesDiv.classList.add("pokemon-detalles");
    detallesDiv.innerHTML = `
        <h3>Habilidades</h3>
        <p>${habilidades}</p>
        <h3>Estadísticas</h3>
        <p>${estadisticas}</p>
    `;

    // Remueve cualquier detalle existente antes de agregar uno nuevo
    const prevDetails = div.querySelector(".pokemon-detalles");
    if (prevDetails) {
        div.removeChild(prevDetails);
    } else {
        div.appendChild(detallesDiv);
    }
}



botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    if (botonId === "ver-todos") {
        displayPokemon(allPokemon);
    } else {
        const filteredPokemon = allPokemon.filter(poke => poke.types.some(type => type.type.name === botonId));
        displayPokemon(filteredPokemon);
    }
}));

// Initial fetch of all Pokémon
fetchAllPokemon();
