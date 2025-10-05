import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import {
    onLoadProducts,
    onSetActiveProduct,
    onAddNewProduct,
    onUpdateProduct,
    onDeleteProduct,
    onLoadProductsState,
    onDeleteImageFromProduct,
} from '../store';

export const useProductStore = () => {
    const dispatch = useDispatch();
    const { products, activeProduct, isLoadingProducts } = useSelector(state => state.product);

    const startLoadingProducts = async (categoryId = null, sort = null, search = '', page = 1, limit = '') => {
        dispatch(onLoadProductsState(true));
        try {
             const params = new URLSearchParams();
            if (categoryId) params.append('category', categoryId);
            if (sort) params.append('sort', sort);
            if (search) params.append('search', search);
            params.append('page', page);
            params.append('limit', limit);
            const { data } = await calendarApi.get(`/api/products?${params.toString()}`);
            dispatch(onLoadProducts(data.products));
        } catch (error) {
            console.error('Error cargando productos:', error);
        } finally {
            dispatch(onLoadProductsState(false));
        }
    };

    const setActiveProduct = (product) => {
        dispatch(onSetActiveProduct(product));
    };

    const addNewProduct = async (images,product) => {
        try {
            const {data : currentImages} = await calendarApi.post('/api/images/upload-multiple', images);
            
            product.images=currentImages.images.map(img=>img.url);

            if(currentImages.ok){
                const { data } = await calendarApi.post('/api/products', product);
                dispatch(onAddNewProduct(data.product));
                return data;
            }
        } catch (error) {
            console.error('Error al crear producto:', error);
        }
    };

    const updateProduct = async (id, product, images) => {
    try {
        // Solo sube imágenes si hay imágenes válidas
        let currentImages = { images: [] };
        
        if (images && images.length > 0) {
        const { data } = await calendarApi.post('/api/images/upload-multiple', images);
        currentImages = data;
        }

        // Evita error si no hay imágenes nuevas
        product.images = Array.from(new Set([
        ...(product.images || []),
        ...currentImages.images.map(img => img.url)
        ]));

        const { data } = await calendarApi.put(`/api/products/${id}`, product);
        dispatch(onUpdateProduct(data.product));
    } catch (error) {
        console.error('Error al actualizar producto:', error);
    }
    };

    const removeDiscount = async (id) => {
    try {
        const producto = products.find(p => p.id === id);
        if (!producto) return;

        const updatedProduct = {
        ...producto,
        discount: {
            isActive: false,
            percentage: null
        }
        };

        const { data } = await calendarApi.put(`/api/products/${id}`, updatedProduct);
        dispatch(onUpdateProduct(data.product));
    } catch (error) {
        console.error('Error al quitar descuento:', error);
    }
    };


    const deleteProduct = async (id) => {
        const confirmar = confirm('¿Seguro querés eliminar este producto?');
        if (!confirmar) return;

        try {
            const response = await calendarApi.delete(`/api/products/${id}`);
            const publicIdsArray=response.data.product.images.map(item=>extractPublicId(item))
            await calendarApi.post('/api/images/delete-multiple', {publicIds:publicIdsArray});
            dispatch(onDeleteProduct(id));
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    };

    const deleteImage = async (imageUrl,productId) => {
         try {
            const publicId=extractImagenId(imageUrl)
            console.log(publicId)
            await calendarApi.delete(`/api/images/${publicId}`);

            const findProduct = products.find(p => p.id === productId);
            const { data:updatedProduct } = await calendarApi.put(`/api/products/${productId}`, {
                ...findProduct,
                images: findProduct.images.filter(url => url !== imageUrl)
            });
            console.log(updatedProduct)
            dispatch(onSetActiveProduct(updatedProduct.product))
            dispatch(onDeleteImageFromProduct({productId,imageUrl}));
        } catch (error) {
            console.error('Error al eliminar la imagen:', error);
        }
    }

    function extractPublicId(url) {
        const match = url.match(/upload\/(?:v\d+\/)?(.+?)\.(jpg|jpeg|png|webp|gif)$/i);
        return match ? match[1] : null;
    }
    function extractImagenId(url) {
        const match = url.match(/upload\/(?:v\d+\/)?(.+?)\.(jpg|jpeg|png|webp|gif)$/i);
        if (!match) return null;

        const fullPublicId = match[1]; // Ej: 'matesfar-productos/upy3licpet3mvhbgsop8'
        const parts = fullPublicId.split('/'); // ['matesfar-productos', 'upy3licpet3mvhbgsop8']
        return parts[parts.length - 1]; // Solo devuelve 'upy3licpet3mvhbgsop8'
    }


    return {
        products,
        activeProduct,
        isLoadingProducts,

        startLoadingProducts,
        setActiveProduct,
        addNewProduct,
        updateProduct,
        deleteProduct,
        deleteImage,
        removeDiscount,
    };
};
