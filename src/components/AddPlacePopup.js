import PopupWithForm from "./PopupWithForm";
import { useContext, useEffect, useState } from "react";
import { CurrentCardContext } from "../contexts/CurrentCardContext";
import { CurrentLoadingContext } from "../contexts/CurrentLoadingContext";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const cards = useContext(CurrentCardContext); //Подписка на контекст CurrentCardContext
    const isLoading = useContext(CurrentLoadingContext);

    // стэйты полей новой карточки
    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    //обработчики ввода данных в поля
    const handleInputName = (evt) => {
        setName(evt.target.value);
    };
    const handleInputLink = (evt) => {
        setLink(evt.target.value);
    };

    //обработчик формы для передачи данных в запрос на сервер
    const handleSubmit = (evt) => {
        evt.preventDefault();

        onAddPlace({
            name,
            link,
        });
    };

    //добавление и рендер введёных данных
    useEffect(() => {
        setName("");
        setLink("");
    }, [cards]);

    return (
        <PopupWithForm
            title="Новое место"
            name="add"
            btnText={isLoading ? "Сохранение..." : "Создать"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <fieldset className="popup__form-fieldset popup__form-fieldset_add">
                <input
                    id="heading_add"
                    type="text"
                    className="popup__input popup__input_type_add-name"
                    name="name"
                    placeholder="Название"
                    required
                    minLength="2"
                    maxLength="30"
                    value={name}
                    onChange={handleInputName}
                />
                <span
                    className="error-message error-message_active"
                    id="heading_add-error"
                ></span>
                <input
                    id="desc_add"
                    type="url"
                    className="popup__input popup__input_type_add-img"
                    name="link"
                    placeholder="Ссылка на картинку"
                    required
                    value={link}
                    onChange={handleInputLink}
                />
                <span
                    className="error-message error-message_active"
                    id="desc_add-error"
                ></span>
            </fieldset>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
