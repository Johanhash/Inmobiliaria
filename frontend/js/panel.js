document.addEventListener('DOMContentLoaded', async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        alert('Debes iniciar sesión.');
        window.location.href = 'admin.html';
        return;
    }

    // Cargar propiedades
    const loadProperties = async () => {
        try {
            const response = await fetch('/api/properties', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const properties = await response.json();

            const propertyList = document.getElementById('property-list');
            propertyList.innerHTML = properties
                .map(property => `
                    <div class="property-item">
                        <h3>${property.address}</h3>
                        <p><strong>Precio:</strong> ${property.price}</p>
                        <p><strong>Tipo:</strong> ${property.type}</p>
                        <p><strong>Estado:</strong> ${property.status}</p>
                        <p><strong>Características:</strong> ${property.features || 'N/A'}</p>
                        <div class="property-images">
                            ${JSON.parse(property.image_paths || '[]')
                                .map(path => `<img src="${path}" alt="Imagen de Propiedad" style="width: 100px; height: 100px; object-fit: cover;">`)
                                .join('')}
                        </div>
                    </div>
                `)
                .join('');
        } catch (error) {
            console.error('Error al cargar propiedades:', error);
        }
    };

    // Registrar propiedad
    document.getElementById('property-form').addEventListener('submit', async e => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            const response = await fetch('/api/properties', {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            if (response.ok) {
                alert('Propiedad registrada con éxito.');
                e.target.reset();
                loadProperties();
            } else {
                const error = await response.json();
                alert(error.message || 'Error al registrar la propiedad.');
            }
        } catch (error) {
            console.error('Error al registrar propiedad:', error);
        }
    });

    // Eliminar propiedad
    window.deleteProperty = async id => {
        try {
            const response = await fetch(`/api/properties/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                alert('Propiedad eliminada con éxito.');
                loadProperties();
            } else {
                const error = await response.json();
                alert(error.message || 'Error al eliminar la propiedad.');
            }
        } catch (error) {
            console.error('Error al eliminar propiedad:', error);
        }
    };

    // Inicializar carga de propiedades
    loadProperties();
});




