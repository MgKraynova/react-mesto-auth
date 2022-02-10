import React, {useRef, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const placeRef = useRef();
    const placeLinkRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name: placeRef.current.value,
            link: placeLinkRef.current.value
        });
    }

    useEffect(() => {
        placeRef.current.value = '';
        placeLinkRef.current.value = '';
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
                    ref={placeRef}
                />
                <span className="popup__input-error popup-input-place-name-error"/>
                <input
                    placeholder="Ссылка на картинку"
                    name="popup-input-image-link"
                    id="popup-input-image-link"
                    type="url"
                    className="popup__input popup__input_content_image-link"
                    required
                    ref={placeLinkRef}
                />
                <span className="popup__input-error popup-input-image-link-error"/>
            </fieldset>
        </PopupWithForm>
    )
}

export default AddPlacePopup;