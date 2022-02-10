import React, {useEffect, useRef} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    useEffect(() => {
        avatarRef.current.value = '';
    }, [props.isOpened])

    return (
        <PopupWithForm title={'Обновить аватар'} name={'change-avatar'} isOpened={props.isOpened}
                       onClose={props.onClose} onSubmit={handleSubmit}
        buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}>
            <fieldset className="popup__field">
                <input
                    placeholder="Ссылка на картинку с аватаром"
                    name="popup-input-avatar-link"
                    id="popup-input-avatar-link"
                    type="url"
                    className="popup__input popup__input_content_avatar-link"
                    required
                    ref={avatarRef}
                />
                <span className="popup__input-error popup-input-avatar-link-error"/>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;