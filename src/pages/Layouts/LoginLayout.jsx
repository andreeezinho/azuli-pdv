import SideBar from "./SideBar";

export default function MainLayout({children}){
    return(
        <main className="flex gap-4 px-1 md:p-4 bg-primary w-full min-h-[100dvh]">
            <section className="flex w-full p-10">
                {children}
            </section>
        </main>
    );
}