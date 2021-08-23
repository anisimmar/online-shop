import React from 'react';
import AppContext from "../context";
import Card from "../components/Card/Card";

const Home = ({
                  items,
                  onAddToCart,
                  isLoading,
                  cartItems,
                  onChangeSearchInput,
                  searchValue,
                  setSearchValue,
                  onAddToFavourite
              }) => {

   // const { isItemAdded } = React.useContext(AppContext)

    const renderItems = () => {
        const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()));

        return (isLoading ? [...Array(8)] : filteredItems).map((item) => (
            <Card
                {...item}
                onClickPlus={(obj) => onAddToCart(obj)}
                onClickFavourite={(obj) => onAddToFavourite(obj)}
                //added={isItemAdded(item && item.id)}
                loading={isLoading}
            />
        ))
    }

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
            {console.log('items', cartItems, items)}
            <div className='d-flex flex-wrap'>
                {renderItems()}
            </div>
        </div>
    )
}

export default Home;