import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    activeCategory: null,
    isLoadingCategories: true
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        onLoadCategories: (state, { payload }) => {
            state.categories = payload;
        },
        onSetActiveCategory: (state, { payload }) => {
            state.activeCategory = payload;
        },
        onAddNewCategory: (state, { payload }) => {
            state.categories.push(payload);
        },
        onUpdateCategory: (state, { payload }) => {
            state.categories = state.categories.map(c =>
                c._id === payload._id ? payload : c
            );
        },
        onDeleteCategory: (state, { payload }) => {
            state.categories = state.categories.filter(c => c._id !== payload);
        },
        onLoadCategoriesState: (state, { payload }) => {
            state.isLoadingCategories = payload;
        },
        onLogoutCategories: (state) => {
            state.categories = [];
            state.activeCategory = null;
            state.isLoadingCategories = true;
        }
    }
});

export const {
    onLoadCategories,
    onSetActiveCategory,
    onAddNewCategory,
    onUpdateCategory,
    onDeleteCategory,
    onLoadCategoriesState,
    onLogoutCategories
} = categorySlice.actions;
