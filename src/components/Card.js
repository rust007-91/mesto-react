import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // обработчик для прокидывания выбранной карточки
    function handleClick() {
        onCardClick(card);
    }

    // обработчик для прокидывания выбранной карточки
    function handleLikeClick() {
        onCardLike(card);
    }

    // обработчик для прокидывания выбранной карточки
    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="elements__card">
            <img
                src={ card.link }
                alt={ card.name }
                className="elements__card-image"
                onClick={ handleClick }
            />
            { isOwn && <button
                className="elements__delete"
                type="button"
                onClick={ handleDeleteClick }
            ></button> }

            <div className="elements__wrapper-place">
                <div className="elements__wrapper-flex">
                    <h2 className="elements__title">{ card.name }</h2>
                    <div className="elements__wrapper-like">
                        <button
                            type="button"
                            className={ `elements__like ${ isLiked && 'elements__like_active' }` }
                            onClick={ handleLikeClick }
                        ></button>
                        <div className="elements__count-likes">{ card.likes.length }</div>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default Card;
