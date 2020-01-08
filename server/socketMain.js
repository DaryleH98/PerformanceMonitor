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
let macAddress
socket.on('clientAuth', (key)=>{
    if(key === '5t78yuhgirekjaht32i3'){
        //valid nodeClient
        socket.join('clients')
    }else if(key === 'uihjt3refvdsadf'){
        console.log("A react client has joined!")
        socket.join('ui')
    }
    else{
        socket.disconnect(true)
    }
})

socket.on('initPerfData',  async (data)=>{
     macAddress = data.macAddress
     //now go check mongo
     const mongooseResponse = await checkAndAdd(data)
     console.log(mongooseResponse)
})

socket.on('perfData', (data)=>{
    console.log("Tick...")
    io.to('ui').emit('data', data)
 })

}

function checkAndAdd(data){
    return new Promise((resolve, reject)=>{
        Machine.findOne(
            {macAddress: data.macAddress},
            (err, doc)=>{
                if(err){
                    throw err;
                    reject(err)
                }else if(doc === null){
                    //the record is not in the db so add it
                    let newMachine = new Machine(data)
                    newMachine.save()
                    resolve('added')
                }else{
                    //it is in the db just resolve
                    resolve('found')
                }
            }

        )
    })

}

module.exports = socketMain