import "./Loading.css";

import SyncIcon from '@mui/icons-material/Sync';

interface LoadingProps {
    style?: React.CSSProperties
}

const Loading = (props: LoadingProps) => {
    return (
        <div id="loading" style={{color: "white"}}>
            <SyncIcon id="loading-icon"  style={{animation: "spin 10s infinite", ...props.style}}/>
        </div>
    )

};

export default Loading;