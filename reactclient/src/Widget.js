
import React, {Component} from 'react';
import Cpu from './Cpu'
import Mem from './Mem'
import Info from './Info'
import './widget.css'

class Widget extends Component{
    constructor(){
        super();
        this.state = {};
    }

    render(){
        const freeMem = this.props.data
        const totalMem = this.props.data
        const usedMem = this.props.data
        const memUseage = this.props.data
        const osType = this.props.data
        const upTime = this.props.data
        const cpuModel = this.props.data
        const numCores = this.props.data
        const cpuSpeed = this.props.data
        const cpuLoad = this.props.data
        const macAddress = this.props.data
        const cpu = cpuLoad
        const mem = [totalMem, usedMem, memUseage, freeMem]
        const info = [macAddress, osType, upTime, cpuModel, numCores, cpuSpeed]
        return(
            <div>
                <p>{this.props.data.cpuLoad}</p>
                <Cpu cpuData = {cpu}/>
                <Mem memData = {mem}/>
                <Info infoData = {info}/>
            </div>
            
        )
    }
}
export default Widget