function Card({ card, onCardClick }) {
    // обработчик для прокидывания выбранной карточки
    function handleClick() {
        onCardClick(card);
    }

    return (
        <li className="elements__card">
            <img
                src={ card.link }
                alt={ card.name }
                className="elements__card-image"
                onClick={ handleClick }
            />
            <button className="elements__delete"
                    type="button"
            ></button>
            <div className="elements__wrapper-place">
                <div className="elements__wrapper-flex">
                    <h2 className="elements__title">{ card.name }</h2>
                    <div className="elements__wrapper-like">
                        <button type="button" className="elements__like"></button>
                        <div className="elements__count-likes">{ card.likes.length }</div>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default Card;