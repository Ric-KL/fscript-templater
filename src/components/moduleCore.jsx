
export default function ModuleCore(props) {

    let count = 0

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
                    {props.modules.map(x => {
                        return x
                    })}
                </div>
                <div className="module-core-delete">
                    <img id={props.index} height="50px" width="50px" src={props.coreHandles.trashIcon} style={{ userSelect: "none" }} onClick={props.coreHandles.deleteModule}></img>
                </div>
            </div>
        </>
    )
}