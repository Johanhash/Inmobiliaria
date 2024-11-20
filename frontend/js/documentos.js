document.addEventListener('DOMContentLoaded', async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        alert('Debes iniciar sesión.');
        window.location.href = 'admin.html';
    }

    // Función para cargar documentos
    const loadDocuments = async () => {
        try {
            const response = await fetch('/api/documents', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const documents = await response.json();

            const documentList = document.getElementById('document-list');
            documentList.innerHTML = documents
                .map(
                    doc => `
                    <div>
                        <p>Nombre: ${doc.name}</p>
                        <p>Tipo: ${doc.type}</p>
                        <a href="${doc.path}" download>Descargar</a>
                        <button onclick="deleteDocument(${doc.id})">Eliminar</button>
                    </div>
                `
                )
                .join('');
        } catch (error) {
            console.error('Error al cargar documentos:', error);
        }
    };

    // Subir documento
    document.getElementById('document-form').addEventListener('submit', async e => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            const response = await fetch('/api/documents', {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            if (response.ok) {
                alert('Documento subido con éxito.');
                e.target.reset();
                loadDocuments();
            } else {
                alert('Error al subir el documento.');
            }
        } catch (error) {
            console.error('Error al subir documento:', error);
        }
    });

    // Eliminar documento
    window.deleteDocument = async id => {
        try {
            const response = await fetch(`/api/documents/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                alert('Documento eliminado con éxito.');
                loadDocuments();
            } else {
                alert('Error al eliminar el documento.');
            }
        } catch (error) {
            console.error('Error al eliminar documento:', error);
        }
    };

    // Inicializar
    await loadDocuments();
});
