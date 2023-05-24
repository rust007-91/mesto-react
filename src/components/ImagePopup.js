function ImagePopup({ card, isOpen, onClose }) {
    return (
        <div className={`popup popup_img ${ isOpen && "popup_opened" }`}>
            <div className="popup__container">
                <img
                    src={ card.link }
                    alt={ card.name }
                    className="popup__card-image"
                />
                <p className="popup__card-name">{ card.name }</p>
                <button
                    className="popup__close"
                    type="button"
                    aria-label="кнопка закрыть попап"
                    onClick={ onClose }
                ></button>
            </div>
        </div>
    );
}

export default ImagePopup;
