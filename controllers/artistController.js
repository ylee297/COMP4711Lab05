let mod = require('../models/artists');


exports.search = (req,res,next) =>{
    res.render('search');
}
exports.add = (req,res,next) =>{
    mod.add(res.req.body);
    res.json("Darren's help!");
}
exports.delete = (req,res,next) =>{
    mod.del(res.req.body.index);
    res.json("Darren's help!");
}
exports.sortedSearch = (req,res,next) =>{
    let json = { "indexes" : mod.getIndexes(res.req.body.query)};
    res.json(json);
}

