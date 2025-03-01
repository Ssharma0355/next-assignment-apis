const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  appname: { type: String, required: true },
  appdescription: { type: String, required: true },
  knowledgename: { type: String, required: true },
  knowledgedescription: { type: String, required: true },
  pattern: { type: String, required: true },
  embeddings: { type: String, required: true },
  metrics: { type: String, required: true },
  chuncking: { type: String, required: true },
  vectorDb: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
