function ImagePopup({card, isOpened, onClose}) {
    return (
        <div className={`popup popup_type_image ${isOpened ? 'popup_opened' : '' }`}>
            <div className="popup__container">
                <button
                    type="button"
                    onClick={onClose}
                    className="popup__close-button popup__close-button_type_image-popup button"/>
                <img className="popup__place-image" alt={card.name}
                     src={card.link}/>
                <p className="popup__caption">{card.name}</p>
            </div>
        </div>
    );
}

export default ImagePopup;