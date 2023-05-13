const express = require('express');
let indexRouter = express.Router();
const movies = require('../data/movies.js');
// console.log(movies);

indexRouter.get('/indexRoute',(req,res,next)=>{
    res.json({
        title:"Welcome Movies Folder",
    })
});

indexRouter.get('/most_popular',(req,res,next)=>{
    let page = req.query.page;
    if(page === undefined){
        page=1;
    }

    let result = movies.filter((movie)=>{
        return movie.most_popular == true;
    });
    // const indexToStart = (page-1)/20;
    // result = result.slice(indexToStart,indexToStart+2);

    // console.log("Result Length:", result.length);

    const pageSize = 20;
    const indexToStart = (page - 1) / pageSize;
    result = result.slice(indexToStart, indexToStart + 2);

    console.log("Result Length:", result.length);

    res.json({
        page:page,
        result:result,
    })
})

module.exports = indexRouter;

