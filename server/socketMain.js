const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/perfData', {useNewUrlParser: true})
const Machine = require('./models/Machine')

function socketMain(io, socket){
//console.log("A socket connected!", socket.id)

socket.on('perfData', (data)=>{
    console.log(data)
    })
}

module.exports = socketMain