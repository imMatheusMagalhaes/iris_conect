import React, {createContext} from 'react';

export const initialState = {
  listening: false,
  clientConnected: false,
};

export const IrisContext = createContext(initialState);
