const Appointments = require('../models/appointmentsModel');
const { sendMail } = require('../utils/mailer');

exports.getAllAppointments = (req, res) => {
    Appointments.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.createAppointment = (req, res) => {
    const { client_id, property_id, agent_id, date, time } = req.body;

    if (!client_id || !property_id || !agent_id || !date || !time) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const data = { client_id, property_id, agent_id, date, time };

    Appointments.create(data, async (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        Appointments.getAll((err, appointments) => {
            if (err) return;

            const appointment = appointments.find(appt => appt.id === result.insertId);

            if (appointment) {
                const clientEmail = appointment.client_email;
                const agentEmail = appointment.agent_email;

                const message = `
                Recordatorio: Tienes una cita programada.
                Fecha: ${appointment.date}
                Hora: ${appointment.time}
                Cliente: ${appointment.client_name}
                Propiedad: ${appointment.property_address}
                `;

                try {
                    sendMail(clientEmail, 'Recordatorio de Cita', message);
                    sendMail(agentEmail, 'Recordatorio de Cita', message);
                } catch (mailError) {
                    console.error('Error al enviar correos:', mailError);
                }
            }
        });

        res.status(201).json({ message: 'Cita registrada y notificaciones enviadas.', appointmentId: result.insertId });
    });
};

exports.updateAppointmentStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ message: 'El estado es obligatorio.' });
    }

    Appointments.updateStatus(id, status, async (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        Appointments.getAll((err, appointments) => {
            if (err) return;

            const appointment = appointments.find(appt => appt.id === parseInt(id));

            if (appointment) {
                const clientEmail = appointment.client_email;
                const agentEmail = appointment.agent_email;

                const message = `
                Actualización: El estado de tu cita ha cambiado.
                Nuevo estado: ${status}
                Fecha: ${appointment.date}
                Hora: ${appointment.time}
                Propiedad: ${appointment.property_address}
                `;

                try {
                    sendMail(clientEmail, 'Actualización de Cita', message);
                    sendMail(agentEmail, 'Actualización de Cita', message);
                } catch (mailError) {
                    console.error('Error al enviar correos:', mailError);
                }
            }
        });

        res.json({ message: 'Estado de la cita actualizado y notificaciones enviadas.' });
    });
};


exports.deleteAppointment = (req, res) => {
    const { id } = req.params;

    Appointments.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Cita eliminada con éxito.' });
    });
};
