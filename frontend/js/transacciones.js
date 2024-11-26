document.addEventListener('DOMContentLoaded', async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        alert('Debes iniciar sesión.');
        window.location.href = 'admin.html';
    }

    // Función para descargar el contrato
    window.downloadContract = async id => {
        try {
            const response = await fetch(`/api/transactions/${id}/contract`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                alert('Error al descargar el contrato.');
                return;
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `contrato_${id}.pdf`;
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error al descargar el contrato:', error);
        }
    };

    // Cargar propiedades y agentes en los selects
    const loadOptions = async () => {
        try {
            const [propertiesRes, agentsRes] = await Promise.all([
                fetch('/api/properties', { headers: { Authorization: `Bearer ${token}` } }),
                fetch('/api/agents', { headers: { Authorization: `Bearer ${token}` } }),
            ]);

            if (!propertiesRes.ok) {
                throw new Error('Error al obtener propiedades');
            }
            if (!agentsRes.ok) {
                throw new Error('Error al obtener agentes');
            }

            const properties = await propertiesRes.json();
            const agents = await agentsRes.json();

            const propertySelect = document.getElementById('property');
            const agentSelect = document.getElementById('agent');

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
        } catch (error) {
            console.error('Error al cargar opciones:', error);
        }
    };

    // Registrar transacción y cliente en un único flujo
    document.getElementById('transaction-form').addEventListener('submit', async e => {
        e.preventDefault();
    
        const token = sessionStorage.getItem('token');
        if (!token) {
            alert('Debes iniciar sesión.');
            window.location.href = 'admin.html';
            return;
        }
    
        // Datos del cliente
        const clientData = {
            name: document.getElementById('client-name').value,
            email: document.getElementById('client-email').value,
            phone: document.getElementById('client-phone').value,
        };
    
        // Datos de la transacción
        const transactionData = {
            property_id: document.getElementById('property').value,
            agent_id: document.getElementById('agent').value,
            transaction_type: document.getElementById('type').value,
            amount: document.getElementById('amount').value,
            date: document.getElementById('date').value,
        };
    
        try {
            // Registrar cliente primero
            const clientResponse = await fetch('/api/clients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(clientData),
            });
    
            if (!clientResponse.ok) {
                const error = await clientResponse.json();
                throw new Error(error.message || 'Error al registrar el cliente.');
            }
    
            const client = await clientResponse.json();
    
            // Usar el client_id para registrar la transacción
            transactionData.client_id = client.id;
    
            const transactionResponse = await fetch('/api/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(transactionData),
            });
    
            if (!transactionResponse.ok) {
                const error = await transactionResponse.json();
                throw new Error(error.message || 'Error al registrar la transacción.');
            }
    
            alert('Cliente y transacción registrados con éxito.');
            e.target.reset();
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    });
    

    // Cargar transacciones
    const loadTransactions = async () => {
        try {
            const response = await fetch('/api/transactions', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error('Error al obtener transacciones.');
            }

            const transactions = await response.json();

            const transactionList = document.getElementById('transaction-list');
            transactionList.innerHTML = transactions
                .map(
                    transaction => `
                    <div>
                        <p>Propiedad: ${transaction.address}</p>
                        <p>Agente: ${transaction.agent}</p>
                        <p>Tipo: ${transaction.transaction_type}</p>
                        <p>Monto: ${transaction.amount}</p>
                        <p>Fecha: ${transaction.date}</p>
                        <button class="download-btn" onclick="downloadContract(${transaction.id})">Descargar Contrato</button>
                    </div>
                `
                )
                .join('');

            // Agregar estilos al botón
            const style = document.createElement('style');
            style.innerHTML = `
                .download-btn {
                    background-color: #8a724a;
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .download-btn:hover {
                    background-color: #45a049;
                }
            `;
            document.head.appendChild(style);
        } catch (error) {
            console.error('Error al cargar transacciones:', error);
        }
    };

    // Inicializar
    await loadOptions();
    await loadTransactions();
});

