const Button = ({
    className,
    onClick,
    type = "button",
    children,
    ...props
}) => {
    return (
        <button className={className} type={type} onClick={onClick} {...props}>
            {children}
        </button>
    );
};

export default Button;
