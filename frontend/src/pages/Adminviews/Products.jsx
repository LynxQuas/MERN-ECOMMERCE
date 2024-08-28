import ProductCard from "../../components/admin/ProductCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Spinner from "../../components/ui/Spinner";
import Error from "../../components/ui/Error";
import useProducts from "../../hooks/useProducts";


const Products = () => {

    const {
        products,
        error,
        isLoading,
        isError,
        searchProduct,
        setSearchProduct,
    } = useProducts();

    const handleSearchProduct = (event) => {
        setSearchProduct(event.target.value);
    };


    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <Error text={error.message} />;
    }

    return (
        <>

            <div className="bg-gray-50 min-h-screen p-8 flex justify-center w-full">
                <div className="max-w-3xl w-full">
                    <div className="relative mb-6">
                        <input
                            className="bg-white py-3 px-12 rounded-full w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            onChange={handleSearchProduct}
                            value={searchProduct}
                            placeholder="Search Products..."
                        />
                        <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 absolute top-1/2 left-4 transform -translate-y-1/2" />
                    </div>

                    <div className="space-y-4">
                        {products.length > 0 ? (
                            products
                                ?.slice()
                                .reverse()
                                .map((data) => (
                                    <ProductCard key={data._id}
                                        product={data} />
                                ))
                        ) : (
                            <h3>Product Not Found.</h3>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Products;
