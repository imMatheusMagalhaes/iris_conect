export const irisReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SERVER_STATUS':
      return {...state, listening: action.payload};
    case 'SET_CLIENT_STATUS':
      return {...state, clientConnected: action.payload};
  }
};
