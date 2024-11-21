import InputSmall from "./moduleInputSmall.jsx"
import InputMedium from "./moduleInputMedium.jsx"
import InputLarge from "./moduleInputLarge.jsx"
import InputXLarge from "./moduleInputXLarge.jsx"
import TextArea from "./moduleTextArea.jsx"

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
            default:
                return null
        }
    }

    let testArr = [{"key" : "InputLarge" , "label" : "TEST" , "value" : ""} , {"key" : "InputSmall" , "label" : "TEST 2" , "value" : ""} , {"key" : "TextArea" , "label" : "TEST AREA" , "value" : ""}]

    return (
        <>
            <div className="module-core-container">
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
                    <h1>{`${props.label}`}</h1>
                </div>
                <div className="module-core-separator">

                </div>
                <div className="module-core-parameters">
                    {
                        props.params.map(x => {
                            return renderComponent(x["index"] , x["key"] , x["label"] , x["value"])
                        })
                    }
{/*                     {props.modules.map(x => {
                        return x
                    })} */}
                </div>
                <div className="module-core-delete">
                    <img id={props.index} height="50px" width="50px" src={props.coreHandles.trashIcon} style={{ userSelect: "none" }} onClick={props.coreHandles.deleteModule}></img>
                </div>
            </div>
        </>
    )
}