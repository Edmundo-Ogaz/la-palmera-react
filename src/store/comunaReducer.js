import { createSlice } from '@reduxjs/toolkit';

import { search as searchComuna, save as saveComuna, update as updateComuna, remove as removeComuna } from '../service/comuna'

const initialState = {
  list: [],
};

export const comunaSlice = createSlice({
  name: 'comuna',
  initialState,
  reducers: {
    init: (state, action) => {
      state.list = action.payload
    },
    add: (state, action) => {
        const { payload } = action
        const index = state.list.length
        const comuna = { id: index, code: payload.code, name: payload.name, codeCity: payload.codeCity }
      state.list.push(comuna)
    },
    update: (state, action) => {
        const { payload } = action
        state.list = state.list.map( element => {
            if ( element.code === payload.code )
                return { id: element.id, code: payload.code, name: payload.name, codeCity: payload.codeCity }
            return element
        } )
    },
    remove: (state, action) => {
      state.list = state.list.filter( element => element.code !== action.payload.code)
    },
  },
});

export const { init, add, update, remove } = comunaSlice.actions;

export const search = (comuna, ciudad) => 
  async (dispatch, getState) => {
    const response = await searchComuna(comuna, ciudad)
    dispatch(init(response))			
};

export const save = (code, name, codeCity) => 
  async (dispatch, getState) => {
    const response = await saveComuna(code, name, codeCity)
    dispatch(add(response))			
};

export const modify = (code, name, codeCity) =>
  async (dispatch, getState) => {
    console.log('modify store')
    const response = await updateComuna(code, name, codeCity)
    dispatch(update(response))			
};

export const removeStore = (code) => 
  async (dispatch, getState) => {
    await removeComuna(code)
    dispatch(remove({ code }))			
};

export const selectComuna = (state) => state.comuna.list;

export default comunaSlice.reducer;