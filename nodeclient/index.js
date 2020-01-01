
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