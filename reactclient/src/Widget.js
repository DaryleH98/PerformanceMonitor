
import React, {Component} from 'react';
import Cpu from './Cpu'
import Mem from './Mem'
import Info from './Info'

class Widget extends Component{
    constructor(){
        super()
        this.state = {}
    }

    render(){
        const { freeMem,totalMem,usedMem,memUseage,osType,upTime,cpuModel,numCores,cpuSpeed,cpuLoad, macAddress} = this.props.data
        const cpu = {cpuLoad}
        const mem = {totalMem, usedMem, memUseage}
        const info = {macAddress, osType, upTime, cpuModel, numCores, cpuSpeed}
        return(
            <div>
                <Cpu cpuData = {cpu}/>
                <Mem memData = {mem}/>
                <Info infoData = {info}/>
            </div>
            
        )
    }
}
export default Widget