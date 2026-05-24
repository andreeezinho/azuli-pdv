import Modal from "./Modal";

export function DeleteModal({isOpen, onClose, onConfirm, title, text}){
    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col gap-y-2">
                <div className="text-center py-2 font-bold border-b border-details">
                    <p className="text-lg text-secondary">{title}</p>
                </div>

                <div className="py-2">
                    <p className="text-md text-secondary text-center">{text}</p>

                    <div className="flex gap-x-2 mt-8 px-10">
                        <button type='button' onClick={onClose} className="w-full bg-red-400 shadow-lg rounded-md px-8 py-2 text-center text-primary cursor-pointer transition-all hover:bg-red-500">Cancelar</button>
                        <button type='button' onClick={onConfirm} className="w-full bg-secondary shadow-lg rounded-md px-8 py-2 text-center text-primary cursor-pointer transition-all hover:bg-secondary-dark">Confirmar</button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}