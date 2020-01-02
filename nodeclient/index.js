
/*
To know about performance we need to know about 
CPU Load, Memory Usage, OS Type and CPU Info
*/
const os = require('os')
const cpus = os.cpus()
const freeMem = os.freemem()
console.log(freeMem)
const totalMem = os.totalmem()
console.log(totalMem)
const usedMem = totalMem - freeMem
console.log(usedMem)
const memUseage = Math.floor(usedMem/totalMem*100)/100
console.log(memUseage)
const osType = os.type()
console.log(osType)
const upTime = os.uptime()
console.log(upTime)
const cpuModel = cpus[0].model
console.log(cpuModel)
const numCores = cpus.length
console.log(numCores)
const cpuSpeed = cpus[0].speed
console.log(cpuSpeed)
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
    const start = cpuAverage()
    setTimeout(()=>{
        const end = cpuAverage()
        const idleDifference = end.idle - start.idle
        const totalDifference = end.total - start.total
        //Calculate the percentage of used cpu
        const percentageCpu = 100 - Math.floor(100 * idleDifference/totalDifference)
        console.log(percentageCpu)
    }, 100)
}

setInterval(()=>{
    getCpuLoad()
}, 1000)