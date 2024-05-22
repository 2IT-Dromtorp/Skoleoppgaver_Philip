import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/landing.css';

function Landing() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/products');
                const data = await response.json();
                console.log(data)
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        getProducts();
    }, []);

    return (
        <main id='page-render'>
            <ul className='card-container'>
                {products.map((product) => (
                    <ProductCard key={product._id} src={product.url} title={product.t} description={product.d} price={product.p} quantity={product.q} />
                ))}
            </ul>
        </main>
    );
}

export default Landing;

const ProductCard = ({ src, title, description, price, quantity }) => {

    return (
        <div className='product-card'>
            <div className='card-content'>
                <div className='card-upper-half'>
                    <img className='card-icon' src={src}/>
                </div>
                <div className='card-lower-half'>
                    <div className='card-text'>
                        <span className='header'>{title}</span>
                        <span className='subheader'>{description}</span>
                        <span className='header'>{price}</span>
                        <span className='subheader'>{quantity}</span>
                    </div>
                    <div className='card-button-container'>
                        <button className='card-button'>Buy</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
