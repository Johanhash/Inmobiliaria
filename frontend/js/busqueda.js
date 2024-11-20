document.getElementById('search-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const location = document.getElementById('location').value;
    const priceMin = document.getElementById('price-min').value;
    const priceMax = document.getElementById('price-max').value;
    const type = document.getElementById('type').value;

    try {
        const response = await fetch('/api/properties', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ location, priceMin, priceMax, type }),
        });

        const results = await response.json();
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';

        results.forEach(property => {
            const propertyDiv = document.createElement('div');
            propertyDiv.textContent = `${property.address} - ${property.price} - ${property.type}`;
            resultsDiv.appendChild(propertyDiv);
        });
    } catch (error) {
        console.error('Error fetching properties:', error);
    }
});
