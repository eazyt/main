require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId;
const Post = require('./models/Post')
const Message = require('./models/Message')
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


app.get('/', async (req, res) => {
  let posts = await Post.find({}).limit(3)
   console.log(posts)
  res.render('index', {
    posts: posts
  })
})

app.get('/portfolio', async (req, res) => {
    let posts = await Post.find({})
    res.render('portfolio', {
      posts: posts
    })
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/contact', (req, res) => {
  res.render('contact')
})

app.post('/contact', (req, res) => {

  let mesg = new Message({
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
      date: new Date()
  })

  mesg.save()
    .then((doc) => {
      console.log("Save " + JSON.stringify(doc));
      res.redirect('404')
      // res.send(doc)
    })
    .catch((err) => {
      console.log(`Error during record insertion: ` + err)
      res.status(400).render('404')
    })
})

app.get('/success', (req, res) => {
  res.render('success')
  // hi user thanks for getting in touch with i will respond soon
})

app.get('/post/:id', (req, res) => {
  Post.findOne({ "_id": ObjectId(req.params.id) }, function (err, posts) { 
    res.render('projectsx1', {
      posts:posts
    });
  })
})

app.use((req, res, next) => { 
  res.status(404).render('404');
  next()
})


app.listen(PORT, () => { 
  console.log(`App running on port ${PORT}`)
})
