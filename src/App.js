import React from 'react';
import axios from "axios";
import Header from "./components/Header/Header";
import Drawer from "./components/Drawer/Drawer";
import Home from "./pages/Home";
import {Route} from "react-router-dom";
import Favourites from "./pages/Favourites";
import AppContext from "./context";

function App() {

    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([])
    const [cartOpened, setCartOpened] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');
    const [favourites, setFavourites] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        async function fetchData() {
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
        }

        fetchData();
    }, [])

    const onAddToCart = (obj) => {
        try {
            if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
                axios.delete(`https://611e78879771bf001785c4b5.mockapi.io/cart/${obj.id}`)
                setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
            } else {
                axios.post('https://611e78879771bf001785c4b5.mockapi.io/cart', obj);
                setCartItems((prev) => [...prev, obj]);
            }
        } catch (error) {
            alert('Не удалось добавить в корзину')
        }
    }

    const onAddToFavourite = async (obj) => {
        try {
            if (favourites.find(favObj => favObj.id === obj.id)) {
                axios.delete(`https://611e78879771bf001785c4b5.mockapi.io/favourite/${obj.id}`);
            } else {
                const {data} = await axios.post('https://611e78879771bf001785c4b5.mockapi.io/favourite', obj);
                setFavourites(prev => {
                    return [...prev, data];
                });
            }
        } catch (error) {
            alert('Не удалось добавить в Избранное')
        }
    }

    const onRemoveItem = (id) => {
        axios.delete(`https://611e78879771bf001785c4b5.mockapi.io/cart/${id}`);
        setCartItems(prev => prev.filter(item => item.id !== id));
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    }

    return (
        <AppContext.Provider value={{ cartItems, favourites, items }}>
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
                        onAddToFavourite={onAddToFavourite}
                    />
                </Route>
            </div>
        </AppContext.Provider>
    );
}

export default App;
