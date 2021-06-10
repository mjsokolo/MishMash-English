const initialState = {
  connections: [],
  mode: '',
  id: null,
};

export default function GraphReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_MODE':
      return {
        ...state,
        mode: action.payload.mode,
        id: action.payload.id,
      };
    case 'RESET_MODE':
      return {
        ...state,
        mode: '',
        id: null,
      };
    case 'ADD_CONNECTION':
      return {
        ...state,
        connections: [...state.connections, action.payload.connection],
      };
    default:
      return state;
  }
}
