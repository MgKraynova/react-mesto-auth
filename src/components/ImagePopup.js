import Popup from "./Popup";

function ImagePopup({card, isOpened, onClose}) {
    return (
        <Popup name="image" isOpened={isOpened} onClose={onClose} divPopupClassName={'popup__container'}>
            <img className="popup__place-image" alt={card.name}
                 src={card.link}/>
            <p className="popup__caption">{card.name}</p>
        </Popup>
    );
}

export default ImagePopup;