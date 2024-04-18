import Navbar from "@/Components/Navbar";
import SidebarMenu from "@/Components/SidebarMenu";

export default function Authenticated({ children, user, titlePage }) {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content">
                <Navbar user={user} titlePage={titlePage} />
                <main className="container px-6 mx-auto bg-gray-50 min-h-screen">
                    {children}
                </main>
            </div>

            <SidebarMenu />
        </div>
    );
}
