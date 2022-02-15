import React, {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const [place, setPlace] = useState('');
    const [placeLink, setPlaceLink] = useState('');

    function handlePlaceInputChange(e) {
        setPlace(e.target.value);
    }

    function handlePlaceLinkInputChange(e) {
        setPlaceLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name: place,
            link: placeLink
        });
    }

    useEffect(() => {
        setPlace('');
        setPlaceLink('');
    }, [props.isOpened])

    return (
        <PopupWithForm title={'Новое место'} name={'place'} isOpened={props.isOpened}
                       onClose={props.onClose} onSubmit={handleSubmit}
        buttonText={props.isLoading ? 'Создание...' : 'Создать'}>
            <fieldset className="popup__field">
                <input
                    placeholder="Название"
                    name="popup-input-place-name"
                    id="popup-input-place-name"
                    type="text"
                    className="popup__input popup__input_content_place-name"
                    required
                    minLength="2"
                    maxLength="30"
                    value={place}
                    onChange={handlePlaceInputChange}
                />
                <span className="popup__input-error popup-input-place-name-error"/>
                <input
                    placeholder="Ссылка на картинку"
                    name="popup-input-image-link"
                    id="popup-input-image-link"
                    type="url"
                    className="popup__input popup__input_content_image-link"
                    required
                    value={placeLink}
                    onChange={handlePlaceLinkInputChange}
                />
                <span className="popup__input-error popup-input-image-link-error"/>
            </fieldset>
        </PopupWithForm>
    )
}

export default AddPlacePopup;