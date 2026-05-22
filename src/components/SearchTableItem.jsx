import { useState } from "react";
import formatNumber from "../helpers/formatNumber";
import { DeleteModal } from "./Modal/DeleteModal";
import { addProduct } from "../services/Pdv/PdvService";
import { toast } from "sonner";

export default function SearchTableItem({uuid, venda_uuid, nome, codigo, tipo, preco, onClose, refresh, refreshSearch, insertCode}){
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            await insertCode(codigo);
            
            await refresh();

            await refreshSearch();

            await onClose();
        }catch(error){
            toast.error("Erro ao inserir produto");
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
                <button type='button' onClick={handleSubmit} className="bg-secondary shadow-lg p-2 rounded-md text-center text-primary cursor-pointer transition-all hover:bg-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                    </svg>
                </button>
            </td>
        </tr>
    );
}