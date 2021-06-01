const initialState = {
  connections: [],
  cursor: '',
  id: 0,
};

export default function GraphReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CURSOR':
      return {
        ...state,
        cursor: action.payload.cursor,
        id: action.payload.id,
      };
    default:
      return state;
  }
}
