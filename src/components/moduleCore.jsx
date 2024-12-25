import InputSmall from "./moduleInputSmall.jsx"
import InputMedium from "./moduleInputMedium.jsx"
import InputLarge from "./moduleInputLarge.jsx"
import InputXLarge from "./moduleInputXLarge.jsx"
import TextArea from "./moduleTextArea.jsx"
import InputSmallIndex from "./moduleInputSmallIndex.jsx"

export default function ModuleCore(props) {

    let count = 0

    function renderComponent(index , key , label , value) {
        switch(key) {
            case "InputSmall":
                return <InputSmall index={index} label = {label} value = {value} handleChange={props.coreHandles.handleChange}/>
            case "InputMedium":
                return <InputMedium index={index} label = {label} value = {value} handleChange={props.coreHandles.handleChange}/>
            case "InputLarge":
                return <InputLarge index={index} label = {label} value = {value} handleChange={props.coreHandles.handleChange}/>
            case "InputXLarge":
                return <InputXLarge index={index} label = {label} value = {value} handleChange={props.coreHandles.handleChange}/>
            case "TextArea":
                return <TextArea index={index} label = {label} value = {value} handleChange={props.coreHandles.handleChange}/>
            case "InputSmallIndex":
                return <InputSmallIndex index={index} label = {label} value = {value} handleChange={props.coreHandles.handleChange}/>
            default:
                return null
        }
    }

    let highlightColor = "#494949"
    let colorMode = ""

    if (parseInt(props.params[0].value) == 0) {
        highlightColor = "#494949"
    }
    else if (parseInt(props.params[0].value) == 1) {
        highlightColor = "RGB(225 , 255, 225)"
        colorMode = "difference"
    }
    else if (parseInt(props.params[0].value) == 2) {
        highlightColor = "RGB(105 , 255, 255)"
        colorMode = "difference"
    }

    let style = {
        backgroundColor : highlightColor
    }

    return (
        <>
            <div className="module-core-container" style={style}>
                <div className="module-core-mover-container">
                    <div className="module-core-mover">
                        <div id={props.index} className="module-core-mover-button" onClick={props.coreHandles.moduleUp}>
                            <h4 id={props.index}>▲</h4>
                        </div>
                    </div>
                    <div className="module-core-mover">
                        <div id={props.index} className="module-core-mover-button" onClick={props.coreHandles.moduleDown}>
                            <h4 id={props.index}>▼</h4>
                        </div>
                    </div>
                </div>
                <div className="module-core-label">
                    <h1 style={{mixBlendMode : colorMode}}>{`${props.label}`}</h1>
                </div>
                <div style={{mixBlendMode : colorMode}} className="module-core-separator">

                </div>
                <div className="module-core-parameters">
                    {
                        props.params.map(x => {
                            return renderComponent(x["index"] , x["key"] , x["label"] , x["value"])
                        })
                    }
                </div>
                <div className="module-core-delete">
                    <img id={props.index} height="50px" width="50px" src={props.coreHandles.trashIcon} style={{ userSelect: "none" }} onClick={props.coreHandles.deleteModule}></img>
                </div>
            </div>
        </>
    )
}