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
socket.on('clientAuth', (key)=>{
    if(key === '5t78yuhgirekjaht32i3'){
        //valid nodeClient
        socket.join('clients')
    }else if(key == 'uihjt3refvdsadf'){
        socket.join('ui')
    }
    else{
        socket.disconnect(true)
    }
})

socket.on('initPerfData', (data)=>{
    console.log(data)
})

socket.on('perfData', (data)=>{
    console.log(data)
 })

}

module.exports = socketMain