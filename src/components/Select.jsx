import formatNumber from "../helpers/formatNumber";

export default function Select({label, placeholder, name, className, colSpan, selected, options, ...props}){
    return(
        <div className={`w-full flex flex-col ${colSpan}`}>
            {label && (
                <label className="bold text-secondary mb-1 text-md">{label}</label>
            )}
            <select name={name} id={name} className={`border-transparent bg-details-white text-black rounded-md h-10 px-4 mb-1 shadow-md focus:outline-none ${className}`} {...props}>
                <option value="" select className="">{selected}</option>

                {options?.map((item) => {
                    return <option key={item.uuid} value={item.uuid} className="">{item.nome ?? formatNumber(item.tributacao) + ' %' ?? item.tipo}</option>
                })}
            </select>
        </div>
    );
}