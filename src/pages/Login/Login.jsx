import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import { NavLink, Link } from "react-router-dom";

import LoginLayout from "../Layouts/LoginLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { toast } from "sonner";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        usuario: "",
        senha: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData);
            console.log(response);
            if (response) {
                toast.success("Login realizado com sucesso");
                navigate('/');
            }
        } catch (error) {
            toast.error("Usuário ou senha inválidos");
        }
    }

    return (
        <LoginLayout>
            <div className="hidden md:flex md:flex-col md:w-1/2 h-full bg-secondary">
                <div class="pointer-events-none absolute inset-0" style={{background: "radial-gradient(130% 100% at 50% -10%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 55%), linear-gradient(to top, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0) 45%)"}}></div>   
                <img src="/img/site/cabin-logo.svg" alt="Login image" className="m-auto w-3/5" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col h-full text-secondary">
                <div className="w-full flex flex-col gap-y-4 m-auto">
                    <h1 className="text-2xl m-auto pl-12"><b className="text-5xl">AZULI</b> PDV</h1>
                    <form onSubmit={handleLogin} className="w-full lg:w-1/2 flex flex-col gap-y-4 mx-auto mb-10">
                        <h1 className="text-3xl font-bold my-4 m-auto">Login</h1>

                        <Input
                            label={"Usuário"}
                            type={"usuario"}
                            placeholder={"Insira seu usuario"}
                            name={"usuario"}
                            onChange={handleChange}
                        />

                        <Input
                            label={"Senha"}
                            type={"password"}
                            placeholder={"Insira sua senha"}
                            name={"senha"}
                            onChange={handleChange}
                        />

                        <Link to={"/recuperar-senha"} className="text-sm text-neutral-500 hover:text-secondary transition-all">Esqueceu sua senha?</Link>

                        <div className="w-full mt-2 text-center">
                            <Button
                                type={"submit"}
                                text={"Entrar"}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </LoginLayout>
    );
}