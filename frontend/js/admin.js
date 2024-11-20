document.getElementById('admin-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            alert('Inicio de sesión exitoso.');
            sessionStorage.setItem('token', data.token);
            window.location.href = '/dashboard.html';
        } else {
            alert('Credenciales inválidas.');
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
});
