import React, {useEffect} from "react";

function Popup({name, isOpened, onClose, divPopupClassName, children}) {

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

    return (
        <div onClick={handleOverlay} className={`popup popup_type_${name} ${isOpened && 'popup_opened'}`}>
            <div className={divPopupClassName}>
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