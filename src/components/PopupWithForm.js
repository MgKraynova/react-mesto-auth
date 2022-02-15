import React from "react";
import Popup from "./Popup";

function PopupWithForm(props) {
    return (

        <Popup name={props.name} isOpened={props.isOpened} onClose={props.onClose}>
            <h2 className="popup__title">{props.title}</h2>
            <form
                name={`popup-form-for-${props.name}`}
                className="popup__form popup__form_type_profile"
                onSubmit={props.onSubmit}
            >
                {props.children}
                <button type="submit" className="popup__button">{props.buttonText}</button>
            </form>
        </Popup>
    );
}

export default PopupWithForm;