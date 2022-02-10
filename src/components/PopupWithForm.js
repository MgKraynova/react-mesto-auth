import React from "react";

function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpened && 'popup_opened'}`}>
            <div className="popup__content">
                <button
                    type="button"
                    className={`popup__close-button popup__close-button_type_${props.name} button`}
                    onClick={props.onClose}
                />
                <h2 className="popup__title">{props.title}</h2>
                <form
                    name={`popup-form-for-${props.name}`}
                    className="popup__form popup__form_type_profile"
                    noValidate
                    onSubmit={props.onSubmit}
                >
                    {props.children}
                    <button type="submit" className="popup__button">{props.buttonText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;