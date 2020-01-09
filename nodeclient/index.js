
/*
To know about performance we need to know about 
CPU Load, Memory Usage, OS Type and CPU Info
*/
const os = require('os');
const io = require('socket.io-client')
let socket = io('http://127.0.0.1:8181')

socket.on("connect", ()=>{
  const networkInterface = os.networkInterfaces()
  console.log(networkInterface)
  let macAddress
  for(let key in networkInterface){
      if(!networkInterface[key][0].internal){
        macAddress = networkInterface[key][0].mac
        break
      }
  }
  socket.emit('clientAuth', '5t78yuhgirekjaht32i3')

  performanceData().then((allPerformanceData)=>{
      allPerformanceData.macAddress = macAddress
    socket.emit('initPerfData', allPerformanceData)
  })

  let perfDataInterval = setInterval(()=>{
    performanceData().then((allPerformanceData)=>{
       allPerformanceData.macAddress = macAddress
       socket.emit('perfData', allPerformanceData)
    })
  },1000)

  socket.on('discoonect', ()=>{
      clearInterval(perfDataInterval)
  })

})

function performanceData() {
    return new Promise(async(resolve, reject)=>{
        const cpus = os.cpus();
        const freeMem = os.freemem()
        const totalMem = os.totalmem()
        const usedMem = totalMem - freeMem
        const memUseage = Math.floor(usedMem/totalMem*100)/100
        const osType = os.type()
        const upTime = os.uptime()
        const cpuModel = cpus[0].model
        const numCores = cpus.length
        const cpuSpeed = cpus[0].speed
        const cpuLoad = await getCpuLoad()
        const isActive = true
        resolve({
            freeMem,totalMem,usedMem,memUseage,osType,upTime,cpuModel,numCores,cpuSpeed,cpuLoad,isActive
        })
    }) 
}
//Find the CPU average cores on a given system
function cpuAverage(){
    const cpus = os.cpus()
    //Get milliseconds of each mode
    let idleMs = 0
    let totalMs = 0 
    //loop through each core
    cpus.forEach( (aCore)=>{
        //loop through each property of the current object
        for(type in aCore.times){
            totalMs += aCore.times[type]
        }
        idleMs = aCore.times.idle;
    })
    return {
        idle: idleMs/ cpus.length,
        total: totalMs/cpus.length
    }
}
let x = cpuAverage()

function getCpuLoad(){
    return new Promise((resolve, reject)=>{
        const start = cpuAverage()
        setTimeout(()=>{
            const end = cpuAverage()
            const idleDifference = end.idle - start.idle
            const totalDifference = end.total - start.total
            //Calculate the percentage of used cpu
            const percentageCpu = 100 - Math.floor(100 * idleDifference/totalDifference)
            resolve(percentageCpu)
        }, 100)
    })

}

