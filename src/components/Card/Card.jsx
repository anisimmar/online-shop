import React from 'react';
import st from './Card.module.scss'

const Card = ({onClickFavourite, onClickPlus, name, price, imageUrl}) => {

    const [isAdded, setIsAdded] = React.useState(false);

    const onClickPlus2 = () => {
        onClickPlus({name, price, imageUrl});
        setIsAdded(!isAdded);
    }


    return (
        <div className="d-flex">
            <div className={st.card}>
                <div className={st.favourite}
                     onClick={onClickFavourite}
                >
                    <img src="img/unfavourite.jpg" alt="Unliked"/>
                </div>
                <img width={133} height={112} src={imageUrl} alt="Photo"/>
                <h5>
                    {name}
                </h5>
                <div className="d-flex justify-between align-center">
                    <div className="d-flex flex-column">
                        <span className='mb-5'>Цена: </span>
                        <b>{price}P</b>
                    </div>
                    <img
                        src={isAdded ? 'img/plus-added.jpg' : 'img/plus-not-added.jpg'}
                        alt="Btn-plus"
                        onClick={onClickPlus2}
                        className={st.plus}
                    />
                </div>
            </div>
        </div>
    )
}

export default Card;