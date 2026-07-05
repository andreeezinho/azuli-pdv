import MainLayout from "../Layouts/MainLayout";
import Table from "../../components/Table";
import TableBody from "../../components/Table/TableBody";
import {getProducts} from "../../services/Produto/ProdutoService";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function Product(){
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);

    const list = async () => {
        const response = await getProducts();
        setProducts(response);
        setLoading(false);
    }

    useEffect(() => {
        list();
    }, []);
    console.log(products);
    return(
        <MainLayout>
            <div className="w-full h-full rounded-md flex flex-col shadow pb-1">
                <div className="w-full py-4 text-center pl-4 pr-16">           
                    <button type="button" className="text-primary p-1 rounded-md bg-secondary hover:bg-secondary-dark cursor-pointer float-end">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>         
                    <h3 className="text-lg font-bold text-secondary">Produtos</h3>
                </div>

                <div className="w-full flex flex-col h-full text-secondary p-10">
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
                                    uuid={item.uuid} 
                                    nome={item.nome}
                                    codigo={item.codigo}
                                    tipo={item.tipo}
                                    estoque={item.estoque}
                                    preco={item.preco}
                                    grupo={item?.grupoProduto?.nome}
                                    ativo={item.ativo}
                                    refresh={getProducts}
                                />
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        </MainLayout>
    )
}