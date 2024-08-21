import { useForm } from "react-hook-form";
import ProductInputError from "./ProductInputError";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createOrUpdateProduct, getProductDetails } from "../../libs/product";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

const categories = [
    "men",
    "women",
    "footwear",
    "accessories",
    "sale",
    "new-arrivals",
    "best-sellers",
];

const sizes = ["XS", "S", "M", "L", "XL"];

const ProductForm = ({ isUpdating = false }) => {
    const { productId } = useParams();

    const navigate = useNavigate();

    const { data } = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getProductDetails(productId),
        enabled: isUpdating,
    });

    const { register, reset, handleSubmit, watch, getValues, formState } =
        useForm({
            defaultValues: data,
        });

    console.log(data);

    useEffect(() => {
        if (data) {
            reset({
                productId: data._id || "",
                name: data.name || "",
                price: data.price || 0,
                imageUrl: data.imageUrl || "",
                description: data.description || "",
                category: data.category || "all",
                onSale: data.onSale || false,
                salePrice: data.salePrice || "",
                isFeature: data.isFeature || false,
                sizes: data.sizes || [],
                colors: data.colors.join(", ") || "",
            });
        }
    }, [data, reset]);

    const { mutate, isPending } = useMutation({
        mutationFn: (data) => createOrUpdateProduct(data, isUpdating),
        onSuccess: () => {
            toast.success(
                `${isUpdating ? "Updated" : "Created"} successfully.`
            );
            navigate("/admin/products");
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const { errors } = formState;
    const watchOnSale = watch("onSale");

    const onSubmit = (data) => {
        const productData = {
            ...data,
            colors: data.colors.split(",").map((color) => color.trim()),
        };

        mutate(productData);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-6 space-y-4 bg-white rounded-lg shadow-md max-w-lg mx-auto"
        >
            <input
                type="text"
                className="border border-gray-300 rounded-md py-3 px-4 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Product Name"
                {...register("name", { required: "Name is required" })}
            />
            {errors.name && <ProductInputError message={errors.name.message} />}
            <input
                type="text"
                className="border border-gray-300 rounded-md py-3 px-4 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Price"
                {...register("price", {
                    required: "Price is required",
                    validate: (value) =>
                        Number(value) > 0 || "Price must be positive",
                })}
            />
            {errors.price && (
                <ProductInputError message={errors.price.message} />
            )}
            <input
                type="text"
                className="border border-gray-300 rounded-md py-3 px-4 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Image Url"
                {...register("imageUrl", { required: "Image is required" })}
            />
            {errors.imageUrl && (
                <ProductInputError message={errors.imageUrl.message} />
            )}

            <textarea
                className="border resize-none border-gray-300 rounded-md py-3 px-4 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Description"
                cols={2}
                rows={3}
                {...register("description", {
                    required: "Description is required",
                })}
            ></textarea>
            {errors.description && (
                <ProductInputError message={errors.description.message} />
            )}

            <div className="flex gap-4 items-center">
                <select
                    defaultValue="all"
                    {...register("category", {
                        required: "Category is required",
                    })}
                    className="border border-gray-300 rounded-md py-3 px-4 focus:ring-2 focus:ring-purple-500 focus:outline-none w-1/2"
                >
                    <option value="all">All</option>
                    {categories.map((cate) => (
                        <option value={cate} key={cate}>
                            {cate}
                        </option>
                    ))}
                </select>

                <div className="flex items-center gap-2 w-1/2">
                    <input
                        type="checkbox"
                        {...register("onSale")}
                        id="onSale"
                        className="form-checkbox h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                    <label
                        htmlFor="onSale"
                        className="text-gray-700 font-medium"
                    >
                        On Sale
                    </label>
                </div>
            </div>
            {errors.category && (
                <ProductInputError message={errors.category.message} />
            )}

            {watchOnSale && (
                <input
                    type="number"
                    name="salePrice"
                    {...register("salePrice", {
                        validate: (value) =>
                            value < getValues().price ||
                            "Sale price should be lower than normal price",
                    })}
                    className="border border-gray-300 rounded-md py-3 px-4 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="Sale Price"
                />
            )}
            {errors.salePrice && (
                <ProductInputError message={errors.salePrice.message} />
            )}

            <div className="flex items-center gap-2 w-1/2">
                <input
                    type="checkbox"
                    {...register("isFeature")}
                    id="isFeature"
                    className="form-checkbox h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
                <label
                    htmlFor="isFeature"
                    className="text-gray-700 font-medium"
                >
                    Feature
                </label>
            </div>

            <div className="border border-gray-300 rounded-md p-4 space-y-2">
                <span className="text-gray-700 font-medium">Sizes:</span>
                <div className="flex flex-wrap gap-4">
                    {sizes.map((size) => (
                        <div className="flex items-center gap-2" key={size}>
                            <input
                                type="checkbox"
                                value={size}
                                {...register("sizes", {
                                    required: "Sizes are required",
                                })}
                                className="form-checkbox h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                id={size}
                            />
                            <label
                                className="text-gray-700 font-medium"
                                htmlFor={size}
                            >
                                {size}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            {errors.sizes && (
                <ProductInputError message={errors.sizes.message} />
            )}

            <div className="w-full">
                <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="colors"
                >
                    Colors (comma separated)
                </label>
                <input
                    type="text"
                    id="colors"
                    {...register("colors", { required: "Colors are required" })}
                    className="border border-gray-300 rounded-md py-3 px-4 focus:ring-2 focus:ring-purple-500 focus:outline-none w-full"
                    placeholder="e.g., red, green, blue"
                />
            </div>
            {errors.colors && (
                <ProductInputError message={errors.colors.message} />
            )}

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md text-lg font-semibold transition duration-300"
            >
                {isPending ? "Creating..." : "Create Product"}
            </button>
        </form>
    );
};

export default ProductForm;
