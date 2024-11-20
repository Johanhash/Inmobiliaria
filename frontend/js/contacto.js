document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message }),
        });

        if (response.ok) {
            alert('Mensaje enviado con éxito.');
        } else {
            alert('Error al enviar el mensaje.');
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
});
