import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import Spinner from "./Spinner";

const Modal = ({ isOpen, onClose, onConfirm, isDeleting }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
        return () => document.body.classList.remove("no-scroll");
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 z-50 w-full h-screen flex items-center justify-center">
            <div
                className="fixed top-0 left-0 w-full h-screen bg-black opacity-60"
                onClick={onClose}
            />
            <div className="bg-white rounded-lg shadow-lg p-6 w-80 md:w-96 max-w-sm relative">
                {isDeleting ? (
                    <Spinner />
                ) : (
                    <>
                        <XMarkIcon
                            className="w-6 h-6 absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-gray-800"
                            onClick={onClose}
                        />
                        <h3 className="text-xl font-semibold mb-4">
                            Are you sure?
                        </h3>
                        <p className="text-gray-700 mb-6">
                            This action cannot be undone. Proceed with caution.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={onConfirm}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Yes
                            </button>
                            <button
                                onClick={onClose}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                No
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Modal;
