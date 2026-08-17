import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const plantCategories = [
  {
    category: "Plantas Purificadoras de Aire",
    plants: [
      { name: "Savia Serena", image: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=300", cost: "$15", description: "Limpia las toxinas del hogar de forma natural." },
      { name: "Lirio de Paz", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?w=300", cost: "$22", description: "Ideal para interiores con baja luz." },
      { name: "Planta de Serpiente", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=300", cost: "$18", description: "Resistente y produce oxígeno nocturno." },
      { name: "Pothos Dorado", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=300", cost: "$12", description: "Enredadera perfecta para repisas." },
      { name: "Ficus Benjamina", image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=300", cost: "$25", description: "Aporta elegancia a salas de estar." },
      { name: "Helecho Boston", image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=300", cost: "$16", description: "Aumenta la humedad del ambiente." }
    ]
  },
  {
    category: "Plantas Aromáticas",
    plants: [
      { name: "Menta Fresca", image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=300", cost: "$10", description: "Aroma refrescante para cocina." },
      { name: "Lavanda Real", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=300", cost: "$20", description: "Propiedades relajantes para el sueño." },
      { name: "Romero Verde", image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=300", cost: "$14", description: "Ideal para sazonar tus recetas." },
      { name: "Albahaca Dulce", image: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=300", cost: "$8", description: "Esencial para cualquier huerto." },
      { name: "Tomillo", image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=300", cost: "$11", description: "Aroma penetrante y fácil cuidado." },
      { name: "Salvia", image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=300", cost: "$13", description: "Usada tradicionalmente para infusiones." }
    ]
  },
  {
    category: "Suculentas y Cactus",
    plants: [
      { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=300", cost: "$14", description: "Savia con beneficios medicinales." },
      { name: "Cactus Erizos", image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=300", cost: "$9", description: "Requiere muy poco riego." },
      { name: "Echeveria Rosa", image: "https://images.unsplash.com/photo-1520302631722-e3e9d8e578a1?w=300", cost: "$12", description: "Forma de roseta muy decorativa." },
      { name: "Planta Jade", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=300", cost: "$17", description: "Símbolo de buena suerte." },
      { name: "Haworthia", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=300", cost: "$10", description: "Patrón a rayas muy llamativo." },
      { name: "Cactus Asiento de Suegra", image: "https://images.unsplash.com/photo-1551893478-d726eaf0442c?w=300", cost: "$21", description: "Crecimiento esférico compacto." }
    ]
  }
];

const ProductList = ({ onNavigateLanding }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isPlantInCart = (plantName) => {
    return cartItems.some(item => item.name === plantName);
  };

  return (
    <div>
      <nav className="navbar" aria-label="Navegación principal">
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Vivero el Paraiso</h1>
        <div>
          <button className="nav-link" onClick={onNavigateLanding}>Inicio</button>
          <button className="nav-link" onClick={() => setShowCart(false)}>Plantas</button>
          <button 
            className="nav-link cart-icon-container" 
            onClick={() => setShowCart(true)}
            aria-label={`Carrito de compras con ${totalQuantity} artículos`}
          >
            🛒 <span className="cart-badge">{totalQuantity}</span>
          </button>
        </div>
      </nav>

      {!showCart ? (
        <main style={{ padding: '20px' }}>
          {plantCategories.map((cat, idx) => (
            <section key={idx} style={{ marginBottom: '40px' }}>
              <h2>{cat.category}</h2>
              <div className="product-grid">
                {cat.plants.map((plant, pIdx) => (
                  <article key={pIdx} className="product-card">
                    <img src={plant.image} alt={plant.name} className="product-image" />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p style={{ fontWeight: 'bold' }}>{plant.cost}</p>
                    <button
                      className="action-btn"
                      onClick={() => handleAddToCart(plant)}
                      disabled={isPlantInCart(plant.name)}
                      aria-label={isPlantInCart(plant.name) ? `${plant.name} añadido` : `Añadir ${plant.name} a la cesta`}
                    >
                      {isPlantInCart(plant.name) ? "Añadido a la cesta" : "Añadir a la cesta"}
                    </button>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </main>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
};

export default ProductList;