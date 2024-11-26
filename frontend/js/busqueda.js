document.addEventListener('DOMContentLoaded', async () => {
    console.log('Cargando todas las propiedades al iniciar...');

    const loadAllProperties = async () => {
        try {
            const response = await fetch('/api/properties');
            if (!response.ok) throw new Error('Error al cargar propiedades.');

            const properties = await response.json();
            console.log('Propiedades cargadas:', properties);
            renderProperties(properties);
        } catch (error) {
            console.error('Error al cargar todas las propiedades:', error);
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '<p>Error al cargar propiedades. Intente más tarde.</p>';
        }
    };

    const buscarPropiedades = async () => {
        const location = document.getElementById('location').value;
        const priceMin = document.getElementById('price-min').value;
        const priceMax = document.getElementById('price-max').value;
        const type = document.getElementById('type').value;
        const bedrooms = document.getElementById('bedrooms').value;
        const bathrooms = document.getElementById('bathrooms').value;
        const parking_spaces = document.getElementById('parking_spaces').value;

        console.log('Buscando propiedades con filtros:', { location, priceMin, priceMax, type, bedrooms, bathrooms, parking_spaces });

        try {
            const response = await fetch('/api/properties/filter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ location, priceMin, priceMax, type, bedrooms, bathrooms, parking_spaces }),
            });

            const results = await response.json();
            console.log('Resultados de la búsqueda:', results);
            renderProperties(results);
        } catch (error) {
            console.error('Error en la búsqueda:', error);
            
        }
    };

    const renderProperties = (properties) => {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
    
        if (!properties || properties.length === 0) {
            resultsDiv.innerHTML = '<p>No se encontraron propiedades.</p>';
            return;
        }
    
        properties.forEach(property => {
            let imagePaths = [];
            try {
                // Intentar parsear image_paths si es JSON válido
                imagePaths = Array.isArray(property.image_paths)
                    ? property.image_paths
                    : JSON.parse(property.image_paths);
            } catch (error) {
                console.warn(`Error parsing image_paths for property ID ${property.id}:`, error.message);
                imagePaths = property.image_paths ? [property.image_paths] : []; // Usar como array
            }
    
            const imagePath = imagePaths.length > 0 ? imagePaths[0] : 'ruta/a/imagen/por_defecto.jpg';
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
    };
    
    

    document.getElementById('search-form').addEventListener('submit', e => {
        e.preventDefault();
        buscarPropiedades();
    });

    // Cargar todas las propiedades al iniciar
    await loadAllProperties();
});
