var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
const joi = require('joi');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

const reglas = joi.object({
    Message : joi.string().min(1).required(),
    ts : joi.number().required()
})


app.get('/chat/api/messages', (req, res) => {

    fs.readFile("storage.json", 'utf8', function(err, data)
    {
        res.send(data);
        if(err!=null)
        {
            res.send(err.message);
        }
    })
  })

  app.get('/chat/api/messages/:msg', (req, res) => {
    var aiuda = req.params['msg']
    fs.readFile("storage.json", 'utf8', function(err, data)
    {

        var selectedObject = [];

        selectedObject= JSON.parse(data);
        
        if (selectedObject == undefined) {
             res.status(400).send("no existe este mensaje")
        } else {
            var dataa = selectedObject.filter(element => element.message == aiuda)
            res.send(dataa)
        } 
    })
  })

  app.post('/chat/api/messages' , (req, res) =>
{
    let data = fs.readFileSync("storage.json");
    let nuevosDatos = req.body;

    pregunta = reglas.validate(nuevosDatos)
    if(!pergunta['error'])
    {
        const ws = new WebSocket("ws://localhost:3000")
        ws.on('open', () =>
        {
              ws.send(JSON.stringify(nuevosDatos))
            })
        res.status(201).send("creado exitosamente") 
    }
    else
    {
        res.status(400).send("Error con los datos")
    }
})

app.put('/chat/api/messages/' , (req, res) =>
{
    let newData = req.body;
    var buscado = newData['ts']
    pregunta = reglas.validate(newData)
    if(!pregunta['error'])
    {
        fs.readFile("storage.json", 'utf8', function(err, data)
        {
    
            var selectedObject = [];
    
            selectedObject= JSON.parse(data);
            
            if (selectedObject == undefined) {
                 res.status(400).send("no existe este mensaje")
            } else {
                var dataa = selectedObject.filter(element => element.ts == buscado)
                data.delete(dataa);
            } 
        })
        let data = fs.readFileSync("storage.json");
        let nuevosDatos = req.body;
    
        pregunta = reglas.validate(nuevosDatos)
        if(!pergunta['error'])
        {
            const ws = new WebSocket("ws://localhost:3000")
            ws.on('open', () =>
            {
                  ws.send(JSON.stringify(nuevosDatos))
                })
            res.status(201).send("creado exitosamente") 
        }
        else
        {
            res.status(400).send("Error con los datos")
        }
    } 
    else
    {
        res.status(400).send("Error con los datos")
    }
    
})

app.delete('/chat/api/messages/:msgId' , (req, res) =>
{
    var buscado = req.params['msgId']
    fs.readFile("storage.json", 'utf8', function(err, data)
    {

        var selectedObject = [];

        selectedObject= JSON.parse(data);
        
        if (selectedObject == undefined) {
             res.status(400).send("no existe este mensaje")
        } else {
            var dataa = selectedObject.filter(element => element.message == aiuda)
            data.delete(dataa);
        } 
    })
})


  


 

