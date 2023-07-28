interface ProgressStyle {
    width: number,
    value: number,
    height: number,
    backgroundColor: string,
    color: string,
    style?: React.CSSProperties
}

const ProgressBar = (props: ProgressStyle) => {
    return (
        <div id="progress-bar" style={{...props.style, 
            backgroundColor: props.backgroundColor,
            height: `${props.height}px`,
            width: `${props.width}px`,
            borderRadius: "10px",
        }}>
            <div id="progress-bar-fill" style={{
                // backgroundColor: props.color,
                width: `${props.value}%`,
                // zIndex: 5
                height: `${props.height}px`,
                borderRadius: "10px",
                // zIndex: 100,
                backgroundColor: props.color
            }}/>
            {/* progress bar la inventar */}
        </div>
    )
};

export default ProgressBar;