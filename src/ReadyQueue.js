import React,{useContext} from 'react'

const ReadyQueue = (props) => {
  const {process,addPro,readyFcfs,readyRobin}=props;
  
  return (
    <div className="tebla-q ready">
        <h2 className="h2">Ready Queue</h2>
        <p className="text">Time Quantum = 10</p>
        <table className="table table-dark table-borderless">
  <thead>
    <tr>
      <th >Round Robin <br></br>Process</th>

    </tr>
   
  </thead>
  <tbody>
  {readyRobin?.map((it,index)=>{
    if(it?.state === 0){
      return (
            <tr key={index}>
            <td>{it?.process}</td>
          </tr>
          )
    }
    else{}
    
  })}
  </tbody>
</table>
<table className="table table-dark table-borderless">
  <thead>
    <tr>
      <th >FCFS <br></br> Process</th>
    </tr>
  </thead>
  <tbody>
  {readyFcfs?.map((it,index)=>{
    return(
      <tr key={index}>
      <td>{it?.process}</td>
    </tr>
    )
  })}
  </tbody>
</table>
  
    </div>
  )
}

export default ReadyQueue;
