import csv
import json
from typing import List, Dict, Optional
from pathlib import Path

def extract_aphia_id(lsid: str) -> Optional[int]:
    """Extrahiert AphiaID aus LSID"""
    if not lsid:
        return None
    try:
        return int(lsid.split(':')[-1])
    except:
        return None

def extract_mrgid(area_id: str) -> Optional[int]:
    """Extrahiert Marine Regions Geographic ID"""
    if not area_id:
        return None
    try:
        return int(area_id.split('/')[-1])
    except:
        return None

def parse_distribution_tsv(distribution_file: str) -> Dict[int, List[Dict]]:
    """
    Liest Distribution TSV und gruppiert nach AphiaID

    Returns:
        Dictionary: {aphiaID: [list of distributions]}
    """
    print(f"📖 Lese Distribution-Datei: {distribution_file}")

    distributions = {}

    with open(distribution_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f, delimiter='\t')

        # Debug: Zeige Spaltenamen
        print(f"🔍 Gefundene Spalten: {reader.fieldnames}")

        row_count = 0
        for row in reader:
            row_count += 1

            # Debug: Erste Zeile ausgeben
            if row_count == 1:
                print(f"🔍 Erste Zeile:")
                for key, value in row.items():
                    print(f"   {key}: '{value}'")

            aphia_id = str(extract_aphia_id(row.get('taxonID')))

            # Debug: AphiaID-Extraktion
            if row_count <= 3:
                print(f"🔍 Zeile {row_count}: taxonID='{row.get('taxonID')}' -> AphiaID={aphia_id}")

            if not aphia_id:
                continue

            # Distribution-Objekt - nur nicht-leere Felder
            distribution = {}

            # Alle Felder durchgehen und nur nicht-leere hinzufügen
            field_mapping = {
                'area': row.get('area', '').strip(),
                'areaID': row.get('areaID', '').strip(),
                'gazetteer': row.get('gazetteer', '').strip(),
                'status': row.get('status', '').strip(),
                'referenceID': row.get('referenceID', '').strip(),
                'pageReferenceID': row.get('pageReferenceID', '').strip(),
                'remarks': row.get('remarks', '').strip(),
            }

            # Nur nicht-leere Werte hinzufügen
            for key, value in field_mapping.items():
                if value:
                    distribution[key] = value

            # mrgid speziell behandeln
            if distribution.get('areaID'):
                mrgid = extract_mrgid(distribution['areaID'])
                if mrgid:
                    distribution['mrgid'] = mrgid

            # Zu Liste hinzufügen
            if aphia_id not in distributions:
                distributions[aphia_id] = []
            distributions[aphia_id].append(distribution)

    print(f"✅ {row_count} Zeilen gelesen")
    print(f"✅ {len(distributions)} eindeutige AphiaIDs mit Distributions-Daten gefunden")

    # Debug: Zeige erste paar AphiaIDs
    print(f"🔍 Erste AphiaIDs: {list(distributions.keys())[:5]}")

    # Statistik
    total_records = sum(len(dists) for dists in distributions.values())
    print(f"   Gesamt: {total_records} Distribution-Einträge")

    return distributions

def add_distributions_to_taxa(
        taxa_file: str,
        distribution_file: str,
        output_file: str
):
    """
    Fügt Distribution-Daten zu Taxa hinzu

    Args:
        taxa_file: Pfad zu taxa_flat.json
        distribution_file: Pfad zu distribution.txt
        output_file: Pfad für Output JSON
    """
    # Taxa laden
    print(f"📖 Lade Taxa: {taxa_file}")
    with open(taxa_file, 'r', encoding='utf-8') as f:
        taxa = json.load(f)

    print(f"✅ {len(taxa)} Taxa geladen")

    # Debug: Zeige erste paar AphiaIDs aus Taxa
    taxa_aphia_ids = [t.get('aphiaID') for t in taxa[:5] if t.get('aphiaID')]
    print(f"🔍 Erste Taxa AphiaIDs: {taxa_aphia_ids}")

    # Distributions laden
    distributions = parse_distribution_tsv(distribution_file)

    # Debug: Prüfe ob es Überschneidungen gibt
    taxa_ids_set = set(t.get('aphiaID') for t in taxa if t.get('aphiaID'))
    dist_ids_set = set(distributions.keys())
    overlap = taxa_ids_set & dist_ids_set
    print(f"\n🔍 Debug-Info:")
    print(f"   Taxa mit AphiaID: {len(taxa_ids_set)}")
    print(f"   Distributions mit AphiaID: {len(dist_ids_set)}")
    print(f"   Überschneidungen: {len(overlap)}")

    if overlap:
        print(f"   Beispiele für Überschneidungen: {list(overlap)[:5]}")
    else:
        print(f"   ⚠️  KEINE Überschneidungen gefunden!")
        print(f"   Taxa IDs Beispiele: {list(taxa_ids_set)[:5]}")
        print(f"   Distribution IDs Beispiele: {list(dist_ids_set)[:5]}")

    # Distributions zu Taxa hinzufügen
    print("\n🔗 Füge Distributions zu Taxa hinzu...")
    taxa_with_dist = 0

    for taxon in taxa:
        aphia_id = taxon.get('aphiaID')
        if aphia_id and aphia_id in distributions:
            taxon['distribution'] = distributions[aphia_id]
            taxa_with_dist += 1

            # Debug: Erste Übereinstimmung ausgeben
            if taxa_with_dist == 1:
                print(f"✅ Erste Distribution hinzugefügt für AphiaID {aphia_id}")
                print(f"   {len(distributions[aphia_id])} Distribution-Einträge")

    print(f"✅ {taxa_with_dist} Taxa mit Distribution-Daten aktualisiert")

    # Speichern
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(taxa, f, ensure_ascii=False, indent=2)

    print(f"💾 Gespeichert: {output_file}")

    # Statistik
    print("\n📊 Statistiken:")
    print(f"   Taxa gesamt: {len(taxa)}")
    print(f"   Taxa mit Distribution: {taxa_with_dist}")
    print(f"   Taxa ohne Distribution: {len(taxa) - taxa_with_dist}")

# Verwendung
add_distributions_to_taxa(
    'taxa_flat.json',
    'Distribution.txt',
    'taxa_with_distribution.json'
)