const Button = ({ className, onClick, children, ...props }) => {
    return (
        <button className={className} onClick={onClick} {...props}>
            {children}
        </button>
    );
};

export default Button;
