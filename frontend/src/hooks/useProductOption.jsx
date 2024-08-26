import { useCallback, useReducer } from "react";

const initialState = {
    selectedColor: "",
    selectedSize: "",
    selectedQuantity: 1,
    sizeError: "",
    colorError: "",
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_SELECTED_COLOR":
            return { ...state, selectedColor: action.payload, colorError: "" };
        case "SET_SELECTED_SIZE":
            return { ...state, selectedSize: action.payload, sizeError: "" };
        case "SET_SELECTED_QUANTITY":
            return { ...state, selectedQuantity: action.payload };
        case "SET_COLOR_ERROR":
            return { ...state, colorError: action.payload };
        case "SET_SIZE_ERROR":
            return { ...state, sizeError: action.payload };

        default:
            return state;
    }
};

const useProductOption = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleSelectColor = (e) => {
        const color = e.target.dataset.color;
        dispatch({ type: "SET_SELECTED_COLOR", payload: color });
    };

    const handleSelectSize = (e) => {
        const size = e.target.dataset.size;
        dispatch({ type: "SET_SELECTED_SIZE", payload: size });
    };

    const handleQuantityChange = useCallback(
        (operation) => {
            dispatch({
                type: "SET_SELECTED_QUANTITY",
                payload:
                    operation === "increase"
                        ? state.selectedQuantity + 1
                        : Math.max(state.selectedQuantity - 1, 1),
            });
        },
        [state.selectedQuantity]
    );

    const validateSelections = () => {
        if (!state.selectedColor) {
            dispatch({
                type: "SET_COLOR_ERROR",
                payload: "Please select the color",
            });
            return false;
        }
        if (!state.selectedSize) {
            dispatch({
                type: "SET_SIZE_ERROR",
                payload: "Please select the size",
            });
            return false;
        }
        return true;
    };

    return {
        state,
        handleSelectColor,
        handleSelectSize,
        handleQuantityChange,
        validateSelections,
    };
};

export default useProductOption;
