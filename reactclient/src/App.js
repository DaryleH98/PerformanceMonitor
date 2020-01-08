import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import socket from './utilities/socketConnection'
import Widget from './Widget'

class App extends Component {
    constructor(){
      super()
      this.state = {
      performanceData: {}
      }
    }

    componentDidMount(){
      socket.on('data', (data)=>{
        //Lets update state
        // re-render App ---> Widget --> CPU/Mem/Info
        console.log(data)
        const currState =  ({...this.state.performanceData})
        currState[data.macAddress] = data
        this.setState({
          performanceData: currState
        })
      })
    }
  
   
    render() {
      console.log(this.state.performanceData);
      let widgets = []
      const data = this.state.performanceData
      //grab each machine from data by property
      Object.entries(data).forEach(([key, value])=>{
        widgets.push(<Widget key={key} data={value}/>)
      })
      return (
        <div className="App">
          <Widget/>
        </div>
      );
    }
  }

export default App;
