'use client';


const ProductCard = ({ loading, product }) => {

    return (
        <div className="p-4">
            <button
                // onClick={handleFetch}
                className="text-blue-500 underline"
            >
                {loading ? 'Loading...' : 'Fetch Items'}
            </button>

            {product && (
                <pre className="mt-4 text-sm">
                    {JSON.stringify(product, null, 2)}
                </pre>
            )}
        </div>
    );
};

export default ProductCard;
