import React from 'react';
import Chunk from './Chunk';


class ChunkCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      chunks: [{
        txt: '',
        indent: 0
      }]
    }

    this.handleeBlur = this.handleeBlur.bind(this);
  }
  handleClick() {
    return 0
  }
  handleeBlur() {
    this.setState({
      id: 788,
      test: 556
    })
  }
  render() {
    return (
      <div>
        <button >split onClick={this.handleClick.bind(this)}</button>
        <Chunk txt="hi this is me" indent={0}/>
      </div>
    ) 
  }
}
export default ChunkCollection;