import React, { createContext,useState,useEffect } from 'react';

let Count=0;
let tQuantum =5;
const Controller = createContext();
const Contro = (props) => {
    const [process, setProcess] = useState([]);
    const [clock,setClock]=useState(0);
    const [readyrobin, setReadyRobin] = useState([]);
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
    const Statu = (va)=>{
        if (va === 'New') {
            console.log("New");
        }else if (va === 'Running') {
            console.log("Running");
        }else if (va === 'Terminate') {
            console.log("Terminate");
        }

    }
    useEffect(() => {
        if ( process.length !== 0) {
            for (let i = 0; i < tQuantum; i++) {
                if ( i===0 && process.ex_time < process.bu_time) {
                    process.status = "Run";
                    process.ex_time++;
                }
            for (let i = 0; i < process.length; i++) {
                if (i=== 0 && 
                    process[0].ex_time == tQuantum &&
                    process[0].status=== "Run") {
                    let robin = [...readyrobin];
                    process[0].status = "Ready";
                    
                }
                
             }
            }
        }
        else{
            setProcess(readyrobin);
            setReadyRobin([]);

        }
      return () => {
        
      };
    }, [clock])

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
        Statu,
        addPro,
        Reset,
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