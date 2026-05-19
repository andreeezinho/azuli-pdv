import SideBar from "./SideBar";

export default function MainLayout({children}){
    return(
        <main className="flex flex-col md:flex-row gap-4 px-1 pb-20 md:pb-0 md:p-4 bg-primary w-full min-h-[100dvh] relative transition-all">
            <SideBar />

            <section className="min-h-[100dvh] md:min-h-0 w-full md:w-[95%] p-6 ">
                {children}
            </section>
        </main>
    );
}