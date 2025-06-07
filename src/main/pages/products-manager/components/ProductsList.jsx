import React from 'react'

export const ProductsList = ({products, deleteProduct, setActiveProduct}) => {
  const onEditClick = (product) => {
      setActiveProduct(product);
    };
  return (
    <table border="1" cellPadding="5" style={{ minWidth: '100%', borderCollapse: 'collapse',textAlign:'center' }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio x Mayor</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>No hay productos</td>
            </tr>
          )}
          {products.map(prod => (
            <tr key={prod.id}> 
              <td>{prod.name}</td>
              <td>{prod.description}</td>
              <td>${prod.realPrice.toFixed(2)}</td>
              <td>${prod.price.toFixed(2)}</td>
              <td>{prod.stock}</td>
              <td>{prod.category?.name || 'Sin categoría'}</td>
              <td>
                <button onClick={() => onEditClick(prod)}>Editar</button>
                <button onClick={() => deleteProduct(prod.id)} style={{ marginLeft: 10, color: 'red' }}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  )
}
