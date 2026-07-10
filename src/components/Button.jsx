export default function Button({type, text, width, className, ...props}){
    return(
        <button type={type} className={`${width} bg-secondary rounded-md px-8 py-2 text-center shadow-md text-primary cursor-pointer transition-all hover:bg-secondary-dark ${className}`}>
            {text}
        </button>
    );
}