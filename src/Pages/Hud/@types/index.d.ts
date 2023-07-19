declare global {
    interface Window {
        SetStatsData(u: string, i: number): void;
        SetMoney(cash: number, bank: number): void;
        SetTemp(t: number):void;
    }
}

export {};