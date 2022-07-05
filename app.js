const express = require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
 const query=req.body.cityName;
 const apiKey="a889f17eaf0ba5d29e9050f666849b9e";
 const unit="metric";
 const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
   https.get(url,function(response){
   console.log(response.statusCode);
   response.on("data",function(data){
   //  console.log(data);
   const weatherData=JSON.parse(data);
   const temp=weatherData.main.temp;
   const weatherDescription=weatherData.weather[0].description;
   const icon=weatherData.weather[0].icon;
   const imgURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
   console.log(weatherDescription);
   console.log(temp);
   res.write("<p>The weather is currently "+weatherDescription+"</p>")
   res.write("<h1>The temperature in "+query +" is "+temp+" degree Celsius</h1>");
   res.write("<img src="+imgURL+">");
   res.send();
   // const object={
   //   name: "dinesh",
   //   favourite_food:"chicken",
   // }
   // console.log(JSON.stringify(object));
   });
 });
 // res.send("Server is up and running");



});








app.listen(3000,function(){
  console.log("Server is running on port 3000");
});
