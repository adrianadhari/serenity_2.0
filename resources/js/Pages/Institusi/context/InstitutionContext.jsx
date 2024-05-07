import React, { createContext } from "react";

export const InstitutionContext = createContext();

export const InstitutionProvider = (props) => {
    const selectedNegaraTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const negaraOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedGrupTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const grupOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedJenisTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const jenisOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    let handleFunctions = {
        selectedNegaraTemplate,
        negaraOptionTemplate,
        selectedGrupTemplate,
        grupOptionTemplate,
        selectedJenisTemplate,
        jenisOptionTemplate,
    };

    return (
        <InstitutionContext.Provider
            value={{
                handleFunctions,
            }}
        >
            {props.children}
        </InstitutionContext.Provider>
    );
};
