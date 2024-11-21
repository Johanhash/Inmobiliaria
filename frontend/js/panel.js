document.addEventListener('DOMContentLoaded', async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        alert('Debes iniciar sesión.');
        window.location.href = 'admin.html';
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
                .map(
                    property => `
                    <div>
                        <h3>${property.address}</h3>
                        <p>Precio: ${property.price}</p>
                        <p>Tipo: ${property.type}</p>
                        <p>Estado: ${property.status}</p>
                        <button onclick="deleteProperty(${property.id})">Eliminar</button>
                    </div>
                `
                )
                .join('');
        } catch (error) {
            console.error('Error al cargar propiedades:', error);
        }
    };

    // Registrar propiedad
    document.getElementById('property-form').addEventListener('submit', async e => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));

        try {
            const response = await fetch('/api/properties', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Propiedad registrada con éxito.');
                e.target.reset();
                loadProperties();
            } else {
                alert('Error al registrar la propiedad.');
            }
        } catch (error) {
            console.error('Error al registrar propiedad:', error);
        }
    });

    // Función para eliminar propiedades
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
                alert('Error al eliminar la propiedad.');
            }
        } catch (error) {
            console.error('Error al eliminar propiedad:', error);
        }
    };

    // Cargar las propiedades inicialmente
    loadProperties();
});

