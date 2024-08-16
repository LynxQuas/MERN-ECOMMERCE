const InputError = ({ message }) => {
    return (
        <span className="text-red-500 text-sm text-start my-[-0.5rem]">
            {message}
        </span>
    );
};

export default InputError;
