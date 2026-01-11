export interface IsopodSpecies {
    aphiaID: string;
    scientificName: string;
    commonNames: {
        de?: string;
        en?: string;
        la?: string;
    };
    taxonomy: {
        kingdom: string;
        phylum: string;
        subphylum: string;
        class: string;
        order: string;
        suborder?: string;
        family?: string;
        genus?: string;
        species?: string;
    };
    description: {
        short: string;
        long: string;
        behavior?: string;
    };
    rank?: string,
    characteristics: {
        size: {
            min: number;
            max: number;
            unit: string;
        };
        lifespan?: {
            value: number;
            unit: string;
        };
        color: string[];
        pattern?: string;
        canRollUp: boolean;
        legs: number;
        antennaSegments: number;
    };
    habitat: {
        distribution: string[];
        environment: string[];
        preferredConditions: {
            temperature: {
                min: number;
                max: number;
                optimal: number;
                unit: string;
            };
            humidity: {
                min: number;
                max: number;
                unit: string;
            };
            substrate: string[];
        };
    };
    care?: {
        difficulty: 'easy' | 'medium' | 'hard';
        terrarium: {
            minSize: {
                width: number;
                depth: number;
                height: number;
                unit: string;
            };
            substrate: string;
            hideouts: string[];
            ventilation: string;
        };
        diet: {
            primary: string[];
            supplements: string[];
            feedingFrequency: string;
        };
        breeding?: {
            difficulty: 'easy' | 'medium' | 'hard';
            reproductionType: string;
            eggDevelopment: string;
            offspringPerBrood: {
                min: number;
                max: number;
            };
            maturityTime: {
                value: number;
                unit: string;
            };
        };
    };
    conservation?: {
        status: string;
        threats: string[];
        protected: boolean;
    };
    images: {
        main: string;
        gallery?: string[];
        habitat?: string;
    };
    morphs?: Array<{
        name: string;
        description: string;
        rarity: 'common' | 'uncommon' | 'rare';
        image?: string;
    }>;
    sources?: Array<{
        title: string;
        author: string;
        year: number;
        url?: string;
    }>;
    tags: string[];
    relatedSpecies?: string[];
    lastUpdated: string;
}

export interface IsopodData {
    species: IsopodSpecies[];
}