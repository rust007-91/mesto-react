import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CurrentCardContext } from "../contexts/CurrentCardContext";
import api from "../utils/api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarState] = useState(false); // хук открытия формы аватара
  const [isEditProfilePopupOpen, setEditProfileState] = useState(false); // хук открытия формы редактирования
  const [isAddPlacePopupOpen, setAddPlaceState] = useState(false); // хук открытия формы добавления карты
  const [isImagePopupOpen, setImagePopupOpen] = useState(false); // хук проброса выбранной карточки
  const [selectedCard, setSelectedCard] = useState({}); // хук открытия выбранной карточки в попап
  const [currentUser, setCurrentUser] = useState({}); // хук запись данных пользователя
  const [cards, setCards] = useState([]); // хук запись данных карточек

  useEffect(() => {

    Promise.all([api.getApiInfo(), api.getApiCard()])
        .then((dataList) => {
          const [dataInfo, dataCards] = dataList; // диструктурируем полученный массив данных
          // запись данных профиля и карточки в их стэйты
          setCurrentUser(dataInfo);
          setCards(dataCards);
        })
        .catch((err) => alert(err));
  }, []);

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

  // Обработчик лайков
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
  }

  // Обработчик лайков
  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.deleteApiCard(card._id)
        .then((newCard) => {
          setCards((state) => state.filter((c) => c._id !== card._id));
        });
  }

  return (
      <div className="page">
        <div className="page__container">
          <CurrentUserContext.Provider value={currentUser}> {/*внедряем данные в контекст CurrentUserContext*/}
            <Header />
            <CurrentCardContext.Provider value={cards}> {/*внедряем данные в контекст CurrentCardContext*/}
              <Main
                  onEditAvatar={ handleEditAvatarClick }
                  onEditProfile={ handleEditProfileClick }
                  onAddPlace={ handleAddPlaceClick }
                  onCardClick={ handleCardClick }
                  onCardLike={ handleCardLike }
                  onCardDelete={ handleCardDelete }
              />
            </CurrentCardContext.Provider>

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
          </CurrentUserContext.Provider>

        </div>
      </div>
  );
}

export default App;
