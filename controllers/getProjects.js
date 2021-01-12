const Post = require('../models/Post');
const Message = require('../models/Message')
const ObjectId = require('mongodb').ObjectId;

// module.exports = async (request, response) => {
  // const post = await Post.findById(request.params.id).populate('author')
  // response.render('post', {
    //   post: post
    // })
  // const post = await Post.findById({})
  // console.log(post)
// }

exports.getHomePage = async (req, res) => {
      let posts = await Post.find({}).limit(3)
      console.log(posts)
      res.render('index', {
        posts: posts
      })
};

exports.getPortfolioPage = async (req, res) => {
  let posts = await Post.find({})
  console.log(posts + "THIS IS POSTS")
  res.render('portfolio', {
    posts: posts
  })
}

exports.getAboutPage = (req, res) => {
  res.render('about')
}

exports.getContactPage = (req, res) => {
  res.render('contact')
}

exports.postContactPage =  (req, res) => {

  let mesg = new Message({
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
    date: new Date()
  })

  mesg.save()
    .then((doc) => {
      sendgrid.send({
        to: 'ramohlalen@gmail.com',
        from: 'eazyt.sa@gmail.com',
        subject: 'prime-chat notification',
        text: 'You got mail from you resume website',
        html: `${req.body.name} of ${req.body.email} email address, sent you mail from your resume website: ${req.body.message}`

      })
      console.log("Save " + JSON.stringify(doc));
      res.redirect('success')
      // res.send(doc)
    })
    .catch((err) => {
      console.log(`Error during record insertion: ` + err)
      res.status(400).render('404')
    })
}

exports.successPage = (req, res) => {
  res.render('success', {
    name: req.body.name
  })
  // hi user thanks for getting in touch with i will respond soon
}

exports.getPostById = (req, res) => {
  Post.findOne({"_id": ObjectId(req.params.id)}, function (err, posts) {
    res.render('projectsx1', {
      posts: posts
    });
  })
}