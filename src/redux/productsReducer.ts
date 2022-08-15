import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './configureStore'
import { Product } from '../components/Vending/Vending';


interface ProductsState {
    money: number,
    change: number,
    selectedProduct: Product | null
    products: Product[]
}

const initialState: ProductsState = {
    money: 0,
    change: 0,
    selectedProduct: null,
    products: [{
        name: 'Coca-Cola',
        price: 180,
        title: 'Drink',
        id: '1',
        available: false
    },
    {
        name: `Lay's`,
        price: 75,
        title: 'Chips',
        id: '2',
        available: false
    },
    {
        name: 'Light',
        price: 225,
        title: 'Rusks',
        id: '3',
        available: false
    },
    {
        name: 'Chaka',
        price: 600,
        title: 'Peanut',
        id: '4',
        available: false
    },
    {
        name: 'Water',
        price: 40,
        title: 'Drink',
        id: '5',
        available: false
    },
    {
        name: 'Fanta',
        price: 400,
        title: 'Cold Drink',
        id: '6',
        available: false
    },
    {
        name: 'Nutella',
        price: 550,
        title: 'Chokolate Paste',
        id: '7',
        available: false
    }],
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        insertMoney: (state, action: PayloadAction<number>) => {
            state.money += action.payload;
        },
        filterByPrice: (state, action: PayloadAction<number>) => {
            state.products.filter((item: Product) => {
                if (item.price <= action.payload) {
                    item.available = true
                }
                return item;
            })
        },
        selectProduct: (state, action: PayloadAction<Product>) => {
            state.selectedProduct = action.payload
            console.log(state.selectedProduct, 'sss')
        },
        countChange: (state) => {
            if (state.selectedProduct) {
                state.change = state.money - state.selectedProduct.price;
            }
        },
        resetState: () => initialState
    },
})

export const { insertMoney, filterByPrice, selectProduct, countChange, resetState } = productsSlice.actions;
export const selectMoney = (state: RootState) => state.products.money;
export const selectProducts = (state: RootState) => state.products.products;
export default productsSlice.reducer;