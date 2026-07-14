import MainLayout from "../Layouts/MainLayout";
import { useEffect, useState } from "react";
import ListTable from "./components/ListTable";
import Forms from "./components/Forms";

export default function Product(){
    const [container, setContainer] = useState(true);
    const [product, setProduct] = useState(false);

    const handleContainer = async (item) => {
        if(container){
            setContainer(false);
        }else{
            setContainer(true);
        }

        if(item != null){
            setProduct(item);
        }
    }

    return(
        <MainLayout>
            <div className="w-full h-full rounded-md flex flex-col shadow pb-1">
                <div className="w-full py-4 text-center pl-4 pr-10">           
                    <button type="button" onClick={handleContainer} className="text-primary p-1 rounded-md bg-secondary hover:bg-secondary-dark cursor-pointer float-end">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>         
                    <h3 className="text-lg font-bold text-secondary">Produtos</h3>
                </div>

                <div className="w-full flex flex-col h-full text-secondary p-10">
                    {container ? (
                        <ListTable handleContainer={handleContainer} />
                    ) : (
                        <Forms handleContainer={handleContainer} product={product} />
                    )}
                </div>
            </div>
        </MainLayout>
    )
}