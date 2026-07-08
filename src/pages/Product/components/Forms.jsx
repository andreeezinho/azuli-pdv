import { useState } from "react";
import Input from "../../../components/Input";

export default function Forms(){
    const [formData, setFormData] = useState({
        nome: '',
        codigo: '',
        preco: '',
        estoque: '',
        tipo: '',
        quant_entrada: '',
        quant_saida: '',
        grupo_produto_id: '',
        icms_id: '',
        ipi_id: '',
        pis_id: '',
        cofins_id: '',
        cfop: '',
        ncm: '',
        cest: '',
        ativo: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    console.log(formData);
    return(
        <div className="flex flex-col gap-y-2">
            <div className="text-start my-5 text-lg pb-2 border-b border-gray-200">
                <p>Cadastrar Produto</p>
            </div>

            <div className="grid grid-cols-4 gap-x-4 gap-y-8 p-8 w-full shadow-sm rounded-md">
                <Input type={"text"} label={"Nome"} placeholder={"Insira o nome do produto"} name={"nome"} value={formData.nome} onChange={handleChange} colSpan={"col-span-2"} />
                <Input type={"text"} label={"Código"} placeholder={"Insira o código do produto"} name={"codigo"} value={formData.codigo} onChange={handleChange} colSpan={"col-span-1"} />
                <Input type={"number"} label={"Preço"} placeholder={"Insira o preço"} name={"preco"} value={formData.preco} onChange={handleChange} colSpan={"col-span-1"} />
                <Input type={"number"} label={"Estoque"} placeholder={"Insira o estoque"} name={"estoque"} value={formData.estoque} onChange={handleChange} colSpan={"col-span-1"} />
                <Input type={"number"} label={"Estoque"} placeholder={"Insira o estoque"} name={"estoque"} value={formData.estoque} onChange={handleChange} colSpan={"col-span-1"} />
                <Input type={"number"} label={"Estoque"} placeholder={"Insira o estoque"} name={"estoque"} value={formData.estoque} onChange={handleChange} colSpan={"col-span-1"} />
                <Input type={"number"} label={"Estoque"} placeholder={"Insira o estoque"} name={"estoque"} value={formData.estoque} onChange={handleChange} colSpan={"col-span-1"} />
                <Input type={"number"} label={"Estoque"} placeholder={"Insira o estoque"} name={"estoque"} value={formData.estoque} onChange={handleChange} colSpan={"col-span-1"} />
                <Input type={"number"} label={"Estoque"} placeholder={"Insira o estoque"} name={"estoque"} value={formData.estoque} onChange={handleChange} colSpan={"col-span-1"} />
            </div>
        </div>
    );
}