import React, {useEffect,useState} from "react";
import { INVALID_ITEM, Item } from "./Inventory";
import Dialog from "../../Components/Dialog";

const ICON_SIZE = 75;

interface ItemsProps {
    data: Array<Item>,
    maxItems: number,
    swapItems: (f: number, s: number, ord:boolean) => void;
    showItemMenu: (i: number) => void;
}

export interface Vector2 {
    x: number,
    y: number
}

const Items = (props: ItemsProps) => {
    var data = props.data;

    const [mouse, setMouse] = useState<Vector2>({x: 0, y: 0});
    const [itemDragging, setItemDragging] = useState<number>(INVALID_ITEM);
    const [itemHover, setItemHovered] = useState<number>(INVALID_ITEM);

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
        <div id="items" style={{
            backgroundColor: "#2b2b2b",
            width: "650px",
            height: "100%",
            overflowX:"hidden",
            overflowY:"auto",
            position: "relative",
        }}>
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
                        <div id="item" key={ordinaryIndex} onDoubleClick={(e) => {
                            e.preventDefault();
                            if(item)
                                props.showItemMenu(index);
                        }}
                        onDragStart={(e) => {
                            if(item)
                                setItemDragging(index)
                        }}

                        onMouseOver={() => {
                            setItemHovered(index);
                            if(itemDragging !== INVALID_ITEM) {                             
                                props.swapItems((!item ? ordinaryIndex : index), itemDragging, !item);
                                setItemHovered(itemDragging);
                                setItemDragging(INVALID_ITEM)
                            }
                        }}

                        onMouseLeave={() => setItemHovered(INVALID_ITEM)}
                        onMouseDown={() => setItemDragging(INVALID_ITEM)}
                        onMouseUp={() => setItemDragging(INVALID_ITEM)}

                        draggable={true}

                        style={{
                            width: `${ICON_SIZE}px`,
                            height: `${ICON_SIZE}px`,
                            backgroundColor:"grey",
                            position: "absolute",
                            marginLeft: "13px",
                            left: `${itemDragging !== -1 && itemDragging === index ? mouse.x : (id%7)*80+30}px`,
                            top: `${itemDragging !== -1 && itemDragging === index ? mouse.y : Math.floor(id/7)*90+20}px`,
                     
                        }}>
                            {(item && itemHover === index) &&
                                <div id="item-placeholder" style={{
                                    position:"absolute",
                                    pointerEvents: "none",
                                    color: "white",
                                    fontSize:"30%",
                                    backgroundColor:"black",
                                    width: `${ICON_SIZE}px`,
                                    textAlign:"center",
                                    fontFamily:"roboto",
                                    marginTop: "75px",
                                    zIndex:5,
                                }}>
                                    <h1>{item.name.toUpperCase()}</h1>
                                    <h1 style={{ color: 'grey' }}>{item.description}</h1>
                                </div>
                            }
                            {
                                item &&
                                <img src={`${item.image}`} width={ICON_SIZE} height={ICON_SIZE}/>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
};

export default Items;