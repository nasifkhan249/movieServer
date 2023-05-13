const express = require('express');

const helmet = require('helmet');

const app = express();

require('dotenv').config();

const indexRoute = require('./routes/index');

const movieRoute = require('./routes/movie');


const port = process.env.PORT || 8000;
// const port = 8000;
// console.log(port);
app.use(express.static('public'));

app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.use(helmet());


app.use((req,res,next)=>{
    if(req.query.api_key != "12345"){ 
        res.status(404);
        res.json({
            msg:"Invalid api key",
        });
    }else{
        next();
    }
});

app.use('/',indexRoute);
app.use('/movie',movieRoute);


app.listen(port,()=>{
    console.log(`Server run successfully at ${port}`);
})