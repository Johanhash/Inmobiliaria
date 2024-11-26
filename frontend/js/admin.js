document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-btn');

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // Eliminar el token de sesión
            sessionStorage.removeItem('token');
            
            // Redirigir al index.html
            window.location.href = 'index.html';
        });
    }
});

document.getElementById('admin-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            alert('Credenciales inválidas.');
            return;
        }

        const data = await response.json();
        sessionStorage.setItem('token', data.token);
        window.location.href = 'panel.html';
    } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
        alert('Error al iniciar sesión. Intenta de nuevo.');
    }
});


