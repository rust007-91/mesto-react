import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CurrentCardContext } from "../contexts/CurrentCardContext";
import Card from "./Card";
import avatar from "../images/kusto-avatar.jpg";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);   //Подписка на контекст CurrentUserContext
    const cards = useContext(CurrentCardContext);   //Подписка на контекст CurrentCardContext

    return (
        <main>
            <section className="profile">
                <div className="profile__container">
                    <button onClick={ onEditAvatar } className="profile__avatar-button">
                        <img
                            src={ currentUser.avatar }
                            alt="Аватарка"
                            className="profile__avatar-image"
                        />
                    </button>
                    <div className="profile__info">
                        <div className="profile__text-wrapper">
                            <h1 className="profile__title">{ currentUser.name }</h1>
                            <p className="profile__description">{ currentUser.about }</p>
                        </div>
                        <button
                            onClick={onEditProfile}
                            className="profile__edit-button"
                            type="button"
                            aria-label="кнопка редактировать"
                        ></button>
                    </div>
                </div>
                <button
                    onClick={onAddPlace}
                    className="profile__add-button"
                    type="button"
                    aria-label="кнопка добавить"
                ></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card) => {
                        const isOwn = card.owner._id === currentUser._id; // Определяем, являемся ли мы владельцем текущей карточки
                        const isLiked = card.likes.some(i => i._id === currentUser._id); // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
                        return (
                            <Card key={ card._id }
                                  card={ card }
                                  isOwn={ isOwn }
                                  isLiked={ isLiked }
                                  onCardClick={ onCardClick }
                                  onCardLike={ onCardLike }
                                  onCardDelete={ onCardDelete }
                            />
                        );
                    })}
                </ul>
            </section>
        </main>
    );
}

export default Main;
