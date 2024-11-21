export default function InputSmall(props) {
    let style = {
        margin : "0px",
        boxSizing : "border-box",
        height : "50px",
        width : "100px",
        fontSize : "25px",
    }

    return(
        <>
            <input id={props.index} placeholder={props.label ? props.label : "N/A"} style={style} onChange={props.handleChange} value={props.value ? props.value : ""}></input>
        </>
    )
}