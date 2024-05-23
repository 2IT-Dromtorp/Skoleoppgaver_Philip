import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/landing.css';

function Landing() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getProducts = async () => {
        try {
            const response = await fetch('/api/v1/products');
            const data = await response.json();
            console.log('Fetched products:', data);
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const availableProducts = products.filter(product => product.q > 0);

    console.log('Filtered products:', availableProducts);

    return (
        <main id='page-render'>
            <div className='page-header'>
                <span className='title-header'>
                    Drømtorp Kantine
                </span>
                <span className='title-subheader'>
                    Enjoy fresh, delicious meals served daily at our canteen.
                </span>
            </div>
            <ul className='card-container'>
                {loading ? (
                    <span className='title-subheader'>Loading...</span>
                ) : availableProducts.length === 0 ? (
                    <span className='title-subheader'>No products available</span>
                ) : (
                    availableProducts.map((product) => (
                        <ProductCard
                            key={product._id}
                            src={product.url}
                            title={product.t}
                            description={product.d}
                            price={product.p}
                            quantity={product.q}
                            productId={product._id}
                            getProducts={getProducts}
                        />
                    ))
                )}
            </ul>
        </main>
    );
}

export default Landing;

const ProductCard = ({ src, title, description, price, quantity, productId, getProducts }) => {
    const handlePurchase = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('User not logged in');
            return;
        }

        try {
            const response = await fetch('/api/v1/purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    productId,
                    quantity: 1,
                }),
            });

            const result = await response.json();

            if (result.success) {
                console.log('Purchase successful!');
                getProducts();
            } else {
                console.error('Purchase failed: ' + result.error);
            }
        } catch (error) {
            console.error('Error during purchase:', error);
            alert('Purchase failed: ' + error.message);
        }
    };

    return (
        <div className='product-card'>
            <div className='card-content'>
                <div className='card-upper-half'>
                    <img className='card-icon' src={src} alt={title} />
                </div>
                <div className='card-lower-half'>
                    <div className='card-text'>
                        <span className='header'>{title}</span>
                        <span className='subheader'>{description}</span>
                        <span className='header'>kr {price}</span>
                        <span className='subheader'>{quantity} stk</span>
                    </div>
                    <div className='card-button-container'>
                        <button className='card-button' onClick={handlePurchase}>Buy</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
