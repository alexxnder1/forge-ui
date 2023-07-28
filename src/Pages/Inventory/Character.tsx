const Character = () => {
    return (
        <div id="character" style={{
            display: "flex",
            alignItems:"center",
            justifyContent:"center",
            flexDirection:"column"
                        
        }}>
            <h1 style={{
                fontFamily:"roboto",
                fontSize: 16,
            }}>dev(1)</h1>
            <img src="person.png" style={{
                width: "450px",     
                height: "450px",                   
            }}/>

        </div>
    )
};

export default Character;