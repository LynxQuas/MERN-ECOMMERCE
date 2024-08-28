import { useLocation, useNavigate, useParams } from "react-router-dom";
import FeatureItems from "../../components/Shop/FeatureItems";
import ItemList from "../../components/Shop/ItemList";
import ShopCategory from "../../components/Shop/ShopCategory";

import Sidebar from "../../components/Shop/Sidebar";
import { useEffect } from "react";
import ItemCard from "../../components/Shop/ItemCard";
import Spinner from "../../components/ui/Spinner";
import Error from "../../components/ui/Error";
import useProducts from "../../hooks/useProducts";

const Shop = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { category } = useParams();

    const {
        products,
        isError,
        isLoading,
        error,
        searchProduct,
        setSearchProduct,
    } = useProducts();

    const filterdProducts = products.filter((data) =>
        category !== "all" ? data.category.toLowerCase() === category : data
    );

    useEffect(() => {
        if (location.pathname === "/shop") {
            navigate("/shop/all");
        }
    }, [location, navigate]);

    if (isLoading) return <Spinner />;

    if (isError)
        return (
            <Error
                text={error.message}
                onRetry={() => window.location.reload()}
            />
        );
    return (
        <div className="flex flex-col md:flex-row">
            <ShopCategory setProductName={setSearchProduct} />
            <Sidebar setProductName={setSearchProduct} />
            <div className="flex flex-col gap-4 items-center justify-center w-full md:px-10">
                {category === "all" && !searchProduct && <FeatureItems />}

                <ItemList>
                    {filterdProducts.length !== 0 ? (
                        filterdProducts?.map((data) => (
                            <ItemCard key={data._id} data={data} />
                        ))
                    ) : (
                        <p>No Item found.</p>
                    )}
                </ItemList>
            </div>
        </div>
    );
};

export default Shop;
