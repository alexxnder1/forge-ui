import "./Loading.css";

import SyncIcon from '@mui/icons-material/Sync';

interface LoadingProps {
    style?: React.CSSProperties
}

const Loading = (props: LoadingProps) => {
    return (
        <div id="loading" style={{ width:"100%", height: "100%", top: 0, left: 0, position:"absolute", display:"flex", justifyContent:"center", alignItems:"center"}}>
            <SyncIcon id="loading-icon"  style={{animation: "spin 10s infinite", ...props.style}}/>
        </div>
    )

};

export default Loading;