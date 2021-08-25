import React from 'react';
import axios from "axios";
import AppContext from "../../context";

import Info from "../Info/Info";

import st from './Drawer.module.scss'


const delay = (ms) => new Promise((resolve) => setTimeout(resolve,ms))

const Drawer = ({onCloseCart, onRemove, items = []}) => {

    const {cartItems, setCartItems} = React.useContext(AppContext);
    const [orderId, setOrderId] = React.useState(null);
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.post('https://611e78879771bf001785c4b5.mockapi.io/orders', {
                items: cartItems
            });
            setOrderId(data.id)
            setIsOrderComplete(true);
            setCartItems([]);

            for (let i=0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete(`https://611e78879771bf001785c4b5.mockapi.io/cart/${item.id}`);
                await delay(1000);
            }

        } catch (error) {
            alert('Не удалось оформить заказ. Пожалйста, повторите попытку позже.')
        }
        setIsLoading(false);
    }

    return (
        <div className={st.overlay}>
            <div className={st.drawer}>
                <h2>Cart
                    <img className={st.removeBtn}
                         src="img/close.svg" alt="Remove"
                         onClick={onCloseCart}
                    />
                </h2>

                {items.length > 0 ? (
                    <div>
                        <div className={st.items}>
                            {items.map((obj) => (
                                <div key={obj.id} className={st.item}>
                                    <div className={st.img} style={{
                                        backgroundImage: `url(${obj.imageUrl})`
                                    }}></div>
                                    <div className="mr-20">
                                        <p className="mb-5">
                                            {obj.name}
                                        </p>
                                        <b>{obj.price}</b>
                                    </div>
                                    <img onClick={() => {
                                        onRemove(obj.id)
                                    }} className={st.removeBtn} src="img/close.svg" alt="Remove"/>
                                </div>
                            ))}
                        </div>
                        <div className={st.total}>
                            <ul>
                                <li>
                                    <span>Total</span>
                                    <div></div>
                                    <b>{totalPrice} руб.</b></li>
                            </ul>
                            <button disabled={isLoading} onClick={onClickOrder} className={st.order}>
                                Send
                            </button>
                        </div>
                    </div>
                ) : (
                    <Info
                        name={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
                        description={isOrderComplete ? `Ваш заказ №${orderId} скоро будет передан в транспортную службу` : "Добавьте товар в корзину, чтобы оформить заказ"}/>)}
            </div>
        </div>
    )
}


export default Drawer;