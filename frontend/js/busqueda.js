document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    
    const buscarPropiedades = async () => {
        const location = document.getElementById('location').value;
        const priceMin = document.getElementById('price-min').value;
        const priceMax = document.getElementById('price-max').value;
        const type = document.getElementById('type').value;
        const bedrooms = document.getElementById('bedrooms').value;
        const bathrooms = document.getElementById('bathrooms').value;
        const parking_spaces = document.getElementById('parking_spaces').value;

        console.log('Buscando propiedades con los siguientes filtros:', { location, priceMin, priceMax, type, bedrooms, bathrooms, parking_spaces });

        try {
            const response = await fetch('/api/properties/filter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ location, priceMin, priceMax, type, bedrooms, bathrooms, parking_spaces }),
            });

            const results = await response.json();
            console.log('Resultados de la búsqueda:', results);

            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';

            results.forEach(property => {
                const imagePaths = JSON.parse(property.image_paths);
                const imagePath = imagePaths.length > 0 ? imagePaths[0] : 'ruta/a/imagen/por_defecto.jpg';
                console.log('URL de la imagen:', imagePath); // Verificar la URL de la imagen
                const propertyDiv = document.createElement('div');
                propertyDiv.classList.add('property-container');
                propertyDiv.innerHTML = `
                    <div class="property-image-container">
                        <img src="${imagePath}" alt="Imagen de Propiedad" class="property-image">
                    </div>
                    <div class="property-details">
                        <h3>${property.address}</h3>
                        <p><strong>Precio:</strong> ${property.price}</p>
                        <p><strong>Tipo:</strong> ${property.type}</p>
                        <p><strong>Habitaciones:</strong> ${property.bedrooms}</p>
                        <p><strong>Baños:</strong> ${property.bathrooms}</p>
                        <p><strong>Estacionamientos:</strong> ${property.parking_spaces}</p>
                        <p><strong>Estado:</strong> ${property.status}</p>
                    </div>
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
