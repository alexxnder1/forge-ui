import { Item } from "../Inventory";

declare global {
    interface Window {
        SetItems: (nt: string) => void;
        SetNearbyItems: (nt: string) => void;
    }
}

export {};