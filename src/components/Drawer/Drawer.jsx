import React from 'react';
import st from './Drawer.module.scss'

const Drawer = ({onCloseCart, onRemove, items = []}) => {
    return (
        <div className={st.overlay}>
            <div className={st.drawer}>
                <h2>Cart
                    <img className={st.removeBtn}
                         src="img/close.svg" alt="Remove"
                         onClick={onCloseCart}
                    />
                </h2>
                <div className={st.items}>
                    {items.map((obj) => (
                        <div className={st.item}>
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
                            <b>12999P</b></li>
                    </ul>
                    <button className={st.order}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Drawer;