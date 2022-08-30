import React from 'react'

const Tablequeueu = () => {
  
  return (
    <div className="table-q">
    <h2 className="h2">Mutilevel Queue</h2>
    <button type="button" class="btn btn-primary">Add process</button>
    <table className="table table-dark table-borderless">
  <thead>
    <tr>
      <th >ID	</th>
      <th >Status</th>
      <th >Arrival Time</th>
      <th >Execue Time	</th>
      <th >Waitting Time	</th>
      <th >Terminate</th>
    </tr>
  </thead>
  <tbody>
   
  </tbody>
</table>
<p className="text">CPU Clock :</p>
<p className="text one">CPU Process :</p>
<p className="text two">AVG Waitting Time :</p>
<button type="button" class="btn btn-danger">Restart</button>
<button type="button" class="btn btn-success">Start</button>

    </div>
  )
}

export default Tablequeueu;