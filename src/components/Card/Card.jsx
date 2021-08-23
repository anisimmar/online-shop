import React from 'react';
import ContentLoader from "react-content-loader"
import st from './Card.module.scss'

const Card = ({
                  onClickFavourite, onClickPlus,
                  name, price, imageUrl, id,
                  added = false,
                  isFavourited = false,
                  loading = false
              }) => {

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

    return (
        <div className="d-flex">
            <div className={st.card}>
                {
                    loading ? <ContentLoader
                        speed={2}
                        width={155}
                        height={250}
                        viewBox="0 0 155 250"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="82" y="68" rx="0" ry="0" width="0" height="1"/>
                        <rect x="0" y="0" rx="10" ry="10" width="150" height="120"/>
                        <rect x="0" y="170" rx="3" ry="3" width="150" height="15"/>
                        <rect x="0" y="190" rx="3" ry="3" width="100" height="15"/>
                        <rect x="0" y="220" rx="3" ry="3" width="80" height="24"/>
                        <rect x="118" y="214" rx="6" ry="6" width="32" height="32"/>
                    </ContentLoader> : <>
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
                    </>
                }
            </div>
        </div>

    )
}

export default Card;