const path = require('path')
const express = require('express');
const bodyParser = require('body-parser')
const expressHbs = require('express-handlebars')

const app = express()

//hbs
app.engine(
    "hbs",
    expressHbs.engine({
      defaultLayout: "main-layout.hbs",
      layoutsDir: "views/layouts/",
      extname: 'hbs'
    })
  );

//pug setup
app.set('view engine', 'hbs')
app.set('views', 'views')


const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes)
app.use(shopRoutes)

app.use('/', (req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page not found' })
});

app.listen(3000)