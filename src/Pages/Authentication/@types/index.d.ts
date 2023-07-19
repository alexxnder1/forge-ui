declare global {
    interface Window {
        SetLogin(): void;
        SetUsername(name: string): void;
    }
}