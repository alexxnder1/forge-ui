declare global {
    interface Window {
        SetPlayers(np: string) : void;
        SetServer(s: string): void;
    }
}

export {};