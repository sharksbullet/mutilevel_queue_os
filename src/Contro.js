import React, { createContext,useState,useEffect } from 'react';
import Tablequeueu from './Tablequeue';
let Count=0;
let itime = 0  ;
let index =0;
// const Controller = createContext();
const Contro = () => {
    const [process, setProcess] = useState([]);
    const [clock,setClock]=useState(0);
    const [allprocess, setAllprocess] = useState(0);
    const [terminate, setTerminate] = useState([]);
    const [awg,setAwg]=useState(0);
    const random = (min,max)=>{
        return Math.floor(Math.random()*(max-min+1)+min);
    };
    
   function Awg() {
    let sum = 0,ct = 0;
    if (process.length !== 0) {
      for (let v = 0; v < process.length; v++) {
        if (process[v].status === "Terminate") {
          sum += process[v].wa_time
          ct++
        }
        setAwg(sum/ct) 
      }
    }
   }
    const addPro =()=>{
      Count++;
      let cpu = [...process];
      let ran = random(3,30);
      cpu.push({process:Count,
      status:'New',
      at_time:clock,
      bu_time:ran,
      ex_time:0,
      wa_time:0,
      state:0
      
      })
      setAllprocess(Count);
      setProcess(cpu);
    };
  
    const Reset =() =>{
        setProcess([]);
        setAllprocess(Count=0);
        setClock(0);
        setTerminate([]);
        
    };
   
    useEffect(() => {
        if (process.length !== 0) {
          if (index === process.length) {
              index =0
          }
          if (process[index].status !== "Terminate") {
            for (let i = 0; i < process.length; i++) {  

                if (process[i].status === "Running") {
                    process[i].ex_time++
                }
                else if (process[i].status === "Ready") {
                    process[i].wa_time++
                    
                }
                else if (process[i].status === "New") {
                  process[i].status = "Ready"
                }

            }

           
             if (process[index].state === 0) {
              if (itime <  process[index].ex_time ) { 
                process[index].status = "Running"
                 itime++
                         
              }
              else{
                itime=0
                process[index].state = 1
                process[index].status = "Ready"
                if (index < process.length - 1) {
                  index++
                }
                else{
                  index = 0
                }
              }
              
             }
            else if (process[index].state === 1) {
              process[index].status = "Running"
              if (process[index].ex_time === process[index].bu_time) {
                    process[index].status = "Terminate"
                    
              }
            }
          }
          else{
            index++
          }
         }
         Awg()
      }, [clock])
    useEffect(() => {
        setTimeout(()=>{
          setClock(clock+1)
        },1000)
    }, [clock]);

  return (
   <>
    <Tablequeueu
     clock={clock}
        process={process}
        addPro={addPro}
        Reset={Reset}
        allprocess={allprocess}
        terminate={terminate}
        awg={awg}
        
    />
   
   </>
  );
};

export  default Contro;