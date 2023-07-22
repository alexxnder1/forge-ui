import React from "react";
import Button from "./Button";

export interface Button {
    name: string,
    onClick: () => void;
}

export interface DialogProps {
    title: string,
    description: string,
    icon?: string,
    style?: React.CSSProperties,
    buttons?: Array<Button>
}

const Dialog = (props: DialogProps) => {
    return (
        <div id="dialog" style={{
            backgroundColor: "rgba(34, 46, 80, .8)",
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: 999,
            display: "flex",
            justifyContent:"center",
            flexDirection: "column",
            alignItems:"center",
            color: "white",
            fontFamily:"roboto",            
        }}>

        <h1>{props.title.toUpperCase()}</h1>
        <img style={{ width:"80px", paddingBottom: "30px", opacity: 0.8 }} src={`${props.icon}`}/>
        <h1 style={{fontSize: "18px", padding: "300px", paddingTop: 0, paddingBottom: "20px"}}>{props.description}</h1>

        <div style={{ 
            display:"inline-flex",
        }}>
        {
            props.buttons?.map((button, index) => {
                return (
                    <>
                     <Button key={index} onClick={() => button.onClick()} text={`${button.name}`} backgroundColor="#FCCB06" width={150} height={50} style={{
                        marginRight: "15px",
                        fontSize:"15px"
                    }}/>
                    </>
                )
            })
        }
        </div>
        </div>
    )
};

export default Dialog;