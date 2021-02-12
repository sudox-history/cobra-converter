import React, {useRef} from "react"
import Field from "../Field/Field";
import {encode, decode} from "@msgpack/msgpack";

import "./App.css"

export default function App() {
  let jsonField = useRef<Field>()
  let msgpackField = useRef<Field>()

  function handleJsonField(value: string) {
    try {
      msgpackField.current.setValue(toHexString(encode(JSON.parse(value))))
    } catch (e) {
      msgpackField.current.setValue("")
    }
  }

  function handleMsgPackField(value: string) {
    formatMsgPackField(value)
    try {
      jsonField.current.setValue(JSON.stringify(decode(fromHexString(value)), null, 4));
    } catch (e) {
      jsonField.current.setValue("")
    }
  }

  function formatMsgPackField(value: string) {
    msgpackField.current.setValue(cleanString(value).join(" ").trim())
  }

  return (
    <div className="App">
      <Field ref={jsonField} title="JSON input:" onReady={handleJsonField}/>
      <Field ref={msgpackField} title="MsgPack output:" onReady={handleMsgPackField}/>
    </div>
  );
}

function toHexString(bytes: Uint8Array): string {
  return bytes
    .reduce((str: string, byte: number) => str + byte.toString(16).padStart(2, '0') + " ", "")
    .trim();
}

function fromHexString(hexString: string): Uint8Array {
  return new Uint8Array(cleanString(hexString).map(byte => parseInt(byte, 16)));
}

function cleanString(str: string = ""): string[] {
  let result = []
  str = str.replace(/ /g, "")

  for (let i = 0; i < str.length; i += 2) {
    result.push(str.substring(i, i + 2))
  }

  return result
}