import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App/App";

createMountPoint()
ReactDOM.render(<App/>, document.getElementById("app"))

function createMountPoint() {
  document.body.innerHTML = "<div id='app'></div>"
}