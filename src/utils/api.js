class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _getServStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }

    _request(url, options) {
        return fetch(url, options).then((res) => this._getServStatus(res));
    }

    // Метод запроса карточек с сервера
    getApiCard() {
        return this._request(`${this._url}cards`, {
            method: "GET",
            headers: this._headers,
        });
    }

    // Метод запроса информации о пользователе с сервера
    getApiInfo() {
        return this._request(`${this._url}users/me`, {
            method: "GET",
            headers: this._headers,
        });
    }

    // Метод обновления информации о пользователе на сервере
    setApiInfo({ heading, desc }) {
        return this._request(`${this._url}users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: heading,
                about: desc,
            }),
        });
    }

    // Метод обновления аватара о пользователе на сервере
    setApiAvatar({ link }) {
        return this._request(`${this._url}users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: link,
            }),
        });
    }

    // Метод загрузки новой карточки на сервер
    setApiNewCard({ name, link }) {
        return this._request(`${this._url}cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link,
            }),
        });
    }

    // Метод удаления карточки на сервер
    deleteApiCard(id) {
        return this._request(`${this._url}cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        });
    }

    // Метод обработки лайков на сервере
    changeLikeCardStatus(id, isLiked) {
        return this._request(`${this._url}cards/${id}/likes`, {
            method: isLiked ? "PUT":"DELETE",
            headers: this._headers,
        });
    }
}

// Инициализация данных для запроса данных с сервера
const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-64/",
    headers: {
        "content-type": "application/json",
        authorization: "3e8e1ee3-c047-4c7b-af99-8c5e2a637cf7",
    },
});

export default api;
