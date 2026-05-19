export default function Button({type, text, width, ...props}){
    return(
        <button type={type} className={`${width} bg-secondary rounded-md px-8 py-2 text-center text-primary cursor-pointer transition-all hover:bg-secondary-dark`}>
            {text}
        </button>
    );
}