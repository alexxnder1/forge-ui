import { useEffect, useState, useRef } from "react";

import Input from "../../Components/Input";
import Button from "../../Components/Button";

import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import Settings from "./Settings";
import Messages from "./Messages";
import Loading from "../../Components/Loading/Loading";

export interface MessageLink {
    url?: string,
    domain?: string,
    description?: string,
}

export interface Message {
    content: string,
    from: string,
    timestamp: string,
    local?: boolean,
    links?: Array<MessageLink>
}

export interface ChatSettings {
    width: number,
    height: number,
    fontSize: number,
    focused?: boolean,
    settingsOpened?: boolean,
    spacing?: number,
    timestamp?: boolean,
    links?: boolean,
    
    setWidth?(n: number | number[]): void,
    setHeight?(n: number | number[]): void,
    setFontsize?(n: number | number[]): void,
    setSpacing?(n: number | number[]): void,
    setTimestamp?(n:boolean): void;
    setLinks?(n:boolean): void;
    resetToDefault?(): void;
}

const defaultSettings: ChatSettings = {
    width: 500,
    height: 300,
    fontSize: 6,
    settingsOpened: false,
    focused: false,
    spacing: 0,
    links: true,
    timestamp: true
}

export interface Clipboard {
    index?: number,
    messages: Array<string>
}

