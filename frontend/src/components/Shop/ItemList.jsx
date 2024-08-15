const ItemList = ({ children }) => {
    return (
        <div className="flex flex-wrap gap-1 justify-center md:grow md:gap-5 pt-10">
            {children}
        </div>
    );
};

export default ItemList;
