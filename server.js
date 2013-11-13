    var net = require('net');

    var sockets = [];
    var names = [];

    var s = net.Server(function(socket){
        sockets.push(socket);
        names.push("user" + (Math.floor(Math.random()*10+1)).toString());
        socket.on('data', function(d){
            for(var i = 0; i < sockets.length; i++){
        	   if(sockets[i] === socket){ 
        		  continue;
                }
                sockets[i].write(names[i] + ": " + d);
            }
        });

        socket.on('end', function(){
            var i = sockets.indexOf(socket);
            sockets.splice(i,2);
            names.splice(i,2);
        });

    });

    s.listen(8000);                      