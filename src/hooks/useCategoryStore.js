import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import {
    onLoadCategories,
    onSetActiveCategory,
    onAddNewCategory,
    onUpdateCategory,
    onDeleteCategory,
    onLoadCategoriesState,
} from '../store';

export const useCategoryStore = () => {
    const dispatch = useDispatch();
    const { categories, activeCategory, isLoadingCategories } = useSelector(state => state.category);

    const startLoadingCategories = async () => {
        dispatch(onLoadCategoriesState(true));
        try {
            const { data } = await calendarApi.get('/api/categories');
            dispatch(onLoadCategories(data.categories));
        } catch (error) {
            console.error('Error cargando categorías:', error);
        } finally {
            dispatch(onLoadCategoriesState(false));
        }
    };

    const setActiveCategory = (category) => {
        dispatch(onSetActiveCategory(category));
    };

    const addNewCategory = async (category) => {
        try {
            const { data } = await calendarApi.post('/api/categories', category);
            dispatch(onAddNewCategory(data.category));
            return data;
        } catch (error) {
            console.error('Error al crear categoría:', error);
        }
    };

    const updateCategory = async (id, category) => {
        try {
            const { data } = await calendarApi.put(`/api/categories/${id}`, category);
            dispatch(onUpdateCategory(data.category));
        } catch (error) {
            console.error('Error al actualizar categoría:', error);
        }
    };

    const deleteCategory = async (id) => {
        const confirmar = confirm('¿Seguro querés eliminar esta categoría?');
        if (!confirmar) return;

        try {
            await calendarApi.delete(`/api/categories/${id}`);
            dispatch(onDeleteCategory(id));
        } catch (error) {
            console.error('Error al eliminar categoría:', error);
        }
    };

    return {
        categories,
        activeCategory,
        isLoadingCategories,

        startLoadingCategories,
        setActiveCategory,
        addNewCategory,
        updateCategory,
        deleteCategory,
    };
};
