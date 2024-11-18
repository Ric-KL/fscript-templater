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
            <textarea id={props.id} placeholder={props.label ? props.label : "N/A"} style={style} onChange={props.updateInput}></textarea>
        </>
    )
}