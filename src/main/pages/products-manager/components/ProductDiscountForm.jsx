import React, { useState } from 'react';
import { Autocomplete, TextField, Checkbox, Button } from '@mui/material';
import { useProductStore } from '../../../../hooks';

export const ProductDiscountForm = () => {
  const { products, updateProduct, startLoadingProducts } = useProductStore();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [discountActive, setDiscountActive] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProduct) {
      alert('Seleccioná un producto');
      return;
    }

    if (discountActive && (!discountPercentage || discountPercentage < 1 || discountPercentage > 100)) {
      alert('El porcentaje debe estar entre 1 y 100');
      return;
    }

    const updated = {
      ...selectedProduct,
      discount: {
        isActive: discountActive,
        percentage: discountActive ? Number(discountPercentage) : undefined,
      },
    };

    await updateProduct(selectedProduct.id, updated, []);
    startLoadingProducts();
    alert('¡Descuento actualizado!');
    setSelectedProduct(null);
    setDiscountActive(false);
    setDiscountPercentage('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: 20, borderRadius: 8, maxWidth: 400, textAlign:'center' }}>
      <h3>Aplicar Descuento</h3>

      <Autocomplete
        options={products}
        getOptionLabel={(option) => option.name}
        value={selectedProduct}
        onChange={(event, newValue) => setSelectedProduct(newValue)}
        renderInput={(params) => <TextField {...params} label="Buscar producto" variant="outlined" />}
        isOptionEqualToValue={(option, value) => option.id === value.id}
      />

      <div style={{ marginTop: 10 }}>
        <label>
          <Checkbox
            checked={discountActive}
            onChange={e => setDiscountActive(e.target.checked)}
          />
          Activar descuento
        </label>
      </div>

      {discountActive && (
        <div>
          <TextField
            label="Porcentaje de descuento"
            type="number"
            value={discountPercentage}
            onChange={e => setDiscountPercentage(e.target.value)}
            inputProps={{ min: 1, max: 100 }}
            fullWidth
          />
        </div>
      )}

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Guardar cambios
      </Button>
    </form>
  );
};
