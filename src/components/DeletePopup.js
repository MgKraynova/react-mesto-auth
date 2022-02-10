import PopupWithForm from "./PopupWithForm";

function DeletePopup(props) {

    function handleSubmit(e) {
        e.preventDefault();

        props.onCardDelete(props.card);
    }

    return (
        <PopupWithForm title={'Вы уверены?'} name={'delete'} isOpened={props.isOpened}
                       onClose={props.onClose} buttonText={props.isLoading ?
                'Удаляем...' : 'Да'} onSubmit={handleSubmit}>
        </PopupWithForm>
    )
}

export default DeletePopup;