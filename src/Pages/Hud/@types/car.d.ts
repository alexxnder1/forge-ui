declare global {
    interface Window {
        UpdateHud(s: number, r: number, g: number): void;
        SetFuel(f: number): void;
    }
}

export {};