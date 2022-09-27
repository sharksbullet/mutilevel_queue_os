import React,{useContext,useState} from 'react'


const Tablequeueu = (props) => {
  const {avgtime,clock,process,addPro,Reset,allprocess,Statu,terminate}=props;

  return (
    <div className="table-q">
    <h2 className="h2">Mutilevel Queue</h2>
    <button type="button" className="btn btn-primary" onClick={addPro}>Add process & Start</button>
    <table className="table table-dark table-borderless">
  <thead>
    <tr>
      <th >ID</th>
      <th >Status</th>
      <th >Arrival Time</th>
      <th>Burst Time</th>
      <th >Execue Time</th>
      <th >Waitting Time</th>
      <th >Terminate</th>
    </tr>
  </thead>
  <tbody>
  {process?.map((it,index)=>{
      return(
        <tr key={index}>
        <td>{it?.process}</td>
        <td >{it?.status}</td>
        <td>{it?.at_time}</td>
        <td>{it?.bu_time}</td>
        <td>{it?.ex_time}</td>
        <td>{it?.wa_time}</td>
        <td>{it?.ter_q}</td>
        
        </tr>
      )
    })}
   <tr>
   
    
   </tr>
  </tbody>
</table>
<p className="text">CPU Clock : {clock}</p>
<p className="text one">CPU Process :{allprocess}</p>
<p className="text two">AVG Waitting Time : {avgtime}</p>
<button type="button" className="btn btn-danger" onClick={Reset}>Restart</button>


    </div>
  )
}

export default Tablequeueu;
