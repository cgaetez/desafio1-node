//Crear un servidor con Express en el puerto 3000.
const express = require('express');
const app = express();
const port = 3000
app.get('/', (req,res) => res.send(`Server running in port ${port}`));
app.listen(port,() => console.log(`Server running in port ${port}`));

//Definir la carpeta “assets” como carpeta pública del servidor. 
app.use("/assets", express.static("assets"));
app.get("/", (req, res) => {
res.sendFile(__dirname + '/index.html')
})
//Crear en el servidor un arreglo de nombres y devolverlo en formato JSON a través de la ruta /abracadabra/usuarios. 
let usuarios = [
    "Juan",
    "Jocelyn",
    "Astrid",
    "Maria",
    "Ignacia",
    "Javier",
    "Brian"
 ];

app.use('/abracadabra/usuarios', function (req, rest) {
    res.json(usuarios) 
})

 
/*Crear un middleware con la ruta /abracadabra/juego/:usuario para validar que el
usuario recibido como parámetro “usuario” existe en el arreglo de nombres creado en
el servidor.*/
app.use('/abracadabra/juego/:usuario', function (req, res, next) { 
    usuarios = usuarios.map(v => v.toLowerCase());
    usuarios.includes(req.params.usuario)
     ?   next()
     :   res.sendFile(__dirname + '/assets/img/who.jpeg');
})

app.get("/abracadabra/juego/:usuario", (req, res) => {
    console.log(req.params.usuario);
    res.sendFile(__dirname + '/index.html');
});

app.get('/abracadabra/conejo/:n', (req,res)  => {
    const rand = Math.floor(Math.random() * (4 - 1)) + 1;
    const n = req.params.n;
    console.log('rand: ' + rand);
    console.log('n: ' + n);
    rand == n
    ? res.sendFile(__dirname + '/assets/img/conejito.jpg')
    : res.sendFile(__dirname + '/assets/img/voldemort.jpg')
    });

app.get("*", (req, res) => {
    res.send('<h1>Upsi.... nada por acá</h2>');
  });