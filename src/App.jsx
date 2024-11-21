//import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog"
import { Store } from "@tauri-apps/plugin-store"
import { readTextFile } from "@tauri-apps/api/fs";
import { resolveResource } from "@tauri-apps/api/path";
import infoIcon from "./assets/info-offwhite.png"
import trashIcon from "./assets/Trash.png"
import SideButton from "./components/sideButton";
import "./App.css";
import { useState, useEffect } from "react";
import ModuleCore from "./components/moduleCore.jsx"
import InputSmall from "./components/moduleInputSmall.jsx"
import InputMedium from "./components/moduleInputMedium.jsx"
import InputLarge from "./components/moduleInputLarge.jsx"
import InputXLarge from "./components/moduleInputXLarge.jsx"
import TextArea from "./components/moduleTextArea.jsx"

function App() {

  const textarealist = document.querySelectorAll("textarea")
  textarealist.forEach(x => {
    x.addEventListener("keyup" , e => {
      x.style.height = "95px"
      let scHeight = e.target.scrollHeight
      x.style.height = `${scHeight}px`
    })
  })

  async function returnObj() {
    let path = await resolveResource("config/config.json")
    let rawData = await readTextFile(path)
    let exportObj = JSON.parse(rawData)
    return exportObj
  }

  let [configObj, setConfigObj] = useState()

  useEffect(() => {
    async function returnObj() {
      let path = await resolveResource("config/config.json")
      let rawData = await readTextFile(path)
      let exportObj = JSON.parse(rawData)
      setConfigObj(exportObj)
      return exportObj
    }
    returnObj()
  }, [])

  let [modalContents, setModalContents] = useState({
    "name": "none",
    "verboseName": "none",
    "body": "none"
  })

  let [displayModal, setDisplayModal] = useState(false)

  function modalOFF() {
    setDisplayModal(false)
  }

  function modalON() {
    setDisplayModal(true)
  }

  const store = new Store("store.bin")

  async function initStore() {
    await store.set("init", { value: true })
  }

  async function initVerify() {
    let val = await store.get("init")
    return val
  }

  initStore()
  console.log(`initStore: ${initVerify()}`)

  const readFileContents = async () => {
    try {
      const selectedPath = await open({
        multiple: false,
        title: "Edit Config",
        defaultPath: await resolveResource("config/")
      });

      if (!selectedPath) { return }
      else { return }

    } catch (error) {
      alert("Invalid Data File")
      console.log(error)
    }
  }

  function createModule() {
    console.log("run create module")
  }

  function descPopUp() {
    let x = event.target.id
    modalON()
    let exportObj = {
      "name": x,
      "verboseName": configObj[x]["verboseName"],
      "body": configObj[x]["desc"]
    }
    console.log(exportObj)
    setModalContents(exportObj)
  }

  function copyToClip() {
    console.log("copy to clip ran")

    console.log(<InputSmall label={"test"}/>)
  }

  function deleteModule() {
    console.log(event.target)
  }

  function moduleUp() {
    let targetIndex = parseInt(event.target.id)
    let tempTrigger = moduleData.list.map(item => item.index).indexOf(targetIndex)
    if (tempTrigger == 0) {
      return
    }
    
    let triggerStore = moduleData.list[tempTrigger]
    let targetStore = moduleData.list[tempTrigger-1]

    let bufferlist = moduleData.list.map(x => x)

    bufferlist[tempTrigger] = targetStore
    bufferlist[tempTrigger-1] = triggerStore

    setModuleData((prevObj) => {
      return (
        {
          ...prevObj,
          list : bufferlist
        }
      )
    })
  }

  function moduleDown() {
    let targetIndex = parseInt(event.target.id)
    let tempTrigger = moduleData.list.map(item => item.index).indexOf(targetIndex)
    if (moduleData.list.length <= tempTrigger + 1) {
      return
    }
    
    let triggerStore = moduleData.list[tempTrigger]
    let targetStore = moduleData.list[tempTrigger+1]

    let bufferlist = moduleData.list.map(x => x)

    bufferlist[tempTrigger] = targetStore
    bufferlist[tempTrigger+1] = triggerStore

    setModuleData((prevObj) => {
      return (
        {
          ...prevObj,
          list : bufferlist
        }
      )
    })

  }

  function handleChange() {
    let value = event.target.value
    let index = event.target.id
    let moduleIndex = parseInt(index.split(":")[0])
    let paramIndex = parseInt(index.split(":")[1])
    let moduleArrIndex = moduleData.list.map(item => item.index).indexOf(moduleIndex)

    let updList = moduleData.list.map(x => x)
    updList[moduleArrIndex].inputs[paramIndex]["value"] = value

    setModuleData((prevObj => {
      return({
        ...prevObj,
        list : updList
      }
      )
    }))
  }

  let coreHandles = {
    "deleteModule" : deleteModule,
    "moduleUp" : moduleUp,
    "moduleDown" : moduleDown,
    "trashIcon" : trashIcon,
    "handleChange" : handleChange
  }


  function renderCoreComponent(index , label , params) {
    return <ModuleCore index={index} label={label} params={params} coreHandles={coreHandles}/>  
  }


  let [moduleData , setModuleData] = useState(
    {
      counter : 3 ,
      list : [
        {index : 0 , label : "BG" , inputs : [
          {"index" : "0:0" , "key" : "InputSmall" , "label" : "INDEX" , "value" : ""},
          {"index" : "0:1" , "key" : "InputLarge" , "label" : "BG IMAGE" , "value" : ""},
        ]},
        {index : 1 , label : "TEXT" , inputs : [
          {"index" : "1:0" , "key" : "InputXLarge" , "label" : "SPEAKER" , "value" : ""},
          {"index" : "1:1" , "key" : "TextArea" , "label" : "TEXT" , "value" : ""},
        ]},
        {index : 2 , label : "TEXT" , inputs : [
          {"index" : "2:0" , "key" : "InputXLarge" , "label" : "SPEAKER" , "value" : ""},
          {"index" : "2:1" , "key" : "TextArea" , "label" : "TEXT" , "value" : ""},
        ]},
      ]
    }
  )

  return (
    <div id="wrapper" className="">
      <div id="modal-container" className="" style={{ display: displayModal ? "flex" : "none" }} onClick={modalOFF}>
        <div className="modal-box-wrapper" onClick={((e) => e.stopPropagation())}>
          <div className="modal-box">
            <h2 className="modal-header">{`${modalContents["name"]} - ${modalContents["verboseName"]}`}</h2>
            <p>{`${modalContents["body"]}`}</p>
          </div>
        </div>
      </div>
      <div id="navbar-container" className="">
        <div id="title-label" className="">
          <h1><span className="title-font"><em>fScript</em></span> Templater</h1>
        </div>
        <div id="copy-button" className="button-clickable" onClick={copyToClip}> {/* copy to clip button */}
          <h3>Copy to Clipboard</h3>
        </div>
        <div id="config-button" className="button-clickable" onClick={readFileContents}> {/* open config folder button */}
          <h3>Open Config</h3>
        </div>
        <div id="right-spacer" className=""> {/* right side spacer */}</div>
      </div>
      <div id="main-container" className="">
        <div id="entries-wrapper" className="">
          {moduleData.list.map((x) => {
            return renderCoreComponent(x["index"] , x["label"] , x["inputs"])
          })}
        </div>
        <div id="sidebar-container" className="">
          <div id="sidebar-header" className="">
            <h2>Select Modules</h2>
          </div>
          {!configObj ? "" : Object.keys(configObj).map((x) => {
            return (
              <SideButton key={x} id={x} name={x} createModule={createModule} descPopUp={descPopUp} infoIcon={infoIcon} />
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
