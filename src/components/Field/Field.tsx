import React, {useRef} from "react"

import "./Field.css"

interface Props {
  title: string,
  onReady: (value: string) => void,
  onFormat?: (value: string) => void,
}

export default class Field extends React.Component<Props> {
  private textArea = React.createRef<HTMLTextAreaElement>()

  constructor(props) {
    super(props);
  }

  public setValue(value: string) {
    this.textArea.current.value = value
  }

  private handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.altKey && event.ctrlKey && event.code == "KeyL") {
      this.props.onFormat?.(this.textArea.current.value)
      return
    }

    if (event.code == "Tab") {
      event.preventDefault()

      // Adding tab
      let position = this.textArea.current.selectionStart
      this.textArea.current.value =
        this.textArea.current.value.substring(0, this.textArea.current.selectionStart) +
        "\t" +
        this.textArea.current.value.substring(this.textArea.current.selectionEnd)

      // Setting caret position
      this.textArea.current.focus();
      this.textArea.current.selectionEnd = position + 1
    }
  }

  private handleKeyPress() {
    this.props.onReady(this.textArea.current.value)
  }

  render() {
    return (
      <div className="Field">
        <div>{this.props.title}</div>
        <textarea ref={this.textArea}
                  className="Field_Editable"
                  onKeyDown={this.handleKeyDown.bind(this)}
                  onKeyUp={this.handleKeyPress.bind(this)}/>
      </div>
    );
  }
}
