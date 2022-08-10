require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.emit('ready'))
    .catch(e => console.error(e));
const MongoStore = require('connect-mongo');

const session = require('express-session');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const csrf = require('csurf');
const { setGlobalVariables: setGlobalVariables, checkCsrfError: checkCsrfError, csrfTokenLocalVar: csrfTokenLocalVar } = require('./src/middlewares/globalMiddlewares');

//Activate when in production
//const helmet = require('helmet');
//app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'adjlksCajdla2132',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTION_URI }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, //seven days,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
app.use(setGlobalVariables);
app.use(checkCsrfError);
app.use(csrfTokenLocalVar);
app.use(routes);

const PORT = 3000;
app.on('ready', () => {
    app.listen(PORT, () => {
        console.log('Access through http://localhost:' + PORT.toString());
        console.log('Server running on port ' + PORT.toString());
    })
});

