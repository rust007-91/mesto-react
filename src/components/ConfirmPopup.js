import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({ isOpen, onClose, onConfirmDelete }) {
    const handleSubmit = (evt) => {
        evt.preventDefault();
        onConfirmDelete();
    };

    return (
        <PopupWithForm
            title="Вы уверены?"
            name="confirm"
            btnText="Да"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        />
    );
}

export default ConfirmPopup;
