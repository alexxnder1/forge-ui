interface HeadingProps {
    content?: string,
    style?: React.CSSProperties | undefined
}

const Heading = (props: HeadingProps) => {
    return (
        <div id="Heading">
            <h1 style={{textShadow:"0px 0px 10px black", ...props.style}}>{props.content}</h1>
        </div>
    )

}

export default Heading;