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
        email: "",
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
            toast.error("Email ou senha inválidos");
        }
    }
    
    return (
        <LoginLayout>
            <div className="hidden md:flex md:1/3 h-full">
                <img src="/login-logo.svg" alt="Login image" className="m-auto w-2/4 lg:w-3/4" />
            </div>
            <div className="w-full md:w-2/3 flex flex-col h-full text-primary">
                <div className="w-full flex flex-col gap-y-4 m-auto">
                    <form onSubmit={handleLogin} className="w-full lg:w-1/2 flex flex-col gap-y-4 mx-auto mb-10">
                        <h1 className="text-3xl font-bold my-4 m-auto">Login</h1>

                        <Input
                            label={"Email"}
                            type={"email"}
                            placeholder={"Insira seu email"}
                            name={"email"}
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