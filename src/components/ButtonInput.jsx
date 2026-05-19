export default function ButtonInput({label, type, placeholder, children, onChange, ...props}){
    return(
        <div className="w-full flex flex-col mb-1">
            <label className="bold text-primary mb-1 text-md">{label}</label>
            <div className="flex gap-x-2 bg-details w-full rounded-md p-1">
                <input type={type} placeholder={placeholder} onChange={onChange} {...props} className="w-full border border-transparent text-primary rounded-md h-10 px-4 mb-1 shadow-xs focus:outline-none"/>
                <button type="submit" className="items-center p-2 rounded-md bg-[#30384b] text-primary cursor-pointer hover:bg-secondary">
                    {children}
                </button>
            </div>
        </div>
    );
}
