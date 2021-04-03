import React from 'react';
import './Chunk.css';
import autosize from "autosize"

class Chunk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caret: -1,
      indent: props.indent,
      textarea: null,
      txt: props.txt,
    }
    this.indentText = this.indentText.bind(this);
    this.unindentText = this.indentText.bind(this);
  }
  /*
  make the textbox scale with text
  - expand to infinite length
  */
  indentText() {
    this.setState(state => ({
      indent: state.indent + 1
    }));
  }
  unindentText() {
    this.setState(state => ({
      indent: state.indent - 1
    }));
  }
  handleSelect() {
    this.setState({
      // caret: this.textarea.selectionStart
      caret: document.activeElement.selectionStart
    });
  }
  handleBlur() {
    this.setState({
      caret: -1
    });
  }
  handleChange(event) {
    var txt = this.textarea.value.replace(/\n\r?/g, '<br />'); //preserve the "\n" character
    this.setState({
    	txt: txt
    })
  }
  handleChange(event) {
    var txt = this.textarea.value.replace(/\n\r?/g, '<br />'); //preserve the "\n" character
    this.setState({
    	txt: txt
    })
  }
  componentDidMount() {
    this.textarea.focus();
    // set margin
    var marg = this.state.indent*4;
    this.textarea.style.marginRight = `${marg}em`;
    // autosize textarea
    autosize(document.activeElement);
    console.log(this.textarea.style);
  }
  render() {
    let chunk = <textarea 
    	class = "chunk"
      ref = {c => (this.textarea = c)}
      onSelect={this.handleSelect.bind(this)} 
      onBlur={this.handleBlur.bind(this)}
      onChange={this.handleChange.bind(this)}
      defaultValue={this.state.txt}
    />
	
    return (
      <div>
        {chunk}
        <p><b>caret position</b></p>
        {this.state.caret}
        <p><b>text</b></p>
        {this.state.txt}
        <p><b>text prior to caret</b></p>
        {this.state.txt.substr(0, this.state.caret)}
      </div>
    )
  }
}
export default Chunk;