const Chat = () => {
    const [messages, setMessages] = useState<Array<Message>>([]);
    const [settings, setSettings] = useState<ChatSettings>(defaultSettings);
    const [commands, setCommands] = useState<string[]>([]);
    const [cmdSuggestion, setCmdSuggestion] = useState<string>('');
    
    const [clipboard, setClipboard] = useState<Clipboard>({index: 0, messages: []});
    const [text, setText] = useState('');

    const chatRef = useRef<null | HTMLDivElement>(null);
    const inputRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        chatRef.current?.scrollIntoView({behavior:"smooth"});
    }, [messages]);

    const formatText = () => {       
        var string = "<h1>Suggested command: /";
        var letters: Array<string> = text.split("");
        
        for(let i = 0; i < cmdSuggestion.length; i++)
        {
            if(letters.find(letter => letter === cmdSuggestion[i]))
            {
                delete letters[letters.indexOf(cmdSuggestion[i])];
                string +=`<span style="color: red">${cmdSuggestion[i]}</span>`
            }
            else string += cmdSuggestion[i];
        }
        
        string+="</h1>";
        return {__html: string};
    };

    async function fetchMeta (message: Message) {
        var words = message.content.split(" ");
        var links: Array<MessageLink> = [];

        for(let i = 0; i < words.length; i++)
        {
            if(words[i].startsWith("http")) 
            {
                var url = words[i];
                await fetch(`https://jsonlink.io/api/extract?url=${words[i]}`).then((res) => {
                    res.json().then(async(data) => {
                        if(data.domain !== undefined && links.length < 3)
                        {        
                            links.push({ url: url, domain: data.domain, description: data.description });

                            setMessages(messages.filter((msg, index) => index !== messages.indexOf(message)));

                            var onlyLinks = (words.length-links.length <= 0);
                            setMessages(current => [...current, {from: (onlyLinks ? '' : message.from), content: (onlyLinks ? `${message.from} shared ${links.length > 1 ? 'a couple of links' : 'one link'}.` : words.join(' ')), timestamp: message.timestamp, links: links }]);
                        }
                    })
                });
                delete words[i];
            }
        }
    }

    window.SetCommands = (cmds: string) => {
        setCommands(JSON.parse(cmds));
    };
    window.SendMessage = (message: Message) => {
        setText('');
        window.FocusChat(false);

        if(message.content.length === 0 || message.content === " " || message.content.length >= 90)
            return;
                   
        message.timestamp = new Date().toLocaleTimeString('ro', { hour: '2-digit', minute: '2-digit'});

        if(!message.content.replace(/\s/g, '').startsWith("/"))
            setMessages(current => [...current, message]);
        
        fetchMeta(message);
        
        if(message.local) {
            var newState = clipboard;
            newState.messages.push(message.content);
            setClipboard(newState);
            
        }
    }

    window.FocusChat = (status: boolean) => {
        setSettings({...settings, focused: status});
        
        if(status===false)
            mp.trigger("hide.cursor");
 
        else {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }

    window.SetSettings = (settings: ChatSettings) => {
        setSettings(settings);
    }

    window.RetrieveChatData = () => {
        mp.trigger('chat.get.data', settings.width, settings.height, settings.fontSize, settings.spacing, settings.timestamp, settings.links);
    }

    return (
        <div id="Chat" style={{
            position: "fixed",
            left: 10,
            top: 10,
            width: `${settings.width}px`,
            height: `${settings.height}px`,
            overflow: "hidden",
            borderRadius: "5px",
        }}
        
        onBlur={() => {
            // window.FocusChat(false)
            
        }}
        >

        {
            messages.length === 0
            ?
            <Loading/>
            :
            <>    
                <div id="chat-content">
                    <Messages messages={messages} settings={settings}/>
                </div>
                <div id="bottom-ref" ref={chatRef}/>

                {
                    settings.focused &&
                    <div id="chat-input" style={{ position: "fixed",padding: 0, margin:0, top:`${settings.height+20}px`, display: "inline-flex"}}  onKeyDown={(e) => {
                        var newState = clipboard;

                        switch(e.key)
                        {
                            case "Enter":
                                    mp.trigger("chat.broadcast.message", text);
                                    setCmdSuggestion('');
                                    break;

                            case "Tab":
                                setText(`/${cmdSuggestion} `);
                                setTimeout(() => {
                                    inputRef.current?.focus(); 
                                }, 50);
                                break;

                            case "ArrowUp":
                                {
                                    if(clipboard.messages.length === 0)
                                        return;

                                    if(clipboard.index! <= 0)
                                        newState.index = clipboard.messages.length-1;
                                    else 
                                        newState.index = clipboard.index!-1;
                                    
                                    setClipboard(newState);
                                    setText(clipboard.messages[clipboard.index!])
                                    break;
                                }

                            case "ArrowDown":
                            {
                                if(clipboard.messages.length === 0)
                                    return;

                                if(clipboard.index! >= clipboard.messages.length-1)
                                    newState.index = 0;
                                else 
                                    newState.index = clipboard.index!+1;
                                
                                setClipboard(newState);
                                setText(clipboard.messages[clipboard.index!])
                                break;
                            }    
                            
                        }               
                    }}>
                        <Input ref={inputRef} placeholder="Type a message..." width={settings.width-80} height={21} value={text} onChange={(e) => {
                            setText(e.target.value)

                            if(text.length <= 2 || !text.startsWith("/"))
                                return;
            
                            if(text.length > cmdSuggestion.length && cmdSuggestion.length != 0)
                                return setCmdSuggestion('');

                            commands.map(cmd => {
                                if(cmd.startsWith(text.split("/")[1].split(" ")[0].toLowerCase()))
                                {
                                    setCmdSuggestion(cmd)
                                    return;
                                }
                            })
                        }}/>


                        { (cmdSuggestion !== "" && text.length != 0) &&
                            <div id="command-result" style={{
                                position: "absolute",
                                marginTop: "25px",
                                marginLeft:"2px",
                                width: `${settings.width-75}px`,
                                display:"block",
                                fontSize: "7px",
                            }}>
                            <h1 id="command-name" style={{
                                display: "inline-flex",
                                fontSize: "6px",
                                color: "white",
                                textShadow: "0px 0px 5px black",
                                fontFamily:"barlow"
                            }} dangerouslySetInnerHTML={formatText()}></h1>
                         </div>                     
                        }
   
                        <Button backgroundColor="#047fc2" style={{marginLeft: "2px"}} icon={<SettingsIcon/>} onClick={() => {
                            setSettings({
                                ...settings,
                                settingsOpened: !settings.settingsOpened
                            });
                        }} height={30}/>

                        <Button icon={<SendIcon/>} style={{ marginLeft: "2px" }}backgroundColor="green" onClick={() => {
                            mp.trigger("chat.broadcast.message", text);
                            setCmdSuggestion('');
                        }} height={30}/>

                        
                        { settings.settingsOpened && <Settings width={settings.width} height={settings.height} links={settings.links} timestamp={settings.timestamp} fontSize={settings.fontSize} spacing={settings.spacing} resetToDefault={() => {
                            setSettings(defaultSettings)
                        }} 
                        setFontsize={(val: number) => {
                            setSettings({
                                ...settings,
                                fontSize: val
                            })
                        }}

                        setLinks={(val: boolean) => {
                            setSettings({
                                ...settings,
                                links: val
                            })
                        }}

                        setTimestamp={(val: boolean) => {
                            setSettings({
                                ...settings,
                                timestamp: val
                            })
                        }}

                        setSpacing={(val: number) => {
                            setSettings({
                                ...settings,
                                spacing: val
                            })
                        }}

                        setWidth={(val: number) => {
                            setSettings({
                                    ...settings,
                                    width: val
                                })
                            }
                        }
                        setHeight={(val: number) => {
                            setSettings({
                                    ...settings,
                                    height: val
                                })
                            }
                        }
                        /> }
                    </div>
                }
            </>
        }
            


        </div>
    );
};

export default Chat;