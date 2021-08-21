import React from 'react';
import axios from "axios";
import Header from "./components/Header/Header";
import Drawer from "./components/Drawer/Drawer";
import Home from "./pages/Home";
import {Route} from "react-router-dom";
import Favourites from "./pages/Favourites";

function App() {

    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([])
    const [cartOpened, setCartOpened] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');
    const [favourites, setFavourites] = React.useState([])

    React.useEffect(() => {
        axios.get('https://611e78879771bf001785c4b5.mockapi.io/items')
            .then((response) => {
                setItems(response.data);
            });
        axios.get('https://611e78879771bf001785c4b5.mockapi.io/cart')
            .then((response) => {
                setCartItems(response.data);
            });
        axios.get('https://611e78879771bf001785c4b5.mockapi.io/favourite')
            .then((response) => {
                setFavourites(response.data);
            });
    }, [])

    const onAddToCart = (obj) => {
        axios.post('https://611e78879771bf001785c4b5.mockapi.io/cart', obj);
        setCartItems(prev => [...prev, obj]);
    }

    const onAddToFavourite = async (obj) => {
        if (favourites.find(favObj => favObj.id === obj.id)) {
            axios.delete(`https://611e78879771bf001785c4b5.mockapi.io/favourite/${obj.id}`);
        } else {
            const {data} = await axios.post('https://611e78879771bf001785c4b5.mockapi.io/favourite', obj);
            setFavourites(prev => {
                return [...prev, data];
            });
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
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    onChangeSearchInput={onChangeSearchInput}
                    onAddToFavourite={onAddToFavourite}
                    onAddToCart={onAddToCart}/>
            </Route>
            <Route path='/favourites'>
                <Favourites
                    items={favourites}
                    searchValue={searchValue}
                    onChangeSearchInput={onChangeSearchInput}
                    onAddToCart={onAddToCart}
                    onAddToFavourite={onAddToFavourite}
                />
            </Route>
        </div>
    );
}

export default App;
