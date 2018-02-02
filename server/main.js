const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const session = require('express-session');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const morgan = require('morgan'); // HTTP REQUEST LOGGER
const bodyParser = require('body-parser'); // PARSE HTML BODY

const api = require('./routes');


const app = express();
const port = 3000;
const devPort = 4000;

app.use(morgan('dev'));
app.use(bodyParser.json());

/* mongodb connection */
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
    console.log('Connected to mongodb server');
});
// mongoose.connection('mongodb://username:password@host:port/database=');
mongoose.connect('mongodb://localhost/calorie');

/* use session */
app.use(session({
    secret: 'Calorie1$1$234',
    resave: false,
    saveUninitialized: true
}));

app.use('/', express.static(path.join(__dirname, './../public')));

/* setup routers & static directory */
app.use('/api', api);

app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
});

/* handle error */
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, function() {
    console.log('Express is listening on port', port);
});

if (process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    const config = require('./../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, function() {
            console.log('webpack-dev-server is listening on port', devPort);
        }
    );
}
