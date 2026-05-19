import { useEffect, useState } from 'react';
import MainLayout from '../Layouts/MainLayout'
import Input from '../../components/Input'
import Button from '../../components/Button'

import { getUser } from '../../services/Auth/AuthService';
import url from '../../services/url';
import { updateIcon, update, updatePassword } from '../../services/User/userService';
import { toast } from 'sonner';

export default function MyProfile(){
    const [icone, setIcone] = useState(null);
    const [user, setUser] = useState([]);
    const [senha, setSenha] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const userResp = await getUser();
            setUser(userResp.data);
        }

        fetchData();
    }, [icone]);

    const submitImagem = async (file) => {
        const fd = new FormData();

        fd.append("icone", file);

        const fetchIcon = async () => {
            const resp = await updateIcon(user.uuid, fd);
            setIcone(true);
            toast.success("Imagem de perfil atualizada");
        }

        fetchIcon();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await update(user.uuid, {...user, ativo: 1});
            toast.success("Dados atualizados com sucesso");
        } catch (error) {
            toast.error(Object.values(error.response.data.errors).flat()[0]);
        }
    }

    const submitPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await updatePassword(user.uuid, senha);
            toast.success("Senha alterada com sucesso");
        } catch (error) {
            toast.error(error.response.data.errors.senha[0]);
        }
    }

    const handleImage = (e) => {
        const file = e.target.files[0];
        setIcone(file);

        submitImagem(file);
    }

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const handlePassword = (e) => {
        setSenha({
            ...senha,
            [e.target.name]: e.target.value,
        })
    }

    return(
        <MainLayout>
            <h1 className="text-4xl text-primary mb-10 pb-2 border-b border-details">Minha Conta</h1>

            <div className="w-full flex flex-col">
                <label htmlFor='icone' className="relative mx-auto group transition-all">
                    <img src={url + '/public/img/users/' + user.icone} alt='User icon' className="bg-details w-22 h-22 md:w-26 md:h-26 mx-auto rounded-full hover:cursor-pointer hover:shadow-lg hover:shadow-neutral-800" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 bg-neutral-200 rounded-full p-1 absolute bottom-0 right-0 cursor-pointer group-hover:bg-neutral-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                    </svg>
                </label>
                <p className="text-xs md:text-sm my-3 text-neutral-600 mx-auto">Clique aqui para alterar seu ícone de perfil</p>
                <input type="file" name="icone" id="icone" className="hidden" onChange={handleImage} />
            </div>

            <h1 className="text-xl md:text-2xl text-primary mt-6 pb-2">Meus Dados</h1>
            <p className="text-xs md:text-sm mb-3 text-neutral-600 mx-auto pb-2 border-b border-details">Altere os seus dados e confirme para salvar as alterações</p>

            <form onSubmit={handleSubmit}>
                <div className="w-full md:w-1/2 mx-auto flex flex-col my-3 py-2 gap-y-4 text-sm md:text-md">
                    <Input
                        label="Usuário"
                        type="text"
                        placeholder="Seu nome de usuário"
                        name="usuario"
                        value={user.usuario}
                        onChange={handleChange}
                    />

                    <Input
                        label="Nome"
                        type="text"
                        placeholder="Seu nome completo"
                        name="nome"
                        value={user.nome}
                        onChange={handleChange}
                    />

                    <Input
                        label="Email"
                        type="text"
                        placeholder="Seu email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />

                    <Input
                        label="CPF"
                        type="text"
                        placeholder="Seu CPF"
                        name="cpf"
                        value={user.cpf}
                        onChange={handleChange}
                    />

                    <Input
                        label="Telefone"
                        type="text"
                        placeholder="Seu telefone"
                        name="telefone"
                        value={user.telefone}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full text-center">
                    <Button
                        type={"submit"}
                        text={"Confirmar"}
                    />
                </div>
            </form>

            <h1 className="text-xl md:text-2xl text-primary mt-6 pb-2">Alterar Senha</h1>
            <p className="text-xs md:text-sm mb-3 text-neutral-600 mx-auto pb-2 border-b border-details">Insira sua nova senha e confirma para salvar a alteração</p>

            <form onSubmit={submitPassword} className='text-sm md:text-md'>
                <Input
                    label="Senha"
                    type="password"
                    placeholder="Sua nova senha"
                    name="senha"
                    onChange={handlePassword}
                />
                <div className="w-full mt-4 text-center">
                    <Button
                        type={"submit"}
                        text={"Confirmar"}
                    />
                </div>
            </form>
        </MainLayout>
    );
}