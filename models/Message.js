const mongoose = require('mongoose')


Schema = mongoose.Schema;
const MessageSchema = new Schema({
  message: String,
  subject: String,
  name: String,
  email: String,
  date: Date
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;