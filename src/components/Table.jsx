export default function Table({children}){
    return(
        <table className="w-full table table-striped text-sm shadow rtl:text-right">
            {children}
        </table>
    );
}