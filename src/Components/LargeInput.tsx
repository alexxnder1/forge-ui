import Button from "./Button";
import Input from "./Input";

interface LargeInputProps {
    title: string,
    value: any,
    buttonText: string,
    onExit: () => void;
    onChange?:(e: React.ChangeEvent<HTMLInputElement>) => void,
    onClick: () => void;
}

const LargeInput = (props: LargeInputProps) => {
    return (
        <div id="large-input" style={{ textAlign:"center", display: 'inline-flex', fontFamily:"roboto", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>
            <h1>{props.title.toUpperCase()}</h1>
            
            <Input style={{textAlign:"center", fontSize:"35px"}} type='number' value={props.value} onChange={props.onChange!} placeholder="amount"/>                
            <Button onClick={props.onClick} 
            backgroundColor="rgba(34, 46, 80, .8)" width={80} height={35} text={props.buttonText} style={{
                marginTop: "20px"
            }}/>
            <Button onClick={props.onExit} width={80} height={35} text={'Cancel'} backgroundColor="rgba(176, 16, 16, 0.8)" style={{
              marginTop: "10px"
        }}/>
        </div>
    )
};

export default LargeInput;