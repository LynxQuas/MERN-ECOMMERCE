const Input = ({ type, name, onChange, className, placeholder, ...props }) => {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            className={className}
            {...props}
        />
    );
};

export default Input;
