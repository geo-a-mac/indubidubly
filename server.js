const path = require('path');
const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers/');
const helpers = require('./utils/helpers')

const exphbs = require('express-handlebars');
const hbs = exphbs.create({helpers});

//const helpers = require('./utils/helpers');

const express = require('express');
const routes = require('./controllers');
const session = require('express-session');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

//handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

//handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(routes);



app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//app.get('/', (req, res) => {
// res.status(200).json({ message: "Indubidubly hello!" });
//})


// turn on routes
app.use(routes);

//connection to db and server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});