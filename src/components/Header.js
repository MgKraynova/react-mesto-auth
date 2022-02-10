import headerLogo from '../images/header__logo.svg';

function Header() {
    return (
        <header className="header page__header">
            <img
                src={headerLogo}
                alt="Логотип проекта Mesto"
                className="header__logo logo"
            />
        </header>
    );
}

export default Header;