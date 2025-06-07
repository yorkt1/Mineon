import { useRef } from "react";
import { Link } from "react-router-dom";
import api from '../../Services/api';

function Cadastro() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await api.post('/cadastro', {
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value, // Corrigido aqui
            });
            alert("Usuário cadastrado com sucesso!");
        } catch (error) {
            alert("Erro ao cadastrar. Tente novamente.");
        }
    }

    return (
        <div>
            <h1>Cadastro</h1>
            <form onSubmit={handleSubmit}>
                <input ref={nameRef} type="text" placeholder="Nome" />
                <input ref={emailRef} type="email" placeholder="Email" />
                <input ref={passwordRef} type="password" placeholder="Senha" />
                <button type="submit">Cadastrar</button>
            </form>
            <Link to="/login">Já tem uma conta? Faça login</Link>
        </div>
    );
}

export default Cadastro;
