import { useState    } from "react";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Heading from "../../Components/Heading";

// Icons
import KeyIcon from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import Loading from "../../Components/Loading/Loading";

const enum AuthTypes {
    LOGIN = 0,
    REGISTER = 1
}

const Authentication = () => {
    const [type, setType] = useState(AuthTypes.REGISTER);
    
    window.SetLogin = () => {
        setType(AuthTypes.LOGIN);
    }

    window.SetUsername = (name: string) => {
        setUsername(name);
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [email, setEmail] = useState('');
    
    return (
        <div id="Register" style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                height: "100%",
                alignItems: "center",
                textAlign:"center", 
                fontFamily: 'Barlow',
                overflow: "hidden",
                // margin: 0,
            }}>
            <div style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: "black",
                top: 0,
                opacity: 0.6,
                zIndex: -1
            }}/>

            {
                username !== ""
                ?
                <>     
                    <Heading style={{ fontSize:"x-large", color:"white" }} content={type === AuthTypes.LOGIN ? "Login" : "Register"}/>
                    <Heading style={{ fontSize: "small", color:"white" }} content={"Please fill all blank fields with your account data"}/> 
                    <div style={{ padding: "50px" }}>
                        <Input placeholder="Username" readOnly={true} icon={<PersonIcon/>} value={username}></Input>
                        <Input type={"password"} placeholder="Password" icon={<KeyIcon/>} value={password} onChange={(e) => setPassword(e.target.value)}/>
                        {type === AuthTypes.REGISTER && 
                        <>
                            <Input type={"password"} placeholder="Confirm Password" icon={<KeyIcon/>} value={cpassword} onChange={(e) => setCPassword(e.target.value)}/>
                            <Input type={"email"} placeholder="Email" icon={<AlternateEmailIcon/>} value={email} onChange={(e) => setEmail(e.target.value)}/>        
                        </>
                        }
                    </div>

                    <Button icon={<LabelImportantIcon/>} style={{marginTop: "20px"}} backgroundColor={"green"} textColor={"white"} text={"Proceed"} onClick={() => {
                        if(type === AuthTypes.LOGIN) {
                            mp.trigger("auth.submit.login", password);
                        }

                        else {
                            mp.trigger("auth.submit.register", password, cpassword, email);
                        }
                    }}/>
                </>

                :
                <Loading/>
            }
        </div>
    )
};

export default Authentication;