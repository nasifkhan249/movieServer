const express = require('express');
let movieRouter = express.Router();
const movieDetails = require('../data/movieDetails');
// console.log(movieDetails);

const requiredJSON = (req,res,next)=>{
    if(!req.is("application/json")){
        res.json({
            msg: "content type must be application/json"
        });
    }else{
        next();
    }
};

movieRouter.get('/top_rated',(req,res,next)=>{
    let page = req.query.page;
    if(!page){
        page=1;
    }

    let result = movieDetails.sort((a,b)=>{
        return b.vote_average - a.vote_average;
    });

    const indexToStart = (page-1)/20;
    result = result.slice(indexToStart,indexToStart+2);

    res.json({
        page:page,
        result:result
    })

});

module.exports=movieRouter;