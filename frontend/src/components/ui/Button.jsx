const Button = ({
    className,
    onClick,
    type = "button",
    children,
    disabled = false,
    ...props
}) => {
    return (
        <button
            className={`${className} ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type={type}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
