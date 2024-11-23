document.addEventListener('DOMContentLoaded', () => {
    
    
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
    
            const results = await response.json();
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';
    
            results.forEach(property => {
                const propertyDiv = document.createElement('div');
                propertyDiv.innerHTML = `
                    <img src="${property.image_path}" alt="Imagen de Propiedad" style="width: 100%; height: 200px; object-fit: cover;">
                    <h3>${property.address}</h3>
                    <p><strong>Precio:</strong> ${property.price}</p>
                    <p><strong>Tipo:</strong> ${property.type}</p>
                    <p><strong>Estado:</strong> ${property.status}</p>
                `;
                resultsDiv.appendChild(propertyDiv);
            });
        } catch (error) {
            console.error('Error en la búsqueda:', error);
            alert('Error al realizar la búsqueda.');
        }
    };
    

    document.getElementById('search-form').addEventListener('submit', e => {
        e.preventDefault();
        buscarPropiedades();
    });
});

