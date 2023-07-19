import React, { ReactNode, forwardRef, useState } from "react";

interface Input {
    icon?: ReactNode,
    type?: string | "text",
    onChange?:(e: React.ChangeEvent<HTMLInputElement>) => void,
    value: string,
    readOnly?: boolean,
    placeholder?: string,
    style?: React.CSSProperties,
    width?: number,
    height?: number
}

const Input = forwardRef(function Input(props: Input, ref: any) {
    const [hover, setHover] = useState(false);
    return (
        <div id="Input">        
        <div id ="icon" style={{
            color: "white",
            position: "absolute",
            paddingLeft: "5px",
            transform: "scale(0.85)"
        }}>
            {props.icon!}
        </div>
        <input type={props.type} ref={ref} value={props.value} onChange={props.onChange!} onFocus={() => setHover(true)}  onBlur={() => setHover(false)} style={{...props.style, 
            width: (props.width || 250),
            color: "white",
            backgroundColor: !hover ? "#333333" : "black",
            border: "none",
            outline: "none",
            transition: "all 0.3s",
            height:( `${props.height}px` || "25px"),
            marginBottom:"10px",
            borderRadius:"5px",
            fontFamily: "Barlow",
            padding: "5px",
            boxShadow: "0px 0px 5px black",
            paddingLeft: props.icon ? "35px" : ""
        }} readOnly={props.readOnly} placeholder={props.placeholder}></input>
        </div>
    )
});

export default Input;