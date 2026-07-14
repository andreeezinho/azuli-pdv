import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct, updateProduct } from "../../../services/Produto/ProdutoService";
import { getGroups } from "../../../services/GrupoProduto/GrupoProdutoService";
import { getTributacoes } from "../../../services/Tributacao/TributacaoService";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Button from "../../../components/Button";
import CancelButton from "../../../components/CancelButton";
import { toast } from "sonner";

export default function Forms({handleContainer, product}){
    const navigate = useNavigate();
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
        ativo: '',
        origem: ''
    });

    const [grupo, setGrupo] = useState(null);
    const [icms, setIcms] = useState(null);
    const [ipi, setIpi] = useState(null);
    const [pis, setPis] = useState(null);
    const [cofins, setCofins] = useState(null);

    const getGroup = async () => {
        const response = await getGroups({ativo: 1});

        if(response.data){
            setGrupo(response.data);
        }else{
            setGrupo(null);
        }
    }

    const getIcms = async (tipo) => {
        const response = await getTributacoes({tipo: tipo, ativo: 1});

        if(response.data){
            setIcms(response.data);
        }else{
            setIcms(null);
        }
    }

    const getIpi = async (tipo) => {
        const response = await getTributacoes({tipo: tipo, ativo: 1});

        if(response.data){
            setIpi(response.data);
        }else{
            setIpi(null);
        }
    }

    const getPis = async (tipo) => {
        const response = await getTributacoes({tipo: tipo, ativo: 1});

        if(response.data){
            setPis(response.data);
        }else{
            setPis(null);
        }
    }

    const getCofins = async (tipo) => {
        const response = await getTributacoes({tipo: tipo, ativo: 1});

        if(response.data){
            setCofins(response.data);
        }else{
            setCofins(null);
        }
    }

    useEffect(() => {
        getGroup();
        getIcms('icms');
        getIpi('ipi');
        getPis('pis');
        getCofins('cofins');

        if(product){
            setFormData({
                ...product,
                icms_id: product?.icms?.uuid,
                ipi_id: product?.ipi?.uuid,
                pis_id: product?.pis?.uuid,
                cofins_id: product?.cofins?.uuid,
            });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            if(product){
                const response = await updateProduct(formData);
                console.log(response);
                toast.success("Produto editado com sucesso!");
            }else{
                const response = await createProduct(formData);

                toast.success("Produto cadastrado com sucesso!");
                handleContainer();
            }
        }catch(error){
            console.log(error.response.data.errors);
            toast.error(error.response.data.message ?? `Erro ao ${product ? 'editar' : 'cadastrar'} produto`);
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    console.log(formData);
    return(
        <div className="flex flex-col gap-y-2">
            <div className="text-start my-3 text-lg pb-2 border-b border-gray-200 flex gap-x-2 items-center">
                <button onClick={handleContainer} className="p-2 px-4 rounded-lg my-2 hover:shadow-md cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                    </svg>
                </button>

                <p>{product ? 'Editar' : 'Cadastrar'} Produto</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-x-4 gap-y-8 p-8 w-full shadow-sm rounded-md">
                <Input type={"text"} label={"Nome"} placeholder={"Insira o nome do produto"} name={"nome"} value={formData.nome} onChange={handleChange} colSpan={"col-span-2"} />
                <Input type={"text"} label={"Código"} placeholder={"Insira o código do produto"} name={"codigo"} value={formData.codigo} onChange={handleChange} colSpan={"col-span-1"} />
                <Input type={"number"} label={"Preço"} placeholder={"Insira o preço"} name={"preco"} value={formData.preco} onChange={handleChange} colSpan={"col-span-1"} />
                <Input type={"number"} label={"Estoque"} placeholder={"Insira o estoque"} name={"estoque"} value={formData.estoque} onChange={handleChange} colSpan={"col-span-1"} />
                <Select label={"Tipo"} selected={"Escolha o tipo"} name={"tipo"} value={formData.tipo} onChange={handleChange} colSpan={"col-span-1"}
                    options={[
                        {uuid: 'UN', nome: 'Unidade'},
                        {uuid: 'KG', nome: 'Quilo'},
                        {uuid: 'CX', nome: 'Caixa'},
                        {uuid: 'FD', nome: 'Fardo'}
                    ]}
                />
                <Input type={"number"} label={"Quant entrada"} placeholder={"Insira a quantidade"} name={"quant_entrada"} value={formData.quant_entrada} onChange={handleChange} colSpan={"col-span-1"} />
                <Input type={"number"} label={"Quant saída"} placeholder={"Insira a quantidade"} name={"quant_saida"} value={formData.quant_saida} onChange={handleChange} colSpan={"col-span-1"} />
                <Select label={"Grupo de Produto"} selected={"Escolha o grupo"} name={"grupo_produto_id"} value={formData.grupo_produto_id} onChange={handleChange} colSpan={"col-span-1"} options={grupo} />
                <Select label={"Estado"} selected={"Selecione o estado"} name={"ativo"} value={formData.ativo} onChange={handleChange} colSpan={"col-span-1"}
                    options={[
                        {uuid: 1, nome: 'Ativo'},
                        {uuid: 0, nome: 'Inativo'}
                    ]}
                />

                <div className="w-full border-b border-gray-200 my-6 col-span-full">
                    <p>Tributação</p>
                </div>

                <Select label={"Origem"} selected={"Escolha a origem do produto"} name={"origem"} value={formData.origem} onChange={handleChange} colSpan={"col-span-2"} options={[
                    {uuid: 0, nome: '0 - Nacional, exceto as indicadas nos códigos 3, 4, 5 e 8'},
                    {uuid: 1, nome: '1 - Estrangeira - Importação direta'},
                    {uuid: 2, nome: '2 - Estrangeira - Adquirida no mercado interno'},
                    {uuid: 3, nome: '3 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 40% e inferior ou igual a 70%'},
                    {uuid: 4, nome: '4 - Nacional, cuja produção foi feita conforme os processos produtivos básicos (PPB)'},
                    {uuid: 5, nome: '5 - Nacional, mercadoria ou bem com Conteúdo de Importação inferior ou igual a 40%'},
                ]} />
                <Select label={"ICSM"} selected={"Escolha o ICMS"} name={"icms_id"} value={formData.icms_id} onChange={handleChange} colSpan={"col-span-1"} options={icms} />
                <Select label={"IPI"} selected={"Escolha o IPI"} name={"ipi_id"} value={formData.ipi_id} onChange={handleChange} colSpan={"col-span-1"} options={ipi} />
                <Select label={"PIS"} selected={"Escolha o PIS"} name={"pis_id"} value={formData.pis_id} onChange={handleChange} colSpan={"col-span-1"} options={pis} />
                <Select label={"COFINS"} selected={"Escolha o COFINS"} name={"cofins_id"} value={formData.cofins_id} onChange={handleChange} colSpan={"col-span-1"} options={cofins} />
                <Input type={"number"} label={"CFOP"} placeholder={"Insira o CFOP"} name={"cfop"} value={formData.cfop} onChange={handleChange} colSpan={"col-span-1"} />
                <Input type={"number"} label={"NCM"} placeholder={"Insira o NCM"} name={"ncm"} value={formData.ncm} onChange={handleChange} colSpan={"col-span-1"} />
                <Input type={"number"} label={"CEST"} placeholder={"Insira o CEST"} name={"cest"} value={formData.cest} onChange={handleChange} colSpan={"col-span-1"} />

                <div className="col-span-full text-center flex w-full justify-center gap-x-2">
                    <CancelButton type={'button'} text={'Cancelar'} width={'shadow-lg'} onClick={handleContainer} />
                    <Button type={'submit'} text={'Confirmar'} width={'shadow-lg'} />
                </div>
            </form>
        </div>
    );
}