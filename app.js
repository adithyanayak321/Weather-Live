const express = require('express');
const app = express();
const port = 3000;
const https = require('https');
var bodyParser = require('body-parser');
//https://api.openweathermap.org/data/2.5/weather?q=bangalore&appid=a7f6669aedf4e343941e81c998d015d0&units=metric
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");


})
app.post("/",function(req,res){
  
   const cityName=req.body.cityName;
     const query=cityName;
  const apiKey='a7f6669aedf4e343941e81c998d015d0';
  const untis='metric';
   const url='https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+apiKey+'&units='+untis;
   https.get(url,function(response){
   console.log(response.statusCode);
   response.on("data",function(data){
const weatherData=JSON.parse(data);
const temp=weatherData.main.temp;
const weatherDescription=weatherData.weather[0].description;
const iconNo=weatherData.weather[0].icon;
const iconUrl="<img src=http://openweathermap.org/img/wn/"+iconNo+"@2x.png>";
res.write("<h1>The weather des is "+weatherDescription+"</h1>");
res.write("<h1>The temperature in "+ query+" is "+temp+"degree celcius</h1>");
res.write(iconUrl);
res.send();
   })
   })

})


app.listen(3000, function(){
   console.log("hello");
})