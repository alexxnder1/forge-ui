import {useState,useEffect, useRef} from "react";

import Items from "./Items";
import Character from "./Character";
import Dialog from "../../Components/Dialog";
import DropItem from "./DropItem";
import NearbyItems from "./NearbyItems";
import Loading from "../../Components/Loading/Loading";

export const INVALID_ITEM = -1;

// interfaces 
export interface Inventory {
    maxItems: number    
}

export interface Vector2 {
    x: number, y: number;
}

// classes
export interface Item {
    id?: number;
    name: string;
    description: string;
    image: string;
    
    stackable: boolean;
    maxStackAmount: number;
    stackAmount: number;
}

const Inventory = () => {
    const [inventory, setInventory] = useState<Inventory>({
        maxItems: 100
    })
    
    const [items, setItems] = useState<Array<Item>>([
    {
        name: `Cigarettes`,
        description:`da`,
        image: `https://fumezi.com/wp-content/uploads/2023/05/9129412526110.png`,
        stackable: true,
        stackAmount: 9,
        maxStackAmount: 10,
        id: 0,
    }
]);
    const [itemClicked, setItemClicked] = useState<Item | null>(null);
    const [droppingItem, setDroppingItem] = useState<Item | null>(null);

    var inventoryRef = useRef<HTMLDivElement>(null);

    const showItemMenu = (item: Item) => {
        setItemClicked(item);
    };

    const hideItemMenu = () => {
        setItemClicked(null);
    }

    const swapItems = (first: number, second: number, ord: boolean) => {
        var data = items;
        var item = ord ? data.find(i => i.id === first) : data[first];
        if(first === second) {

            data[second].id = first;
            setItems(data);
            return;
        }

        if(!item)
        {    
            data[second].id = first;
            setItems(data);
        }   

        else {
            let aux = data[first].id;
            data[first].id = data[second].id;
            data[second].id = aux;
            setItems(data);
        }
    }

    window.SetItems = (newItems : string) => {
        setItems(JSON.parse(newItems));
    };

    
    const showDropItemMenu = () => {
        setDroppingItem(itemClicked);
    };

    const deleteItem = (index: number, amount: number) => {
        var newState = items;
        var item = newState.at(index);
        if(item) {
            if(amount === item.stackAmount) {
                newState.splice(index, 1);
                setItemClicked(null);
            }

            else {
                item.stackAmount-=amount;
            }

            setDroppingItem(null);
            mp.trigger('inventory.drop.item', index, amount);
            setItems(newState);
        }
    };

    return (
        <>
        { items.length !== 1 && items.at(0)?.name === 'Cigarettes' ?
            
            
            <Loading style={{color:"black"}}/>
            :           
                <div id="inventory" style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"space-between"
                }} ref={inventoryRef}>
                        { droppingItem !== null && <DropItem onExit={() => setDroppingItem(null)} item={droppingItem} deleteItem={deleteItem} index={items.indexOf(droppingItem)}/> }
                        { 
                        itemClicked !== null
                        &&
                        <Dialog 
                            title={`${itemClicked.name} ${itemClicked.stackAmount !== 1 ? `(${itemClicked.stackAmount}x)` : ''}`} 
                            description={`${itemClicked.description}`}
                            icon={`${itemClicked.image}`}
                            buttons={[
                                {name: 'Use', onClick: () => {alert('da')}},
                                {name: 'Drop', onClick: () => {
                                    if(itemClicked.stackAmount === 1)
                                        deleteItem(items.indexOf(itemClicked), 1);
        
                                    else showDropItemMenu()
                                }},
                                {name: 'Cancel', onClick: () => {hideItemMenu()}},
                            ]}
                        />}
                        
                        <Items data={items} showItemMenu={showItemMenu} maxItems={inventory.maxItems} swapItems={swapItems}/>
                        <Character/>
                        <NearbyItems showItemMenu={showItemMenu}/>        
                </div> 
            }
        </>
    )    
};

export default Inventory;