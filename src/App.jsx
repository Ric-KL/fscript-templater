//import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog"
import { Store } from "@tauri-apps/plugin-store"
import { readTextFile } from "@tauri-apps/api/fs";
import { resolveResource } from "@tauri-apps/api/path";
import infoIcon from "./assets/info-offwhite.png"
import trashIcon from "./assets/TrashAlt.png"
import SideButton from "./components/sideButton";
import "./App.css";
import { useState, useEffect } from "react";
import ModuleCore from "./components/moduleCore.jsx"

function App() {

  /*   const textarealist = document.querySelectorAll("textarea")
    textarealist.forEach(x => {
      x.addEventListener("keyup" , e => {
        x.style.height = "95px"
        let scHeight = e.target.scrollHeight
        x.style.height = `${scHeight}px`
      })
    }) */

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

  const readSaveFiles = async () => {
    try {
      const selectedPath = await open({
        multiple: false,
        title: "Select Save",
        defaultPath: await resolveResource("config/saves/")
      });

      let strData = await readTextFile(selectedPath);

      let indexParam = {
        "key": "InputSmall",
        "label": "BRANCH",
        "dtype": "int",
        "defValue": "0"
      }

      let modulesRaw = strData.split("\r\n")

      let modsData = []

      modulesRaw.forEach(x => {
        let modVals = x.split("\t")
        
        let typeCode = modVals[0]
        typeCode = typeCode.replace(/" "/gi , "")
        let typeCodeLength = typeCode.length
        if (typeCodeLength < 4) {
          let difference = 4 - typeCodeLength
          typeCode = typeCode + " ".repeat(difference)
          console.log(difference , typeCodeLength , typeCode)
        }

        modVals.shift()
        
        let modObj = { [[typeCode]]: [] }
        
        let modObjVals = []
        modVals.forEach(y => {
          modObjVals.push(y)
        })
        modObj[[typeCode]] = modObjVals
        modsData.push(modObj)
      })

      modsData.forEach(x => {
        console.log(x)
        createModuleFromData(x)
      })

      if (!selectedPath) { return }
      else { return }

    } catch (error) {
      alert("No file selected.")
      console.log(error)
    }
  }

  function createModule() {
    let mainIndex = moduleData.counter
    let updIndex = mainIndex + 1
    let confKey = event.target.id

    let newInputs = []

    let indexParam = {
      "index": `${mainIndex}:0`,
      "key": "InputSmall",
      "label": "INDEX",
      "value": "0",
      "dType": "int"
    }

    newInputs.push(indexParam)

    //${parseInt(x.index) + 1}

    configObj[confKey].params.forEach(x => {
      let newParam = {
        "index": `${mainIndex}:${newInputs.length}`,
        "key": x.key,
        "label": x.label,
        "value": x.defValue ? x.defValue : "",
        "dType": x.dType
      }

      newInputs.push(newParam)
    })

    let newModule = { index: mainIndex, label: confKey, inputs: newInputs }

    setModuleData((prevObj) => {
      return (
        {
          "counter": updIndex,
          "list": [
            ...prevObj.list,
            newModule
          ]
        }
      )
    })
  }

  function createModuleFromData(obj) {
    let mainIndex = moduleData.counter
    let updIndex = mainIndex + 1
    let confKey = Object.keys(obj)[0]

    let newInputs = []

    let indexParam = {
      "index": `${mainIndex}:0`,
      "key": "InputSmall",
      "label": "INDEX",
      "value": obj[confKey][0],
      "dType": "int"
    }

    newInputs.push(indexParam)

    //${parseInt(x.index) + 1}

    configObj[confKey].params.forEach(x => {
      let parityIndex = configObj[confKey].params.indexOf(x)
      let newParam = {
        "index": `${mainIndex}:${newInputs.length}`,
        "key": x.key,
        "label": x.label,
        "value": obj[confKey][parityIndex + 1],
        "dType": x.dType
      }

      newInputs.push(newParam)
    })

    let newModule = { index: mainIndex, label: confKey, inputs: newInputs }

    setModuleData((prevObj) => {
      return (
        {
          "counter": updIndex,
          "list": [
            ...prevObj.list,
            newModule
          ]
        }
      )
    })
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
    readModules()
    console.log(moduleData)
  }


  function resetEnv() {
    setModuleData(
      {
        counter: 0,
        list: []
      }
    )
    localStorage.removeItem("data")
  }


  function deleteModule() {
    let indexID = parseInt(event.target.id)
    let arrIndex = parseInt(moduleData.list.map(item => item.index).indexOf(indexID))

    let bufferlist = moduleData.list.map(x => x);

    bufferlist.splice(arrIndex, 1)

    setModuleData((prevObj) => {
      return (
        {
          ...prevObj,
          list: bufferlist
        }
      )
    })
  }

  function moduleUp() {
    let targetIndex = parseInt(event.target.id)
    let tempTrigger = moduleData.list.map(item => item.index).indexOf(targetIndex)
    if (tempTrigger == 0) {
      return
    }

    let triggerStore = moduleData.list[tempTrigger]
    let targetStore = moduleData.list[tempTrigger - 1]

    let bufferlist = moduleData.list.map(x => x)

    bufferlist[tempTrigger] = targetStore
    bufferlist[tempTrigger - 1] = triggerStore

    setModuleData((prevObj) => {
      return (
        {
          ...prevObj,
          list: bufferlist
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
    let targetStore = moduleData.list[tempTrigger + 1]

    let bufferlist = moduleData.list.map(x => x)

    bufferlist[tempTrigger] = targetStore
    bufferlist[tempTrigger + 1] = triggerStore

    setModuleData((prevObj) => {
      return (
        {
          ...prevObj,
          list: bufferlist
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
      return ({
        ...prevObj,
        list: updList
      }
      )
    }))
  }

  let coreHandles = {
    "deleteModule": deleteModule,
    "moduleUp": moduleUp,
    "moduleDown": moduleDown,
    "trashIcon": trashIcon,
    "handleChange": handleChange
  }


  function renderCoreComponent(index, label, params) {
    return <ModuleCore index={index} label={label} params={params} coreHandles={coreHandles} />
  }


  let [moduleData, setModuleData] = useState(localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : { "counter": 0, "list": [] })

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(moduleData))
    const textarealist = document.querySelectorAll("textarea")
    textarealist.forEach(x => {
      x.style.height = "95px"
      x.style.height = `${x.scrollHeight}px`
    })
  }, [moduleData])


  function readModules() {
    let fscriptStr = ""
    let dataList = moduleData.list
    dataList.forEach(x => {
      let pushStr = x.label
      x.inputs.forEach(y => {
        pushStr = pushStr + `\t${y.value}`
      })
      fscriptStr = fscriptStr + `${pushStr}\n`
    })
    navigator.clipboard.writeText(fscriptStr)
  }


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
        <div id="reset-button" className="button-clickable" onClick={resetEnv}> {/* copy to clip button */}
          <h3>Reset Env.</h3>
        </div>
        <div id="copy-button" className="button-clickable" onClick={copyToClip}> {/* copy to clip button */}
          <h3>Copy to Clip.</h3>
        </div>
        <div id="config-button" className="button-clickable" onClick={readFileContents}> {/* open config folder button */}
          <h3>Open Config</h3>
        </div>
        <div id="saves-button" className="button-clickable" onClick={readSaveFiles}> {/* open saves folder to load */}
          <h3>Load</h3>
        </div>
        <div id="saves-button" className="button-clickable" onClick={readSaveFiles}> {/* writes save to folder */}
          <h3>Save</h3>
        </div>
        <div id="right-spacer" className=""> {/* right side spacer */}</div>
      </div>
      <div id="main-container" className="">
        <div id="entries-wrapper" className="">
          {moduleData.list.map((x) => {
            return renderCoreComponent(x["index"], x["label"], x["inputs"])
          })}
        </div>
        <div id="sidebar-container" className="">
          <div id="sidebar-header" className="">
            <h2>Select Modules</h2>
          </div>
          <div id="side-buttons-container" className="">
            {!configObj ? "" : Object.keys(configObj).map((x) => {
              return (
                <SideButton key={x} id={x} name={x} createModule={createModule} descPopUp={descPopUp} infoIcon={infoIcon} />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
