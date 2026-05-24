export interface TaxonomicNode {
    aphiaID: number;
    scientificName: string;
    rank: string; // "Order", "Family", "Genus", "Species", etc.
    authority?: string;
    status?: string;
}

export interface TaxonomyData {
    aphiaID: number;
    record: any;
    children: TaxonomicNode[];
}