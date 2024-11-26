document.addEventListener('DOMContentLoaded', async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        alert('Debes iniciar sesión.');
        window.location.href = 'admin.html';
    }

    // Cargar clientes, propiedades y agentes
    const loadOptions = async () => {
        const [clientsRes, propertiesRes, agentsRes] = await Promise.all([
            fetch('/api/clients', { headers: { Authorization: `Bearer ${token}` } }),
            fetch('/api/properties', { headers: { Authorization: `Bearer ${token}` } }),
            fetch('/api/agents', { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        const clients = await clientsRes.json();
        const properties = await propertiesRes.json();
        const agents = await agentsRes.json();

        const clientSelect = document.getElementById('client_id');
        const propertySelect = document.getElementById('property_id');
        const agentSelect = document.getElementById('agent_id');

        clientSelect.innerHTML = '';
        clients.forEach(client => {
            const option = document.createElement('option');
            option.value = client.id;
            option.textContent = client.name;
            clientSelect.appendChild(option);
        });

        propertySelect.innerHTML = '';
        properties.forEach(property => {
            const option = document.createElement('option');
            option.value = property.id;
            option.textContent = property.address;
            propertySelect.appendChild(option);
        });

        agentSelect.innerHTML = '';
        agents.forEach(agent => {
            const option = document.createElement('option');
            option.value = agent.id;
            option.textContent = agent.name;
            agentSelect.appendChild(option);
        });
    };

    // Registrar cliente
    document.getElementById('client-form').addEventListener('submit', async e => {
        e.preventDefault();
    
        // Crear un objeto con los datos del formulario
        const clientData = {
            name: document.getElementById('client-name').value,
            email: document.getElementById('client-email').value,
            phone: document.getElementById('client-phone').value,
        };
    
        // Mostrar los datos enviados en la consola para depuración
        console.log('Datos enviados:', clientData);
    
        try {
            const token = sessionStorage.getItem('token'); // Asegúrate de que exista un token válido
            const response = await fetch('/api/clients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(clientData), // Convertir los datos a JSON
            });
    
            if (response.ok) {
                alert('Cliente registrado con éxito.');
                e.target.reset(); // Reiniciar el formulario
                loadClients(); // Actualizar la lista de clientes
            } else {
                const error = await response.json();
                alert(error.message || 'Error al registrar el cliente.');
            }
        } catch (error) {
            console.error('Error al registrar cliente:', error);
        }
    });
    
    // Registrar cita
    document.getElementById('appointment-form').addEventListener('submit', async e => {
        e.preventDefault();
    
        const appointmentData = {
            client_id: document.getElementById('client_id').value,
            property_id: document.getElementById('property_id').value,
            agent_id: document.getElementById('agent_id').value,
            date: document.querySelector('input[name="date"]').value,
            time: document.querySelector('input[name="time"]').value,
        };
    
        console.log('Datos de la cita:', appointmentData); // Depuración
    
        try {
            const response = await fetch('/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(appointmentData),
            });
    
            if (response.ok) {
                alert('Cita registrada con éxito.');
                e.target.reset();
                loadAppointments(); // Recargar citas
            } else {
                const error = await response.json();
                alert(error.message || 'Error al registrar la cita.');
            }
        } catch (error) {
            console.error('Error al registrar cita:', error);
        }
    });
    

    // Cargar citas
    const loadAppointments = async () => {
        try {
            const response = await fetch('/api/appointments', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const appointments = await response.json();

            const appointmentList = document.getElementById('appointment-list');
            appointmentList.innerHTML = appointments
                .map(
                    appt => `
                    <div>
                        <p>Cliente: ${appt.client_name}</p>
                        <p>Propiedad: ${appt.property_address}</p>
                        <p>Agente: ${appt.agent_name}</p>
                        <p>Fecha: ${appt.date}</p>
                        <p>Hora: ${appt.time}</p>
                        <p>Estado: ${appt.status}</p>
                    </div>
                `
                )
                .join('');
        } catch (error) {
            console.error('Error al cargar citas:', error);
        }
    };

    await loadOptions();
    await loadAppointments();
});

