let currentPokemonId = null;

// Definindo as cores dos tipos de Pokémon
const typeColors = {
    water: '#6890f0',
    fire: '#f05030',
    grass: '#78c850',
    electric: '#f8d030',
    psychic: '#f85888',
    ice: '#98d8d8',
    dragon: '#7038f8',
    dark: '#705848',
    normal: '#a8a878',
    fighting: '#903028',
    flying: '#a890f0',
    poison: '#a040a0',
    ground: '#e0c068',
    rock: '#b8a038',
    ghost: '#705898',
    steel: '#b8b8d0'
};

const fetchPokemon = async (id) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error('Pokémon não encontrado');
        const data = await response.json();

        // Extrair informações
        const pokemonId = data.id;
        const pokemonName = data.name;
        const pokemonImage = data.sprites.versions['generation-v']['black-white'].animated.front_default;
        const pokemonTypes = data.types.map(typeInfo => typeInfo.type.name);

        // Definir cor de fundo
        const primaryColor = typeColors[pokemonTypes[0]];
        const secondaryColor = pokemonTypes[1] ? typeColors[pokemonTypes[1]] : primaryColor;
        const gradient = pokemonTypes.length > 1 ? `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` : primaryColor;

        // Exibir informações
        document.getElementById('pokemon-info').style.background = gradient;
        document.getElementById('pokemon-info').innerHTML = `
            <p><strong>#</strong> ${pokemonId}</p>
            <p><strong></strong> <img src="${pokemonImage}" alt="${pokemonName}"></p>
            <p><strong>Nome:</strong> ${pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}</p>
            <p><strong>Tipo:</strong> ${pokemonTypes.join(', ')}</p>
        `;
        document.getElementById('pokemon-info').style.Height = 100;
        document.getElementById('pokemon-info').style.Width = 100;
        
        currentPokemonId = pokemonId;
    } catch (error) {
        document.getElementById('pokemon-info').innerHTML = `<p style="color: red;">${error.message}</p>`;
        document.getElementById('pokemon-info').style.background = 'transparent';
    }
};

document.getElementById('pokemon-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const pokemonInput = document.getElementById('pokemon-input').value.toLowerCase();
    fetchPokemon(pokemonInput);
});

document.getElementById('prev-button').addEventListener('click', () => {
    if (currentPokemonId > 1) {
        fetchPokemon(currentPokemonId - 1);
    } else {
        alert('Não há Pokémon anterior.');
    }
});

document.getElementById('next-button').addEventListener('click', () => {
    fetchPokemon(currentPokemonId + 1);
});


