import React, {useEffect} from "react";

function Popup({name, isOpened, onClose, children}) {

    useEffect(() => {
        if (!isOpened) return;

        function closePopupByPressEsc(event) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown', closePopupByPressEsc);

        return () => document.removeEventListener('keydown', closePopupByPressEsc);
    }, [isOpened, onClose])

    function handleOverlay(event) {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }

// создаем обработчик оверлея
//     const handleOverlay = (e) => {
//         if (e.target === e.currentTarget) {
//             onClose();
//         }
//     }

    function setDivPopupClassName() {
        if (name === 'image') {
            return 'popup__container';
        } else if (name === 'infoTooltip') {
            return 'popup__wrapper';
        } else {
            return 'popup__content';
        }
    }

    return (
        <div onClick={handleOverlay} className={`popup popup_type_${name} ${isOpened && 'popup_opened'}`}>
            <div className={setDivPopupClassName()}>
                <button
                    type="button"
                    className={`popup__close-button popup__close-button_type_${name} button`}
                    onClick={onClose}
                />
                {children}
            </div>
        </div>
    )
}

export default Popup;