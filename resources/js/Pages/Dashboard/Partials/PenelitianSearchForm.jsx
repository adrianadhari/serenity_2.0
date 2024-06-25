import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import ResearchTable from "@/Pages/Penelitian/Partials/ResearchTable";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";

export default function PenelitianSearchForm() {
    const [tglAwal, setTglAwal] = useState("");
    const [tglAkhir, setTglAkhir] = useState("");
    const [status, setStatus] = useState("");
    const [dataPenelitian, setDataPenelitian] = useState([]);
    const [showTable, setShowTable] = useState(false);

    const statusOption = [
        { name: "All" },
        { name: "Ongoing" },
        { name: "Finish" },
        { name: "Published" },
    ];

    const searchAction = async (e) => {
        e.preventDefault();

        fetch(
            `/api/search/penelitian?awal=${tglAwal}&akhir=${tglAkhir}&status=${status.name}`
        )
            .then((res) => res.json())
            .then((data) => {
                setDataPenelitian(data);
                setShowTable(true);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    return (
        <>
            <form onSubmit={searchAction} className="form-card">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

                    <div className="form-control">
                        <InputLabel value="Pilih Status" />

                        <Dropdown
                            value={status}
                            onChange={(e) => setStatus(e.value)}
                            options={statusOption}
                            optionLabel="name"
                            placeholder="Pilih Status"
                            className="border-gray"
                            required
                        />
                    </div>

                    <PrimaryButton className="md:mt-6 justify-center btn-primary">
                        Tampilkan
                    </PrimaryButton>
                </div>
            </form>

            <div className={`${showTable ? "" : "hidden"} mt-4 p-0 form-card`}>
                <ResearchTable researches={dataPenelitian} />
            </div>
        </>
    );
}
