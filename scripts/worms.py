import requests
import json
import time
from typing import Dict, List, Optional

class WoRMSClient:
    """Client für die World Register of Marine Species API"""

    BASE_URL = "https://www.marinespecies.org/rest"

    def __init__(self, delay: float = 0.5):
        """
        Initialize WoRMS API client

        Args:
            delay: Delay between API calls in seconds (rate limiting)
        """
        self.delay = delay
        self.session = requests.Session()

    def get_full_record(self, aphia_id: int) -> Optional[Dict]:
        """
        Holt vollständige Informationen zu einer AphiaID

        Args:
            aphia_id: WoRMS AphiaID

        Returns:
            Dictionary mit vollständigen Artinformationen oder None bei Fehler
        """
        url = f"{self.BASE_URL}/AphiaRecordByAphiaID/{aphia_id}"

        try:
            response = self.session.get(url)
            response.raise_for_status()
            time.sleep(self.delay)  # Rate limiting
            return response.json()
        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 204:
                print(f"⚠️  Keine Daten für AphiaID {aphia_id}")
                return None
            print(f"❌ HTTP Fehler für AphiaID {aphia_id}: {e}")
            return None
        except Exception as e:
            print(f"❌ Fehler beim Abrufen von AphiaID {aphia_id}: {e}")
            return None

    def get_children(self, aphia_id: int) -> Optional[List[Dict]]:
        """
        Holt alle direkten Kinder einer AphiaID

        Args:
            aphia_id: WoRMS AphiaID

        Returns:
            Liste von Kinder-Records oder None bei Fehler
        """
        url = f"{self.BASE_URL}/AphiaChildrenByAphiaID/{aphia_id}"

        try:
            response = self.session.get(url)
            response.raise_for_status()
            time.sleep(self.delay)  # Rate limiting
            return response.json()
        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 204:
                print(f"ℹ️  Keine Kinder für AphiaID {aphia_id}")
                return []
            print(f"❌ HTTP Fehler beim Abrufen der Kinder für {aphia_id}: {e}")
            return None
        except Exception as e:
            print(f"❌ Fehler beim Abrufen der Kinder für {aphia_id}: {e}")
            return None

    def get_full_taxonomy(self, aphia_id: int, max_depth: int = 5) -> Dict:
        """
        Holt vollständige taxonomische Informationen inkl. aller Kinder

        Args:
            aphia_id: WoRMS AphiaID
            max_depth: Maximale Rekursionstiefe

        Returns:
            Dictionary mit vollständigen Informationen und Kindern
        """
        print(f"📥 Lade Informationen für AphiaID {aphia_id}...")

        # Hauptinformationen holen
        record = self.get_full_record(aphia_id)
        if not record:
            return {}

        result = {
            "record": record,
            "children": []
        }

        # Kinder holen (wenn max_depth > 0)
        if max_depth > 0:
            children = self.get_children(aphia_id)
            if children:
                print(f"  ├─ {len(children)} Kinder gefunden")
                for child in children:
                    child_id = child.get('AphiaID')
                    if child_id:
                        # Rekursiv Kinder der Kinder holen
                        child_data = self.get_full_taxonomy(
                            child_id,
                            max_depth - 1
                        )
                        result["children"].append(child_data)

        return result

    def save_to_json(self, data: Dict, filename: str):
        """
        Speichert Daten in JSON-Datei

        Args:
            data: Zu speichernde Daten
            filename: Dateiname (mit .json Endung)
        """
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            print(f"✅ Daten gespeichert in {filename}")
        except Exception as e:
            print(f"❌ Fehler beim Speichern: {e}")






with open('taxa_complete.json', 'r', encoding='utf-8') as f:
    taxa = json.load(f)
    # WoRMS Client initialisieren
    client = WoRMSClient(delay=0.5)
    for taxon in taxa:
        aphia_id = taxon["aphiaID"]
        print(f"🔍 Starte Abfrage für AphiaID {aphia_id} (Isopoda)")
        print("=" * 60)


        record = client.get_full_record(aphia_id)
        if record:
            if 'valid_authority' in record:
                taxon['authority'] =  record['valid_authority']
            else:
                record['authority'] =  record['authority']
            print(record["AphiaID"])

            environments = {}
            if 'isMarine' in record:
                environments['isMarine'] = record['isMarine'] == 1
            if 'isBrackish' in record:
                environments['isBrackish'] = record['isBrackish'] == 1
            if 'isFreshwater' in record:
                environments['isFreshwater'] = record['isFreshwater'] == 1
            if 'isTerrestrial' in record:
                environments['isTerrestrial'] = record['isTerrestrial'] == 1
            if environments:
                taxon['environments'] = environments

            print("\n" + "=" * 60)
            print("✅ Fertig!")

    with open("taxa_with_worms.json", 'w', encoding='utf-8') as f:
        json.dump(taxa, f, ensure_ascii=False, indent=2)