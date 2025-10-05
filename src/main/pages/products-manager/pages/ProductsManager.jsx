import { useEffect, useRef, useState } from 'react';
import { useProductStore, useCategoryStore } from '../../../../hooks';
import { ProductDiscountForm, ProductForm, ProductsList } from '../components';
import { Button, TextField } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';

export const ProductsManager = () => {
  const params = useParams();
  const inputRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get('search') || '';

  const currentSort = searchParams.get('sort') || '';

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  
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
  
    const handleSearchSubmit = (e) => {
      e.preventDefault();
      const newParams = {};
      if (searchTerm) newParams.search = searchTerm;
      if (currentSort) newParams.sort = currentSort;
      if (params.idCategory) newParams.category = params.idCategory;
      newParams.page = 1; // Reinicia a página 1
      setSearchParams(newParams);
    };

    useEffect(() => {
    const urlSearch = searchParams.get('search') || '';

    setSearchTerm(urlSearch);
    startLoadingProducts(null, null, urlSearch);
  }, [searchParams]);

  return (
    <div style={{ width:'100%', margin: 'auto' }}>
      <h2>Gestión de Productos</h2>

      <div style={{width:'100%',display:'flex',gap:1,justifyContent:'space-between'}}>
        <ProductForm startLoadingProducts={   startLoadingProducts} startLoadingCategories={startLoadingCategories} addNewProduct={addNewProduct} updateProduct={updateProduct} addNewCategory={addNewCategory} categories={categories} form={form} setForm={setForm} setActiveProduct={setActiveProduct} urlSearch={searchParams.get('search')||null}/>
        <ProductDiscountForm/>
      </div>

      <h3>Listado de Productos</h3>
      <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '80%', margin:'auto auto 10px auto'}}>
          <TextField
            inputRef={inputRef}
            variant="outlined"
            size="medium"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              animation: 'slideInFromLeft 0.3s ease-out',
              borderRadius: '30px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '30px',
                fontSize: '1rem',
                width: '100%',
              },
              flex: 1,
            }}
          />
          <Button variant="contained" type="submit">Buscar</Button>
        </form>
      <ProductsList products={products} deleteProduct={deleteProduct} setActiveProduct={setActiveProduct} removeDiscount={removeDiscount} />
    </div>
  );
};
