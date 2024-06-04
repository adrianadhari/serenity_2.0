import React, { createContext } from "react";

export const PesertaContext = createContext();

export const PesertaProvider = (props) => {
    const selectedTipeTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const tipeOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedGenderTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const genderOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedPendidikanTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const pendidikanOptionTemplate = (option) => {
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

    let handleFunctions = {
        selectedTipeTemplate,
        tipeOptionTemplate,
        selectedGenderTemplate,
        genderOptionTemplate,
        selectedPendidikanTemplate,
        pendidikanOptionTemplate,
        selectedInstitusiTemplate,
        institusiOptionTemplate,
    };

    return (
        <PesertaContext.Provider
            value={{
                handleFunctions,
            }}
        >
            {props.children}
        </PesertaContext.Provider>
    );
};
