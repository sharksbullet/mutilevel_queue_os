import React, { createContext,useState,useEffect } from 'react';
let Count=0;
let tQuantum =5;
const Controller = createContext();

const Contro = (props) => {
    const [process, setProcess] = useState([]);
    const [clock,setClock]=useState(0);
    const [readyRobin, setReadyRobin] = useState([]);
    const [readyFcfs, setReadyFcfs] = useState([]);
    const [allprocess, setAllprocess] = useState(0);
    const [terminate, setTerminate] = useState([]);
    const random = (min,max)=>{
        return Math.floor(Math.random()*(min-max+1)+min);
    };
    
    const addPro =()=>{
        Count++;
        let cpu = [...process];
        let ran = random(1,20);
        cpu.push({process:Count,
            status:'New',
            at_time:clock,
            bu_time:ran,
            ex_time:0,
            wa_time:0})
        setAllprocess(Count);
        setProcess(cpu);
    };
    const Reset =() =>{
        setProcess([]);
        setAllprocess(Count=0);
        setClock(0);
        setTerminate([]);
        
    };
    const Statu = (value) => {
        if (value === 'New') {
          console.log('New');
        } else if (value === 'Running') {
          console.log('Running');
        } else if (value === 'Terminate') {
          console.log('Terminate');
        } else if (value === 'Ready') {
          console.log('Ready');
        }
      }
    useEffect(() => {
        if (process.length !== 0) {
          for (let i = 0; i < tQuantum; i++) {
            if (i === 0 && process[0].execu_time < process[0].burst_time) {
              process[0].status = "Running"
              process[0].execu_time++
            }
          }
          for (let i = 0; i < process.length; i++) {
            if (i === 0 && process[0].execu_time === tQuantum && process[0].status === "Running") {
              let ready_q = [...readyRobin]
              process[0].status = "Ready"
              setTimeout(() => {
                ready_q.push(process[0])
                setReadyRobin(ready_q)
                process.splice(0, 1)
              }, 500);
    
            }
            else if (i !== 0) {
              process[i].status = "Ready"
              process[i].wait_time++
            }
    
            else if (process[0].execu_time === process[0].burst_time) {
              let ter_q = [...terminate]
              process[0].status = "Terminate"
              ter_q.push(process[0])
              setTimeout(() => {
                setTerminate(ter_q)
                setAllprocess(process.length - 1)
                process.splice(0, 1)
              }, 500);
            }
          }
        }
        else {
          setProcess(readyRobin)
          setReadyRobin([])
        }
    
      }, [])

    useEffect(() => {
        const id = setInterval(() => {
            setClock(clock + 1);
        }, 1000);
      return () => clearInterval(id) 
    }, []);

  return (
    <Controller.Provider
    value={{
        process,
        clock,
        allprocess,
        terminate,
        readyRobin,
        Statu,
        addPro,
        Reset,
        setReadyRobin,
        setTerminate,
        setAllprocess,
        setClock,
        setProcess,
    }}
    >
        {props.children}
    </Controller.Provider>
  );
};

export  {Controller,Contro};