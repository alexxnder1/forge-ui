// Icons
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TagIcon from '@mui/icons-material/Tag';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

// Deps
import { useEffect,useState } from 'react';
import Loading from '../../../Components/Loading/Loading';

// Styless
const IconStyle: React.CSSProperties = {
    width: "15px",
    paddingRight:"5px",
    color: "#328da8",
}

const StatusStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center"
}

// Interfaces
interface StatsInterface {
    clock: string,
    date: string,
    username: string,
    id: number,
    cash: number,
    bank: number
}

// Render
const Stats = () => {
    const defaultState: StatsInterface = {
        clock: "", date: "", username: "", id: -1, cash: 20, bank: 20
    }
    const [stats, setStats] = useState<StatsInterface>(defaultState);

    useEffect(() => {
        const interval = setInterval(() => {
            setStats({...stats, date: new Date().toLocaleDateString("ro"), clock: new Date().toLocaleTimeString("ro")});
        }, 1000);

        return () => clearInterval(interval);
    });
    
    window.SetStatsData = (username: string, id: number) => {
        setStats({...stats, username: username, id: id});
    }

    window.SetMoney = (c: number, b: number) => {
        setStats({...stats, cash: c, bank: b});
    }

    return (
        <div id="hud-stats" style={{
            position: "absolute",
            borderRadius:"20px",
            right: 5,
            width: "250px",
            height: "150px",
            display: "flex",
            justifyContent:"end",
            fontFamily:"roboto",
            color: "white",
            textShadow: "0px 0px 5px black", 
            fontSize:"6.2px",
        }}>
            
            {
                stats.clock === defaultState.clock 
                ?
                <Loading/>
                :
                <>
                    <div id="stats-container" style={{
                        position: "absolute",
                        justifyContent:"end",
                        right: 50,
                        top: 5
                    }}>
        
                    <div style={{float:"right"}}>
                        <div id="stats-username" style={StatusStyle}>
                            <AccountCircleIcon style={IconStyle}/>
                            <h1>{stats.username}</h1>
                        </div>
        
                        <div id="stats-id" style={{marginLeft:"20px", ...StatusStyle}}>
                            <TagIcon style={IconStyle}/>
                            <h1>{stats.id}</h1>
                        </div>
                    </div>
                        
                    <div style={{float:"right",marginTop:"-10px"}}>
                        <div id="stats-clock" style={StatusStyle}>
                            <WatchLaterIcon style={IconStyle}/>
                            <h1>{stats.clock}</h1>
                        </div>
        
                        <div id="stats-date" style={{marginLeft: "20px", ...StatusStyle}}>
                            <CalendarMonthIcon style={IconStyle}/>
                            <h1>{stats.date}</h1>
                        </div>
                    </div>
    
                    </div>
        
                    <img src={`beta-logo192.png`} alt="server-logo" style={{
                        marginTop: "5px", right: 10, width: "50px", height: "50px"
                    }}></img>
                    
                    <div id="bottom-stats" style={{
                        position:"absolute",
                        marginTop: "70px",
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"end",
                    }}>   
                        <div id="stats-cash" style={{marginLeft: "20px", ...StatusStyle}}>
                            <AttachMoneyIcon style={IconStyle}/>
                            <h1>${stats.cash.toLocaleString()}</h1>
                        </div>       

                        <div id="stats-bank" style={{marginTop: "-10px", marginLeft: "20px", ...StatusStyle}}>
                            <AccountBalanceIcon style={IconStyle}/>
                            <h1>${stats.bank.toLocaleString()}</h1>
                        </div> 
                    </div>
                </>
            }
        </div>
    )
};

export default Stats;