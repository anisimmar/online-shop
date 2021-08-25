import React from 'react'
import AppContext from "../../context";
import st from './Info.module.scss'

const Info = ({ name, description  }) => {

    const {setCartOpened} = React.useContext(AppContext)

    return (
        <div className={st.page}>
            <h2>{name}</h2>
            <p> {description}</p>
            <button  className={st.btn} onClick={() => setCartOpened(false)}>
                Вернуться к покупкам
            </button>
        </div>
    )
}

export default Info;

