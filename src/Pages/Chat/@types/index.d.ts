import {ChatSettings, Command, Message} from "../Chat";

declare global {
    interface Window {
        SetSettings(s: ChatSettings): void;
        SetCommands(s: string): void;
        FocusChat(p: boolean): void;
        SendMessage(s: Message): void;
        RetrieveChatData(): void;

        // queue
        SetPosition(n: number): void;
        SetMax(n: number): void;
    }
}

export {};