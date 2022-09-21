import React,{useContext} from 'react'
import { Contro } from './Contro'

const Tablequeueu = () => {
  const addPro = useContext(Contro);
  const process = useContext(Contro);
  const clock = useContext(Contro);
  const allprocess = useContext(Contro);
  const status = useContext(Contro);
  return (
    <div className="table-q">
    <h2 className="h2">Mutilevel Queue</h2>
    <button type="button" class="btn btn-primary" onClick={()=>addPro("cpu")}>Add process & Start</button>
    <table className="table table-dark table-borderless">
  <thead>
    <tr>
      <th >ID</th>
      <th >Status</th>
      <th >Arrival Time</th>
      <th >Execue Time</th>
      <th >Waitting Time</th>
      <th >Terminate</th>
    </tr>
  </thead>
  <tbody>
  {process && process.map((it,index)=>{
      return(
        <tr key={index}>
        <td>{it.process}</td>
        <td >{it.st}</td>
        <td>{it.at_time}</td>
        <td>{it.bu_time}</td>
        <td>{it.ex_time}</td>
        <td>{it.wa_time}</td>
        
        </tr>
      )
    })}
   <tr>
   
    
   </tr>
  </tbody>
</table>
<p className="text">CPU Clock :{clock}</p>
<p className="text one">CPU Process :{allprocess}</p>
<p className="text two">AVG Waitting Time :</p>
<button type="button" class="btn btn-danger">Restart</button>


    </div>
  )
}

export default Tablequeueu;
