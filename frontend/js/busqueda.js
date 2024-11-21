const buscarPropiedades = async () => {
    const location = document.getElementById('location').value;
    const priceMin = document.getElementById('price-min').value;
    const priceMax = document.getElementById('price-max').value;
    const type = document.getElementById('type').value;

    


    try {
        const response = await fetch('/api/properties/filter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ location, priceMin, priceMax, type }),
        });

        if (!response.ok) {
            throw new Error('Error al buscar propiedades.');
        }

        const results = await response.json();
        const resultsDiv = document.getElementById('results');

        resultsDiv.innerHTML = ''; // Limpia los resultados previos

        if (!Array.isArray(results) || results.length === 0) {
            resultsDiv.textContent = 'No se encontraron propiedades.';
            return;
        }

        results.forEach(property => {
            const propertyDiv = document.createElement('div');
            propertyDiv.textContent = `${property.address} - ${property.price} - ${property.type}`;
            resultsDiv.appendChild(propertyDiv);
        });
    } catch (error) {
        console.error('Error en la búsqueda:', error);
        alert('Error al realizar la búsqueda.');
    }
};


document.getElementById('search-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita la recarga de la página
    buscarPropiedades(); // Llama a la función para buscar propiedades
});
