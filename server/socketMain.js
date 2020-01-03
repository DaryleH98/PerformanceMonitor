function socketMain(io, socket){
//console.log("A socket connected!", socket.id)
socket.on('perfData', (data)=>{
    console.log(data)
    })
}

module.exports = socketMain