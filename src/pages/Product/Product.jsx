import MainLayout from "../Layouts/MainLayout";
import { useEffect, useState } from "react";
import Table from "./components/ListTable";
import ListTable from "./components/ListTable";

export default function Product(){
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
                    <ListTable></ListTable>
                </div>
            </div>
        </MainLayout>
    )
}