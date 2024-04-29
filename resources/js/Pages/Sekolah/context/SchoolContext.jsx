import React, { createContext, useState } from "react";

export const SchoolContext = createContext();

export const SchoolProvider = (props) => {
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [selectedSchoolCategory, setSelectedSchoolCategory] = useState(null);
    const [selectedSchoolType, setSelectedSchoolType] = useState(null);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const school = [
        { name: "KB (Kelompok Bermain)" },
        { name: "PAUD" },
        { name: "TK (Taman Kanak-Kanak)" },
        { name: "SD" },
        { name: "SMP" },
        { name: "SMA" },
        { name: "SMK" },
        { name: "SPS" },
        { name: "MI" },
        { name: "MTS" },
        { name: "MA" },
        { name: "RA (Raudhatul Athfal)" },
        { name: "DINAS" },
        { name: "Universitas" },
        { name: "Lainnya" },
    ];

    const schoolCategory = [
        { name: "Madya" },
        { name: "Utama" },
        { name: "Pari Purna" },
    ];

    const schoolType = [{ name: "NEGERI" }, { name: "SWASTA" }];

    const selectedProvinceTemplate = (option, props) => {
        if (option) {
            fetch(
                `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${option.id}.json`
            )
                .then((res) => res.json())
                .then((data) => {
                    setCities(data);
                    setIsLoading(true);
                });

            return <div className="text-sm">{option.name}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const provinceOptionTemplate = (option) => {
        return <div className="text-sm">{option.name}</div>;
    };

    const selectedCityTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option.name}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const cityOptionTemplate = (option) => {
        return <div className="text-sm">{option.name}</div>;
    };

    const selectedSchoolTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option.name}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const schoolOptionTemplate = (option) => {
        return <div className="text-sm">{option.name}</div>;
    };

    const selectedSchoolCategoryTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option.name}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const schoolCategoryOptionTemplate = (option) => {
        return <div className="text-sm">{option.name}</div>;
    };

    const selectedSchoolTypeTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option.name}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const schoolTypeOptionTemplate = (option) => {
        return <div className="text-sm">{option.name}</div>;
    };

    let state = {
        selectedProvince,
        setSelectedProvince,
        selectedCity,
        setSelectedCity,
        selectedSchool,
        setSelectedSchool,
        selectedSchoolCategory,
        setSelectedSchoolCategory,
        selectedSchoolType,
        setSelectedSchoolType,
        provinces,
        setProvinces,
        cities,
        setCities,
        isLoading,
        setIsLoading,
    };

    let handleFunctions = {
        selectedProvinceTemplate,
        provinceOptionTemplate,
        selectedCityTemplate,
        cityOptionTemplate,
        selectedSchoolTemplate,
        schoolOptionTemplate,
        selectedSchoolCategoryTemplate,
        schoolCategoryOptionTemplate,
        selectedSchoolTypeTemplate,
        schoolTypeOptionTemplate,
    };

    let data = {
        school,
        schoolCategory,
        schoolType,
    };

    return (
        <SchoolContext.Provider
            value={{
                state,
                handleFunctions,
                data,
            }}
        >
            {props.children}
        </SchoolContext.Provider>
    );
};
