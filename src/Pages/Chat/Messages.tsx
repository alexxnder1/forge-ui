import LinkIcon from '@mui/icons-material/Link';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import Button from "../../Components/Button";
import { ChatSettings, Message } from './Chat';
import { regex } from '../..';

export interface MessagesProps {
    messages: Array<Message>,
    settings: ChatSettings,
}

const Messages = (props: MessagesProps) => {
    const messageStyle: React.CSSProperties = {
        overflowWrap:"break-word",
        fontSize:`${props.settings.fontSize}px`,
        paddingLeft: "10px",
        fontFamily:"Roboto",
        color: "white", 
        textShadow: "0px 0px 6px black",
        paddingBottom: `${props.settings.spacing}px`
    };

    const formatColors = (text: string): string => {
        const matches = text.split(regex);
        console.log(matches)
        matches.forEach((m, index) => {
            if(m.startsWith("#")) {
                matches[index] = `<span style="color: ${m}">`;
                delete matches[index+1];
            }
        });              
        
        return matches.join("");
    };

    return (
        <div id="chat-messages">
            {
                props.messages.map((msg: Message, index: number )=> {
                    return (
                        <>
                            <div key={index} style={{
                                marginBottom: "-30px",
                                lineBreak: "anywhere",                        
                                alignItems: "center"
                            }}>

                                
                            <h1 style={messageStyle} dangerouslySetInnerHTML={{
                                __html: `
                                    <h1 style="${messageStyle}">
                                        <span style="color: grey">
                                            ${props.settings.timestamp && msg.timestamp}
                                        </span>
                                        ${msg.from && `${msg.from}:`}
                                        <span style="font-weight: normal">
                                            ${!msg.local ? formatColors(msg.content) : msg.content}
                                        </span>
                                    </h1>`
                                }}
                            />   
                            
                            { ( msg.links && props.settings.links) && 
                                <div style={{ display: "inline-flex", paddingBottom: "15px", marginTop: "-10px", alignItems:"center" }}>
                                    <SubdirectoryArrowRightIcon style={{ marginLeft: `${props.settings.timestamp ? '10px' : '5px'}`, color: "white"}}/>
                                    <h1 style ={{
                                        fontSize: `${props.settings.fontSize}px`,
                                        fontFamily: "barlow",
                                        color: "white",
                                        marginLeft: "0px",
                                        textShadow: "0px 0px 5px black",
                                    }}>Links: </h1>
                                    {
                                        msg.links.map(link => {
                                            return(
                                                <>
                                                {
                                                    link.domain !== undefined &&  
                                                    <Button                         
                                                    style={{fontSize: `${props.settings.fontSize}px`, marginLeft: "10px"}} height={props.settings.fontSize} text={`${link.domain}`} backgroundColor="#4287f5" icon={<LinkIcon/>} onClick={() => mp.trigger('chat.test', link.url)}/>
                                                }
                                                </>
                                            )
                                        })
                                    }
                                </div>
                               }
                            </div>
                            <br/>
                        </>
                    )
                })
            }
        
        </div>
    )
}

export default Messages;