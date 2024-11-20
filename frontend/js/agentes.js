document.addEventListener('DOMContentLoaded', async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        alert('Debes iniciar sesión.');
        window.location.href = 'admin.html';
    }

    // Función para cargar los agentes
    const loadAgents = async () => {
        try {
            const response = await fetch('/api/agents', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const agents = await response.json();

            const agentList = document.getElementById('agent-list');
            agentList.innerHTML = agents
                .map(
                    agent => `
                    <div>
                        <p>Nombre: ${agent.name}</p>
                        <p>Correo: ${agent.email}</p>
                        <button onclick="deleteAgent(${agent.id})">Eliminar</button>
                    </div>
                `
                )
                .join('');
        } catch (error) {
            console.error('Error al cargar agentes:', error);
        }
    };

    // Registrar agente
    document.getElementById('agent-form').addEventListener('submit', async e => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            const response = await fetch('/api/agents', {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            if (response.ok) {
                alert('Agente registrado con éxito.');
                e.target.reset();
                loadAgents();
            } else {
                alert('Error al registrar el agente.');
            }
        } catch (error) {
            console.error('Error al registrar agente:', error);
        }
    });

    // Eliminar agente
    window.deleteAgent = async id => {
        try {
            const response = await fetch(`/api/agents/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                alert('Agente eliminado con éxito.');
                loadAgents();
            } else {
                alert('Error al eliminar el agente.');
            }
        } catch (error) {
            console.error('Error al eliminar agente:', error);
        }
    };

    // Inicializar
    await loadAgents();
});
