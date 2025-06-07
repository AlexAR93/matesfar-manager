import React, { useState } from 'react'
import { ImagesModal } from './ImagesModal';

export const ProductForm = ({ startLoadingProducts, startLoadingCategories,addNewProduct,updateProduct,addNewCategory, categories, form, setForm, setActiveProduct}) => {
    const [modalImages, setModalImages] = useState(false)

    const [images, setImages] = useState(0);

    const [newCategoryName, setNewCategoryName] = useState('');
    const [addingCategory, setAddingCategory] = useState(false);

    const onChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };
    
      const resetForm = () => {
        setForm({
          id: null,          // <-- Igual acá
          name: '',
          description: '',
          price: '',
          realPrice: '',
          stock: '',
          category: '',
        });
        setAddingCategory(false);
        setNewCategoryName('');
        setActiveProduct(null);
      };
    
      const onSubmit = async (e) => {
        e.preventDefault();
    
        if (!form.name || !form.price || !form.realPrice || !form.category) {
          alert('Nombre, precio y categoría son obligatorios');
          return;
        }
    
        const formData = new FormData();
        const productData = {
          name: form.name,
          description: form.description,
          price: Number(form.price),
          realPrice: Number(form.realPrice),
          stock: Number(form.stock) || 0,
          category: form.category,
          images:form.images
        };
    
        if (images && images.length > 0) {
          for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]); // misma clave "images" varias veces
          }
        }
    
        if (form.id) {
          // Editar
          await updateProduct(form.id, productData, formData);
          setActiveProduct(null)
        } else {
          // Crear nuevo producto
          await addNewProduct(formData,productData);
        }
    
        resetForm();
        startLoadingProducts();
      };
    
      const onAddCategory = async () => {
        if (!newCategoryName.trim()) {
          alert('El nombre de la categoría no puede estar vacío');
          return;
        }
    
        const data = await addNewCategory({ name: newCategoryName });
        if (data?.category) {
          setForm((f) => ({ ...f, category: data.category.id || data.category.id }));
          setAddingCategory(false);
          setNewCategoryName('');
          startLoadingCategories();
        }
      };
    
      // Cargar datos para editar producto, aquí también corregimos uso de id:

    
      const handleFileChange = (e) => {
      setImages(e.target.files ); // guardás una FileList
    };
    
  return (
    <form onSubmit={onSubmit} style={{ padding: '1px 2px 10px 2px', border: '1px solid #ccc', borderRadius: 5, display:'flex', flexDirection:'column',alignItems:'center' }}>
        <h3>{form.id ? 'Editar Producto' : 'Agregar Producto'}</h3>

        <div>
          <label>Nombre *</label><br />
          <input type="text" name="name" value={form.name} onChange={onChange} />
        </div>

        <div>
          <label>Descripción</label><br />
          <textarea name="description" value={form.description} onChange={onChange} />
        </div>

        <div>
          <label>Precio *</label><br />
          <input type="number" name="price" value={form.price} onChange={onChange} min="0" step="0.01" />
        </div>

        <div>
          <label>Precio x mayor *</label><br />
          <input type="number" name="realPrice" value={form.realPrice} onChange={onChange} min="0" step="0.01" />
        </div>

        <div>
          <label>Stock</label><br />
          <input type="number" name="stock" value={form.stock} onChange={onChange} min="0" />
        </div>

        <div>
          <label>Categoría *</label><br />
          {!addingCategory ? (
            <>
              <select name="category" value={form.category} onChange={onChange}>
                <option value="">-- Selecciona categoría --</option>
                {categories.map(cat => (
                  <option key={cat.id || cat.id} value={cat.id || cat.id}>{cat.name}</option>
                ))}
              </select>
              <button type="button" onClick={() => setAddingCategory(true)} style={{ marginLeft: 10 }}>
                + Nueva categoría
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Nombre nueva categoría"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <button type="button" onClick={onAddCategory}>Agregar</button>
              <button type="button" onClick={() => setAddingCategory(false)} style={{ marginLeft: 10 }}>
                Cancelar
              </button>
            </>
          )}
        </div>

        <div>
          <label>Imágenes</label><br />
          <input type="file" multiple accept="image/*" name="image" id="image"   onChange={handleFileChange} />
        </div>

        <div>
          {form.id&& 
            <button type='button' onClick={()=>setModalImages(true)}>Ver Imágenes</button>
          }
          {
            modalImages==true?
            <ImagesModal currentProduct={form} setModalImages={setModalImages}/>:
            false
          }
        </div>

        <button type="submit" style={{ marginTop: 10 }}>
          {form.id ? 'Actualizar Producto' : 'Agregar Producto'}
        </button>
        {form.id && (
          <button type="button" onClick={resetForm} style={{ marginLeft: 10 }}>
            Cancelar Edición
          </button>
        )}
      </form>
  )
}
