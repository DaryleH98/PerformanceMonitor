const monoose = require('moongoose')
const Schema = mongoose.Schema
const Machine = new Schema({
  macAddress: String,
  cpuLoad: Number,
})

module.exports = mongoose.model('Machine', Machine)