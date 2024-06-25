import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import PartnershipTable from "@/Pages/Kemitraan/Partials/PartnershipTable";
import { useState } from "react";

export default function KemitraanSearchForm() {
    const [tglAwal, setTglAwal] = useState("");
    const [tglAkhir, setTglAkhir] = useState("");
    const [dataDocument, setDataDocument] = useState([]);
    const [showTable, setShowTable] = useState(false);

    const searchAction = async (e) => {
        e.preventDefault();

        fetch(`/api/search/dokumen?awal=${tglAwal}&akhir=${tglAkhir}`)
            .then((res) => res.json())
            .then((data) => {
                setDataDocument(data);
                setShowTable(true);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    return (
        <>
            <form onSubmit={searchAction} className="form-card">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="form-control">
                        <InputLabel value="Periode Awal" />

                        <TextInput
                            type="date"
                            value={tglAwal}
                            onChange={(e) => setTglAwal(e.target.value)}
                        />
                    </div>

                    <div className="form-control">
                        <InputLabel value="Periode Akhir" />

                        <TextInput
                            type="date"
                            value={tglAkhir}
                            onChange={(e) => setTglAkhir(e.target.value)}
                        />
                    </div>

                    <PrimaryButton className="md:mt-6 md:w-1/2 justify-center btn-primary">
                        Tampilkan
                    </PrimaryButton>
                </div>
            </form>

            <div className={`${showTable ? "" : "hidden"} mt-4 p-0 form-card`}>
                <PartnershipTable partnerships={dataDocument} />
            </div>
        </>
    );
}
