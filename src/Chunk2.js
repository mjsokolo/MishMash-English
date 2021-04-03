import React from 'react';
import './Chunk.css';
import autosize from "autosize"

class Chunk2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caret: -1,
      activeId: 0,
      chunks: {"id1": {indent: 0, txt: ""}},
      order: ["id1"],
    };
    this.totalChunks = 1
  }
  handleSelect() {
    // change caret position of element
    this.setState({
      caret: document.activeElement.selectionStart
    });
  }
  handleClick(id){
    // activate current id
    this.setState({
      activeId: id
    })
  }
  handleChange(id) {
    this.textarea.focus();
    autosize(this.textarea)
    var txt = this.textarea.value.replace(/\n\r?/g, '<br />'); //preserve the "\n" character
    // var updatedChunk = {...this.state.chunks[id]}
    // updatedChunk.txt = txt

    var updatedChunks = {...this.state.chunks}
    updatedChunks[id].txt = txt
    this.setState({chunks: updatedChunks})
  }
  handleSplit(){
      var id = this.state.activeId;
      var idx = this.state.order.indexOf(id);
      var caret = this.state.caret;
      console.log(caret, id, idx)
      console.log(this.state.chunks[id].txt)
    
      var textOne = this.state.chunks[id].txt.substr(0,caret);
      var textTwo = this.state.chunks[id].txt.substr(caret);
      console.log("text1", textOne)
      console.log("text2", textTwo)
    
      this.totalChunks += 1
      let newOrder = [...this.state.order]
      newOrder.splice(idx + 1,0,`id${this.totalChunks}`)

      let newChunks = {...this.state.chunks}
      newChunks[id].txt = textOne
      newChunks[`id${this.totalChunks}`] = {indent: 0, txt: textTwo}

      console.log("new order", newOrder)
      console.log("new chunks", newChunks)

      this.setState({
          chunks: newChunks,
          order: newOrder
      },() => console.log("wat"));
      console.log("new order", this.state.chunks)
      console.log("new chunks", this.state.order)
  }
  render(){
	var chunks = this.state.order.map(id => 
        <textarea 
    	class = "chunk"
        ref = {c => (this.textarea = c)}
        defaultValue= {this.state.chunks[id].txt}
        onSelect={this.handleSelect.bind(this)} 
        onChange={this.handleChange.bind(this, id)}
        onClick={this.handleClick.bind(this,id)}
        value= {this.state.chunks[id].txt}
        />
      )

    return (
      <div>
        <button onClick={this.handleSplit.bind(this)}
        >split</button>
        {chunks}
        {this.state.caret}
        {this.state.activeId}
        <p></p>
        {this.state.order}
      </div>
    )
  }
}
export default Chunk2;