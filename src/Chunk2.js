import React from 'react';
import './Chunk.css';
import TextareaAutosize from 'react-autosize-textarea';

class Chunk2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caret: -1,
      activeId: 0,
      chunks: { id1: { indent: 0, txt: '' } },
      order: ['id1'],
    };
    this.totalChunks = 1;
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(id) {
    // update text, caret, activeId
    // preserve the "\n" character
    const e = document.activeElement;
    const txt = e.value.replace(/\n\r?/g, '<br />');
    const updatedChunks = { ...this.state.chunks };
    updatedChunks[id].txt = txt;
    this.setState({
      chunks: updatedChunks,
      caret: e.selectionStart,
      activeId: id,
    });
  }

  handleSplit() {
    const id = this.state.activeId;
    const idx = this.state.order.indexOf(id);
    this.totalChunks += 1;
    const id2 = `id${this.totalChunks}`;
    const caret = this.state.caret;
    const textOne = this.state.chunks[id].txt.substr(0, caret);
    const textTwo = this.state.chunks[id].txt.substr(caret);

    const newOrder = [...this.state.order];
    newOrder.splice(idx + 1, 0, id2);

    const newChunks = { ...this.state.chunks };
    newChunks[id].txt = textOne;
    newChunks[id2] = { indent: 0, txt: textTwo };

    this.setState({
      activeId: id2,
      chunks: newChunks,
      order: newOrder,
    });
  }

  handleMergeUp() {
    const id = this.state.activeId;
    const idx = this.state.order.indexOf(id);
    if (idx === 0) {
      // not possible to merge up first chunk
      return 0;
    }
    const id2 = this.state.order[idx - 1];

    const txt = this.state.chunks[id].txt;

    const newOrder = [...this.state.order];
    newOrder.splice(idx, 1);
    const newChunks = { ...this.state.chunks };
    delete newChunks[id];
    newChunks[id2].txt += txt;
    this.setState({
      activeId: id2,
      chunks: newChunks,
      order: newOrder,
    });
  }

  render() {
    const chunks = this.state.order.map((id) => (
      <TextareaAutosize
        id={id}
        class="chunk"
        onSelect={(event) => {
          this.handleTextChange(id);
        }}
        onChange={(event) => {
          this.handleTextChange(id);
        }}
        onClick={(event) => {
          this.handleTextChange(id);
        }}
        value={this.state.chunks[id].txt}
      />
    ));
    return (
      <div>
        <button type="button" onClick={this.handleSplit.bind(this)}>
          split
        </button>
        <button type="button" onClick={this.handleMergeUp.bind(this)}>
          merge up
        </button>
        <button type="button" onClick={this.handleMergeUp.bind(this)}>
          &lt;&lt;&lt;
        </button>
        <button type="button" onClick={this.handleMergeUp.bind(this)}>
          &gt;&gt;&gt;
        </button>
        {chunks}
        {this.state.caret}
        {this.state.activeId}
        <p></p>
        {this.state.order}
      </div>
    );
  }
}
export default Chunk2;
