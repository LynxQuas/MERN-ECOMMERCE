import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../../constants";

const ShopCategory = ({ setProductName }) => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const navigate = useNavigate();

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);

        navigate(`/shop/${category === "All" ? "" : category.toLowerCase()}`);
    };

    return (
        <div className="flex px-4 py-10 gap-4 md:hidden">
            <input
                type="text"
                className="grow py-2 px-4"
                placeholder="Search product"
                onChange={(e) => setProductName(e.target.value)}
            />
            <select
                className="w-[15rem]"
                name="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
            >
                {categories.map((c) => (
                    <option key={c.name} value={c.link || "All"}>
                        {c.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ShopCategory;
