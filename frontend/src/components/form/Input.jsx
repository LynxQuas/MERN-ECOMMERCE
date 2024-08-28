const Input = ({
    name,
    register,
    errors = {},
    registerOptions = {},
    ...inputProps
}) => {
    const errorMessage = errors[name]?.message;
    return (
        <div className="flex flex-col">
            <input
                name={name}
                className="bg-gray-100 w-full px-4 py-3 rounded-md"
                {...register(name, registerOptions)}
                {...inputProps}
            />
            {errorMessage && (
                <span className="text-red-500 text-sm text-start">
                    {errorMessage}
                </span>
            )}
        </div>
    );
};

export default Input;
