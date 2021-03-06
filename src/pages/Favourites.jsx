import React from 'react';
import AppContext from "../context";

import Card from "../components/Card/Card";

const Favourites = ({searchValue, onChangeSearchInput, onAddToCart}) => {

    const {favourites, onAddToFavourite} = React.useContext(AppContext)

    return (
        <div>
            <div className="content p-40">
                <div className="d-flex align-center mb-40 justify-between">
                    <h1 className="">{searchValue ? `Поиск по запросу: ${searchValue}` : `Избранное`}</h1>
                    <div className="search-block d-flex">
                        <img src="img/search.svg" alt="Search"/>
                        <input
                            onChange={onChangeSearchInput}
                            type="text" placeholder="Найти..."/>
                    </div>
                </div>
                <div>
                    <div className='d-flex flex-wrap'>
                        {favourites.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase())).map((item) => (
                            <Card
                                key={item.name}
                                id={item.id}
                                name={item.name}
                                price={item.price}
                                imageUrl={item.imageUrl}
                                onClickPlus={(obj) => onAddToCart(obj)}
                                isFavourited={true}
                                onClickFavourite={(obj) => onAddToFavourite(obj)}

                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Favourites;