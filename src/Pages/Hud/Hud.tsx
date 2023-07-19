import BottomStats from "./BottomStats/BottomStats";
import TopStats from "./TopRight/TopRightStats";

const Hud = () => {
    return (
        <div id="hud">
            <TopStats/>
            <BottomStats/>
        </div>
    )
}

export default Hud;