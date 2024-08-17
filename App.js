import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

// Sample Data
const sampleProducts = [
  { id: '1', productName: 'Laptop 1', company: 'Company A', category: 'Laptop', price: 1236, rating: 4.7, discount: 3, availability: 'yes' },
  { id: '2', productName: 'Laptop 2', company: 'Company B', category: 'Laptop', price: 1244, rating: 4.5, discount: 5, availability: 'out of stock' },
  { id: '3', productName: 'Tablet 1', company: 'Company C', category: 'Tablet', price: 9182, rating: 4.4, discount: 0, availability: 'yes' },
  { id: '4', productName: 'Earphone 1', company: 'Company A', category: 'Earphone', price: 2652, rating: 4.1, discount: 0, availability: 'yes' },
  { id: '5', productName: 'Headset 1', company: 'Company B', category: 'Headset', price: 1220, rating: 3.8, discount: 10, availability: 'yes' }
];

// Home Page - Products Listing
const ProductsPage = () => {
  const [products, setProducts] = useState(sampleProducts);
  const [filters, setFilters] = useState({ category: '', company: '', rating: 0, minPrice: 0, maxPrice: 10000, availability: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Filter products based on the filter state
    const filteredProducts = sampleProducts.filter(product => {
      const matchesCategory = filters.category ? product.category.toLowerCase().includes(filters.category.toLowerCase()) : true;
      const matchesCompany = filters.company ? product.company.toLowerCase().includes(filters.company.toLowerCase()) : true;
      const matchesRating = filters.rating ? product.rating >= filters.rating : true;
      const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
      const matchesAvailability = filters.availability ? product.availability.toLowerCase().includes(filters.availability.toLowerCase()) : true;

      return matchesCategory && matchesCompany && matchesRating && matchesPrice && matchesAvailability;
    });

    setProducts(filteredProducts);
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">All Products</h1>
      <div className="mb-4">
        <label className="block mb-2">
          Category:
          <input type="text" name="category" onChange={handleFilterChange} className="border p-1 ml-2" />
        </label>
        <label className="block mb-2">
          Company:
          <input type="text" name="company" onChange={handleFilterChange} className="border p-1 ml-2" />
        </label>
        <label className="block mb-2">
          Min Price:
          <input type="number" name="minPrice" onChange={handleFilterChange} className="border p-1 ml-2" />
        </label>
        <label className="block mb-2">
          Max Price:
          <input type="number" name="maxPrice" onChange={handleFilterChange} className="border p-1 ml-2" />
        </label>
        <label className="block mb-2">
          Rating:
          <input type="number" name="rating" step="0.1" onChange={handleFilterChange} className="border p-1 ml-2" />
        </label>
        <label className="block mb-2">
          Availability:
          <input type="text" name="availability" onChange={handleFilterChange} className="border p-1 ml-2" />
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4">
            <h2 className="text-xl font-bold">{product.productName}</h2>
            <p>Company: {product.company}</p>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Discount: {product.discount}%</p>
            <p>Availability: {product.availability}</p>
            <Link to={`/product/${product.id}`} className="text-blue-500">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

// Product Detail Page
const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Find product by ID
    const product = sampleProducts.find(p => p.id === id);
    setProduct(product);
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{product.productName}</h1>
      <p>Company: {product.company}</p>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Discount: {product.discount}%</p>
      <p>Availability: {product.availability}</p>
      <Link to="/" className="text-blue-500">Back to Products</Link>
    </div>
  );
};

// App Component
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
