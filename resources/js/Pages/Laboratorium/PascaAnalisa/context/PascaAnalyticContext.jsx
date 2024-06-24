import React, { createContext } from "react";

export const PascaAnalyticContext = createContext();

export const PascaAnalyticProvider = (props) => {
    const selectedKodePraAnalisaTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const kodePraAnalisaOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    let handleFunctions = {
        selectedKodePraAnalisaTemplate,
        kodePraAnalisaOptionTemplate,
    };

    return (
        <PascaAnalyticContext.Provider
            value={{
                handleFunctions,
            }}
        >
            {props.children}
        </PascaAnalyticContext.Provider>
    );
};
