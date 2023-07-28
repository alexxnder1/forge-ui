import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import { INVALID_ITEM, Item } from "./Inventory";
import CropFreeIcon from '@mui/icons-material/CropFree';
import ProgressBar from "../../Components/ProgressBar";

export const ICON_SIZE = 75;

export const ItemStyle:React.CSSProperties = {
    width: `${ICON_SIZE}px`,
    height: `${ICON_SIZE}px`,
    outline: "0.1px solid white",
    // backgroundColor:"black",
    position: "absolute",
    marginLeft: "13px"
};

export const ItemsStyle:React.CSSProperties = {
    backgroundColor: "rgba(34, 46, 80, .8)",
    width: "600px",
    paddingLeft: "5px",
    // marginLeft: "5px",
    height: "90%",
    display: "flex",
    justifyContent:"center",
    overflowX:"hidden",
    marginLeft:"10px",
    overflowY:"auto",
    position: "relative",
    color:"white",
    zIndex: 1001,
};

interface ItemsProps {
    data: Array<Item>,
    maxItems: number,
    swapItems: (f: number, s: number, ord:boolean) => void;
    showItemMenu: (i: Item) => void;
}

export interface Vector2 {
    x: number,
    y: number
}

const Items = (props: ItemsProps) => {
    var data = props.data;

    const [mouse, setMouse] = useState<Vector2>({x: 0, y: 0});
    const [itemDragging, setItemDragging] = useState<number>(INVALID_ITEM);
    const [offset, setOffset] = useState<number>(0);

    var itemsRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    useLayoutEffect(() => {
        if(itemsRef.current)
            setOffset(Math.trunc((itemsRef.current.offsetWidth-20)/ICON_SIZE));
    });

    useEffect(() => {
        const handleMouseMove = (e: any) => {
            const items = document.querySelector('#items')?.getBoundingClientRect();
            const item = document.querySelector('#item')?.getBoundingClientRect();
            if(items && item)
                setMouse({x: e.clientX-items.left-item.width/2, y: e.clientY-items.top-item.height/2});
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove); 
    }, []);

    return (
        <div id="items" ref={itemsRef} style={ItemsStyle}>
            <h1 style={{top: "2%", position:"fixed", left: 10, fontFamily:"roboto", fontSize:15}}>Your Items</h1>
            <ProgressBar width={200} value={20} height={20} backgroundColor="grey" color="green"/>
            {
                Array.from({length: props.maxItems}).map((_: unknown, ordinaryIndex: number) => {
                    var item = data.find(item => item.id === ordinaryIndex)!;
                    var id = -1, index = -1;
                    if(item === undefined) 
                        id = ordinaryIndex;  

                    else {
                        id = item.id!;
                        index = data.indexOf(item);
                    }

                    return (
                        <>
                        {itemDragging !== INVALID_ITEM &&  itemDragging === index && 
                        <div style={{...ItemStyle,                            
                            left: `${(id%offset)*80+12}px`,
                            position: "absolute",
                            width: `${ICON_SIZE}px`,
                            height: `${ICON_SIZE}px`,
                            margin: 0,
                            top: `${Math.floor(id/offset)*90+20}px`}}>
                        </div>
                        }

                        <div id="item" key={ordinaryIndex}
                        onClick={(e) => {
                            e.preventDefault();
                            if(item)
                                props.showItemMenu(item);
                        }}

                        onDragStart={() => {
                            if(item)
                                setItemDragging(index)
                        }}

                        onMouseUp={() => {
                            if(itemDragging !== INVALID_ITEM) {
                                new Audio(`${process.env.PUBLIC_URL}/inventory/button.mp3`).play();
                                props.swapItems((!item ? ordinaryIndex : index), itemDragging, !item);
                                setItemDragging(INVALID_ITEM)
                            }
                        }}

                        draggable={true}

                        style={{...ItemStyle, 
                            pointerEvents: `${itemDragging === index ? 'none' : 'all'}`,
                            justifyContent:"center",
                            display:"flex",
                            zIndex: 2000,
                            backgroundColor: `${itemDragging !== -1&& itemDragging === index  ? 'transparent' : 'rgba(0,0,0,0.8)'}`,
                            left: `${itemDragging !== -1 && itemDragging === index ? mouse.x : (id%offset)*80}px`,
                            top: `${itemDragging !== -1 && itemDragging === index ? mouse.y : Math.floor(id/offset)*90+20}px`
                        }}>
                            {item &&
                                <div id="item-placeholder" style={{
                                    position:"absolute",
                                    pointerEvents: "none",
                                    color: "white",
                                    fontSize:"25%",
                                    backgroundColor:"rgba(0,0,0,0.5)",
                                    width: `${ICON_SIZE}px`,
                                    textAlign:"center",
                                    fontFamily:"roboto",
                                    marginTop: "55px",
                                    zIndex:5000,
                                }}>
                                    {/*  {item.stackAmount !== 1 && ` (${item.stackAmount}x)`} */}
                                    <h1>{item.name.toUpperCase()}</h1>
                                </div>
                            }
                            {
                                item &&
                                <img src={`${item.image}`} width={ICON_SIZE-20} height={ICON_SIZE-20}/>
                            }
                            <h1 style={{
                                top: 0,
                                margin: 0,
                                right: 2,
                                fontSize: 15,
                                fontFamily:"barlow",
                                position :"absolute"
                            }}>{item && item.stackAmount}</h1>
                        </div>
                        </>
                    )
                })
            }
        </div>
    )
};

export default Items;