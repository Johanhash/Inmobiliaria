document.addEventListener('DOMContentLoaded', async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        alert('Debes iniciar sesión.');
        window.location.href = 'admin.html';
    }

    // Función para cargar clientes
    const loadClients = async () => {
        try {
            const response = await fetch('/api/clients', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const clients = await response.json();

            const clientList = document.getElementById('client-list');
            clientList.innerHTML = clients
                .map(
                    client => `
                    <div>
                        <p>Nombre: ${client.name}</p>
                        <p>Correo: ${client.email}</p>
                        <p>Teléfono: ${client.phone}</p>
                        <button onclick="deleteClient(${client.id})">Eliminar</button>
                    </div>
                `
                )
                .join('');
        } catch (error) {
            console.error('Error al cargar clientes:', error);
        }
    };

    // Registrar cliente
    document.getElementById('client-form').addEventListener('submit', async e => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            const response = await fetch('/api/clients', {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            if (response.ok) {
                alert('Cliente registrado con éxito.');
                e.target.reset();
                loadClients();
            } else {
                alert('Error al registrar el cliente.');
            }
        } catch (error) {
            console.error('Error al registrar cliente:', error);
        }
    });

    // Eliminar cliente
    window.deleteClient = async id => {
        try {
            const response = await fetch(`/api/clients/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                alert('Cliente eliminado con éxito.');
                loadClients();
            } else {
                alert('Error al eliminar el cliente.');
            }
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
        }
    };

    // Inicializar
    await loadClients();
});
