import React from 'react';
import st from './Header.module.scss'

const Header = (props) => {
    return (
        <header>
            <div className={st.left}>
                <img width={40} height={40} src="img/logo.jpg" alt="Logo"/>
                <div>
                    <h3>React Shop</h3>
                    <p>Магазин корейской косметики</p>
                </div>
            </div>
            <div className={st.right}>
                <ul>
                    <li className={st.cart} onClick={props.onClickCart}>
                        <img width={18} height={18} src="img/cart.svg" alt="Cart"/>
                        <span>12999P</span></li>
                    <li>
                        <img width={18} height={18} src="img/user.svg" alt="User"/>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header;