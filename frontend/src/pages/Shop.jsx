import { useLocation, useNavigate, useParams } from "react-router-dom";
import FeatureItems from "../components/Shop/FeatureItems";
import ItemList from "../components/Shop/ItemList";
import ShopCategory from "../components/Shop/ShopCategory";

import Sidebar from "../components/Shop/Sidebar";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../libs/product";
import ItemCard from "../components/Shop/ItemCard";
import Spinner from "../components/ui/Spinner";
import Error from "../components/ui/Error";

const Shop = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { category } = useParams();

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts,
    });

    const [productName, setProductName] = useState("");

    const filterdProducts = data?.filter((data) =>
        category !== "all" ? data.category.toLowerCase() === category : data
    );

    const searchedProducts = filterdProducts?.filter((data) =>
        data.name.toLowerCase().includes(productName.toLocaleLowerCase())
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
            <ShopCategory setProductName={setProductName} />
            <Sidebar setProductName={setProductName} />
            <div className="flex flex-col gap-4 items-center justify-center">
                {category === "all" && !productName && <FeatureItems />}

                <ItemList>
                    {searchedProducts?.map((data) => (
                        <ItemCard key={data._id} data={data} />
                    ))}
                </ItemList>
            </div>
        </div>
    );
};

export default Shop;
