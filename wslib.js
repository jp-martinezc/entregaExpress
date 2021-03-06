const WebSocket = require("ws");
const fs = require('fs')


const clients = [];
const messages = [];
const peep=[];

const wsConnection = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    clients.push(ws);
    sendMessages();

    ws.on("message", (message) => {
      messages.push(message);

   

      
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

