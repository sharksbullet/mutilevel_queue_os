import { wait } from '@testing-library/user-event/dist/utils';
import React, { createContext,useState,useEffect } from 'react';
import ReadyQueue from './ReadyQueue';
import Tablequeueu from './Tablequeue';
let Count=0;
let tQuantum =5;
let itime = 0  ;
let index =0;
let set =0.80;
const Controller = createContext();
const Contro = () => {
    const [process, setProcess] = useState([]);
    const [clock,setClock]=useState(0);
    const [readyRobin,setReadyRobin] = useState([]);
    const [allprocess, setAllprocess] = useState(0);
    const [awg,setAwg]=useState(0);
    //ran
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
   //function addprocess 
  function add() { 
    Count++;
      let cpu = [...process];
      let ran = random(10,20);
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
  }
// add rounrobinqueue พารารับมา 1 ตัว p
  function addreadyR(p) {
    let readyrobin_q = [...process]
    readyrobin_q.push(p)
    setReadyRobin(readyrobin_q)
  }
  //ถ้ากดปุ่มแอดเรียกพวกนี้ เหตุที่ใช้ asyncกับawait ให้มันทำงานแบบซิโคนัด อยากให้ทำงานเป็นลำดับขั้นทีละบันทัด
    const addPro = async ()=>{
     await add() 
     await addreadyR(process)
    };
  //ปุ่ม Reset ให้มันกำหนดค่าว่าง
    const Reset =() =>{
        setProcess([]);
        setAllprocess(Count=0);
        setClock(0);
       
        
    };
   //ให้ทำไรบ้าง
    useEffect(() => {
      //เช็คว่าถ้าไม่มี process ถ้ามี process ให้เริ่มทำ
        if (process.length !== 0) {
          //เช็คว่าถ้าตัวชี้ตำแหน่งของตัวสุดท้ายให้กลับไปเริ่มใหม่
          if (index === process.length) {
              index =0
          }
          //เช็คถ้า status มันไม่เท่ากับ Terminate
          if (process[index].status !== "Terminate") {
            //ให้ลูปนับเวลา
            for (let i = 0; i < process.length; i++) {  
              //เช็คว่าถ้า status มันเท่ากับ Running,Ready บวกเวลาไปเรื่อยๆ ถ้าเป็น new ก็ให้เป็น Ready ทั้งหมด
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
            //เช็คว่าถ้า state เป็น 0 , stateตอนเป็นราวโรบิน
             if (process[index].state === 0) {
              //เช็คนับว่าเวลา tQuantum ถ้าถึง 5
              if (itime < tQuantum ) { 
                process[index].status = "Running"
                 itime++
                 //เช็คว่าเป็น80เปอของเวลาแล้วหรือยังถึงแล้วก็ให้ไปตัวถัดไปแล้วก็ชิฟ ออก
                 if (process[index].ex_time === Math.round(process[index].bu_time*set)) {
                  process[index].state = 1
                  readyRobin.shift()
                }
              }
              //ถ้าไม่ใช้คือว่าtQuantumทำถึงเวลาที่กำหนด
              else{
                itime=0
                  readyRobin.shift()
                  readyRobin.push(process[index])
                  process[index].status = "Ready"
                //ลบราวทิ้งให้ไปทำใหม่
                if (index < process.length - 1) {
                  index++
                }

                else{
                  index = 0
                }
              }
             }
             //ถ้า state เท่ากับ 1 ให้มัน Running
            else if (process[index].state === 1) {
              process[index].status = "Running"
              //ถ้า Burst Time เท่ากับ Execue Time	ให้มัน Terminate 
              if (process[index].ex_time === process[index].bu_time) {
                    process[index].status = "Terminate"
                    process[index].state = 2
                  
              }
            }
          }
          //ถ้าไม่ใช้ ก็ให้ index บวกไปเรื่อยๆ
          else{
            index++
          }
          
         }
         //เรียกใช้ function AVG Waitting Time
         Awg()
         
      }, [clock])
      
      //นี้ให้นับเวลา clock 
    useEffect(() => {
        setTimeout(()=>{
          setClock(clock+1)
        },500)
    }, [clock]);
//ส่งค่ากลับ ไฟล์Tablequeueu,ReadyQueue และ ก็ส่งค่า function ไปให้
  return (
   <>
    <Tablequeueu
     clock={clock}
        process={process}
        addPro={addPro}
        Reset={Reset}
        allprocess={allprocess}
        awg={awg}
        
    />
   <ReadyQueue
    clock={clock}
    process={process}
    addPro={addPro}
    readyRobin={readyRobin}
   />
   </>
  );
};

export  default Contro;