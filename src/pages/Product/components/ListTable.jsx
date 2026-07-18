import Table from "../../../components/Table";
import TableBody from "../../../components/Table/TableBody";
import {getProducts} from "../../../services/Produto/ProdutoService";
import Input from "../../../components/Input";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function ListTable({handleContainer}){
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [params, setParams] = useState({
        nome_codigo: ""
    });
    console.log(products);

    const list = async (params) => {
        const response = await getProducts(params);
        setProducts(response);
        setLoading(false);
    }

    useEffect(() => {
        list();
    }, []);

    const handleProducts = async (e) => {
        e.preventDefault();

        list(params);
    }

    const handleChange = (e) => {
        setParams({
            ...params,
            [e.target.name]: e.target.value,
        })

        if(params?.nome_codigo.length >= 3){
            list(params);
        }else{
            list();
        }
    }

    return(
        <div className="flex flex-col gap-y-2">
            <form onSubmit={handleProducts} className="flex gap-x-2">
                <Input type={"nome_codigo"} placeholder={"Pesquise pelo nome ou código"} name={"nome_codigo"} value={params.nome_codigo} onChange={handleChange} />
                <button type="button" class="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </form>

            <Table>
                <thead className="text-xs text-primary uppercase bg-secondary">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left">
                            Nome
                        </th>
                        <th scope="col" class="px-6 py-3 text-left">
                            Código
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                            Tipo
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                            Estoque
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                            Preço
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Grupo
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                            Ativo
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                            -
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products?.data?.map((item) => {
                        return <TableBody 
                            key={item.uuid} 
                            item={item} 
                            uuid={item.uuid} 
                            nome={item.nome}
                            codigo={item.codigo}
                            tipo={item.tipo}
                            estoque={item.estoque}
                            preco={item.preco}
                            grupo={item?.grupoProduto?.nome}
                            ativo={item.ativo}
                            refresh={list}
                            handleContainer={handleContainer}
                        />
                    })}
                </tbody>
            </Table>
        </div>
    );
}