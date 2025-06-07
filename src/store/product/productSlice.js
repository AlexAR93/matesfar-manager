import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    activeProduct: null,
    isLoadingProducts: true
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        onLoadProducts: (state, { payload }) => {
            state.products = payload;
        },
        onSetActiveProduct: (state, { payload }) => {
            state.activeProduct = payload;
        },
        onAddNewProduct: (state, { payload }) => {
            state.products.push(payload);
        },
        onUpdateProduct: (state, { payload }) => {
            state.products = state.products.map(p =>
                p.id === payload.id ? payload : p
            );
        },
        onDeleteProduct: (state, { payload }) => {
            state.products = state.products.filter(p => p.id !== payload);
        },
        onLoadProductsState: (state, { payload }) => {
            state.isLoadingProducts = payload;
        },
        onLogoutProducts: (state) => {
            state.products = [];
            state.activeProduct = null;
            state.isLoadingProducts = true;
        },
        onDeleteImageFromProduct: (state, { payload }) => {
            const { productId, imageUrl } = payload;
     
            state.products = state.products.map(p => {
                if (p.id === productId) {
                    return {
                        ...p,
                        images: p.images.filter(url => url !== imageUrl)
                    };
                }
                return p;
            });
        }

    }
});

export const {
    onLoadProducts,
    onSetActiveProduct,
    onAddNewProduct,
    onUpdateProduct,
    onDeleteProduct,
    onLoadProductsState,
    onLogoutProducts,
    onDeleteImageFromProduct
} = productSlice.actions;
