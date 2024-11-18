export default function SideButton(props) {

    return (
        <div className=" sidebar-button-container">
        <div className="button-sidebar">
          <div id={props.id} className="side-button-label"  onClick={props.createModule}>
            <h1>{props.name}</h1>
          </div>
          <div id={props.id} className="side-info-button" onClick={props.descPopUp}>
            <img id={props.id} className="side-info-icon" src={props.infoIcon} height="40px" width="40px" style={{userSelect: "none"}}></img>
          </div>
        </div>
      </div>
    )
}

