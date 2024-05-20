import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Dropdown } from "primereact/dropdown";
import BackButton from "@/Components/BackButton";

export default function Register({ auth, role }) {
    const title = "Buat akun baru";

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        username: "",
        role: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    const selectedRoleTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm uppercase">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const roleOptionTemplate = (option) => {
        return <div className="text-sm uppercase">{option}</div>;
    };

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <div className="py-4">
                <BackButton href={route("user.index")} />

                <form onSubmit={submit} className="form-card">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />

                            <InputError message={errors.name} />
                        </div>

                        <div>
                            <InputLabel htmlFor="username" value="Username" />

                            <TextInput
                                id="username"
                                type="username"
                                name="username"
                                value={data.username}
                                autoComplete="username"
                                onChange={(e) =>
                                    setData("username", e.target.value)
                                }
                            />

                            <InputError message={errors.username} />
                        </div>

                        <div>
                            <InputLabel value="Pilih Role" />

                            <Dropdown
                                required
                                value={data.role}
                                onChange={(e) => setData("role", e.value)}
                                options={role}
                                optionLabel="name"
                                placeholder="-- Pilih Role --"
                                filter
                                checkmark={true}
                                highlightOnSelect={false}
                                valueTemplate={selectedRoleTemplate}
                                itemTemplate={roleOptionTemplate}
                                className="border-gray"
                            />

                            <InputError message={errors.role} />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <PrimaryButton
                            className="mt-4 justify-center py-2 btn-primary"
                            disabled={processing}
                        >
                            Buat Akun
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
