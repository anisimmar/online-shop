import React from 'react';
import axios from "axios";

import AppContext from "../context";

import Card from "../components/Card/Card";


const Orders = () => {
    const {onAddToCart, onAddToFavourite} = React.useContext(AppContext)

    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get(`https://611e78879771bf001785c4b5.mockapi.io/orders`);
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                setIsLoading(false);
            } catch (error) {
                alert('Ошибка при загрузке заказов')
            }
        })();
    }, [])

    return (
        <div className='content p-40'>
            <div className='d-flex align-center justify-between mb-40'>
                <h1>Мои заказы</h1>
            </div>

            <div className='d-flex flex-wrap'>
                {(isLoading ? [...Array(8)] : orders).map((item, index) => (
                    <Card
                        {...item}
                        loading={isLoading}/>
                ))}
            </div>
        </div>
    )
}

export default Orders;

