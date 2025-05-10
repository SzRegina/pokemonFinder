const $ = id => document.getElementById(id);

const OPTIONS = {
    api: 'https://pokeapi.co/api/v2/pokemon/'
};

const getPokemonByName = async name =>
    (await fetch(`${OPTIONS.api}${name}`)).json();

function setButtonState() {
    const inputValue = $('search-input').value.trim();
    $('search-button').disabled = inputValue === '';
}

$('search-button').addEventListener('click', async () => {
    try {
        $('pokemon-container').innerHTML = ''; // törli az előző képet
        const data = await getPokemonByName($('search-input').value.trim());
        const img = document.createElement('img');
        img.src = data.sprites.front_default;
        $('pokemon-container').append(img);
    } catch (e) {
        console.error("Hiba történt a Pokémon lekérdezés során:", e);
    }
});

$('search-input').addEventListener('input', setButtonState);

setButtonState();
