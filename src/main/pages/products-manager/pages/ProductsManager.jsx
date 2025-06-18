import { useEffect, useState } from 'react';
import { useProductStore, useCategoryStore } from '../../../../hooks';
import { ProductDiscountForm, ProductForm, ProductsList } from '../components';

export const ProductsManager = () => {
  // Stores
  const {
    products,
    activeProduct,
    startLoadingProducts,
    addNewProduct,
    updateProduct,
    deleteProduct,
    setActiveProduct,
    removeDiscount
  } = useProductStore();

  const {
    categories,
    startLoadingCategories,
    addNewCategory,
  } = useCategoryStore();

  
  // Form state
    const [form, setForm] = useState({
    id: null,            // <-- Cambiado de id a id
    name: '',
    description: '',
    price: '',
    realPrice: '',
    stock: '',
    category: '',
    images: '',
    });

  useEffect(() => {
    startLoadingCategories();
  }, [])
    
  useEffect(() => {
    startLoadingProducts();
  }, []);

  useEffect(() => {
    activeProduct&&
    setForm({
      id: activeProduct.id,                // <-- Cambiado a id
      name: activeProduct.name,
      description: activeProduct.description || '',
      price: activeProduct.price,
      realPrice: activeProduct.realPrice,
      stock: activeProduct.stock || 0,
      category: activeProduct.category?.id || activeProduct.category, // si categoría es objeto o id
      images: activeProduct.images || '',
    });
  }, [activeProduct])
  
  

  return (
    <div style={{ width:'100%', margin: 'auto' }}>
      <h2>Gestión de Productos</h2>

      <div style={{width:'100%',display:'flex',gap:1,justifyContent:'space-between'}}>
        <ProductForm startLoadingProducts={   startLoadingProducts} startLoadingCategories={startLoadingCategories} addNewProduct={addNewProduct} updateProduct={updateProduct} addNewCategory={addNewCategory} categories={categories} form={form} setForm={setForm} setActiveProduct={setActiveProduct}/>
        <ProductDiscountForm/>
      </div>

      <h3>Listado de Productos</h3>
      <ProductsList products={products} deleteProduct={deleteProduct} setActiveProduct={setActiveProduct} removeDiscount={removeDiscount} />
    </div>
  );
};
