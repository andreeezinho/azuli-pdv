import LoginLayout from "../Layouts/LoginLayout";
import Input from "../../components/Input";
import ButtonInput from "../../components/ButtonInput";
import Button from "../../components/Button";
import { useState } from "react";
import { sendEmail, recoveryPassword } from "../../services/RecoveryPassword/recoveryPasswordService";
import { toast } from "sonner";

export default function RecoveryPassword(){
    const [email, setEmail] = useState({});
    const [data, setData] = useState({});
    const [hasCode, setHasCode] = useState(false);

    const handleForm = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    const handleChange = (e) => {
        setEmail({
            [e.target.name]: e.target.value,
        })
    }

    const submitEmail = async (e) => {
        e.preventDefault();

        try {
            const response = await sendEmail(email);
            
            setHasCode(true);
            toast.success("O código foi enviado para o seu email");
        } catch (error) {
            setHasCode(true);
            toast.error("Não foi possível enviar o código para o seu email");
        }
    }

    const submitNewPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await recoveryPassword({
                email: email.email, 
                codigo: data.codigo, 
                senha: data.senha
            });
            
            if(response){
                setHasCode(false);
                setEmail({});
                setData({});
            }
        } catch (error) {
            toast.error("Não foi possível alterar sua senha, tente novamente");
        }
    }

    return(
        <LoginLayout>
            <div className="hidden md:flex md:w-1/3 h-full bg-secondary relative">
                <div class="pointer-events-none absolute inset-0" style={{background: "radial-gradient(130% 100% at 50% -10%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 55%), linear-gradient(to top, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0) 45%)"}}></div>   
                <img src="/img/site/esqueceu-senha-logo.svg" alt="Esqueceu senha imagem" className="m-auto w-2/4 lg:w-3/4" />
            </div>

            <div className="w-full md:w-2/3 flex flex-col h-full text-secondary">
                <div className="w-full flex flex-col gap-y-4 m-auto">
                    <div className="w-full lg:w-1/2 flex flex-col gap-y-4 mx-auto mb-10">
                        <h1 className="text-3xl font-bold mt-0 m-auto">Recuperar Senha</h1>
                        <p className="text-md text-neutral-500 mx-auto my-0">Receba o código de recuperação através do seu email</p>

                        {!hasCode ? 
                            <form onSubmit={submitEmail}>
                                <ButtonInput
                                    label={"Email"}
                                    type={"email"}
                                    placeholder={"Insira seu email"}
                                    name={"email"}
                                    onChange={handleChange}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                    </svg>
                                </ButtonInput>
                            </form>
                            : null
                        }

                        {hasCode ? 
                            <form onSubmit={submitNewPassword} className="flex flex-col gap-y-1">
                                <Input
                                    label={"Código"}
                                    type={"number"}
                                    placeholder={"Insira o código recebido"}
                                    name={"codigo"}
                                    onChange={handleForm}
                                /> 

                                <Input
                                    label={"Senha"}
                                    type={"password"}
                                    placeholder={"Insira sua nova senha"}
                                    name={"senha"}
                                    onChange={handleForm}
                                /> 

                                <div className="mx-auto mt-5">
                                    <Button type={"submit"} text={"Confirmar"} />
                                </div>
                            </form>
                            : null
                        }
                    </div>
                </div>
            </div>
        </LoginLayout>
    );
}