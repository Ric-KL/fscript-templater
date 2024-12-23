export default function InputSmallIndex(props) {
    
    let backgroundRGBA = "255 , 255 , 255"

    if (parseInt(props.value) != 0) {
        backgroundRGBA = "225 , 255 , 225"
    }
    else{
        backgroundRGBA = "255 , 255 , 255"
    }

    
    let style = {
        margin : "0px",
        boxSizing : "border-box",
        height : "50px",
        width : "100px",
        fontSize : "25px",
        backgroundColor :  `rgb(${backgroundRGBA})`
    }

    
    return(
        <>
            <input id={props.index} placeholder={props.label ? props.label : "N/A"} style={style} onChange={props.handleChange} value={props.value ? props.value : ""}></input>
        </>
    )
}