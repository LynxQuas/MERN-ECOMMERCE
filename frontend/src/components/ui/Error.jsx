const Error = ({ text = "Something went wrong!", onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60%] bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center md:w-[30rem] w-full">
                <h2 className="text-2xl font-semibold text-red-600 mb-4">
                    Error
                </h2>
                <p className="text-gray-700 mb-6">{text}</p>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                    >
                        Retry
                    </button>
                )}
            </div>
        </div>
    );
};

export default Error;
