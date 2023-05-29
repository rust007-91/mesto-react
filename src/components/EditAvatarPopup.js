import {useEffect, useRef} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    useEffect(() => {
        avatarRef.current.value = "";
    }, [avatarRef, isOpen]);

    return(
        <PopupWithForm
            title="Обновить аватар"
            name="avatar"
            btnText="Сохранить"
            isOpen={ isOpen }
            onClose={ onClose }
            onSubmit={ handleSubmit }
        >
            <fieldset className="popup__form-fieldset">
                <input
                    id="desc_avatar"
                    type="url"
                    className="popup__input popup__input_type_avatar"
                    name="link"
                    placeholder="Ссылка на картинку"
                    required
                    ref={ avatarRef }
                />
                <span
                    className="error-message error-message_active"
                    id="desc_avatar-error"
                ></span>
            </fieldset>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;