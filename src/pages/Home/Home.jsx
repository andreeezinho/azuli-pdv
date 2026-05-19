import MainLayout from "../Layouts/MainLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ButtonInput from "../../components/ButtonInput";

import { useEffect, useState } from "react";

export default function Home(){
    return(
        <MainLayout>
            <div className="bg-details-white w-full h-full rounded-md flex flex-col">
                <div className="w-full text-center py-4">
                    <h3 className="text-lg font-bold text-secondary">Venda em aberto</h3>
                </div>

                <div className="flex w-full h-full gap-x-2">
                    <div className="w-2/3 h-full p-4">
                        <table className="w-full table table-striped text-sm rtl:text-right">
                            <thead className="text-xs text-primary uppercase bg-secondary">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Produto
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Código
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Tipo
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-center">
                                        Quant.
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-center">
                                        Total
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-center">
                                        -
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="odd:bg-primary even:bg-details-white border-b border-details text-gray-800">
                                    <td class="px-6 py-4">teste</td>
                                    <td class="px-6 py-4">teste</td>
                                    <td class="px-6 py-4">teste</td>
                                    <td class="px-6 py-4">teste</td>
                                    <td class="px-6 py-4">teste</td>
                                    <td class="px-6 py-4">teste</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="w-1/3 h-full p-4 flex flex-col gap-y-15 border-l-1 border-details">
                        <div class="flex flex-col text-center h-1/3">
                            <img src="/img/site/logo.png" alt="Logo Site" class="mx-auto w-[35%]" />
                            <p className="text-secondary mt-2 text-2xl"><span className="font-bold">AZULI</span> PDV</p>
                        </div>

                        <div className="h-1/3 py-10">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex bg-details-white h-10">
                                    <input type="number" name="codigo" id="codigo" autofocus placeholder="Código" class="w-full border-transparent bg-details text-black rounded-md h-10 p-3 shadow-xs focus:outline-none" required />
                                    <button type="button" class="bg-gray-800 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                        </svg>
                                    </button>
                                </div>

                                <input type="number" name="quantidade" id="quantidade" placeholder="Quantidade" value={1} class="border-transparent bg-details text-black rounded-md h-10 p-3 shadow-xs focus:outline-none" required />
                            </div>
                            
                            <div className="flex w-full mt-10">
                                <Button type={'submit'} text={'Adicionar'} width={'w-full'} />
                            </div>
                        </div>

                        <div className="h-1/3 text-center pt-3 border-t-1 border-details">
                            <p className="text-3xl text-secondary">Total a pagar: <span className="font-bold">R$ 69,00</span></p>

                            <div className="flex gap-x-2 p-10">
                                <button type='button' className="w-full bg-red-400 rounded-md px-8 py-2 text-center text-primary cursor-pointer transition-all hover:bg-red-500">Cancelar</button>
                                <button type='button' className="w-full bg-green-500 rounded-md px-8 py-2 text-center text-primary cursor-pointer transition-all hover:bg-green-900">Finalizar</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </MainLayout>
    );
}