document.addEventListener('DOMContentLoaded', async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        alert('Debes iniciar sesión.');
        window.location.href = 'admin.html';
        return;
    }

    // Función para cargar propiedades
    const loadProperties = async () => {
        try {
            const response = await fetch('/api/properties', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error('Error al cargar propiedades');
            }

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
                            ${(Array.isArray(property.image_paths) ? property.image_paths : [])
                                .map(path => `<img src="${path}" alt="Imagen de Propiedad" style="width: 100px; height: 100px; object-fit: cover;">`)
                                .join('')}
                        </div>
                        <button onclick="editProperty(${property.id})">Editar</button>
                        <button onclick="deleteProperty(${property.id})">Eliminar</button>
                    </div>
                `)
                .join('');
        } catch (error) {
            console.error('Error al cargar propiedades:', error);
        }
    };

    // Función para registrar o actualizar una propiedad
    document.getElementById('property-form').addEventListener('submit', async e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const editId = e.target.dataset.editId;

        try {
            const response = await fetch(editId ? `/api/properties/${editId}` : '/api/properties', {
                method: editId ? 'PUT' : 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            if (response.ok) {
                alert(editId ? 'Propiedad actualizada con éxito.' : 'Propiedad registrada con éxito.');
                e.target.reset();
                delete e.target.dataset.editId; // Elimina la marca de edición
                loadProperties();
            } else {
                const error = await response.json();
                alert(error.message || 'Error al registrar/actualizar la propiedad.');
            }
        } catch (error) {
            console.error('Error al registrar/actualizar propiedad:', error);
        }
    });

    // Función para editar una propiedad
    window.editProperty = async id => {
        try {
            const response = await fetch(`/api/properties/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error('Error al obtener los datos de la propiedad.');
            }

            const property = await response.json();

            // Llena el formulario con los datos existentes
            document.querySelector('[name="address"]').value = property.address;
            document.querySelector('[name="price"]').value = property.price;
            document.querySelector('[name="type"]').value = property.type;
            document.querySelector('[name="description"]').value = property.description;
            document.querySelector('[name="bedrooms"]').value = property.bedrooms;
            document.querySelector('[name="bathrooms"]').value = property.bathrooms;
            document.querySelector('[name="parking_spaces"]').value = property.parking_spaces;
            document.querySelector('[name="size"]').value = property.size;
            document.querySelector('[name="features"]').value = property.features;

            document.getElementById('property-form').dataset.editId = id; // Marca el formulario como edición
        } catch (error) {
            console.error('Error al cargar propiedad para edición:', error);
        }
    };

    // Función para eliminar una propiedad
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

    
    // Inicializa la carga de propiedades
    loadProperties();
});



