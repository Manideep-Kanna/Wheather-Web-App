const express=require('express');
const app=express();

const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));

const https=require('https');

app.get('/',(req,res)=>{

    res.sendFile(__dirname+"/index.html");

})



app.post('/',function(req,res){


    const query=req.body.cityName;
    const appid="cdfbe59b0fc6acbd34ff328458b54a1b";
    const units="metric";

    const url=`https://api.openweathermap.org/data/2.5/weather?appid=${appid}&q=${query}&units=${units}`;
     
    https.get(url,(response)=>{

        response.on("data",(data)=>{

            const wheatherData=JSON.parse(data);

            res.write(`<h1> The Temperature of the ${query} is ${wheatherData.main.temp} </h1>`);
            res.write(`<h2>The Wheather is ${wheatherData.weather[0].description} </h2>`);

            res.write(`<img src='http://openweathermap.org/img/wn/${wheatherData.weather[0].icon}@2x.png'>`)
            
            res.send();

        })
    });

});

app.listen(3000,function(){
    console.log("The Server is listening to requests in 3000 port");
})