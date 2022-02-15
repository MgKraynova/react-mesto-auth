import Popup from "./Popup";

function ImagePopup({card, isOpened, onClose}) {
    return (
        <Popup name="image" isOpened={isOpened} onClose={onClose}>
            <button
                type="button"
                onClick={onClose}
                className="popup__close-button popup__close-button_type_image-popup button"/>
            <img className="popup__place-image" alt={card.name}
                 src={card.link}/>
            <p className="popup__caption">{card.name}</p>
        </Popup>
    );
}

export default ImagePopup;