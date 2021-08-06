// const initialState = {
//   connections: [],
//   mode: '',
//   id: null,
// };

// export default function GraphReducer(state = initialState, action) {
//   switch (action.type) {
//     case 'setMode':
//       return {
//         ...state,
//         mode: action.payload.mode,
//         id: action.payload.id,
//       };
//     case 'resetMode':
//       return {
//         ...state,
//         mode: '',
//         id: null,
//       };
//     case 'addConnection':
//       return {
//         ...state,
//         connections: [...state.connections, action.payload.connection],
//       };
//     case 'deleteConnection':

//     default:
//       return state;
//   }
// }
