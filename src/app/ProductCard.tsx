'use client';
import { useState } from 'react';

const ProductCard = ({ loading, product }) => {
    const items = product?.data?.result || [];
    const [sortOption, setSortOption] = useState('price_asc');

    const sortItems = (items) => {
        return items.sort((a, b) => {
            let valueA, valueB;

            switch (sortOption) {
                case 'price_asc':
                    valueA = a.price || 0;
                    valueB = b.price || 0;
                    return valueA - valueB;
                case 'price_desc':
                    valueA = a.price || 0;
                    valueB = b.price || 0;
                    return valueB - valueA;
                case 'review_asc':
                    valueA = a.review_average || 0;
                    valueB = b.review_average || 0;
                    return valueA - valueB;
                case 'review_desc':
                    valueA = a.review_average || 0;
                    valueB = b.review_average || 0;
                    return valueB - valueA;
                default:
                    return 0;
            }
        });
    };

    const sortedItems = sortItems([...items]);

    return (
        <div className="p-6">
            {loading ? (
                <div className="flex justify-center my-10">
                    <p className="text-blue-500 underline text-lg">Loading...</p>
                </div>
            ) : (
                <div>
                    {sortedItems.length === 0 ? (
                        <p className="text-center text-gray-500 mt-10">No products found.</p>
                    ) : (
                        <div>
                            <div className="mb-4 flex justify-between items-center">
                                <div>
                                    <label className="mr-2">Sort by:</label>
                                    <select
                                        value={sortOption}
                                        onChange={(e) => setSortOption(e.target.value)}
                                        className="p-2 border rounded"
                                    >
                                        <option value="price_asc" className='text-black'>Price (Low to High)</option>
                                        <option value="price_desc" className='text-black'>Price (High to Low)</option>
                                        <option value="review_asc" className='text-black'>Review (Low to High)</option>
                                        <option value="review_desc" className='text-black'>Review (High to Low)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {sortedItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="h-48 w-full overflow-hidden">
                                            <img
                                                src={item.image_urls?.[0] || 'https://via.placeholder.com/300x200?text=No+Image'}
                                                alt={item.title || 'Product'}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>

                                        <div className="flex flex-col flex-grow p-4">
                                            <h3 className="text-md font-semibold text-gray-800 line-clamp-2 mb-2">
                                                {item.title || 'No Title'}
                                            </h3>

                                            <div className="text-xs text-gray-500 mb-2">
                                                {item.brand && <span>Brand: {item.brand}</span>}
                                                {item.platform && <span className="ml-2">({item.platform.toUpperCase()})</span>}
                                            </div>

                                            <div className="text-xl font-bold text-blue-600 mb-2">
                                                {item.currency} {item.price?.toLocaleString() || 'N/A'}
                                            </div>

                                            <div className="flex items-center text-sm text-gray-600 mb-2">
                                                <span className="text-yellow-400">★</span>
                                                <span className="ml-1">{item.review_average || 0}</span>
                                                <span className="ml-2 text-gray-400">({item.review_count || 0})</span>
                                            </div>

                                            <div className={`text-xs font-semibold mb-2 ${item.availability ? 'text-green-600' : 'text-red-500'}`}>
                                                {item.availability ? 'In Stock' : 'Out of Stock'}
                                            </div>

                                            <div
                                                className="text-sm text-gray-500 line-clamp-3 mt-2 flex-grow"
                                                dangerouslySetInnerHTML={{ __html: item.description || '' }}
                                            />

                                            <a
                                                href={item.item_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg text-sm transition-colors"
                                            >
                                                View Product
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductCard;
