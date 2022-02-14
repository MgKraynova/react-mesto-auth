import React from "react";

function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpened && 'popup_opened'}`}>
            <div className="popup__wrapper">
                <button
                    type="button"
                    className={`popup__close-button button`}
                    onClick={props.onClose}
                />
                <img className="popup__image" alt={props.imgAlt} src={props.imgSrc}/>
                <h2 className="popup__subtitle">{props.title}</h2>
            </div>
        </div>
    )
}

export default InfoTooltip;