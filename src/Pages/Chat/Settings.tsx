import { Checkbox, Slider } from "@mui/material";
import { ChatSettings } from "./Chat";
import Button from "../../Components/Button";

const Settings = (props: ChatSettings) => {
    return (
        <div id="Settings" style={{ 
            backgroundColor: "#424242",
            borderRadius: "5px",
            width: "auto",
            padding: "10px",
            color: "white",
            // opacity: 0.2,
            fontFamily: "roboto",
            boxShadow: "0px 0px 5px black",
            // background: "#536976",  /* fallback for old browsers */
            background: "linear-gradient(to right, #292E49, #536976);" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

        }}>
        
        <div id="settings-container" style={{
            fontSize: "6px",
            // display: "flex",
            flexDirection:"column",
            justifyContent: "center",

            // display: "inline-flex"
            // alignItems:"center"
        }}>

        <h1>Font Size</h1>
        <Slider value={props.fontSize} size={"small"} max={16} min={5} onChange={(event: Event, value: number | number[], activeThumb: number) => props.setFontsize!(value)}/>
        <h1>Width</h1>
        <Slider value={props.width} size={"small"} max={600} min={100} onChange={(event: Event, value: number | number[], activeThumb: number) => props.setWidth!(value)}/>
        <h1>Height</h1>
        <Slider value={props.height} size={"small"}max={400} min={100} onChange={(event: Event, value: number | number[], activeThumb: number) => props.setHeight!(value)}/>
        <h1>Spacing</h1>
        <Slider value={props.spacing} size={"small"} max={20} min={0} onChange={(event: Event, value: number | number[], activeThumb: number) => props.setSpacing!(value)}/>
        
        <div style={{display: "inline-flex", alignItems:"center"}}>
            <h1>Timestamp</h1>
            <Checkbox checked={props.timestamp} onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => props.setTimestamp!(checked)}/>
            {/* <br/> */}
            <hr style={{
                height: "20px"
            }}/>
            <h1 style={{
                marginLeft: "15px"
            }}>Links</h1>
            <Checkbox checked={props.links} onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => props.setLinks!(checked)}/>
        </div>

        <div style={{
            display:"flex",
            justifyContent:"center"
        }}>
            <Button text={"Reset to Defaults"} style={{marginTop: "20px", fontFamily:"barlow"}} backgroundColor="red" onClick={() => {
                props.resetToDefault!();
            }}/>
        </div>
        </div>
        </div>
    )
};

export default Settings;