import React, {useState, useEffect, useContext} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {

    const [name, setUserName] = useState('');
    const [description, setUserDescription] = useState('');

    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setUserName(currentUser.name || '');
        setUserDescription(currentUser.about || '');
    }, [currentUser, props.isOpened]);

    function handleNameInputChange(e) {
        setUserName(e.target.value);
    }

    function handleDescriptionInputChange(e) {
        setUserDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm title={'Редактировать профиль'} name={'profile'} isOpened={props.isOpened}
                       onClose={props.onClose} onSubmit={handleSubmit}
        buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}>
            <fieldset className="popup__field">
                <input
                    placeholder="Имя"
                    id="popup-input-name"
                    name="popup-input-name"
                    type="text"
                    className="popup__input popup__input_content_name"
                    required
                    minLength="2"
                    maxLength="40"
                    autoComplete="off"
                    value={name}
                    onChange={handleNameInputChange}
                />
                <span className="popup__input-error popup-input-name-error"/>
                <input
                    placeholder="Род занятий"
                    id="popup-input-description"
                    name="popup-input-description"
                    type="text"
                    className="popup__input popup__input_content_description"
                    required
                    minLength="2"
                    maxLength="200"
                    autoComplete="off"
                    value={description}
                    onChange={handleDescriptionInputChange}
                />
                <span className="popup__input-error popup-input-description-error"/>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditProfilePopup;