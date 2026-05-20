export default function Modal({isOpen, onClose, children}){
    if(!isOpen) return null;

    return(
        <div className="fixed inset-0 flex z-40
                        items-center justify-center
                        bg-olive-900/50">
            <div className="bg-white rounded-lg
                            shadow-lg p-6 max-w-md
                            w-full relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    &#x2715; {/* Close button */}
                </button>
                {children}
            </div>
        </div>
    );
}