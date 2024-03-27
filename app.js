const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.listen(3000,function(){
    console.log("Server started at port 3000");
});
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    const query=(req.body.cityName);
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=68ffaa9ad28648c8a0bb86b644293d75&units=metric"
    https.get(url,function(response){
    response.on("data",function(data){
       const weatherData= JSON.parse(data);
       const temp=weatherData.main.temp;
       const weathDescription=weatherData.weather[0].description;
       const icon=weatherData.weather[0].icon;
       const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png"
       res.write("<h1>The temperature of "+query+" is "+temp+" degrees celcius</h1>");
       res.write("<p>The weather is currently "+weathDescription+".</p>")
       res.write("<img src='"+imageURL+"'height='200' width='200'>");
       res.send();
    })
});
})

