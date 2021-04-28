import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-autosize-textarea';

// class Note extends React.Component {
//     // constructor(props) {
//     //   super(props);
//     //   this.state = {
//     //     id: props.id,
//     //     note: props.note
//     //   };
//     // }
//     // render() {
//     //     return (
//     //         <TextareaAutosize
//     //         id = {this.state.id}
//     //         value = {this.state.note}
//     //         />
//     //     )
//     // }

// // getWidth = (id) => document.getElementById(id).width ||  0;
// // getLength = (id) => document.getElementById(id).width ||  0;

function Note(id) {
  let width = 7;
  let height = 7;
  React.useEffect(() => {
    width = document.getElementById(id) ? document.getElementById(id).width : 7;
    height = document.getElementById(id)
      ? document.getElementById(id).height
      : 7;
  });

  //     const width = document.getElementById(id)
  //     ? document.getElementById(id).width
  //     : 7;
  //   const height = document.getElementById(id)
  //     ? document.getElementById(id).height
  //     : 7;

  return (
    <textarea
      id={'N' + id}
      style={{ width: width, height: height }}
      value="text"
    />
  );
}
export default Note;
