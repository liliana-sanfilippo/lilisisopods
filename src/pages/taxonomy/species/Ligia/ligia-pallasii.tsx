import {IsopodSpecies} from "../../../../types/IsopodSpeciesInterface.tsx";

export const ligiaPallasii: IsopodSpecies = {
    id: "",
    scientificName: "",
    commonNames: {
        de: "",
        en: "",
        la: ""
    },
    taxonomy: {
        kingdom: "",
        phylum: "",
        subphylum: "",
        class: "",
        order: "",
        suborder: "",
        family: "",
        genus: "",
        species: ""
    },
    description: {
        short: "",
        long: "",
        behavior: ""
    },
    characteristics: {
        size: {
            min: 0,
            max: 0,
            unit: ""
        },
        lifespan: {
            value: 0,
            unit: ""
        },
        color: [],
        pattern: "",
        canRollUp: false,
        legs: 0,
        antennaSegments: 0
    },
    habitat: {
        distribution: [],
        environment: [],
        preferredConditions: {
            temperature: {
                min: 0,
                max: 0,
                optimal: 0,
                unit: ""
            },
            humidity: {
                min: 0,
                max: 0,
                unit: ""
            },
            substrate: []
        }
    },
    images: {
        main: "",
        gallery: [],
        habitat: ""
    },
    tags: [],
    lastUpdated: ""
}
  