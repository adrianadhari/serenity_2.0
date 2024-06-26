import moment from "moment";

export default function DetailKegiatanTable({ activity }) {
    let {
        jadwal_mulai,
        jadwal_selesai,
        jenis_flagship,
        jenis_kegiatan,
        judul_kegiatan,
        kode,
        link,
        lokasi,
        materi,
        min_score,
        moda,
        narasumber,
        semester,
        tentang,
        sertifikat,
        status,
        target_peserta,
        created_at,
    } = activity;

    return (
        <div className="overflow-x-auto form-card">
            <table className="table table-zebra">
                <tbody>
                    <tr>
                        <td className="font-bold">Kode Kegiatan</td>
                        <td>{kode}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Judul Kegiatan</td>
                        <td>{judul_kegiatan}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Jenis Kegiatan</td>
                        <td>{jenis_kegiatan}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Jenis Flagship</td>
                        <td>{jenis_flagship}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Narasumber</td>
                        <td>{narasumber}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Jadwal</td>
                        <td>{`${moment(jadwal_mulai).format(
                            "D/MM/YYYY h:mm"
                        )} - ${moment(jadwal_selesai).format(
                            "D/MM/YYYY h:mm"
                        )}`}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Materi</td>
                        <td>{materi}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Link</td>
                        <td>
                            <a
                                href={link}
                                className="underline text-blue-500"
                                target="_blank"
                            >
                                {link}
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td className="font-bold">Lokasi</td>
                        <td>{lokasi}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Min. Score</td>
                        <td>{min_score}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Moda</td>
                        <td>{moda}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Semester</td>
                        <td>{semester}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Status</td>
                        <td>{status}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Target Peserta</td>
                        <td>{target_peserta}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Template Sertifikat</td>
                        <td>
                            {sertifikat ? (
                                <a
                                    target="__blank"
                                    className="text-sm text-blue-500 underline"
                                    href={`/storage/sertifikat-kegiatan/${sertifikat}`}
                                >
                                    Lihat File
                                </a>
                            ) : (
                                "-"
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-bold">Tentang</td>
                        <td>{tentang}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Tanggal Registrasi</td>
                        <td>{moment(created_at).format("D/MM/YYYY")}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
