import Modal from "./Modal";
import Table from "../Table";
import SearchTableItem from "../SearchTableItem";
import Input from "../Input";
import { getProducts } from "../../services/Produto/ProdutoService";
import { useEffect, useState } from "react";

export default function SearchModal({isOpen, onClose, onConfirm}){
    const [search, setSearch] = useState({
        nome_codigo: "",
        ativo: 1
    });
    const [products, setProducts] = useState(null);

    const listProducts = async (e) => {
        try{
            const response = await getProducts(search);
            
            setProducts(response.data);
        }catch(error){
            toast.error("Erro ao procurar produtos");
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
            listProducts();
        }else{
            setProducts(null);
        }
    }

    console.log(products);
    return(
        <Modal isOpen={isOpen} onClose={onClose} tam={"max-w-4xl max-h-[3/4] h-3/4"}>
            <div className="flex flex-col gap-y-2">
                <div className="text-start py-2  border-b border-details">
                    <p className="text-center text-lg font-bold text-secondary">Pesquisar produto</p>
                    <div className="flex gap-x-2">
                        <Input type={'text'} placeholder={'Nome ou código'} name={'nome_codigo'} onChange={handleChange} />
                        <button type="button" onClick={listProducts} class="bg-gray-800 hover:bg-gray-500 text-white font-bold px-4 rounded cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="py-2">
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
                                <th scope="col" class="px-6 py-3 text-center">
                                    Preço
                                </th>
                                <th scope="col" class="px-6 py-3 text-center">
                                    -
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map((item) => {
                                return <SearchTableItem
                                    key={item.uuid} 
                                    uuid={item.uuid} 
                                    nome={item.nome}
                                    codigo={item.codigo}
                                    tipo={item.tipo}
                                    quantidade={1}
                                    preco={item.preco}
                                    total={0.00}
                                    refresh={null}
                                />
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        </Modal>
    );
}