import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PesertaProvider } from "./context/PesertaContext";
import CreateForm from "./Partials/CreateForm";
import BackButton from "@/Components/BackButton";

export default function CreatePeserta({
    auth,
    tipe_peserta,
    gender,
    pendidikan,
    institusi,
}) {
    const title = "Tambah Peserta";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <PesertaProvider>
                <div className="py-4">
                    <BackButton href={route("peserta.index")} />

                    <CreateForm
                        tipe_peserta={tipe_peserta}
                        jenis_kelamin={gender}
                        pendidikan={pendidikan}
                        institusi={institusi}
                    />
                </div>
            </PesertaProvider>
        </AuthenticatedLayout>
    );
}
