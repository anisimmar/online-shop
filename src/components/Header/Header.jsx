import React from 'react';
import {Route, Link} from 'react-router-dom'
import AppContext from "../../context";

import st from './Header.module.scss'

const Header = (props) => {

    const {cartItems} = React.useContext(AppContext)

    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

    return (
        <header>
            <Link to="/">
                <div className={st.left}>
                    <img width={40} height={40} src="img/logo.jpg" alt="Logo"/>
                    <div>
                        <h3>React Shop</h3>
                        <p>Магазин корейской косметики</p>
                    </div>
                </div>
            </Link>
            <div className={st.right}>
                <ul>
                    <li className={st.cart} onClick={props.onClickCart}>
                        <img width={18} height={18} src="img/cart.svg" alt="Cart"/>
                        <span>
                            {totalPrice} руб.
                        </span></li>

                    <li>
                        <Link to='/favourites'>
                            <img width={18} height={18} src="img/favourite-header.svg" alt="Favourite"
                                 className={st.heart}/>
                        </Link>
                    </li>
                    <li>
                        <Link to='/orders'>
                            <img width={18} height={18} src="img/user.svg" alt="User"/>
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header;