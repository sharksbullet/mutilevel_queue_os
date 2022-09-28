import React, { createContext,useState,useEffect } from 'react';
import ReadyQueue from './ReadyQueue';
import Tablequeueu from './Tablequeue';
let Count=0;
let tQuantum =5;
const Controller = createContext();

const Contro = () => {
    const [process, setProcess] = useState([]);
    const [clock,setClock]=useState(0);
    const [readyRobin, setReadyRobin] = useState([]);
    const [readyFcfs, setReadyFcfs] = useState([]);
    const [avgTime, setAvgTime] = useState(0);
    const [allprocess, setAllprocess] = useState(0);
    const [terminate, setTerminate] = useState([]);
    
    const random = (min,max)=>{
        return Math.floor(Math.random()*(max-min+1)+min);
    };
   
   
    const addPro =()=>{
        Count++;
        let cpu = [...process];
        let ran = random(3,20);
        cpu.push({process:Count,
            status:'New',
            at_time:clock,
            bu_time:ran,
            ex_time:0,
            wa_time:0
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
          for (let i = 0; i < tQuantum; i++) {
            if (i === 0 && process[0].ex_time < process[0].bu_time) {
              process[0].status = "Running"
              process[0].ex_time++
            }
          }
          
          for (let i = 0; i < process.length; i++) {
            if (i === 0 && process[0].ex_time === tQuantum && process[0].status === "Running") {
              let ready_q = [...readyRobin]
              process[0].status = "Ready"
              ready_q.push(process[0])
                setReadyRobin(ready_q)
                process.splice(0,1)
            }
            else if (i !== 0) {
              process[i].status = "Ready"
              process[i].wa_time++
            }
            else if (process.ex_time === process.bu_time) {
              let ter_q = [...terminate]
              process[0].status = "Terminate"
                 ter_q.push(process[0])
                setTerminate(ter_q)
               
            }
            
          }
        }
        else {
          setProcess(readyRobin)
          setReadyRobin([])
          
        }
    
      }, [clock])
      useEffect(() => {
        if (process.length !==0 ) {
          for (let i = 0; i < process.length; i++) {
            if (i===0 && process[i].bu_time+process[i].wa_time && process[0].status === "Runing") {
             let tat = [...readyFcfs]
             process[0].status ="Ready"
             tat.push(process[0])
             setReadyFcfs(tat)
             
            }
          
         }
        }
        else{
          setProcess(readyFcfs)
          setReadyFcfs([])
        }
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
        readyRobin={readyRobin}
        avgTime={avgTime}
        
    />
   <ReadyQueue
   clock={clock}
    process={process}
    terminate={terminate}
    readyRobin={readyRobin}
    readyFcfs={readyFcfs}
   />
   </>
  );
};

export  default Contro;