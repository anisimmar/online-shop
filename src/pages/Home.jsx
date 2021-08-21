import Card from "../components/Card/Card";

const Home = ({items, onAddToCart, onChangeSearchInput, searchValue, setSearchValue, onAddToFavourite}) => {
    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1 className="">{searchValue ? `Поиск по запросу: ${searchValue}` : `Косметика PURITO`}</h1>
                <div className="search-block d-flex">
                    <img src="img/search.svg" alt="Search"/>
                    <input
                        onChange={onChangeSearchInput}
                        type="text" placeholder="Найти..."/>
                </div>
            </div>
            <div className='d-flex flex-wrap'>
                {items.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase())).map((item) => (
                    <Card
                        key={item.name}
                        name={item.name}
                        price={item.price}
                        id={item.id}
                        imageUrl={item.imageUrl}
                        onClickPlus={(obj) => onAddToCart(obj)}
                        onClickFavourite={(obj) => onAddToFavourite(obj)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home;