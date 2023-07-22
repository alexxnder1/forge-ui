import {useState,useEffect, useRef} from "react";

import Items from "./Items";
import Character from "./Character";
import Dialog from "../../Components/Dialog";
import DropItem from "./DropItem";

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
    
    const [items, setItems] = useState<Array<Item>>([]);
    const [itemClicked, setItemClicked] = useState<number>(-1);
    const [dropItemMenu, setDropItemMenu] = useState<boolean>(false);

    var inventoryRef = useRef<HTMLDivElement>(null);

    const showItemMenu = (index: number) => {
        setItemClicked(index);
    };

    const hideItemMenu = () => {
        setItemClicked(INVALID_ITEM);
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

    const giveItems = (newItems : Array<Item>) => {
        newItems.map((item, index) => {
            item.id = index;
        })
        setItems(newItems);
    };

    useEffect(() => {
        giveItems([{
            name: `Cigarettes`,
            description:`da`,
            image: `https://fumezi.com/wp-content/uploads/2023/05/9129412526110.png`,
            stackable: true,
            stackAmount: 9,
            maxStackAmount: 10
        },
    
        {
            name: `Hamburger`,
            description:`food`,
            image: `https://cdn-icons-png.flaticon.com/512/3075/3075977.png`,
            stackable: true,
            stackAmount: 1,
            maxStackAmount: 10
        }
        ])
    }, []);
    
    const dropItem = () => {
        
        // var newState = items;
        // newState.splice(itemClicked, 1);
        // newState = newState;

        // setItems(newState);
        setDropItemMenu(true);
        // hideItemMenu();
    };

    return (
        <div id="inventory" style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
        }} ref={inventoryRef}>
            { dropItemMenu && <DropItem/> }

            { 
            itemClicked !== INVALID_ITEM
            &&
            <Dialog 
                title={`${items[itemClicked].name} (${items[itemClicked].stackAmount !== 1 ? `${items[itemClicked].stackAmount}x` : ''})`} 
                description={`${items[itemClicked].description}`}
                icon={`${items[itemClicked].image}`}
                buttons={[
                    {name: 'Use', onClick: () => {alert('da')}},
                    {name: 'Drop', onClick: () => {dropItem()}},
                    {name: 'Cancel', onClick: () => {hideItemMenu()}},
                ]}
            />}

            <div id="container" style={{
                backgroundColor:"black",
                width: "950px",
                height: "580px",
                position: "absolute",
                left: "50%",
                bottom: "50%",
                margin: "0 auto",
                display:"inline-flex",
                justifyContent:"end",
                transform: "translate(-50%, 50%)"
            }}>
                <Character/>
                <Items data={items} showItemMenu={showItemMenu} maxItems={inventory.maxItems} swapItems={swapItems}/>
            </div>
        </div>
    )    
};

export default Inventory;