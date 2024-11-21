export default function TextArea(props) {
    let style = {
        margin : "0px",
        boxSizing : "border-box",
        minHeight : "95px",
        height : "100%",
        width : "100%",
        fontSize : "25px",
        resize : "none"
    }

    return(
        <>
            <textarea id={props.index} placeholder={props.label ? props.label : "N/A"} style={style} value={props.value ? props.value : ""} onChange={props.handleChange}></textarea>
        </>
    )
}