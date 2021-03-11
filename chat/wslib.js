const WebSocket = require("ws");
const fs = require('fs')
const { Sequelize, DataTypes, Model } = require('sequelize');


const clients = [];
const messages = [];
const peep=[];


const sequelize = require('./config/database');
 const Message = require('./models/Message');


 try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


 Message.findAll().then(msgs => 
  {
    console.log(msgs);
  })

function meter(messagee, clientt, tss)
  {
    Message.sync();
  const data =
  {
    message: messagee,
    client: clientt,
    ts: tss
  }
  
  let{message, client, ts} = data;
  
  Message.create({
    message,
    client,
    ts
  })
  .then()
  .catch(err =>console.log(err));
  
  Message.findAll().then(msgs => 
    {
      console.log(msgs);
    })
  
  }

  meter('hola', 'juan', 4)

/* class Messages extends Model {
  static classLevelMethod() {
    return 'foo';
  }
  instanceLevelMethod() {
    return 'bar';
  }
  getFullname() {
    return [this.message, this.client].join(' ');
  }
} */

const wsConnection = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    clients.push(ws);
    sendMessages();

    ws.on("message", (message) => {
      messages.push(message);

      meter(message, 'Raula', 5);
    
      const hi = JSON.stringify(messages);
      const hii = JSON.stringify(peep);
      var a = '';

   
     peep.push(meterselo('javier',message,6));
    
      function meterselo(namee, messagee, tss)
      {
         var get = {name: namee , message: messagee, ts: tss};
         return get;
      }
      
     
      fs.writeFile('storage.json', hii, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });


      sendMessages();
    });
  });

  const sendMessages = () => {
    clients.forEach((client) => client.send(JSON.stringify(messages)));
  };
};






exports.wsConnection = wsConnection;

