import React from 'react';
import st from './Card.module.scss'

const Card = ({onClickFavourite, onClickPlus, name, price, imageUrl, id, added = false, isFavourited = false}) => {

    const [isAdded, setIsAdded] = React.useState(added);
    const [isFavourite, setIsFavourite] = React.useState(isFavourited)

    const onClickPlus2 = () => {
        onClickPlus({id, name, price, imageUrl});
        setIsAdded(!isAdded);
    }

    const onClickLike = () => {
        onClickFavourite({id, name, price, imageUrl});
        setIsFavourite(!isFavourite)
    }

console.log("cart item render", added, isAdded)
    return (
        <div className="d-flex">
            <div className={st.card}>
                <div className={st.favourite}>
                    <img
                        src={isFavourite ? 'img/favourite.jpg' : 'img/unfavourite.jpg'}
                        alt="Favourite"
                        onClick={onClickLike}
                    />
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