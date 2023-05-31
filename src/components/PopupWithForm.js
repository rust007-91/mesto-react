function PopupWithForm(props) {
    const { title, name, btnText, isOpen, onClose, onSubmit } = props;

    return (
        <>
            <div className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
                <div className="popup__container">
                    <form
                        className={`popup__form popup__form_${name}`}
                        name={`form-${name}`}
                        noValidate
                        onSubmit={onSubmit}
                    >
                        <h2 className="popup__form-heading">{title}</h2>
                        {props.children}
                        <button type="submit" className="popup__form-submit">
                            {btnText}
                        </button>
                    </form>
                    <button
                        onClick={onClose}
                        className="popup__close"
                        type="button"
                        aria-label="кнопка закрыть попап"
                    ></button>
                </div>
            </div>
        </>
    );
}

export default PopupWithForm;
