import PopupWithForm from "./PopupWithForm";
import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {CurrentLoadingContext} from "../contexts/CurrentLoadingContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const currentUser = useContext(CurrentUserContext); // подписка на контекст
    const isLoading = useContext(CurrentLoadingContext);

    // стэйты полей редактирования
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    //обработчики ввода данных в поля
    const handleInputName = (evt) => {
        setName(evt.target.value);
    }
    const handleInputDescription = (evt) => {
        setDescription(evt.target.value);
    }

    //добавление и рендер введёных данных
    useEffect(() => {
        setName(currentUser.name || "");
        setDescription(currentUser.about || "");
    }, [currentUser]);

    //обработчик формы для передачи данных в запрос на сервер
    const handleSubmit = (e) => {
        e.preventDefault(); // Запрещаем браузеру переходить по адресу формы

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
        });
    }

    return(
        <PopupWithForm
            title="Редактировать профиль"
            name="edit"
            btnText={ isLoading ? "Сохранение..." : "Сохранить"}
            isOpen={ isOpen }
            onClose={ onClose }
            onSubmit={ handleSubmit }
        >
            <fieldset className="popup__form-fieldset popup__form-fieldset_edit">
                <input
                    id="heading_edit"
                    type="text"
                    className="popup__input popup__input_type_edit-name"
                    name="heading"
                    placeholder="Введите имя"
                    minLength="2"
                    maxLength="40"
                    required
                    onChange={ handleInputName }
                    value={ name }
                />
                <span
                    className="error-message error-message_active"
                    id="heading_edit-error"
                ></span>
                <input
                    id="desc_edit"
                    type="text"
                    className="popup__input popup__input_type_edit-job"
                    name="desc"
                    placeholder="Введите род деятельности"
                    minLength="2"
                    maxLength="200"
                    required
                    onChange={ handleInputDescription }
                    value={ description }
                />
                <span
                    className="error-message error-message_active"
                    id="desc_edit-error"
                ></span>
            </fieldset>
        </PopupWithForm>
    );
}

export default EditProfilePopup;