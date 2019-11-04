let express = require('express')
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let fs = require('fs');
let expressHbs = require('express-handlebars');

app.engine(
    'hbs',
    expressHbs({
      layoutsDir: 'views',
      defaultLayout: '',
      extname: 'hbs'
    })
  );
  app.set('view engine', 'hbs');
  app.set('views', 'views');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // middleware

// parse application/json
app.use(bodyParser.json()) // middleware

let searchRoutes = require('./routes/searchRouter');
let loginRoutes = require('./routes/loginRouter');

app.use(express.static(path.join(__dirname,'public')));


app.get('/', (req,res) => {
    res.render('home');
});

app.get('/data', (req,res) => {
    res.sendFile(path.join(__dirname,'data.json'));
});

app.use('/search',searchRoutes);
app.use('/login',loginRoutes);


app.listen(process.env.PORT || 3000, () => console.log('Server is running on 3000'))
