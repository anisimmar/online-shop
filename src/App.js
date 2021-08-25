import React from 'react';
import axios from "axios";
import {Route} from "react-router-dom";
import AppContext from "./context";

import Header from "./components/Header/Header";
import Drawer from "./components/Drawer/Drawer";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import Orders from "./pages/Orders";

function App() {

    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([])
    const [cartOpened, setCartOpened] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');
    const [favourites, setFavourites] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true)
                const [cartResponse, favResponse, itemsResponse] = await Promise.all([
                    axios.get('https://611e78879771bf001785c4b5.mockapi.io/cart'),
                    axios.get('https://611e78879771bf001785c4b5.mockapi.io/favourite'),
                    axios.get('https://611e78879771bf001785c4b5.mockapi.io/items'),
                ])

                setIsLoading(false);
                setCartItems(cartResponse.data);
                setFavourites(favResponse.data);
                setItems(itemsResponse.data);
            } catch (error) {
                alert('Ощибка при загрузке данных');
                console.error(error)
            }
        }

        fetchData();
    }, [])

    const onAddToCart = async (obj) => {
        try {
            if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
                await axios.delete(`https://611e78879771bf001785c4b5.mockapi.io/cart/${obj.id}`)
                setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
            } else {
                await axios.post('https://611e78879771bf001785c4b5.mockapi.io/cart', obj);
                setCartItems((prev) => [...prev, obj]);
            }
        } catch (error) {
            alert('Не удалось добавить в корзину');
            console.error(error)
        }
    }

    const onAddToFavourite = async (obj) => {
        try {
            if (favourites.find(favObj => Number(favObj.id) === Number(obj.id))) {
                axios.delete(`https://611e78879771bf001785c4b5.mockapi.io/favourite/${obj.id}`);
                setFavourites(prev => prev.filter((favObj) => Number(favObj.id) !== Number(obj.id)))
            } else {
                const {data} = await axios.post('https://611e78879771bf001785c4b5.mockapi.io/favourite', obj);
                setFavourites(prev => {
                    return [...prev, data];
                });
            }
        } catch (error) {
            alert('Не удалось добавить в Избранное');
            console.error(error)
        }
    }

    const onRemoveItem = (id) => {
        try {
            axios.delete(`https://611e78879771bf001785c4b5.mockapi.io/cart/${id}`);
            setCartItems(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            alert('Ошибка при удалении товара из корзины')
            console.error(error);
        }
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    }

    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(obj.parentId) === Number(id))
    }

    return (
        <AppContext.Provider
            value={
                {
                    cartItems,
                    favourites,
                    items,
                    isItemAdded,
                    onAddToFavourite,
                    onAddToCart,
                    setCartOpened,
                    setCartItems
                }}>
            <div className='wrapper clear'>
                {cartOpened && <Drawer
                    items={cartItems}
                    onCloseCart={() => {
                        setCartOpened(false)
                    }}
                    onRemove={onRemoveItem}
                />}
                <Header onClickCart={() => {
                    setCartOpened(true)
                }}
                />
                <Route path='/' exact>
                    <Home
                        items={items}
                        cartItems={cartItems}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        onChangeSearchInput={onChangeSearchInput}
                        onAddToFavourite={onAddToFavourite}
                        onAddToCart={onAddToCart}
                        isLoading={isLoading}/>
                </Route>
                <Route path='/favourites'>
                    <Favourites
                        searchValue={searchValue}
                        onChangeSearchInput={onChangeSearchInput}
                        onAddToCart={onAddToCart}
                    />
                </Route>
                <Route path='/orders'>
                    <Orders

                    />
                </Route>
            </div>
        </AppContext.Provider>
    );
}

export default App;
