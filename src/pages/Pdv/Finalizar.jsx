import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { addClient, removeClient, addPaymentMethod, getClientFromSale, getUserSale, inWait, cancel, finish } from "../../services/Pdv/PdvService";
import Input from "../../components/Input";
import MainLayout from "../Layouts/MainLayout";
import Skeleton from "react-loading-skeleton";
import { DeleteModal } from "../../components/Modal/DeleteModal";
import { toast } from "sonner";
import formatNumber from "../../helpers/formatNumber";
import SearchPaymentModal from "../../components/Modal/SearchPaymentModal";
import SearchClientModal from "../../components/Modal/SearchClientModal";

export default function Finalizar(){
    const [sale, setSale] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pagamento, setPagamento] = useState({
        codigo: "",
        forma: ""
    });
    const [client, setClient] = useState({
        nome: "",
        confirmNome: "",
        documento: ""
    });
    const [valor, setValor] = useState();

    const documentRef = useRef(null);
    const [isSearchModalOpen, setSearchModalOpen] = useState(false);
    const [isSearchClientModalOpen, setSearchClientModalOpen] = useState(false);
    const [isInWaitModalOpen, setInWaitModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const navigate = useNavigate();

    const getSale = async () => {
        const response = await getUserSale();
        setSale(response);

        setLoading(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!pagamento.codigo){
            toast.error("Insira uma forma de pagamento");
            return;
        }

        try{
            const response = await addPaymentMethod({
                codigo: pagamento.codigo, 
                venda_uuid: sale?.data?.venda?.uuid,
                valor: valor
            });

            toast.success('Forma de pagamento inserida');

            await getSale();
        }catch(error){
            console.log(error);
            toast.error('Erro ao inserir forma de pagamento');
        }
    }

    const handleClientSubmit = async (e) => {
        e.preventDefault();
        
        if(!client.documento){
            toast.error("Insira o documento de um cliente");
            return;
        }

        try{
            const response = await addClient({
                documento: client.documento, 
                venda_uuid: sale?.data?.venda?.uuid
            });

            setClient({
                ...client,
                confirmNome: client.nome 
            });
            
            toast.success('Cliente vinculado à venda');

            await getSale();
        }catch(error){
            console.log(error);
            toast.error('Erro ao vincular cliente à venda');
        }
    }

    const handleUnbindClient = async (e) => {
        e.preventDefault();

        try{
            const response = await removeClient({
                documento: client.documento, 
                venda_uuid: sale?.data?.venda?.uuid
            });

            console.log(response);

            setClient({
                nome: "",
                confirmNome: "",
                documento: ""
            });
            
            toast.info('Cliente desvinculado da venda');

            await getSale();
        }catch(error){
            console.log(error);
            toast.error('Erro ao desvincular cliente da venda');
        }
    }

    const handleConfirmCancel = async (e) => {
        e.preventDefault();

        try{
            const response = await cancel({venda_uuid: sale?.data?.venda?.uuid});

            toast.success('Venda cancelada');

            navigate('/');
        }catch(error){
            console.log(error);
            toast.error('Não foi possível cancelar a venda');
        }
    }

    const handleInWait = async (e) => {
        e.preventDefault();

        try{
            const response = await inWait({venda_uuid: sale?.data?.venda?.uuid});

            toast.success('Venda adicionada à espera');

            navigate('/');
        }catch(error){
            console.log(error);
            toast.error('Não foi possível adicionar venda à espera');
        }
    }

    const finishSale = async (e) => {
        e.preventDefault();

        if(!pagamento.codigo || !valor){
            toast.error('Informações de pagamento não inseridas');
        }

        try{
            const response = await finish({venda_uuid: sale?.data?.venda?.uuid});

            toast.success('Venda finalizada');

            navigate('/');
        }catch(error){
            console.log(error);
            toast.error('Não foi possível finalizar a venda');
        }
    }

    const handleChange = (e) => {
        setPagamento({
            ...pagamento,
            [e.target.name]: e.target.value,
        })
    }

    const handleClientChange = (e) => {
        setClient({
            ...client,
            [e.target.name]: e.target.value,
        })
    }

    useEffect(() => {
        getSale();
    }, []);

    console.log(client)
    return(
        <MainLayout>
            <div className="w-full h-full rounded-md flex flex-col shadow pb-1">
                <div className="w-full py-4 text-center pl-4 pr-16">
                    <button type="button" onClick={() => navigate(-1)} className="text-secondary p-1 rounded-md bg-details-white hover:bg-details cursor-pointer float-start px-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                        </svg>
                    </button>
                    
                    <h3 className="text-lg font-bold text-secondary">Finalizar Venda</h3>
                </div>
                

                <div className="flex w-full h-full gap-x-2 py-10">
                    <div className="flex flex-col w-1/2 gap-y-10 px-4">
                        <h3 className="text-md font-bold text-secondary text-center">Dados da Venda</h3>

                        <form className="w-full text-secondary" onSubmit={handleSubmit}>
                            <span className="text-lg mb-2">Forma de pagamento: {pagamento.forma && (<span className="font-bold">{pagamento.forma}</span>)}</span>
                            <div className="font-bold text-2xl bg-details-white rounded-lg px-2 py-2 shadow shadow-md flex">
                                <Input type={'number'} placeholder={'Digite a forma de pagamento'} name={'codigo'} onChange={handleChange} value={(pagamento.codigo)}  className="py-2 focus:outline-none placeholder:text-lg"  />
                                
                                <button type="button" onClick={() => setSearchModalOpen(true)} class="bg-secondary hover:bg-secondary-dark text-white font-bold px-6 py-2 rounded cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                </button>
                            </div>    
                        </form>
                        <SearchPaymentModal 
                            isOpen={isSearchModalOpen}
                            onClose={() => setSearchModalOpen(false)}
                            refresh={(code, forma) => {pagamento.codigo = code; pagamento.forma = forma; setSearchModalOpen(false)}}
                        />

                        <div className="w-full text-secondary">
                            <span className="text-transparent text-lg mb-2">-</span>
                            <p className="font-bold text-2xl bg-transparent rounded-lg px-2 py-4 text-transparent">-</p>
                        </div>

                        <div className="flex gap-x-2">
                            <div className="w-full text-secondary">
                                <span className="text-lg mb-2">Cliente:</span>
                                {loading ? (<Skeleton variant="rounded" width="100%" height={60} />) : (
                                        <div className="w-full flex justify-between bg-details-white shadow shadow-md">
                                            <p className="text-secondary text-md rounded-lg px-2 py-5">{client.confirmNome == "" ? (<span>Cliente não vinculado</span>) : (client.confirmNome.length > 35 ? `${client.confirmNome.substring(0,34)}...` : client.confirmNome)}</p>
                                            {client.documento && 
                                                <button type="button" onClick={handleUnbindClient} className="text-gray-500 hover:text-gray-700 bg-details-white hover:bg-details px-4 rounded-lg cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            }
                                        </div>
                                    )
                                }
                            </div>

                            <form className="w-full text-secondary" onSubmit={handleClientSubmit}>
                                <span className="text-lg mb-2">Documento:</span>
                                <div className="font-bold text-2xl bg-details-white rounded-lg px-2 py-2 shadow shadow-md flex">
                                    <Input type={'text'} placeholder={'Digite o doc.'} ref={documentRef} name={'documento'} onChange={(handleClientChange)} value={(client.documento)}  className="py-2 focus:outline-none placeholder:text-lg"  />
                                    
                                    <button type="button" onClick={() => setSearchClientModalOpen(true)} class="bg-secondary hover:bg-secondary-dark text-white font-bold px-6 py-2 rounded cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                        </svg>
                                    </button>
                                </div>    
                            </form>
                            <SearchClientModal
                                isOpen={isSearchClientModalOpen}
                                onClose={() => setSearchClientModalOpen(false)}
                                refresh={getSale}
                                insertValue={(resp) => {client.documento = resp.documento; client.nome = resp.nome; documentRef.current.focus()}}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col w-1/2 gap-y-10 px-4">
                        <h3 className="text-md font-bold text-secondary text-center">Info. de pagamento</h3>

                        <div className="w-full text-secondary">
                            <span className="text-lg mb-2">Valor Total:</span>
                            {loading ? (<Skeleton variant="rounded" width="100%" height={60} />) : (
                                    <p className="font-bold text-2xl bg-details-white rounded-lg px-2 py-4 shadow shadow-md">R$ {formatNumber(sale?.data?.venda?.total)}</p>
                                )
                            }
                        </div>

                        <form className="w-full text-secondary" onSubmit={handleSubmit}>
                            <span className="text-lg mb-2">Valor Recebido:</span>
                            {loading ? (<Skeleton variant="rounded" width="100%" height={60} />) : (
                                    <Input type={'number'} placeholder={'Digite o valor recebido'} name={'valor'} step="any" onChange={(e) => setValor(e.target.value)} value={(valor)}  className="font-bold text-2xl bg-details-white rounded-lg px-2 py-4 placeholder:text-lg shadow shadow-md focus:outline-none"  />
                                )
                            }
                        </form>

                        <div className="w-full text-secondary">
                            <span className="text-lg mb-2">Troco:</span>
                            {loading ? (<Skeleton variant="rounded" width="100%" height={60} />) : (
                                    <p className="font-bold text-2xl bg-details-white rounded-lg px-2 py-4 shadow shadow-md">R$ {formatNumber(sale?.data?.venda?.troco)}</p>
                                )
                            }
                        </div>

                        <div className="w-full flex mb-0 h-full items-end pb-10">
                            <div className="w-full flex flex-col gap-y-3">
                                <div className="w-full flex gap-x-4">
                                    <button type='button' onClick={() => setDeleteModalOpen(true)} className="w-full bg-red-400 shadow-lg rounded-md px-8 py-2 text-center text-primary cursor-pointer transition-all hover:bg-red-700">Cancelar</button>
                                    <DeleteModal
                                        isOpen={isDeleteModalOpen}
                                        onClose={() => setDeleteModalOpen(false)}
                                        onConfirm={handleConfirmCancel}
                                        title={"Cancelar venda"}
                                        text={"Deseja cancelar a venda em andamento?"}
                                    />

                                    <button type='button' onClick={() => setInWaitModalOpen(true)} className="w-full bg-details shadow-lg rounded-md px-8 py-2 text-center text-secondary cursor-pointer transition-all hover:bg-details-white">Em espera</button>   
                                    <DeleteModal
                                        isOpen={isInWaitModalOpen}
                                        onClose={() => setInWaitModalOpen(false)}
                                        onConfirm={handleInWait}
                                        title={"Adicionar venda à espera"}
                                        text={"Deseja adicionar venda em andamento à espera?"}
                                    />
                                </div>
                                <div className="w-full flex gap-x-4">
                                    <button type='button' onClick={finishSale} className="w-full bg-secondary shadow-lg rounded-md px-8 py-2 text-center text-primary cursor-pointer transition-all hover:bg-secondary-dark">Finalizar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}