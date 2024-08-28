import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../context/UserContext";
import { getUserWishlist } from "../../libs/user";
import Spinner from "../../components/ui/Spinner";
import Error from "../../components/ui/Error";
import ProductCard from "../../components/admin/ProductCard";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

const Wishlist = () => {
    const { auth } = useUser();
    const navigate = useNavigate();

    const userId = auth?.user?._id;
    const {
        data: wishlists,
        isLoading,
        error,
        isError,
    } = useQuery({
        queryKey: ["user", userId],
        queryFn: () => getUserWishlist(auth?.user?._id.toString()),
    });

    if (isLoading) return <Spinner />;
    if (isError) return <Error text={error.message} />;

    return (
        <div className="flex flex-col gap-5">
            {wishlists.length > 0 &&
                wishlists?.map((wishlist) => (
                    <Link
                        to={`/shop/${wishlist.category}/${wishlist._id}`}
                        key={wishlist._id}
                    >
                        <ProductCard
                            name={wishlist.name}
                            price={wishlist.price}
                            imageUrl={wishlist.imageUrl}
                            isFeature={wishlist.isFeature}
                            productId={wishlist._id}
                            category={wishlist.category}
                        />
                    </Link>
                ))}

            {wishlists.length === 0 && (
                <div className="w-full h-[70vh] flex justify-center items-center flex-col gap-4">
                    <h3 className="text-xl md:text-2xl">
                        No item in the wishlist.
                    </h3>
                    <Button
                        onClick={() => navigate("/shop")}
                        className="bg-black text-white p-2 rounded-md"
                    >
                        Add new
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Wishlist;
