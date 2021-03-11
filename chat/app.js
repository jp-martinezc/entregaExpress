var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
const joi = require('joi');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const Message = require('./models/Message');



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


app.get('/chat/api/messages', (req, res) =>
 {

    
      
       Message.findAll().then(msgs => 
        {
         res.send(msgs);
        })
  })

  app.get('/chat/api/messages/:msgId', (req, res) => {
    var ser = req.params['msgId']

    Message.findOne({ where: {ts: ser} }).then((response)=>{
        if(response == null)
        {
            return res
        .status(404)
        .send("no se encontro");
        }



        res.send(response);
    });
 });

 app.post('/chat/api/messages' , (req, res, next) =>
{

    const error = validateMensaje(req.body)
    if (error) 
    {


        return res.status(400).send(error);
      }
    const ws = new WebSocket("ws://localhost:3000")
    ws.on('open', ()=>
    {


        ws.send(JSON.stringify(req.body));
    })
    res.send("se pudo crear el mensaje correctamente")
    
})

app.put('/chat/api/messages/' , (req, res) =>
{


    
    let nuevas = req.body;
    var ser = nuevas['ts']
    const error = validateMensaje(req.body)
    if (error) {
        return res.status(400).send(error);
      }
    Mensaje.update(req.body, {where:{ts: ser}}).then((response)=>
    {
        if (response[0] !== 0) res.send({ message: "si se pudo " 
    });
        else res.status(404).send({ message: "no se pudo encontrar ese mensaje"
     });
    });
    
})

app.delete('/chat/api/messages/:msgId' , (req, res) =>
{
    var ser = req.params['msgId']
    Mensaje.destroy(
        {
        where: 
        {
          ts: ser,
        },
      }).then((response) => 
      {
        if (response === 1) res.status(204).send();
        else res.status(404).send({ message: "Client was not found" });
      });
})


  


 

