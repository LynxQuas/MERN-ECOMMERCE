import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../context/UserContext";
import { getUserWishlist } from "../../libs/user";
import Spinner from "../../components/ui/Spinner";
import Error from "../../components/ui/Error";
import ProductCard from "../../components/admin/ProductCard";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

const Wishlist = () => {
    const { auth } = useUser();
    const navigate = useNavigate();

    const userId = auth?.user?._id;
    const {
        data: wishlists = [],
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
                    <ProductCard key={wishlist._id} product={wishlist} />
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
                        Add New
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Wishlist;
