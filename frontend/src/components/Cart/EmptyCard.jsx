import { useNavigate } from "react-router-dom";

const EmptyCard = ({ onClose }) => {
    const navigate = useNavigate();
    return (
        <div className="flex justify-center flex-col items-center my-20 gap-8">
            <h3 className="text-2xl">Cart is empty</h3>
            <button
                className="bg-black text-white py-2 px-3 rounded-md shadow-sm"
                onClick={() => {
                    navigate("/shop");
                    onClose();
                }}
            >
                Brows Now!
            </button>
        </div>
    );
};

export default EmptyCard;
