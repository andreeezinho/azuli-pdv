export default function CancelButton({type, text, width, className, onClick, ...props}){
    return(
        <button type={type} onClick={onClick} className={`${width} bg-gray-200 rounded-md px-8 py-2 text-center shadow-md text-secondary cursor-pointer transition-all hover:bg-gray-400 hover:text-primary ${className}`}>
            {text}
        </button>
    );
}