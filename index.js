let express = require('express')
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let fs = require('fs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // middleware

// parse application/json
app.use(bodyParser.json()) // middleware

let searchRoutes = require('./routes/search');

app.use(express.static(path.join(__dirname,'public')));


app.get('/', (req,res) => {
    console.log(req.me); // this was added via our custom middleware
    res.sendFile(path.join(__dirname,'views','home.html'));
});
app.get('/data', (req,res) => {
    res.sendFile(path.join(__dirname,'data.json'));
});



app.use(searchRoutes);
app.listen(3000, () => console.log('Server is running on 3000'))
