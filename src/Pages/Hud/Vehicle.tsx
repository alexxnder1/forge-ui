import {useState} from "react";
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';

const Car = () => {
    const [speed, setSpeed] = useState<number>(0);
    const [rpm, setRpm] = useState<number>(0);
    const [gear, setGear] = useState<number>(0);
    const [fuel, setFuel] = useState<number>(-1);

    window.UpdateHud = (s: number, r: number, g: number) => {
        setSpeed(s);
        setRpm(r);
        setGear(g);
    };

    const getRpmColor = () => {
        if(rpm >= 2/3)
            return "red";

        else if(rpm < 2/3 && rpm >= 1/3)
            return "orange";

        else if(rpm < 1/3)
            return "green";
    };

    const formatGear = () => {
        if(gear === 0)
        {
            if(speed !== 0)
                return "R";

            else return "N";
        }

        else return gear;
    };

    window.SetFuel = (fuel: number) => { setFuel(fuel); };

    return (
        <div id="car-hud" style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            width: "200px",
            height: "100px",
            overflow: "hidden",
            fontFamily:"barlow",
            display: "flex",
            flexDirection: "column",
            color: "white",
            textShadow: "0px 0px 10px black",
            transition: "all 0.2s"
            }}>
            <h1 style={{
                marginLeft: "10px",
                marginTop: "10px"
            }}>{(speed*3.6).toFixed(0)}</h1>
            
            <h1 style={{
                fontSize: "10px",
                position: "absolute",
                right: 30,
                bottom: 30,
                fontFamily:"roboto"
            }}>km/h</h1>
            
            <h1 style={{
                position: "absolute",
                fontSize:"small",
                right: 30,             
                top: 10,
                backgroundColor:"grey",
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 5,
                paddingBottom: 5,
                borderRadius:"50px"
            }}>{formatGear()}</h1>

            <div id="progress-bar" style={{
                width: "175px",
                height:"10px",
                backgroundColor:"grey",
                borderRadius:"20px",
                marginBottom: "10px",
                boxShadow: "0px 0px 5px black",
                background: `linear-gradient(to right, ${getRpmColor()},  ${getRpmColor()}  ${rpm*100}%, black ${rpm*100}%, black)`
            }}/> 

            <div id="fuel" style={{
                position: "absolute",
                display: "flex",
                right: 0,
            }}>
                <div id="fuel-bar" style={{
                    backgroundColor: "red",
                    width: "5px",
                    height:`${fuel+2}px`,
                    right: 6,
                    bottom: 20,
                    position: "absolute",
                }}/>
                <LocalGasStationIcon style={{color:`${fuel <= 0 ? "orange" : "white"}`, animation: `${fuel <= 0 ? "2s infinite pulse" : ""}`, width:"15px", marginTop: "60px", alignSelf:"end"}}/>
            </div>
        </div>
    )
    
};
export default Car;