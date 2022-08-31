import React, { createContext, useState } from "react";


const Cont = createContext();

const ContAddprosecc = (props) =>{
 const [Id,setId]= useState(0);
 const [Status,setStatus]= useState("Status");
 const [Arrival_Time,setArrival_Time]= useState(0);
 const [Burst_Time,setBurst_Time]= useState(0);
 const [Waitting_Time,setWaitting_Time]= useState(0);
 const [Terminate,setTerminate]= useState(0);

 return(
    <ContAddprosecc.provider
        value={{
            Id,
            Status,
            Arrival_Time,
            Burst_Time,
            Waitting_Time,
            Terminate,
        }}
    
    >
        {props.children}

    </ContAddprosecc.provider>
 )
};
export {Cont,ContAddprosecc};
