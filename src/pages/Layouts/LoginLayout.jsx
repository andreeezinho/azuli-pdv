import SideBar from "./SideBar";

export default function MainLayout({children}){
    return(
        <main className="flex gap-x-4 bg-primary w-full min-h-[100dvh]">
            <section className="flex w-full">
                {children}
            </section>
        </main>
    );
}