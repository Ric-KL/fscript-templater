export default function InputMedium(props) {
    let style = {
        margin : "0px",
        boxSizing : "border-box",
        height : "50px",
        width : "300px",
        fontSize : "25px",
    }

    return(
        <>
            <input id={props.id} placeholder={props.label ? props.label : "N/A"} style={style} onChange={props.updateInput} value={props.value ? props.value : ""}></input>
        </>
    )
}