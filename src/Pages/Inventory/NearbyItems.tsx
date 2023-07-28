import NoBackpackIcon from '@mui/icons-material/NoBackpack';

import {useState, useRef, useLayoutEffect, useEffect} from "react";
import { ICON_SIZE, ItemsStyle, ItemStyle } from './Items';
import { INVALID_ITEM, Item } from './Inventory';
import Button from "../../Components/Button";
import LargeInput from '../../Components/LargeInput';

export interface NearbyProps {
    showItemMenu: (item: Item) => void;
}

const NearbyItems = (props: NearbyProps) => {
    const [nearbyItems, setNearbyItems] = useState<Array<Item>>([
        // {
        //     name: `Cigarettes`,
        //     description:`da`,
        //     image: `https://fumezi.com/wp-content/uploads/2023/05/9129412526110.png`,
        //     stackable: true,
        //     stackAmount: 1,
        //     maxStackAmount: 10,
        //     id: 0,
        // }
    ]);

    const [offset, setOffset] = useState<number>(0);
    const [pickupItem, setPickupItem] = useState<number>(INVALID_ITEM);
    const [pickupAmount, setPickupAmount] = useState<number>(0);

    var nearbyRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    useLayoutEffect(() => {
        if(nearbyRef.current)
            setOffset(Math.trunc((nearbyRef.current.offsetWidth-40)/ICON_SIZE));
    });

    useEffect(() => {
        if(pickupItem !== INVALID_ITEM && (pickupAmount <= 0 || pickupAmount > nearbyItems[pickupItem].stackAmount))
            setPickupAmount(nearbyItems[pickupItem].stackAmount)
    }, [pickupAmount]);

    window.SetNearbyItems = (nt: string) => {
        setNearbyItems(JSON.parse(nt));
    }

    return (
        <div id="nearbyitems" ref={nearbyRef} style={{...ItemsStyle, display:"flex", justifyContent:"center", alignItems: "center", marginRight:"10px", paddingRight:"15px"}}>
            <h1 style={{
                fontFamily:"barlow",
                fontSize: 15,
                position:"fixed",
                top: 5
            }}>Ground</h1>

                {pickupItem !== INVALID_ITEM && 
                    <div id="pickup-background" style={{
                        position:"fixed",
                        top:0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center",
                        zIndex: 6000,
                        backgroundColor: `rgba(34, 46, 80, .8)`,
                    }}>
                        <LargeInput buttonText='Pickup' onExit={() => {
                            setPickupItem(INVALID_ITEM);
                        }} title={nearbyItems[pickupItem].name} value={pickupAmount} onChange={(e) => setPickupAmount(parseInt(e.target.value))} onClick={() => {
                            mp.trigger('inventory.pickup.item', pickupItem, pickupAmount);
                            setPickupItem(INVALID_ITEM);
                        }}/>
                    </div>
                }

            {
                nearbyItems.length !== 0
                ?
                (
                    nearbyItems.map((item, ordinaryIndex) => {
                    return (
                        <div id="nearby-item" key={ordinaryIndex} style={{...ItemStyle,     
                            // outline: "none"                    
                            left: `${(ordinaryIndex%offset)*105}px`,
                            top: `${Math.floor(ordinaryIndex/offset)*90+20}px`,
                            justifyContent:"center",
                            alignItems:"center",        
                            display:"flex",   
                            flexDirection:"column",
                            // backgroundColor: "",
                            pointerEvents: `${pickupItem !== INVALID_ITEM ? 'none' : 'all'}`,
                            // fontSize:10
                        }}>
                            <img src={`${item.image}`} width={ICON_SIZE-20} height={ICON_SIZE-20}/>
                            <h1 style={{ position:"absolute", fontSize: 10, fontFamily:"Roboto", bottom: 8, textAlign:"center"}}>{item.name.toUpperCase()}</h1>
                            <h1 style={{
                                top: 0,
                                margin: 0,
                                right: 2,
                                fontSize: 15,
                                fontFamily:"barlow",
                                position :"absolute"
                            }}>{item && item.stackAmount}</h1>
                            <div id="interact-buttons" style={{
                                display:"inline-flex",
                                // justifyContent:"start",
                                // alignItems:"start",
                                marginTop: "5px"                     
                            }}>
                                <Button style={{fontSize: 10, borderRadius:0}} onClick={() => {
                                    props.showItemMenu(item!)
                                }} text={'Info'} width={ICON_SIZE/2} backgroundColor="rgba(16, 140, 249, 0.8)"/>

                                <Button style={{fontSize: 10, borderRadius:0}} onClick={() => {
                                    if(item.stackAmount === 1)
                                    {
                                        var index = nearbyItems.indexOf(item!);
                                        // mp.trigger('inventory.pickup.item', index, 1);
                                        var copy = nearbyItems;
                                        copy.splice(index, 1);
                                        // copy = copy;
                                        console.log(copy);
                                        setNearbyItems(copy);   
                                    }

                                    else {setPickupItem(ordinaryIndex); console.log("da")}
                                }} text={'Pickup'} width={ICON_SIZE/2} backgroundColor="green"/>
                            </div>
                        </div>
                    )}))
                    :
                    (
                        <div id="empty-nearby-items" style={{
                            color: "white",
                            justifyContent:"center",
                            alignItems:"center",
                            margin: 0,
                            flexDirection:"column",
                            display:"flex",
                            fontFamily:"barlow",
                            opacity: 0.7
                        }}>
                            <NoBackpackIcon style={{width: "50px", height: "50px"}}/>
                            <h1>EMPTY</h1>
                        </div>
                    )
            }
        </div>
    );
};

export default NearbyItems;