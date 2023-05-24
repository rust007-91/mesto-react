import avatar from "../images/kusto-avatar.jpg";
import api from "../utils/api";
import { useEffect, useState } from "react";
import Card from "./Card";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
    const [userName, setUserName] = useState("");
    const [userDescription, setUserDescription] = useState("");
    const [userAvatar, setUserAvatar] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([api.getApiInfo(), api.getApiCard()])
            .then((dataList) => {
                const [dataInfo, dataCards] = dataList; // диструктурируем полученный массив данных
                // установка данных профиля
                setUserName(dataInfo.name);
                setUserDescription(dataInfo.about);
                setUserAvatar(dataInfo.avatar);
                // рендер карточек
                setCards(dataCards);
            })
            .catch((err) => alert(err));
    }, []);



    return (
        <main>
            <section className="profile">
                <div className="profile__container">
                    <button onClick={onEditAvatar} className="profile__avatar-button">
                        <img
                            src={avatar}
                            alt="Аватарка"
                            className="profile__avatar-image"
                            style={{ backgroundImage: `url(${userAvatar})` }}
                        />
                    </button>
                    <div className="profile__info">
                        <div className="profile__text-wrapper">
                            <h1 className="profile__title">{userName}</h1>
                            <p className="profile__description">{userDescription}</p>
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
                        return (
                            <Card key={card._id}
                                  card={card}
                                  onCardClick={onCardClick} />
                        );
                    })}
                </ul>
            </section>
        </main>
    );
}

export default Main;
