export default function Modal({isOpen, onClose, children}){
    if(!isOpen) return null;

    return(
        <div className="fixed inset-0 flex z-40 items-center justify-center bg-olive-900/50">
            <div className="bg-primary rounded-lg shadow-lg p-6 max-w-md w-full relative">
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 hover:bg-details-white p-2 rounded-lg cursor-pointer" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
                {children}
            </div>
        </div>
    );
}