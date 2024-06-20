import moment from "moment";

export default function DetailPraAnalisaTable({ detailData }) {
    let {
        kode,
        tujuan_kegiatan,
        pelayanan,
        jenis_analisis,
        status_tarif,
        surat_masuk,
        surat_balasan,
        invoice_dp,
        bukti_bayar_dp,
        jumlah_invoice,
        permintaan_tender,
        sppc,
        buku_agenda,
        contoh_uji,
        lab_pelanggans,
        created_at,
    } = detailData;

    return (
        <div className="overflow-x-auto form-card">
            <table className="table table-zebra">
                <tbody>
                    <tr>
                        <td className="font-bold">Kode Pra Analisa</td>
                        <td>{kode}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Tujuan Kegiatan</td>
                        <td>{tujuan_kegiatan}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Pelayanan</td>
                        <td>{pelayanan}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Jenis Analisis</td>
                        <td>{jenis_analisis}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Status Tarif</td>
                        <td>{status_tarif}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Surat Masuk</td>
                        <td>
                            {surat_masuk ? (
                                <a
                                    target="__blank"
                                    className="text-sm text-blue-500 underline"
                                    href={`/storage/surat-masuk/${surat_masuk}`}
                                >
                                    Lihat File
                                </a>
                            ) : (
                                "-"
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-bold">Surat Balasan</td>
                        <td>
                            {surat_balasan ? (
                                <a
                                    target="__blank"
                                    className="text-sm text-blue-500 underline"
                                    href={`/storage/surat-balasan/${surat_balasan}`}
                                >
                                    Lihat File
                                </a>
                            ) : (
                                "-"
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-bold">Invoice DP</td>
                        <td>
                            {invoice_dp ? (
                                <a
                                    target="__blank"
                                    className="text-sm text-blue-500 underline"
                                    href={`/storage/invoice-dp/${invoice_dp}`}
                                >
                                    Lihat File
                                </a>
                            ) : (
                                "-"
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-bold">Bukti Bayar DP</td>
                        <td>
                            {bukti_bayar_dp ? (
                                <a
                                    target="__blank"
                                    className="text-sm text-blue-500 underline"
                                    href={`/storage/bukti-bayar-dp/${bukti_bayar_dp}`}
                                >
                                    Lihat File
                                </a>
                            ) : (
                                "-"
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-bold">Jumlah Invoice</td>
                        <td>{jumlah_invoice ? jumlah_invoice : "-"}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Permintaan Tender</td>
                        <td>
                            {permintaan_tender ? (
                                <a
                                    target="__blank"
                                    className="text-sm text-blue-500 underline"
                                    href={`/storage/permintaan-tender/${permintaan_tender}`}
                                >
                                    Lihat File
                                </a>
                            ) : (
                                "-"
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-bold">SPPC</td>
                        <td>
                            {sppc ? (
                                <a
                                    target="__blank"
                                    className="text-sm text-blue-500 underline"
                                    href={`/storage/sppc/${sppc}`}
                                >
                                    Lihat File
                                </a>
                            ) : (
                                "-"
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-bold">Buku Agenda</td>
                        <td>
                            {buku_agenda ? (
                                <a
                                    target="__blank"
                                    className="text-sm text-blue-500 underline"
                                    href={`/storage/buku-agenda/${buku_agenda}`}
                                >
                                    Lihat File
                                </a>
                            ) : (
                                "-"
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-bold">Contoh Uji</td>
                        <td>{contoh_uji ? contoh_uji : "-"}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Tanggal Registrasi</td>
                        <td>{moment(created_at).format("D/MM/YYYY")}</td>
                    </tr>
                </tbody>
            </table>

            <details className="collapse collapse-arrow bg-gray-100 mt-2">
                <summary className="collapse-title font-semibold">
                    Data Pelanggan
                </summary>
                <table className="table-auto mx-4 mb-4">
                    <tbody>
                        <tr>
                            <td className="font-bold">Kode Pelanggan</td>
                            <td className="p-2">:</td>
                            <td className="p-2">{lab_pelanggans.kode}</td>
                        </tr>
                        <tr>
                            <td className="font-bold">Instansi</td>
                            <td className="p-2">:</td>
                            <td className="p-2">{lab_pelanggans.instansi}</td>
                        </tr>
                        <tr>
                            <td className="font-bold">Nama Instansi</td>
                            <td className="p-2">:</td>
                            <td className="p-2">
                                {lab_pelanggans.nama_instansi}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-bold">Nama Pelanggan</td>
                            <td className="p-2">:</td>
                            <td className="p-2">
                                {lab_pelanggans.nama_pelanggan}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-bold">Jenis Kelamin</td>
                            <td className="p-2">:</td>
                            <td className="p-2">
                                {lab_pelanggans.jenis_kelamin}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-bold">Tanggal Lahir</td>
                            <td className="p-2">:</td>
                            <td className="p-2">
                                {moment(lab_pelanggans.tgl_lahir).format(
                                    "D/MM/YYYY"
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-bold">No. Telp</td>
                            <td className="p-2">:</td>
                            <td className="p-2">{lab_pelanggans.telp}</td>
                        </tr>
                        <tr>
                            <td className="font-bold">Email</td>
                            <td className="p-2">:</td>
                            <td className="p-2">{lab_pelanggans.email}</td>
                        </tr>
                        <tr>
                            <td className="font-bold">Alamat</td>
                            <td className="p-2">:</td>
                            <td className="p-2">{lab_pelanggans.alamat}</td>
                        </tr>
                        <tr>
                            <td className="font-bold">Tanggal Registrasi</td>
                            <td className="p-2">:</td>
                            <td className="p-2">
                                {moment(lab_pelanggans.created_at).format(
                                    "D/MM/YYYY"
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </details>
        </div>
    );
}
