import React, { useEffect, useState, usestate} from "react";

function TimePicker(){
    const [time,setTime]=useState(new Date())

    useEffect(()=>{
        setInterval(()=>setTime(new Date()),1000)
    },[])


    return(
        <div>
            <p>{time.tolocaleTimestring}</p>
        </div>
    )
}
export default TimePicker;