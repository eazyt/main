require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const getProject = require('./controllers/getProjects')
const cors = require('cors')


const sendgrid = require('@sendgrid/mail');
const { send } = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENDGRIDKEY)

PORT = process.env.PORT || 3000
MONGO_URL = process.env.DB_URI

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => { 
    console.log(`MongoDb successfully connected`)
  })
  .catch((e) => { 
  console.log(`Could not connect to MongoDB`, e)
  })

  app.use(bodyParser.urlencoded({
    extended: false
  }))
  app.use(bodyParser.json())
  app.use("/public", express.static(__dirname + '/public'));
  app.set('views', `${__dirname}/views`);
  app.set('view engine', 'ejs');
  app.use(cors())

app.get('/', getProject.getHomePage)
app.get('/portfolio', getProject.getPortfolioPage)
app.get('/about', getProject.getAboutPage)
app.get('/contact', getProject.getContactPage)
app.post('/contact', getProject.postContactPage)
app.get('/success', getProject.successPage)
app.get('/post/:id', getProject.getPostById)


app.use((req, res, next) => { 
  res.status(404).render('404');
  next()
})


app.listen(PORT, () => { 
  console.log(`App running on port ${PORT}`)
})
