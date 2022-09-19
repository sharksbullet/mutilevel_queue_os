import React, { createContext,useState } from 'react';

let count=0;

const Controller = createContext();
const Contro = (props) => {
    const [process, setProcess] = useState([]);
    const [clock,setClock]=useState(0);
    const [allprocess, setAllprocess] = useState(0);
    const [terminate, setTerminate] = useState([])
    const random = (min,max)=>{
        return Math.floor(Math.random()*(min-max+1)+min);
    }
    const addPro =()=>{
        count++;
        let cpu = [...process];
        let ran = random(1,20);
        cpu.push({process:count,
            status:"New",
            at_time:clock,
            bu_time:ran,
            ex_time:0,
            wa_time:0})
        setAllprocess(count);
        setProcess(cpu);
    }
    const Reset =() =>{
        setProcess([]);
        setAllprocess(count=0);
        setClock(0);
        setTerminate([]);
        
    }
    

    useEffect(() => {
        if (process.length !== 0) {
            process.map((it)=>{
                if (it.ex_time < it.bu_time && it.bu_time !==0) {
                    it.st = "Runing";
                    it.ex_time++;
                    if (it.ex_time === it.bu_time) {
                        it.st = "Terminate";
                        const Fill = process.filter((val)=>{
                            return val.st ==="Terminate";
                        })
                        setTerminate(Fill);
                    }
                }
            })
        }
        const id = setInterval(() => {
            setClock(clock + 1);
        }, 1000);
      return () => clearInterval(id) 
    }, [clock]);

  return (
    <Controller.Provider
    value={{
        process,
        clock,
        allprocess,
        terminate,
        setTerminate,
        setAllprocess,
        setClock,
        setProcess,
    }}
    >
        {props.children}
    </Controller.Provider>
  )
}

export default Contro;