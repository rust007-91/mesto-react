import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useState } from "react";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarState] = useState(false); // хук открытия формы аватара
  const [isEditProfilePopupOpen, setEditProfileState] = useState(false); // хук открытия формы редактирования
  const [isAddPlacePopupOpen, setAddPlaceState] = useState(false); // хук открытия формы добавления карты
  const [isImagePopupOpen, setImagePopupOpen] = useState(false); // хук проброса выбранной карточки
  const [selectedCard, setSelectedCard] = useState({});

  // Обработчики стейтов
  const handleEditAvatarClick = () => {
    setEditAvatarState(true);
  };

  const handleEditProfileClick = () => {
    setEditProfileState(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlaceState(true);
  };

  const closeAllPopups = () => {
    setEditAvatarState(false);
    setEditProfileState(false);
    setAddPlaceState(false);
    setImagePopupOpen(false);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setImagePopupOpen(true);
  };

  return (
      <div className="page">
        <div className="page__container">
          <Header />

          <Main
              onEditAvatar={ handleEditAvatarClick }
              onEditProfile={ handleEditProfileClick }
              onAddPlace={ handleAddPlaceClick }
              onCardClick={ handleCardClick }
          />

          <Footer />

          <PopupWithForm
              title="Обновить аватар"
              name="avatar"
              btnText="Сохранить"
              isOpen={ isEditAvatarPopupOpen }
              onClose={ closeAllPopups }
          >
            <fieldset className="popup__form-fieldset">
              <input
                  id="desc_avatar"
                  type="url"
                  className="popup__input popup__input_type_avatar"
                  name="link"
                  placeholder="Ссылка на картинку"
                  required
              />
              <span
                  className="error-message error-message_active"
                  id="desc_avatar-error"
              ></span>
            </fieldset>
          </PopupWithForm>

          <PopupWithForm
              title="Редактировать профиль"
              name="edit"
              btnText="Сохранить"
              isOpen={ isEditProfilePopupOpen }
              onClose={ closeAllPopups }
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
              />
              <span
                  className="error-message error-message_active"
                  id="desc_edit-error"
              ></span>
            </fieldset>
          </PopupWithForm>

          <PopupWithForm
              title="Новое место"
              name="add"
              btnText="Создать"
              isOpen={ isAddPlacePopupOpen }
              onClose={ closeAllPopups }
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
              />
              <span
                  className="error-message error-message_active"
                  id="desc_add-error"
              ></span>
            </fieldset>
          </PopupWithForm>

          <PopupWithForm title="Вы уверены?" name="confirm" btnText="Да" />

          <ImagePopup
              card={ selectedCard }
              isOpen={ isImagePopupOpen }
              onClose={ closeAllPopups }
          />
        </div>
      </div>
  );
}

export default App;
