const nodemailer = require('nodemailer');
const path = require('path');

// Configuración global del transporte
const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "f6e8e76be118b8", 
        pass: "20c0e12f9c706c" 
    }
});

// Función genérica para enviar correos
const enviarCorreo = async (mailOptions) => {
    try {
        await transport.sendMail(mailOptions);
        console.log('Correo enviado exitosamente');
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw new Error('No se pudo enviar el correo');
    }
};

// Función para enviar correo de verificación
const enviarEmailVerificacion = async (email, nombre, token) => {
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
    await enviarCorreo(mailOptions);
};

// Función para enviar correo de recuperación de contraseña
const enviarEmailRecuperacion = async (email, nombre, token) => {
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
    await enviarCorreo(mailOptions);
};

// Función para enviar respuestas personalizadas
const enviarEmailRespuesta = async (email, asunto, mensaje) => {
    const mailOptions = {
        from: '"Choco Pop" <no-reply@chocopop.com>',
        to: email,
        subject: `Respuesta a: ${asunto}`,
        html: `
            <h1>Hola,</h1>
            <p>${mensaje}</p>
            <p>Gracias por comunicarte con nosotros.</p>
            <p>Atentamente,<br>El equipo de Choco Pop</p>
        `
    };
    await enviarCorreo(mailOptions);
};

// Función para enviar correo con un QR adjunto
const enviarEmailConQR = async (email, nombre) => {
    const qrFilePath = path.join(__dirname, '../uploads/QR.jpg'); 
    const mailOptions = {
        from: '"Choco Pop" <no-reply@chocopop.com>',
        to: email,
        subject: 'Confirmación de compra con QR',
        html: `
            <h1>¡Gracias por tu compra, ${nombre}!</h1>
            <p>Por favor, encuentra el código QR adjunto a este correo. Escanéalo para obtener más información.</p>
            <p>¡Gracias por confiar en Choco Pop!</p>
            <img src="cid:qrImage" alt="Código QR" style="width: 200px; height: 200px;">
        `,
        attachments: [
            {
                filename: 'QR.jpg', 
                path: qrFilePath, 
                cid: 'qrImage' 
            }
        ]
    };
    await enviarCorreo(mailOptions);
};

// Función para enviar correo de notificación de pedido en camino
const enviarEmailPedidoEnCamino = async (email, nombre, productos, total) => {
    const mailOptions = {
        from: '"Choco Pop" <no-reply@chocopop.com>',
        to: email,
        subject: 'Tu pedido está en camino 🚚',
        html: `
            <h1>Hola, ${nombre}!</h1>
            <p>Nos complace informarte que tu pedido está en camino.</p>
            <h3>Detalles del pedido:</h3>
            <ul>
                ${productos
                    .map(prod => `<li>${prod.nombre} - ${prod.cantidad} unidades</li>`)
                    .join('')}
            </ul>
            <p><strong>Total:</strong> ${total} Bs</p>
            <p>¡Gracias por confiar en nosotros! 🧡</p>
        `
    };
    await enviarCorreo(mailOptions);
};

// Función para enviar correo de notificación de pedido entregado
const enviarEmailPedidoEntregado = async (email, nombre) => {
    const mailOptions = {
        from: '"Choco Pop" <no-reply@chocopop.com>',
        to: email,
        subject: '¡Tu pedido ha sido entregado! 🎉',
        html: `
            <h1>Hola, ${nombre}!</h1>
            <p>Nos complace informarte que tu pedido ha sido entregado con éxito.</p>
            <p>Esperamos que disfrutes tu compra. ¡Gracias por elegir Choco Pop!</p>
            <p>Si tienes alguna consulta, no dudes en contactarnos.</p>
        `
    };
    await enviarCorreo(mailOptions);
};


module.exports = {
    enviarEmailVerificacion,
    enviarEmailRecuperacion,
    enviarEmailRespuesta,
    enviarEmailConQR,
    enviarEmailPedidoEnCamino,
    enviarEmailPedidoEntregado,
};
