import { useState } from "react";
import formatNumber from "../../helpers/formatNumber";
import { DeleteModal } from "../Modal/DeleteModal";
import { deleteProduct } from "../../services/Produto/ProdutoService";
import { toast } from "sonner";

export default function TableBody({item, uuid, nome, codigo, tipo, estoque, preco, grupo, ativo, refresh, handleContainer}){
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const handleConfirm = async (e) => {
        e.preventDefault();

        try{
            const response = await deleteProduct(uuid);
            console.log(response);
            await refresh();

            setDeleteModalOpen(false);

            toast.info("Produto removido");
        }catch(error){
            toast.error("Erro ao remover produto");
            console.log(error);
        }
    }

    return(
        <tr class="odd:bg-primary even:bg-details-white border-b border-details text-gray-800">
            <td class="px-6 py-4 font-bold">{nome}</td>
            <td class="px-6 py-4">{codigo}</td>
            <td class="px-6 py-4 text-center">{tipo}</td>
            <td class="px-6 py-4 text-center">{estoque}</td>
            <td class="px-6 py-4 text-center">{formatNumber(preco)}</td>
            <td class="px-6 py-4 text-center">{grupo}</td>
            <td class="px-6 py-4 text-center">
                {ativo ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" class="size-5 mx-auto">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="size-5 mx-auto">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                )}
            </td>
            <td class="px-6 py-4 text-center flex gap-x-2 justify-center">
                <button type='button' onClick={() => handleContainer(item)} className="bg-secondary shadow-lg p-2 rounded-md text-center text-primary cursor-pointer transition-all hover:bg-secondary-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </button>

                <button type='button' onClick={() => setDeleteModalOpen(true)} className="bg-red-400 shadow-lg p-2 rounded-md text-center text-primary cursor-pointer transition-all hover:bg-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                        <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                        <path fill-rule="evenodd" d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.133 2.845a.75.75 0 0 1 1.06 0l1.72 1.72 1.72-1.72a.75.75 0 1 1 1.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 1 1-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 1 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                    </svg>
                </button>

                <DeleteModal 
                    isOpen={isDeleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    onConfirm={handleConfirm}
                    title={"Remover produto"}
                    text={"Deseja remover produto da venda?"}
                />
            </td>
        </tr>
    );
}