import React, { createContext } from "react";

export const ResearchContext = createContext();

export const ResearchProvider = (props) => {
    const selectedKategoriPenelitianTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const kategoriPenelitianOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedJenisFlagshipTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const jenisFlagshipOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedStatusPenelitianTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const statusPenelitianOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedAreaPenelitianTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const areaPenelitianOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedInstitusiTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const institusiOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedPublikasiTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const publikasiOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    let handleFunctions = {
        selectedKategoriPenelitianTemplate,
        kategoriPenelitianOptionTemplate,
        selectedJenisFlagshipTemplate,
        jenisFlagshipOptionTemplate,
        selectedAreaPenelitianTemplate,
        areaPenelitianOptionTemplate,
        selectedStatusPenelitianTemplate,
        statusPenelitianOptionTemplate,
        selectedInstitusiTemplate,
        institusiOptionTemplate,
        selectedPublikasiTemplate,
        publikasiOptionTemplate,
    };

    return (
        <ResearchContext.Provider
            value={{
                handleFunctions,
            }}
        >
            {props.children}
        </ResearchContext.Provider>
    );
};
