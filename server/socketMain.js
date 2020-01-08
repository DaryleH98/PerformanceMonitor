const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/perfData', {
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log("DB Connection Error:" `${err.message}`);
});
const Machine = require('./models/Machine')

function socketMain(io, socket){
//console.log("A socket connected!", socket.id)

socket.on('perfData', (data)=>{
    console.log(data)
    })
}

module.exports = socketMain