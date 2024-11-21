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
                fetch('/api/users', { headers: { Authorization: `Bearer ${token}` } }),
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
    

    // Registrar transacción
    document.getElementById('transaction-form').addEventListener('submit', async e => {
        e.preventDefault();

        const formData = new FormData(e.target);

        try {
            const response = await fetch('/api/transactions', {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            if (response.ok) {
                alert('Transacción registrada con éxito.');
                e.target.reset();
                loadTransactions();
            } else {
                alert('Error al registrar la transacción.');
            }
        } catch (error) {
            console.error('Error al registrar transacción:', error);
        }
    });

    // Cargar transacciones
    const loadTransactions = async () => {
        try {
            const response = await fetch('/api/transactions', {
                headers: { Authorization: `Bearer ${token}` },
            });
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
                    </div>
                `
                )
                .join('');
        } catch (error) {
            console.error('Error al cargar transacciones:', error);
        }
    };

    // Inicializar
    await loadOptions();
    await loadTransactions();
});
