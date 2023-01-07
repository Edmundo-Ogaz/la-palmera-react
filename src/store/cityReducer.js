import { createSlice } from '@reduxjs/toolkit';

import { search as searchCity, save as saveCity, update as updateCity, remove as removeCity } from '../services/cityService'

const initialState = {
  list: [],
};

export const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    init: (state, action) => {
      state.list = action.payload
    },
    add: (state, action) => {
        const { payload } = action
        const index = state.list.length
        const city = { id: index, code: payload.code, name: payload.name, codeRegion: payload.codeRegion }
      state.list.push(city)
    },
    update: (state, action) => {
        const { payload } = action
        state.list = state.list.map( element => {
            if ( element.code === payload.code )
                return { id: element.id, code: payload.code, name: payload.name, codeRegion: payload.codeRegion }
            return element
        } )
    },
    remove: (state, action) => {
      state.list = state.list.filter( element => element.code !== action.payload.code)
    },
  },
});

export const { init, add, update, remove } = citySlice.actions;

export const search = (city, region) => 
  async (dispatch, getState) => {
    const response = await searchCity(city, region)
    dispatch(init(response))			
};

export const save = (code, name, codeRegion) => 
  async (dispatch, getState) => {
    const response = await saveCity(code, name, codeRegion)
    dispatch(add(response))			
};

export const modify = (code, name, codeRegion) =>
  async (dispatch, getState) => {
    console.log('modify store')
    const response = await updateCity(code, name, codeRegion)
    dispatch(update(response))			
};

export const removeStore = (code) => 
  async (dispatch, getState) => {
    await removeCity(code)
    dispatch(remove({ code }))			
};

export const selectCity = (state) => state.city.list;

export default citySlice.reducer;