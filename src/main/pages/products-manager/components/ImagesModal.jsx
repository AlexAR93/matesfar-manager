import React, { useEffect } from 'react';
import { useState } from 'react';
import { useProductStore } from '../../../../hooks';

export const ImagesModal = ({ currentProduct, setModalImages }) => {
      const {
        deleteImage
      } = useProductStore();
    
    const [images, setImages] = useState([]);
    useEffect(() => {
      setImages(currentProduct.images);
    }, [currentProduct])
    
  if (!images || images.length === 0) return null;
console.log(currentProduct.id)
  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <h3>Imágenes del producto</h3>
        <div style={styles.gallery}>
          {images.map((url, i) => (
            <div key={i}>
                <img key={i} src={url} alt={`img-${i}`} style={styles.image} />
                <button type='button' key={url} value={url} onClick={(e)=>deleteImage(e.target.value,currentProduct.id)}>Eliminar</button>
            </div>
          ))}
        </div>
        <button onClick={()=>setModalImages(false)} style={styles.closeBtn}>Cerrar</button>
      </div>
    </div>
  );
};

const styles = {
  backdrop: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  modal: {
    background: '#fff',
    padding: 20,
    borderRadius: 8,
    maxWidth: '80%',
    maxHeight: '80%',
    overflowY: 'auto',
    textAlign: 'center',
  },
  gallery: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    objectFit: 'cover',
    borderRadius: 4,
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
  },
  closeBtn: {
    padding: '8px 16px',
    background: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
};
