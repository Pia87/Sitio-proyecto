var express = require('express');
var router = express.Router();
var nodemailer= require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/', async (req, res, next) => {
  console.log(req.body)
  var nombre = req.body.nombre;
  var email = req.body.email;
  var mensaje= req.body.mensaje;

  var obj = {
    to: '19pia87@gmail.com',
    subject: 'CONTACTO WEB',
    html: nombre + "se contactó a través de la web y quiere más información a este correo: " + email + ".<br> Además hizo el siguiente comentario:" + mensaje  
  }

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user:process.env.SMTP_USER,
      pass:process.env.SMTP_PASS,
    }
    

  });

  var info= await transporter.sendMail(obj);

  res.render('index', {
    message:'Mensaje enviado correctamente'
  });

});


module.exports = router;
