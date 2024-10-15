const nodemailer = require('nodemailer');

// Función para enviar correo de verificación usando Mailtrap
const enviarEmailVerificacion = async (email, nombre, token) => {
    try {
        // Configuración del transporte con Mailtrap
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io", // Host de Mailtrap
            port: 2525, // Puerto de Mailtrap
            auth: {
                user: "f6e8e76be118b8", // Tu usuario de Mailtrap
                pass: "20c0e12f9c706c"  // Tu contraseña de Mailtrap
            }
        });

        // Definir el contenido del correo
        const mailOptions = {
            from: '"Choco Pop" <no-reply@chocopop.com>', 
            to: email,
            subject: 'Verificación de cuenta',
            html: `
                <h1>Hola, ${nombre}</h1>
                <p>Gracias por registrarte. Para verificar tu cuenta, haz clic en el siguiente enlace:</p>
                <a href="http://localhost:3000/verificar/${token}">Verificar cuenta</a>
                <p>Si no creaste esta cuenta, puedes ignorar este mensaje.</p>
            `
        };

        // Enviar el correo
        await transport.sendMail(mailOptions);
        console.log('Correo de verificación enviado exitosamente');
    } catch (error) {
        console.error('Error al enviar el correo de verificación', error);
        throw new Error('No se pudo enviar el correo de verificación');
    }
};

// Función para enviar correo de recuperación de contraseña usando Mailtrap
const enviarEmailRecuperacion = async (email, nombre, token) => {
    try {
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "f6e8e76be118b8", // Tu usuario de Mailtrap
                pass: "20c0e12f9c706c"  // Tu contraseña de Mailtrap
            }
        });

        // Definir el contenido del correo
        const mailOptions = {
            from: '"Choco Pop" <no-reply@chocopop.com>',
            to: email,
            subject: 'Recuperación de contraseña',
            html: `
                <h1>Hola, ${nombre}</h1>
                <p>Parece que solicitaste restablecer tu contraseña. Haz clic en el siguiente enlace para continuar:</p>
                <a href="http://localhost:3000/login/recuperar-password/${token}">Restablecer contraseña</a>
                <p>Si no solicitaste este cambio, puedes ignorar este mensaje.</p>
            `
        };

        // Enviar el correo
        await transport.sendMail(mailOptions);
        console.log('Correo de recuperación enviado exitosamente');
    } catch (error) {
        console.error('Error al enviar el correo de recuperación', error);
        throw new Error('No se pudo enviar el correo de recuperación');
    }
};


module.exports = {
    enviarEmailVerificacion,
    enviarEmailRecuperacion
};
