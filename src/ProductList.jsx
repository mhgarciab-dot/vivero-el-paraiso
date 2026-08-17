import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem.jsx';
//import './ProductList.css';

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    const calculateTotalQuantity = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Produces oxygen at night, improving air quality.",
                    cost: "$15"
                },
                {
                    name: "Spider Plant",
                    image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                    description: "Filters formaldehyde and xylene from the air.",
                    cost: "$12"
                },
                {
                    name: "Peace Lily",
                    image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg",
                    description: "Removes mold spores and purifies the air.",
                    cost: "$18"
                }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                {
                    name: "Lavender",
                    image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1000&auto=format&fit=crop",
                    description: "Calming scent, used in aromatherapy.",
                    cost: "$20"
                },
                {
                    name: "Jasmine",
                    image: "https://images.unsplash.com/photo-1592729808998-251020755866?q=80&w=1000&auto=format&fit=crop",
                    description: "Sweet fragrance, promotes relaxation.",
                    cost: "$15"
                },
                {
                    name: "Rosemary",
                    image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg",
                    description: "Invigorating aroma, great for cooking.",
                    cost: "$12"
                }
            ]
        }
    ];

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
        setAddedToCart((prevState) => ({
            ...prevState,
            [plant.name]: true,
        }));
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    return (
        <div>
            <div className="navbar" style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" style={{ height: '50px', width: '50px' }} />
                        <a href="/" style={{ color: 'white', textDecoration: 'none' }}>
                            <div>
                                <h3 style={{ color: 'white', margin: 0 }}>Paradise Nursery</h3>
                                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div>
                        <a href="#" onClick={(e) => handlePlantsClick(e)} style={{ color: 'white', fontSize: '20px', textDecoration: 'none' }}>Plants</a>
                    </div>
                    <div>
                        <a href="#" onClick={(e) => handleCartClick(e)} style={{ color: 'white', fontSize: '20px', textDecoration: 'none' }}>
                            <h1 className="cart" style={{ margin: 0, fontSize: '24px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="Flat" height="30" width="30">
                                    <rect width="256" height="256" fill="none"></rect>
                                    <path d="M184,184a16,16,0,1,1-16-16A16,16,0,0,1,184,184ZM88,168a16,16,0,1,0,16,16A16,16,0,0,0,88,168Zm140-88V152a16,16,0,0,1-16,16H88a16,16,0,0,1-16-16V64H32a8,8,0,0,1,0-16H72a8,8,0,0,1,8,8V152H212V80Z" fill="white"></path>
                                </svg>
                                <span className="cart_quantity_count">{calculateTotalQuantity()}</span>
                            </h1>
                        </a>
                    </div>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h1 style={{ textAlign: 'center', margin: '20px 0' }}><div>{category.category}</div></h1>
                            <div className="product-list">
                                {category.plants.map((plant, plantIndex) => (
                                    <div className="product-card" key={plantIndex}>
                                        <img className="product-image" src={plant.image} alt={plant.name} />
                                        <div className="product-title">{plant.name}</div>
                                        <div className="product-description">{plant.description}</div>
                                        <div className="product-cost">{plant.cost}</div>
                                        <button
                                            className={`product-button ${addedToCart[plant.name] ? 'added' : ''}`}
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={addedToCart[plant.name]}
                                        >
                                            {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;