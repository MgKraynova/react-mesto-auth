import React, {useState} from "react";

function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailInputChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordInputChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        props.onLoginUser(email, password);
    }

    return (
        <div className="auth">
            <h1 className="auth__title">Вход</h1>
            <form className="auth__form" onSubmit={handleSubmit}>
                <fieldset className="auth__fieldset">
                    <input
                        className="auth__input"
                        placeholder="Email"
                        type="email"
                        required
                        name="email"
                        value={email}
                        onChange={handleEmailInputChange}
                    />
                    <input
                        className="auth__input"
                        placeholder="Пароль"
                        type="password"
                        minLength="2"
                        maxLength="12"
                        required
                        name="password"
                        value={password}
                        onChange={handlePasswordInputChange}
                    />
                </fieldset>
                <button type="submit" className="auth__button">Войти</button>
            </form>
        </div>
    )
}

export default Login;