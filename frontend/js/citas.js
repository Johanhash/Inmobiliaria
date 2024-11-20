document.addEventListener('DOMContentLoaded', async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        alert('Debes iniciar sesión.');
        window.location.href = 'admin.html';
    }

    // Cargar opciones para el formulario
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

        clients.forEach(client => {
            const option = document.createElement('option');
            option.value = client.id;
            option.textContent = client.name;
            clientSelect.appendChild(option);
        });

        properties.forEach(property => {
            const option = document.createElement('option');
            option.value = property.id;
            option.textContent = property.address;
            propertySelect.appendChild(option);
        });

        agents.forEach(agent => {
            const option = document.createElement('option');
            option.value = agent.id;
            option.textContent = agent.name;
            agentSelect.appendChild(option);
        });
    };

    // Registrar cita
    document.getElementById('appointment-form').addEventListener('submit', async e => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            const response = await fetch('/api/appointments', {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            if (response.ok) {
                alert('Cita registrada con éxito.');
                e.target.reset();
                loadAppointments();
            } else {
                alert('Error al registrar la cita.');
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
