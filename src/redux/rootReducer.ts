import { combineReducers } from '@reduxjs/toolkit';
import productsReducer from './productsReducer';

export default combineReducers({
  products: productsReducer
}); 