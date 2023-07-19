import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import { useState } from "react";

const getThermoColor = (temp: number) => {
    if(temp >= 34)
        return 'red';
    
    else if(temp < 34 && temp >= 27)
        return 'orange';

    else if(temp < 27)
        return 'cyan';
};

const Temperature = () => {
    const [temp, setTemp] = useState<number>(25);

    window.SetTemp = (t: number) => {
        setTemp(t);
    };

    return (
        <div id="Temperature" style={{
            position: "absolute",
            left: 220,
            bottom: 40,
            fontSize:"5px",
            fontFamily:"roboto",
            color: "white"
        }}>
            <h1 style={{
                backgroundColor:"grey",
                color: "black",
                // width: "10px",
                position:"absolute",
                // marginBottom: "15px",
                bottom: 10,
                textAlign:"center",
                width: "40px",
                height:"12px",
                borderRadius:"10px",
                left: 18
            }}>{temp.toFixed(2)} °C</h1>
            
            <DeviceThermostatIcon style={{
                color: `${getThermoColor(temp)}`
            }}/>
        </div>
    )
};

export default Temperature;