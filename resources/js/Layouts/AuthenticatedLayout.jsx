import Sidebar from "@/Components/Sidebar";
import Navbar from "@/Components/Navbar";

export default function Authenticated({ children }) {
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />

            <div className="flex flex-col flex-1 w-full">
                <Navbar />
                <main className="h-full overflow-y-auto">
                    <div className="container px-6 mx-auto grid">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
