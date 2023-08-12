

const express =require('express');
const app = express();
const https= require('https');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));


//https.get

app.get('/', function(req,res){
    //res.send("WORKING");
    res.sendFile(__dirname + "/index.html");
   
})

app.post('/', function(req,res){
   
    const cityQuery = req.body.cityReq;
    const link = 'https://api.openweathermap.org/data/2.5/weather?q='+cityQuery+'&appid=33d8cb0bc4818cbe57d6388e610fd615&units=metric';
  
    https.get(link, function(response){
        
        response.on("data", function(data){
            //console.log(JSON.parse(data));
            
            const temp= JSON.parse(data).main.temp;
            const desc= JSON.parse(data).weather[0].description;
            res.write("<h1>The temparature in " +cityQuery+ " is "+ temp +" °C</h1>")
            res.write("<h3>It seems "+ desc +" in "+cityQuery+" today </h3>")
            

            res.send();
            
            //console.log(temp);
            //const desc= JSON.parse(data).weather[0].description;
            //console.log(desc);
        })
        

    })

})

app.listen(3000, function(){
    console.log('Listening on 3000');
})



