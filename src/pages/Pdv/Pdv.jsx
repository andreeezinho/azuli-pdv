import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ButtonInput from "../../components/ButtonInput";
import Table from "../../components/Table";
import TableItem from "../../components/TableItem";
import { getUserSale, addProduct, deleteProduct, deleteAllProducts } from "../../services/Pdv/PdvService";
import formatNumber from "../../helpers/formatNumber";
import Skeleton from "react-loading-skeleton";
import { toast } from "sonner";
import { DeleteModal } from "../../components/Modal/DeleteModal";
import SearchModal from "../../components/Modal/SearchModal";

export default function Home(){
    const [sale, setSale] = useState(null);
    const [product, setProduct] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isSearchModalOpen, setSearchModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        codigo: "",
        quantidade: 1
    });

    const inputRef = useRef(null);
    const navigate = useNavigate();

    const getSale = async () => {
        const response = await getUserSale();
        setSale(response);
        setLoading(false);
    }

    useEffect(() => {
        getSale();
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await addProduct(sale?.data?.venda?.uuid, formData);
            
            setFormData({
                ...formData,
                codigo : '',
                quantidade: 1
            });

            inputRef.current.focus();
            
            await getSale();
        }catch(error){
            toast.error("Erro ao inserir produto");
            console.log(error);
        }
    }

    const handleConfirm = async (e) => {
        e.preventDefault();

        try{
            const response = await deleteAllProducts(sale?.data?.venda?.uuid);
            
            await getSale();

            setDeleteModalOpen(false);

            toast.info("Venda em andamento cancelada");
        }catch(error){
            toast.error("Erro ao cancelar venda em andamento");
            console.log(error);
        }
    }

    const handleVerifySale = async (e) => {
        e.preventDefault();

        if(sale?.data?.venda?.total == 0 || sale?.data?.produtos.length == 0){
            toast.info("A venda não possui nenhum produto");

            return;
        }

        navigate("/finalizar");
    } 

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return( 
        <MainLayout>
            <div className="w-full h-full rounded-md flex flex-col shadow pb-1">
                <div className="w-full py-4 text-center pl-4 pr-16">
                    <button type="button" className="text-primary p-1 rounded-md bg-secondary hover:bg-secondary-dark cursor-pointer float-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                    
                    <h3 className="text-lg font-bold text-secondary">Venda em aberto</h3>
                </div>

                <div className="flex w-full h-full gap-x-2">
                    <div className="w-2/3 h-full p-4">
                        
                        <div className="overflow-y-scroll min-h-[80dvh] max-h-[80dvh]">
                            {loading ? (
                                <>
                                    <Skeleton variant="rounded" width="100%" height={60} />
                                    <Skeleton variant="rounded" width="100%" height={60} />
                                    <Skeleton variant="rounded" width="100%" height={60} />
                                    <Skeleton variant="rounded" width="100%" height={60} />
                                    <Skeleton variant="rounded" width="100%" height={60} />
                                    <Skeleton variant="rounded" width="100%" height={60} />
                                    <Skeleton variant="rounded" width="100%" height={60} />
                                    <Skeleton variant="rounded" width="100%" height={60} />
                                    <Skeleton variant="rounded" width="100%" height={60} />
                                    <Skeleton variant="rounded" width="100%" height={60} />
                                    <Skeleton variant="rounded" width="100%" height={60} />
                                    <Skeleton variant="rounded" width="100%" height={60} />
                                </>
                            ) : (
                                <Table>
                                    <thead className="text-xs text-primary uppercase bg-secondary">
                                        <tr>
                                            <th scope="col" class="px-6 py-3 text-left">
                                                Produto
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-left">
                                                Código
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Tipo
                                            </th>
                                            <th scope="col" class="px-6 py-3 ">
                                                Quant.
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-center">
                                                Preço
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-center">
                                                Subtotal
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-center">
                                                -
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sale?.data?.produtos.map((item) => {
                                            return <TableItem 
                                                key={item.uuid} 
                                                uuid={item.uuid} 
                                                nome={item.produto.nome}
                                                codigo={item.produto.codigo}
                                                tipo={item.produto.tipo}
                                                quantidade={item.quantidade}
                                                preco={item.produto.preco}
                                                total={0.00}
                                                refresh={getSale}
                                            />
                                        })}
                                    </tbody>
                                </Table>
                            )}
                        </div>
                    </div>

                    <div className="w-1/3 h-full p-4 flex flex-col gap-y-15 border-l-1 border-details">
                        <div class="flex flex-col text-center h-1/3">
                            <img src="/img/site/logo.png" alt="Logo Site" class="mx-auto w-[35%]" />
                            <p className="text-secondary mt-2 text-sm pl-3"><span className="font-bold text-2xl">AZULI</span> PDV</p>
                        </div>

                        <form className="h-1/3 py-10" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex bg-details-white rounded-md h-10">
                                    <input type="number" name="codigo" id="codigo" onChange={handleChange} autoFocus ref={inputRef} value={formData.codigo} placeholder="Código" class="w-full border-transparent bg-details-white text-black rounded-md h-10 p-3 shadow-xs focus:outline-none" required />
                                    <button type="button" onClick={() => setSearchModalOpen(true)} class="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                        </svg>
                                    </button>

                                    <SearchModal
                                        isOpen={isSearchModalOpen}
                                        onClose={() => setSearchModalOpen(false)}
                                        venda_uuid={sale?.data?.venda?.uuid}
                                        refresh={getSale}
                                        insertCode={(code) => {formData.codigo = code; inputRef.current.focus();}}
                                    />
                                </div>

                                <input type="number" name="quantidade" id="quantidade" onChange={handleChange} value={formData.quantidade} placeholder="Quantidade" class="border-transparent bg-details-white text-black rounded-md h-10 p-3 shadow-xs focus:outline-none" required />
                            </div>
                            
                            <div className="flex w-full mt-10">
                                <Button type={'submit'} text={'Adicionar'} width={'w-full shadow-lg'} />
                            </div>
                        </form>

                        <div className="h-1/3 text-center pt-3 border-t-1 border-details">
                            <p className="text-3xl text-secondary">
                                Total a pagar:
                                <span className="font-bold pl-2">
                                    R$
                                    {loading ? (
                                        <Skeleton variant="rounded" width={150} height={30} className="ml-2" /> 
                                    ) : (
                                        formatNumber(sale?.data?.venda?.total)
                                    )}
                                </span>
                            </p>

                            <div className="flex gap-x-2 p-10">
                                <button type='button' onClick={() => setDeleteModalOpen(true)} className="w-full bg-red-400 shadow-lg rounded-md px-8 py-2 text-center text-primary cursor-pointer transition-all hover:bg-red-500">Cancelar</button>
                                <DeleteModal
                                    isOpen={isDeleteModalOpen}
                                    onClose={() => setDeleteModalOpen(false)}
                                    onConfirm={handleConfirm}
                                    title={"Cancelar venda"}
                                    text={"Deseja cancelar a venda em andamento?"}
                                />

                                <button type='button' onClick={handleVerifySale} className="w-full bg-green-500 shadow-lg rounded-md px-8 py-2 text-center text-primary cursor-pointer transition-all hover:bg-green-900">Finalizar</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </MainLayout>
    );
}