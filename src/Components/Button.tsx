import { useState } from "react";

interface ButtonProps {
    onClick: () => void,
    onMouseEnter?: () => any,
    onMouseLeave?: () => any,
    backgroundColor?: string,
    textColor?: string,
    style?: React.CSSProperties | undefined,
    text?: string,
    icon?: any,
    width?: number,
    height?: number
}

const Button = (props: ButtonProps) => {
    const [hover, setHover] = useState(false);
    return (
        <button id="ui-button" onMouseEnter={() => {
            setHover(true)
            props.onMouseEnter && props.onMouseEnter()       
        }} onMouseLeave={() => {
            setHover(false)
            props.onMouseLeave && props.onMouseLeave()       
        }} onClick={() => {props.onClick()}} style={{...props.style, ...
        {
            backgroundColor: !hover ? (props.backgroundColor || "black") : props.textColor,
            color: !hover ? (props.textColor || "white") : props.backgroundColor,
            border: 0,
            boxShadow: "0px 0px 7px black",
            display: "flex",
            justifyContent:"center",
            alignItems: "center",
            outline: 0,
            borderRadius: "5px",
            fontFamily:"barlow",
            width: props.width || "auto",
            height: props.height || "auto",
        }}}>
        <div id ="icon" style={{
            display: "inline-flex",
            alignSelf: "center",
            justifyContent:"center",
            pointerEvents:"none",
            color: !hover ? (props.textColor || "white") : (props.backgroundColor || "black")            
        }}>
            {props.icon}
        </div>
            {props.text}
        </button>
    )
};

export default Button;