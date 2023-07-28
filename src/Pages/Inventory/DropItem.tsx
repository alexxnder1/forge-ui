import {useState, useEffect} from "react";

import Button from "../../Components/Button";
import Input from "../../Components/Input";
import { Item } from "./Inventory";
import LargeInput from "../../Components/LargeInput";

interface DropProps {
    item: Item,
    index: number,
    onExit: () => void;
    deleteItem: (index: number, amount: number) => void;
}

const DropItem = (props: DropProps) => {
    var item = props.item;
    var [amount, setAmount] = useState<number>(1);
    
    useEffect(() => {
        if(item)
            setAmount(item.stackAmount)
    }, []);  

    useEffect(() => {
        if(amount <= 0 || amount > item.stackAmount)
            setAmount(item.stackAmount);
    }, [amount]);

    return (
        <div id="drop-item-background" style={{
            left: 0,
            right: 0,
            position: "absolute",
            backgroundColor: "rgba(34, 46, 80, .8)",
            width: "100%",
            height: "100%",
            zIndex: 5000,
            display: "flex",
            alignItems:"center",
            justifyContent:"center",
            fontFamily:"barlow",
            color:"white",
            fontSize:"12px",
        }}>
            <LargeInput buttonText="Drop" onExit={() => {
                    props.onExit()
                }} onChange={(e) => setAmount(parseInt(e.target.value))} value={amount} title={item && item.name.toUpperCase()} onClick={() => {
                    if(amount <= 0 && amount > item.stackAmount)
                        return;
                    
                    props.deleteItem(props.index, amount);
                }} />
        </div>
    )
}

export default DropItem;