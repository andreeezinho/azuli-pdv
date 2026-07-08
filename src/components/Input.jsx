export default function Input({label, type, placeholder, name, className, colSpan, ...props}){
    return(
        <div className={`w-full flex flex-col ${colSpan}`}>
            {label && (
                <label className="bold text-secondary mb-1 text-md">{label}</label>
            )}
            <input type={type} name={name} placeholder={placeholder} className={`border-transparent bg-details-white text-black rounded-md h-10 px-4 mb-1 shadow-md focus:outline-none ${className}`} {...props}/>
        </div>
    );
}