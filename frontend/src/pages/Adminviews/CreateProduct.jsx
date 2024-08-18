import ProductForm from "../../components/admin/ProductForm";

const CreateProduct = () => {
    return (
        <div>
            <h1 className="text-center text-2xl font-bold mt-4">
                Create New Product
            </h1>
            <ProductForm />
        </div>
    );
};

export default CreateProduct;
