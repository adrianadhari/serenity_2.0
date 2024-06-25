import PrimaryButton from "@/Components/PrimaryButton";
import PesertaTable from "@/Pages/Kegiatan/Partials/PesertaTable";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";

export default function PesertaSearchForm({ allKegiatan }) {
    const [judul, setJudul] = useState("");
    const [dataPeserta, setDataPeserta] = useState([]);
    const [showTable, setShowTable] = useState(false);

    const searchAction = async (e) => {
        e.preventDefault();

        fetch(`/api/search/peserta?judul=${judul.judul_kegiatan}`)
            .then((res) => res.json())
            .then((data) => {
                setDataPeserta(data);
                setShowTable(true);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    return (
        <>
            <form onSubmit={searchAction} className="form-card">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Dropdown
                        value={judul}
                        onChange={(e) => setJudul(e.value)}
                        options={allKegiatan}
                        optionLabel="judul_kegiatan"
                        placeholder="Pilih Judul Kegiatan"
                        className="border-gray"
                        required
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                    />

                    <PrimaryButton className="mt-1 md:w-1/4 justify-center btn-primary">
                        Tampilkan
                    </PrimaryButton>
                </div>
            </form>

            <div className={`${showTable ? "" : "hidden"} mt-4 p-0 form-card`}>
                <PesertaTable participants={dataPeserta} />
            </div>
        </>
    );
}
