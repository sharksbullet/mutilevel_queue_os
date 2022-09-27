import React,{useContext} from 'react'
import { Contro } from './Contro'
const ReadyQueue = (props) => {
  const {readyRobin}=props;
  
  return (
    <div className="tebla-q ready">
        <h2 className="h2">Ready Queue</h2>
        <p className="text"> Quantum Time = 5</p>
        <table className="table table-dark table-borderless">
  <thead>
    <tr>
      <th >Round Robin <br></br>Process</th>
      <th >Execution Time </th>
      <th >Burst Time </th>
      <th >Arival Time</th>
    </tr>
   
  </thead>
  <tbody>
  {readyRobin?.map((it,index)=>{
    return (
      <tr key={index}>
      <td>{it?.process}</td>
      <td>{it?.ex_time}</td>
      <td>{it?.bu_time}</td>
      <td>{it?.at_time}</td>  
     </tr>
    )
  })}
  </tbody>
</table>
<table className="table table-dark table-borderless">
  <thead>
    <tr>
      <th >FCFS <br></br> Process</th>
      <th >Burst time </th>
      <th >Waiting time </th>
      <th >Turn around time</th>
    </tr>
  </thead>
  <tbody>
  <tr>
      <td></td>
       
  </tr>
  </tbody>
</table>
    </div>
  )
}

export default ReadyQueue;
