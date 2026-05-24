import Modal from "./Modal";
import SearchPaymentTableItem from "../SearchPaymentTableItem";
import Table from "../Table";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { getPayments } from "../../services/Pagamento/PagamentoService";

export default function SearchPaymentModal({isOpen, onClose, refresh}){
    const [payments, setPayments] = useState();
    const [loading, setLoading] = useState(true);

    const getActivePayments = async () => {
        const response = await getPayments({ativo: 1});
        setPayments(response);
        setLoading(false);
    }

    useEffect(() => {
        getActivePayments();
    }, []);

    return(
        <Modal isOpen={isOpen} onClose={onClose} tam={"w-md"}>
            <div className="flex flex-col gap-y-2">
                <div className="text-start py-2  border-b border-details">
                    <p className="text-center text-lg font-bold text-secondary">Formas de pagamento</p>
                </div>

                <div className="py-2">
                    <div className="overflow-y-scroll min-h-[55dvh] max-h-[55dvh]">
                        <Table>
                            <thead className="text-xs text-primary uppercase bg-secondary">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-center">
                                        Código
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left">
                                        Nome
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-center">
                                        -
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments?.data.map((item) => {
                                    return <SearchPaymentTableItem 
                                        key={item.uuid}
                                        uuid={item.uuid}
                                        forma={item.forma}
                                        codigo={item.codigo}
                                        refresh={refresh}
                                        onClose={onClose}
                                    />
                                }
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </Modal>
    );
}