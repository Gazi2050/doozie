'use client';

const ProductCard = ({ loading, product }) => {
    const items = product?.data?.result || [];

    return (
        <div className="p-6">
            {/* Loading button */}
            <div className="flex justify-center mb-6">
                <button className="text-blue-500 underline text-lg" disabled>
                    {loading ? 'Loading...' : 'Fetch Items'}
                </button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="h-48 w-full overflow-hidden">
                                <img
                                    src={item.image_urls?.[0] || 'https://via.placeholder.com/300x200?text=No+Image'}
                                    alt={item.title || 'Product'}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="flex flex-col flex-grow p-4">
                                {/* Title */}
                                <h3 className="text-md font-semibold text-gray-800 line-clamp-2 mb-2">
                                    {item.title || 'No Title'}
                                </h3>

                                {/* Brand and Platform */}
                                <div className="text-xs text-gray-500 mb-2">
                                    {item.brand && <span>Brand: {item.brand}</span>}
                                    {item.platform && <span className="ml-2">({item.platform.toUpperCase()})</span>}
                                </div>

                                {/* Price */}
                                <div className="text-xl font-bold text-blue-600 mb-2">
                                    {item.currency} {item.price?.toLocaleString() || 'N/A'}
                                </div>

                                {/* Reviews */}
                                <div className="flex items-center text-sm text-gray-600 mb-2">
                                    <span className="text-yellow-400">★</span>
                                    <span className="ml-1">{item.review_average || 0}</span>
                                    <span className="ml-2 text-gray-400">({item.review_count || 0})</span>
                                </div>

                                {/* Availability */}
                                <div className={`text-xs font-semibold mb-2 ${item.availability ? 'text-green-600' : 'text-red-500'}`}>
                                    {item.availability ? 'In Stock' : 'Out of Stock'}
                                </div>

                                {/* Description */}
                                <div
                                    className="text-sm text-gray-500 line-clamp-3 mt-2 flex-grow"
                                    dangerouslySetInnerHTML={{ __html: item.description || '' }}
                                />

                                {/* View Product Button */}
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
                    ))
                ) : (
                    !loading && <p className="text-center text-gray-500">No products found.</p>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
