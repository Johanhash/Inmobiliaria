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
                        <button class="delete-button" onclick="deleteAgent(${agent.id})">Eliminar</button>
                    </div>
                `
                )
                .join('');

            // Agregar estilos al botón
            const style = document.createElement('style');
            style.innerHTML = `
                .delete-button {
                    background-color: red;
                    color: white;
                    border: none;
                    padding: 8px 10px;
                    cursor: pointer;
                    border-radius: 5px;
                }
                .delete-button:hover {
                    background-color: darkred;
                }
            `;
            document.head.appendChild(style);
        } catch (error) {
            console.error('Error al cargar agentes:', error);
        }
    };

    // Registrar agente
    document.getElementById('agent-form').addEventListener('submit', async e => {
        e.preventDefault();
    
        const token = sessionStorage.getItem('token');
        if (!token) {
            alert('Debes iniciar sesión.');
            window.location.href = 'admin.html';
            return;
        }
    
        const name = document.querySelector('input[name="name"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const password = document.querySelector('input[name="password"]').value;
    
        try {
            const response = await fetch('/api/agents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name, email, password }),
            });
    
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Error al registrar el agente.');
            }
    
            alert('Agente registrado con éxito.');
            e.target.reset();
        } catch (error) {
            console.error('Error al registrar agente:', error);
            alert(error.message);
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
