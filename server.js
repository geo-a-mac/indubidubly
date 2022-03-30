const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
//const helpers = require('./utils/helpers');

const express = require('express');
const routes = require('./controllers');
const session = require('express-session');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
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

app.get('/', (req, res) => {
  res.status(200).json({ message: "Indubidubly hello!" });
})

//connection to db and server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});