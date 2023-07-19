
import { useState, useEffect } from "react";

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import StorageIcon from '@mui/icons-material/Storage';
import GroupsIcon from '@mui/icons-material/Groups';

import * as countriesJSON from "../../countries.json";
import Loading from "../../Components/Loading/Loading";

export interface Server {
    name: string,
    maxPlayers: number
}

export interface Player {
    name: string,
    country: string,
    ping: number,
    id: number
}

const Scoreboard = () => {
    const [server, setServer] = useState<Server>({name: '', maxPlayers: 0});
    const [players, setPlayers] = useState<Array<Player>>([]);

    window.SetPlayers = (np: string) => {
        setPlayers(JSON.parse(np));
    };

    window.SetServer = (s: string) => {
        setServer(JSON.parse(s));
    };

    return (
        <div id ="scoreboard" style={{
            backgroundColor:"rgba(0,0,0,0.8)",
            height: "600px",
            width: "400px",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: "auto",
            color: "white",
            fontSize:"6px",
            overflow: "hidden",
            borderRadius:"5px",
            fontFamily:"raleway",
            boxShadow:"0px 0px 3apx black",
            padding: "10px"
        }}>
            <img src="logo192.png" style={{
                position: "absolute",
                opacity: 0.2,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
            }}/>
            <div id="top-players" style={{
                width: "400px",                                
                display: "inline-flex",
                fontSize: "6px",
                alignItems:"center"
            }}>
                <Grid3x3Icon style={{width:"15px"}}/>
                <h1 style={{marginLeft: "20px"}}>name</h1>
                <h1 style={{marginLeft: "auto"}}>ping</h1>
            </div>
            
            <hr style={{position: "absolute",width:"400px"}}/>
            <div id="players" style={{
                overflowY:"scroll",
                // paddingRight:"50px",
                marginTop: "10px",
                maxHeight:"600px"
            }}>
                {
                    players.length !== 0
                    ?
                    players.map((player, i) => {
                        return (
                            <div id="player" style={{
                                borderRadius:"10px",
                                color: `${i === 0 ? 'grey' : 'white'}`,
                                display: "inline-flex",
                                width: "400px",
                                
                            }}>
                                <h1 style={{ alignItems:"center", display: "inline-flex" }}>{player.id}</h1>
                                <h1 style={{ display:"inline-flex", alignItems:"center", marginLeft: "20px" }}>{player.country !== 'UNKNOWN' ? <img style={{ width: "20px", marginRight:"10px"}} src={`${Array.from(countriesJSON).find(country => country.code === player.country)?.image}`}/> : <QuestionMarkIcon style={{
                                    width: "20px",
                                    height: "15px",
                                    backgroundColor:"white",
                                    marginRight: "7px",
                                    borderRadius:"2px"                                    
                                }}/>}{player.name}</h1>
                                <h1 style={{ marginLeft: "auto"}}>{player.ping}ms</h1>
                            </div>
                        )
                    })
                    :
                    <Loading/>
                }
            </div>

            <div id="server-info" style={{
                position: "fixed",
                bottom: 50,
                width: "400px",
                fontSize:"4px",
                
                display:"inline-flex",
                alignItems:"center",
                fontFamily:"rubik",
                justifyContent:"space-between"            
            }}>
                <h1 style={{ alignItems:"center", display:"inline-flex"}}><StorageIcon style={{marginRight:"5px", width:"10px"}}/>{server.name}</h1>
                <h1 style={{ display: "inline-flex", alignItems:"center" }}><GroupsIcon style={{width:"16px", marginRight: "5px"}}/>{players.length}/{server.maxPlayers}</h1>
            </div>
        </div>
    )
};

export default Scoreboard;