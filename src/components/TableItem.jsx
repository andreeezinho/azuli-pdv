import { useState } from "react";
import formatNumber from "../helpers/formatNumber";
import { DeleteModal } from "./Modal/DeleteModal";
import { deleteProduct } from "../services/Pdv/PdvService";
import { toast } from "sonner";

export default function TableItem({uuid, nome, codigo, tipo, quantidade, preco, total, refresh}){
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const handleConfirm = async (e) => {
        e.preventDefault();

        try{
            const response = await deleteProduct(uuid);
            
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
            <td class="px-6 py-4 text-center">{quantidade}</td>
            <td class="px-6 py-4 text-center">{formatNumber(preco)}</td>
            <td class="px-6 py-4 text-center">{formatNumber(preco * quantidade)}</td>
            <td class="px-6 py-4 text-center">
                <button type='button' onClick={() => setDeleteModalOpen(true)} className="bg-transparent border-1 border-red-300 shadow-lg p-2 rounded-md text-center text-primary cursor-pointer transition-all hover:bg-red-500 text-red-500 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mx-auto">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
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