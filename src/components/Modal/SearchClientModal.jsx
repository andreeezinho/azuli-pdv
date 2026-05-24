import Modal from "./Modal";
import Table from "../Table";
import SearchClientTableItem from "../SearchClientTableItem";
import Input from "../Input";
import { getClients } from "../../services/Cliente/ClienteService";
import { useEffect, useState } from "react";

export default function SearchClientModal({isOpen, onClose, refresh, insertValue}){
    const [search, setSearch] = useState({
        nome_doc: "",
        ativo: 1
    });
    const [clients, setClients] = useState(null);

    const listClients = async (e) => {
        try{
            const response = await getClients(search);
            
            setClients(response.data);
        }catch(error){
            toast.error("Erro ao procurar clientes");
            console.log(error);
        }
    }

    const handleChange = (e) => {
        const value = e.target.value;

        const newSearch = {
            ...search,
            [e.target.name]: value,
        };

        setSearch(newSearch);

        if(value.length > 3){
            listClients();
        }else{
            setClients(null);
        }
    }

    const refreshSearch = async () => {
        setClients(null);
    }

    return(
        <Modal isOpen={isOpen} onClose={onClose} tam={"max-w-4xl max-h-[3/4] h-3/4"}>
            <div className="flex flex-col gap-y-2">
                <div className="text-start py-2  border-b border-details">
                    <p className="text-center text-lg font-bold text-secondary">Pesquisar cliente</p>
                    <div className="flex gap-x-2">
                        <Input type={'text'} placeholder={'Nome ou documento'} name={'nome_doc'} onChange={handleChange} />
                        <button type="button" onClick={listClients} class="bg-gray-800 hover:bg-gray-500 text-white font-bold px-4 rounded cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="py-2">
                    <div className="overflow-y-scroll min-h-[55dvh] max-h-[55dvh]">
                        <Table>
                            <thead className="text-xs text-primary uppercase bg-secondary">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-left">
                                        Nome
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left">
                                        Documento
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Telefone
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-center">
                                        -
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients?.map((item) => {
                                    return <SearchClientTableItem
                                        key={item.uuid} 
                                        uuid={item.uuid}
                                        nome={item.nome}
                                        documento={item.documento}
                                        telefone={item.telefone}
                                        onClose={onClose}
                                        refresh={refresh}
                                        refreshSearch={refreshSearch}
                                        insertValue={insertValue}
                                    />
                                })}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </Modal>
    );
}