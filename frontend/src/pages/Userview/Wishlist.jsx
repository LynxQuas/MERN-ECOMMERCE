import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../context/UserContext";
import { getUserWishlist } from "../../libs/user";
import Spinner from "../../components/ui/Spinner";
import Error from "../../components/ui/Error";
import ProductCard from "../../components/admin/ProductCard";

const Wishlist = () => {
    const { auth } = useUser();

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
                    <ProductCard
                        key={wishlist._id}
                        name={wishlist.name}
                        price={wishlist.price}
                        imageUrl={wishlist.imageUrl}
                        isFeature={wishlist.isFeature}
                        productId={wishlist._id}
                        category={wishlist.category}
                    />
                ))}
        </div>
    );
};

export default Wishlist;
