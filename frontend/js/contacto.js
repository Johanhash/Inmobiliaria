document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const comments = document.getElementById('message').value; // Cambiado de 'comments' a 'message'

        console.log('Enviando datos:', { name, email, comments });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, comments }),
            });

            if (response.ok) {
                alert('Mensaje enviado con éxito.');
            } else {
                const errorData = await response.json();
                alert(`Error al enviar el mensaje: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Error al enviar el mensaje.');
        }
    });
});

