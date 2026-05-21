import { useState } from "react";
import formatNumber from "../helpers/formatNumber";
import { DeleteModal } from "./Modal/DeleteModal";
import { deleteProduct } from "../services/Pdv/PdvService";
import { toast } from "sonner";

export default function SearchTableItem({uuid, nome, codigo, tipo, quantidade, preco, total, refresh}){
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
            <td class="px-6 py-4 text-center">{formatNumber(preco)}</td>
            <td class="px-6 py-4 text-center">
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