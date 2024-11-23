document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        alert('Debes iniciar sesión.');
        window.location.href = 'admin.html';
        return;
    }

    // Agregar el botón de cerrar sesión si no existe
    const header = document.querySelector('header');
    if (header && !document.getElementById('logout-btn')) {
        const logoutButton = document.createElement('button');
        logoutButton.id = 'logout-btn';
        logoutButton.textContent = 'Cerrar Sesión';
        logoutButton.style.cssText = 'margin-left: auto; background-color: #ff4d4d; color: white; border: none; padding: 10px; border-radius: 5px; cursor: pointer;';
        header.appendChild(logoutButton);

        // Evento para cerrar sesión
        logoutButton.addEventListener('click', () => {
            sessionStorage.removeItem('token'); // Elimina el token almacenado
            alert('Has cerrado sesión correctamente.');
            window.location.href = 'admin.html'; // Redirige al inicio de sesión
        });
    }
});
