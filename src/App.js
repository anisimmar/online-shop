import React from 'react';
import Card from "./components/Card/Card";
import Header from "./components/Header/Header";
import Drawer from "./components/Drawer/Drawer";

function App() {

    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([])
    const [cartOpened, setCartOpened] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('')

    React.useEffect(() => {
        fetch('https://611e78879771bf001785c4b5.mockapi.io/items')
            .then((res) => {
                return res.json()
            })
            .then((json) => {
                setItems(json);
            })
    }, [])

    const onAddToCart = (obj) => {
        setCartItems(prev => [...prev, obj])
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
                }}/>}
            <Header onClickCart={() => {
                setCartOpened(true)
            }}
            />
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
                            imageUrl={item.imageUrl}
                            onClickPlus={(obj) => onAddToCart(obj)}
                            onClickFavourite={() => {
                                alert('like')
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
