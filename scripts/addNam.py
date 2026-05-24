import csv
import json
import re
from typing import Dict, List, Optional, Union

def extract_aphia_id(lsid: str) -> Optional[int]:
    """Extrahiert AphiaID aus LSID"""
    if not lsid:
        return None
    try:
        return int(re.sub(r'[^0-9]', '', lsid))
    except:
        return None

def parse_vernaculars_tsv(
        vernacular_file: str,
        multiple_names: bool = False
) -> Dict[int, Dict[str, Union[str, List[str]]]]:
    """
    Liest Vernacular Names TSV

    Args:
        vernacular_file: Pfad zur TSV-Datei
        multiple_names: True = mehrere Namen pro Sprache als Liste,
                       False = nur der erste Name

    Returns:
        Dictionary: {aphiaID: {language: name oder [names]}}
    """
    print(f"📖 Lese Vernacular Names: {vernacular_file}")

    common_names = {}

    with open(vernacular_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f, delimiter='\t')

        # Debug: Zeige Spalten
        print(f"🔍 Gefundene Spalten: {reader.fieldnames}")

        row_count = 0
        for row in reader:
            row_count += 1

            aphia_id = str(extract_aphia_id(row.get('taxonID')))
            if not aphia_id:
                continue

            name = row.get('name', '').strip()
            language = row.get('language', '').strip()

            if not name or not language:
                continue

            # Initialisiere Dictionary für diese AphiaID
            if aphia_id not in common_names:
                common_names[aphia_id] = {}

            if multiple_names:
                # Mehrere Namen pro Sprache
                if language not in common_names[aphia_id]:
                    common_names[aphia_id][language] = []

                if name not in common_names[aphia_id][language]:
                    common_names[aphia_id][language].append(name)
            else:
                # Nur ein Name pro Sprache (erster gewinnt)
                if language not in common_names[aphia_id]:
                    common_names[aphia_id][language] = name

    print(f"✅ {row_count} Zeilen gelesen")
    print(f"✅ {len(common_names)} Taxa mit Common Names gefunden")

    # Statistik
    total_names = 0
    languages = {}

    for names_dict in common_names.values():
        for lang, names in names_dict.items():
            languages[lang] = languages.get(lang, 0) + 1
            if isinstance(names, list):
                total_names += len(names)
            else:
                total_names += 1

    print(f"   Gesamt: {total_names} Common Names")
    print(f"   Sprachen:")
    for lang, count in sorted(languages.items(), key=lambda x: x[1], reverse=True):
        print(f"      {lang}: {count}")

    return common_names

def add_common_names_to_taxa(
        taxa_file: str,
        vernacular_file: str,
        output_file: str,
        multiple_names: bool = False
):
    """
    Fügt Common Names zu Taxa hinzu

    Args:
        taxa_file: Pfad zu taxa JSON
        vernacular_file: Pfad zu vernacular.txt
        output_file: Pfad für Output JSON
        multiple_names: Mehrere Namen pro Sprache erlauben
    """
    # Taxa laden
    print(f"📖 Lade Taxa: {taxa_file}")
    with open(taxa_file, 'r', encoding='utf-8') as f:
        taxa = json.load(f)

    print(f"✅ {len(taxa)} Taxa geladen")

    # Common Names laden
    common_names = parse_vernaculars_tsv(vernacular_file, multiple_names)

    # Common Names zu Taxa hinzufügen
    print("\n🔗 Füge Common Names zu Taxa hinzu...")
    taxa_with_names = 0

    for taxon in taxa:
        aphia_id = taxon.get('aphiaID')
        if aphia_id and aphia_id in common_names:
            taxon['commonNames'] = common_names[aphia_id]
            taxa_with_names += 1

    print(f"✅ {taxa_with_names} Taxa mit Common Names aktualisiert")

    # Speichern
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(taxa, f, ensure_ascii=False, indent=2)

    print(f"💾 Gespeichert: {output_file}")

    # Statistik
    print("\n📊 Statistiken:")
    print(f"   Taxa gesamt: {len(taxa)}")
    print(f"   Taxa mit Common Names: {taxa_with_names}")
    print(f"   Taxa ohne Common Names: {len(taxa) - taxa_with_names}")

# Verwendung
add_common_names_to_taxa(
    'taxa_with_distribution.json',
    'VernacularName.txt',
    'taxa_complete.json',
    multiple_names=False  # True wenn mehrere Namen pro Sprache
)