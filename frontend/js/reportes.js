document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        alert('Debes iniciar sesión.');
        window.location.href = 'admin.html';
    }

    // Descargar PDF
    document.getElementById('download-sales-pdf').addEventListener('click', async () => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) throw new Error('Token no encontrado.');
    
            const response = await fetch('/api/reports/sales/pdf', {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            if (!response.ok) {
                alert('Error al descargar el PDF.');
                return;
            }
    
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'reporte_ventas.pdf';
            a.click();
            window.URL.revokeObjectURL(url);
        }
        catch (error) {
            console.error('Error al descargar el PDF:', error);
        }

    });
    
    document.getElementById('download-sales-excel').addEventListener('click', async () => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) throw new Error('Token no encontrado.');
    
            const response = await fetch('/api/reports/sales/excel', {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            if (!response.ok) {
                alert('EXEL');
                return;
            }
    
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'reporte_ventas.xlsx';
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error al descargar el Excel:', error);
        }
    });
    
});
