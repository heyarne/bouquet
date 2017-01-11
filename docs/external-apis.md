# External API documentation

This file is meant to be a quick reference for working with external APIs. You
will find what errors and succesfull responses look like, as well as links
to the official docs or additional useful information.

## Overpas

This is currently used to search for airports in a bounding box.

URL: http://overpass-api.de/api/interpreter?data=$osmQuery`
`osmQuery`:
```
[out:json];
node
    (${swLat},${swLon},${neLat},${neLon})
    [aeroway=aerodrome]
    [iata];
out;
```
Example response (for the bbox of France, `(41.365694,-5.132188,51.087167,9.560119)`):
``` json
{

    "version": 0.6,
    "generator": "Overpass API",
    "osm3s": {
        "timestamp_osm_base": "2017-01-11T15:54:02Z",
        "copyright": "The data included in this document is from www.openstreetmap.org. The data is made available under ODbL."
    },
    "elements": [
        {
            "type": "node",
            "id": 26608804,
            "lat": 43.4370545,
            "lon": 5.2168293,
            "tags": {
                "aerodrome": "international",
                "aerodrome:type": "civil",
                "aeroway": "aerodrome",
                "iata": "MRS",
                "icao": "LFML",
                "name": "Aéroport de Marseille Provence",
                "old_name": "Aéroport de Marseille Marignane",
                "source": "Gagravarr_Airports",
                "website": "http://www.marseille.aeroport.fr/",
                "wikipedia": "fr:Aéroport Marseille Provence"
            }
        },
        {
            "type": "node",
            "id": 26608880,
            "lat": 47.4582802,
            "lon": 8.5481780,
            "tags": {
                "aerodrome": "international",
                "aeroway": "aerodrome",
                "ele": "432",
                "iata": "ZRH",
                "icao": "LSZH",
                "is_in": "Zürich",
                "name": "Flughafen Zürich",
                "name:ar": "مطار زيورخ الدولي",
                "name:ca": "Aeroport de Zuric",
                "name:cs": "Letiště Zürich",
                "name:da": "Zürich Lufthavn",
                "name:de": "Flughafen Zürich",
                "name:en": "Zürich Airport",
                "name:eo": "Flughaveno Zuriko",
                "name:es": "Aeropuerto Internacional de Zúrich",
                "name:et": "Zürichi lennujaam",
                "name:eu": "Züricheko aireportua",
                "name:fa": "فرودگاه زوریخ",
                "name:fi": "Zürichin kansainvälinen lentoasema",
                "name:fr": "Aéroport international de Zurich",
                "name:gl": "Aeroporto de Zúric",
                "name:he": "נמל התעופה הבינלאומי ציריך קלוטן",
                "name:hr": "Zračna luka Zürich",
                "name:hu": "Zürichi repülőtér",
                "name:id": "Bandar Udara Internasional Zürich",
                "name:it": "Aeroporto di Zurigo",
                "name:ja": "チューリッヒ空港",
                "name:ko": "취리히 공항",
                "name:lt": "Ciuricho oro uostas",
                "name:mk": "Аеродром Цирих",
                "name:ms": "Lapangan Terbang Zurich",
                "name:nl": "Luchthaven Zürich",
                "name:pl": "Port lotniczy Zurych-Kloten",
                "name:pt": "Aeroporto de Zurique",
                "name:rm": "Eroport Internaziunal da Turitg-Kloten",
                "name:sk": "Letisko Zürich",
                "name:sr": "Аеродром Цирих",
                "name:sv": "Zürich flygplats",
                "name:tr": "Zürih Havalimanı",
                "name:vi": "Sân bay Zürich",
                "name:zh": "蘇黎世機場",
                "operator": "Flughafen Zürich AG",
                "passengers": "24000000",
                "ref": "ZRH",
                "source": "wikipedia",
                "type": "Public",
                "website": "http://www.zurich-airport.com/",
                "wikipedia": "en:Zürich Airport"
            }
        },
        {
            "type": "node",
            "id": 60647148,
            "lat": 47.4859603,
            "lon": 9.5598603,
            "tags": {
                "aerodrome": "regional",
                "aerodrome:type": "private",
                "aeroway": "aerodrome",
                "ele": "398",
                "iata": "ACH",
                "icao": "LSZR",
                "name": "Business Airport St.Gallen - Altenrhein",
                "passengers": "80000",
                "ref": "ACH",
                "wikipedia": "en:St. Gallen–Altenrhein Airport"
            }
        },
        {
            "type": "node",
            "id": 262226957,
            "lat": 44.5433782,
            "lon": 7.6192896,
            "tags": {
                "aeroway": "aerodrome",
                "iata": "CUF",
                "icao": "LIMZ",
                "name": "Aeroporto Cuneo Levaldigi",
                "wikipedia": "it:Aeroporto di Cuneo-Levaldigi"
            }
        },
        {
            "type": "node",
            "id": 276401991,
            "lat": 46.9127475,
            "lon": 7.5007669,
            "tags": {
                "addr:city": "Belp",
                "addr:country": "CH",
                "addr:postcode": "3123",
                "addr:street": "Flugplatzstrasse",
                "aerodrome": "regional",
                "aeroway": "aerodrome",
                "alt_name": "Flughafen Belpmoos",
                "iata": "BRN",
                "icao": "LSZB",
                "name": "Flughafen Bern-Belp",
                "name:en": "Bern Airport",
                "name:fr": "Aéroport Berne",
                "name:it": "Aeroporto Berna",
                "operator": "ALPAR Flug- und Flugplatzgesellschaft AG",
                "passengers": "200000",
                "website": "http://www.flughafenbern.ch",
                "wikidata": "Q619845",
                "wikipedia": "it:Aeroporto di Berna",
                "wikipedia:fr": "Aéroport international de Berne"
            }
        },
        {
            "type": "node",
            "id": 305447281,
            "lat": 47.6813309,
            "lon": 9.1397524,
            "tags": {
                "aeroway": "aerodrome",
                "ele": "397",
                "iata": "QKZ",
                "icao": "EDTZ",
                "name": "Flugplatz Konstanz",
                "name:de": "Flugplatz Konstanz",
                "name:en": "Airport Constance",
                "operator": "Flughafengesellschaft Konstanz GmbH",
                "ref": "EDTZ",
                "wikidata": "Q1433674",
                "wikipedia": "de:Flugplatz Konstanz"
            }
        },
        {
            "type": "node",
            "id": 321522576,
            "lat": 46.0016489,
            "lon": 8.9066263,
            "tags": {
                "aerodrome": "regional",
                "aerodrome:type": "public",
                "aeroway": "aerodrome",
                "ele": "279",
                "iata": "LUG",
                "icao": "LSZA",
                "name": "Lugano Airport",
                "passengers": "175000",
                "wheelchair": "yes",
                "wikipedia": "en:Lugano Airport"
            }
        },
        {
            "type": "node",
            "id": 408652352,
            "lat": 45.9200203,
            "lon": 4.6331943,
            "tags": {
                "aerodrome:type": "public",
                "aeroway": "aerodrome",
                "alt_name": "Aéroport de Villefranche - Tarare",
                "closest_town": "Villefranche-sur-Saône",
                "ele": "328",
                "iata": "XVF",
                "icao": "LFHV",
                "name": "Aérodrome de Villefranche - Tarare",
                "name:en": "Villefranche - Tarare Airport",
                "operator": "CCI de Villefranche",
                "source": "wikipedia",
                "wikipedia": "fr:Aérodrome de Villefranche - Tarare"
            }
        },
        {
            "type": "node",
            "id": 412055604,
            "lat": 46.2369000,
            "lon": 6.1089000,
            "tags": {
                "aerodrome": "continental",
                "aerodrome:type": "public",
                "aeroway": "aerodrome",
                "city_served": "Geneva",
                "ele": "430",
                "iata": "GVA",
                "icao": "LSGG",
                "name": "Geneva International Airport",
                "name:en": "Geneva International Airport",
                "name:fr": "Aéroport international de Genève",
                "passengers": "13000000",
                "source": "wikipedia",
                "wikipedia": "fr:Aéroport international de Genève"
            }
        },
        {
            "type": "node",
            "id": 416348918,
            "lat": 46.9596331,
            "lon": 6.8663659,
            "tags": {
                "aeroway": "aerodrome",
                "ele": "435",
                "email": "info@neuchatel-airport.ch",
                "fax": "+41 32 841 31 65",
                "iata": "QNC",
                "icao": "LSGN",
                "name": "Neuchâtel-Colombier airport",
                "name:fr": "Aéroport de Neuchâtel",
                "phone": "+41 32 841 31 55",
                "source": "Orthophotos2006sitn50cm",
                "type": "public",
                "website": "http://www.neuchatel-airport.ch",
                "wikipedia": "fr:Aéroport de Neuchâtel"
            }
        },
        {
            "type": "node",
            "id": 824930133,
            "lat": 45.4063442,
            "lon": 6.5786258,
            "tags": {
                "aeroway": "aerodrome",
                "iata": "MFX",
                "icao": "LFKX",
                "name": "Altiport de Méribel",
                "wikipedia": "fr:Altiport de Méribel"
            }
        },
        {
            "type": "node",
            "id": 1042046471,
            "lat": 42.3411580,
            "lon": 1.4107327,
            "tags": {
                "aeroway": "aerodrome",
                "alt_name": "Aeroport Andorra - La Seu",
                "iata": "LEU",
                "icao": "LESU",
                "name": "Aeroport de Pirineus-Andorra",
                "name:en": "Pirineus-La Seu d'Urgell Airport",
                "source": "ourairports.com"
            }
        },
        {
            "type": "node",
            "id": 1042046744,
            "lat": 49.0287018,
            "lon": 1.2198600,
            "tags": {
                "aeroway": "aerodrome",
                "iata": "EVX",
                "name": "Évreux-Fauville (BA 105) Air Base",
                "source": "ourairports.com"
            }
        },
        {
            "type": "node",
            "id": 1042046763,
            "lat": 49.2533407,
            "lon": 2.5192498,
            "tags": {
                "aerodrome:type": "military",
                "aeroway": "aerodrome",
                "ele": "89",
                "iata": "CSF",
                "icao": "LFPC",
                "name": "Base aérienne 110 de Creil",
                "name:en": "Creil Air Base",
                "source": "ourairports.com",
                "website": "http://www.ba110.air.defense.gouv.fr",
                "wikipedia": "fr:Base aérienne 110 Creil"
            }
        },
        {
            "type": "node",
            "id": 1042047732,
            "lat": 46.6766014,
            "lon": 7.8790798,
            "tags": {
                "aeroway": "aerodrome",
                "iata": "ZIN",
                "name": "Interlaken Air Base",
                "source": "ourairports.com"
            }
        },
        {
            "type": "node",
            "id": 1042047747,
            "lat": 46.9744444,
            "lon": 8.3969444,
            "tags": {
                "aeroway": "aerodrome",
                "iata": "BXO",
                "icao": "LSZC",
                "name": "Flugplatz Buochs",
                "name:de": "Flugplatz Buochs",
                "name:en": "Buochs Airport",
                "source": "ourairports.com"
            }
        },
        {
            "type": "node",
            "id": 1123465496,
            "lat": 43.9168212,
            "lon": 2.1173286,
            "tags": {
                "aeroway": "aerodrome",
                "iata": "LBI",
                "icao": "LFCI",
                "name": "Aéroport Albi",
                "operator": "Syndicat Mixte de l'aérodrome d'Albi"
            }
        },
        {
            "type": "node",
            "id": 1529797748,
            "lat": 49.7842885,
            "lon": 4.6457893,
            "tags": {
                "aeroway": "aerodrome",
                "iata": "XCZ",
                "icao": "LFQV",
                "name": "Aéroport de Charleville-Mézières - Belval",
                "operator": "Conseil général des Ardennes",
                "source": "http://www.ourairports.com/airports/LFQV/pilot-info.html",
                "wikipedia": "fr:Aéroport de Charleville-Mézières - Belval"
            }
        },
        {
            "type": "node",
            "id": 1819292994,
            "lat": 47.5623490,
            "lon": -0.3137632,
            "tags": {
                "aeroway": "aerodrome",
                "iata": "ANE",
                "icao": "LFJR",
                "name": "Aéroport Angers Marcé",
                "ref": "LFJR",
                "wikipedia": "fr:Angers Loire Aéroport"
            }
        },
        {
            "type": "node",
            "id": 1948968916,
            "lat": 46.2230062,
            "lon": 2.3627478,
            "tags": {
                "CLC:code": "124",
                "CLC:id": "FR-134173",
                "CLC:year": "2006",
                "aeroway": "aerodrome",
                "iata": "MCU",
                "icao": "LFBK",
                "name": "Aéroport de Montluçon - Guéret",
                "source": "Union européenne - SOeS, CORINE Land Cover, 2006."
            }
        },
        {
            "type": "node",
            "id": 2024849609,
            "lat": 44.4075000,
            "lon": 2.4833333,
            "tags": {
                "aeroway": "aerodrome",
                "iata": "RDZ",
                "icao": "LFCR",
                "name": "Aéroport Rodez Marcillac",
                "operator": "Chambre du Commerce et d'Industrie de Rodez",
                "type": "public",
                "wikipedia": "fr:Aéroport de Rodez-Aveyron"
            }
        },
        {
            "type": "node",
            "id": 2621223666,
            "lat": 50.7805754,
            "lon": -1.8390118,
            "tags": {
                "aeroway": "aerodrome",
                "iata": "BOH",
                "icao": "EGHH",
                "name": "Bournemouth Airport"
            }
        },
        {
            "type": "node",
            "id": 3554808116,
            "lat": 50.7077183,
            "lon": 8.0832824,
            "tags": {
                "aeroway": "aerodrome",
                "ele": "600",
                "iata": "SGE",
                "icao": "EDGS",
                "name": "Siegerlandflughafen",
                "passengers": "32070",
                "wikipedia": "de:Siegerlandflughafen"
            }
        }
    ]

}
```
Example response if no nodes are found:
``` json
{

    "version": 0.6,
    "generator": "Overpass API",
    "osm3s": {
        "timestamp_osm_base": "2017-01-11T15:48:02Z",
        "copyright": "The data included in this document is from www.openstreetmap.org. The data is made available under ODbL."
    },
    "elements": [ ]

}
```

## Skyscanner

### Fetching quotes

URL: `http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/${market}/${currency}/${locale}/${departure}/${destination}/${startDate}/${endDate}`
Note: `startDate` and `endDate` take the form `YYYY-MM-DD` or YYYY-MM
Example response:
``` js
[ { Quotes:
   [ { QuoteId: 1,
       MinPrice: 67,
       Direct: true,
       OutboundLeg:
        { CarrierIds: [ 1050 ],
          OriginId: 82582,
          DestinationId: 42414,
          DepartureDate: '2017-01-01T00:00:00' },
       QuoteDateTime: '2016-11-29T07:09:55' },
     { QuoteId: 2,
       MinPrice: 76,
       Direct: true,
       OutboundLeg:
        { CarrierIds: [ 1047 ],
          OriginId: 84892,
          DestinationId: 42414,
          DepartureDate: '2017-01-01T00:00:00' },
       QuoteDateTime: '2016-11-25T13:46:00' } ],
  Places:
   [ { PlaceId: 42414,
       IataCode: 'BCN',
       Name: 'Barcelona',
       Type: 'Station',
       SkyscannerCode: 'BCN',
       CityName: 'Barcelona',
       CityId: 'BARC',
       CountryName: 'Spain' },
     { PlaceId: 82582,
       IataCode: 'SXF',
       Name: 'Berlin Schoenefeld',
       Type: 'Station',
       SkyscannerCode: 'SXF',
       CityName: 'Berlin',
       CityId: 'BERL',
       CountryName: 'Germany' },
     { PlaceId: 84892,
       IataCode: 'TXL',
       Name: 'Berlin Tegel',
       Type: 'Station',
       SkyscannerCode: 'TXL',
       CityName: 'Berlin',
       CityId: 'BERL',
       CountryName: 'Germany' } ],
  Carriers:
   [ { CarrierId: 7, Name: 'Vueling Airlines' },
     { CarrierId: 834, Name: 'Air Berlin' },
     { CarrierId: 1047, Name: 'eurowings' },
     { CarrierId: 1050, Name: 'easyJet' } ],
  Currencies:
   [ { Code: 'EUR',
       Symbol: '€',
       ThousandsSeparator: ' ',
       DecimalSeparator: ',',
       SymbolOnLeft: false,
       SpaceBetweenAmountAndSymbol: true,
       RoundingCoefficient: 0,
       DecimalDigits: 2 } ] } ]
```

Example error:
``` js
{ ValidationErrors: 
   [ { ParameterName: 'OutboundDate',
       ParameterValue: '2016-11-01',
       Message: 'Date in the past' } ] }
```

http://partners.api.skyscanner.net/apiservices/browsegrid/v1.0/${market}/${currency}/${locale}/${departure}/${destination}/${startDate}/${endDate}:
```
{

    "Dates": [
        [
            null,
            {
                "DateString": "2017-02-01"
            },
            {
                "DateString": "2017-02-02"
            },
            {
                "DateString": "2017-02-03"
            },
            {
                "DateString": "2017-02-04"
            },
            {
                "DateString": "2017-02-05"
            },
            {
                "DateString": "2017-02-06"
            },
            {
                "DateString": "2017-02-07"
            },
            {
                "DateString": "2017-02-08"
            },
            {
                "DateString": "2017-02-09"
            },
            {
                "DateString": "2017-02-10"
            },
            {
                "DateString": "2017-02-11"
            },
            {
                "DateString": "2017-02-12"
            },
            {
                "DateString": "2017-02-13"
            },
            {
                "DateString": "2017-02-14"
            },
            {
                "DateString": "2017-02-15"
            },
            {
                "DateString": "2017-02-16"
            },
            {
                "DateString": "2017-02-17"
            },
            {
                "DateString": "2017-02-18"
            },
            {
                "DateString": "2017-02-19"
            },
            {
                "DateString": "2017-02-20"
            },
            {
                "DateString": "2017-02-21"
            },
            {
                "DateString": "2017-02-22"
            },
            {
                "DateString": "2017-02-23"
            },
            {
                "DateString": "2017-02-24"
            },
            {
                "DateString": "2017-02-25"
            },
            {
                "DateString": "2017-02-26"
            },
            {
                "DateString": "2017-02-27"
            },
            {
                "DateString": "2017-02-28"
            }
        ],
        [
            {
                "DateString": "2017-03-01"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
                "MinPrice": 813.0,
                "QuoteDateTime": "2016-12-17T20:56:00"
            },
            {
                "MinPrice": 813.0,
                "QuoteDateTime": "2016-12-17T20:56:00"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            {
                "MinPrice": 407.0,
                "QuoteDateTime": "2017-01-06T16:30:00"
            },
            {
                "MinPrice": 457.0,
                "QuoteDateTime": "2016-12-28T17:19:00"
            },
            null,
            null,
            null,
            {
                "MinPrice": 458.0,
                "QuoteDateTime": "2017-01-07T20:07:00"
            },
            {
                "MinPrice": 418.0,
                "QuoteDateTime": "2017-01-09T13:44:00"
            },
            {
                "MinPrice": 432.0,
                "QuoteDateTime": "2017-01-08T06:49:00"
            },
            {
                "MinPrice": 571.0,
                "QuoteDateTime": "2017-01-01T21:05:00"
            },
            {
                "MinPrice": 479.0,
                "QuoteDateTime": "2017-01-03T09:24:00"
            },
            {
                "MinPrice": 424.0,
                "QuoteDateTime": "2017-01-04T03:47:00"
            },
            null,
            {
                "MinPrice": 580.0,
                "QuoteDateTime": "2016-12-17T20:56:00"
            }
        ],
        [
            {
                "DateString": "2017-03-02"
            },
            {
                "MinPrice": 424.0,
                "QuoteDateTime": "2017-01-04T08:44:00"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
                "MinPrice": 400.0,
                "QuoteDateTime": "2017-01-06T16:31:00"
            },
            null,
            {
                "MinPrice": 554.0,
                "QuoteDateTime": "2016-12-29T05:07:00"
            },
            {
                "MinPrice": 554.0,
                "QuoteDateTime": "2016-12-29T05:03:00"
            },
            null,
            {
                "MinPrice": 441.0,
                "QuoteDateTime": "2017-01-08T22:25:00"
            },
            {
                "MinPrice": 449.0,
                "QuoteDateTime": "2017-01-05T22:23:00"
            },
            {
                "MinPrice": 657.0,
                "QuoteDateTime": "2016-12-30T00:33:00"
            },
            null,
            null,
            {
                "MinPrice": 450.0,
                "QuoteDateTime": "2016-12-27T15:59:00"
            },
            null,
            null
        ],
        [
            {
                "DateString": "2017-03-03"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
                "MinPrice": 579.0,
                "QuoteDateTime": "2017-01-04T08:39:00"
            },
            null,
            {
                "MinPrice": 443.0,
                "QuoteDateTime": "2017-01-03T13:03:00"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        [
            {
                "DateString": "2017-03-04"
            },
            null,
            {
                "MinPrice": 479.0,
                "QuoteDateTime": "2016-12-25T19:31:00"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
                "MinPrice": 422.0,
                "QuoteDateTime": "2017-01-08T03:49:00"
            },
            null,
            null,
            null,
            null,
            {
                "MinPrice": 742.0,
                "QuoteDateTime": "2016-12-30T18:35:00"
            },
            null,
            {
                "MinPrice": 723.0,
                "QuoteDateTime": "2016-12-27T02:08:00"
            },
            null,
            null,
            null,
            null,
            {
                "MinPrice": 711.0,
                "QuoteDateTime": "2016-12-28T19:35:00"
            },
            {
                "MinPrice": 397.0,
                "QuoteDateTime": "2017-01-04T20:05:00"
            },
            null,
            {
                "MinPrice": 420.0,
                "QuoteDateTime": "2016-12-30T16:09:00"
            },
            null,
            null
        ],
        [
            {
                "DateString": "2017-03-05"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
                "MinPrice": 422.0,
                "QuoteDateTime": "2017-01-08T03:51:00"
            },
            null,
            null,
            null,
            null,
            {
                "MinPrice": 682.0,
                "QuoteDateTime": "2016-12-28T00:37:00"
            },
            {
                "MinPrice": 401.0,
                "QuoteDateTime": "2017-01-08T20:47:00"
            },
            null,
            null,
            null,
            null,
            null,
            {
                "MinPrice": 407.0,
                "QuoteDateTime": "2017-01-09T12:50:00"
            },
            {
                "MinPrice": 420.0,
                "QuoteDateTime": "2017-01-09T05:17:00"
            },
            null,
            null,
            null,
            null
        ],
        [
            {
                "DateString": "2017-03-06"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
                "MinPrice": 849.0,
                "QuoteDateTime": "2017-01-04T00:32:00"
            },
            {
                "MinPrice": 849.0,
                "QuoteDateTime": "2017-01-04T00:32:00"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
                "MinPrice": 420.0,
                "QuoteDateTime": "2017-01-08T21:11:00"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
                "MinPrice": 424.0,
                "QuoteDateTime": "2017-01-02T16:19:00"
            },
            {
                "MinPrice": 493.0,
                "QuoteDateTime": "2016-12-27T10:48:00"
            }
        ],
        [
            {
                "DateString": "2017-03-07"
            },
            {
                "MinPrice": 434.0,
                "QuoteDateTime": "2016-12-25T21:49:00"
            },
            null,
            null,
            null,
            null,
            null,
            {
                "MinPrice": 417.0,
                "QuoteDateTime": "2017-01-06T19:35:00"
            },
            {
                "MinPrice": 871.0,
                "QuoteDateTime": "2017-01-04T00:34:00"
            },
            {
                "MinPrice": 871.0,
                "QuoteDateTime": "2017-01-04T00:34:00"
            },
            null,
            {
                "MinPrice": 388.0,
                "QuoteDateTime": "2017-01-08T03:48:00"
            },
            null,
            null,
            {
                "MinPrice": 498.0,
                "QuoteDateTime": "2017-01-05T19:45:00"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
                "MinPrice": 430.0,
                "QuoteDateTime": "2017-01-05T03:25:00"
            },
            null,
            null,
            null,
            null,
            null,
            {
                "MinPrice": 584.0,
                "QuoteDateTime": "2016-12-27T10:48:00"
            }
        ],
        [
            {
                "DateString": "2017-03-08"
            },
            {
                "MinPrice": 432.0,
                "QuoteDateTime": "2017-01-07T09:23:00"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            {
                "MinPrice": 809.0,
                "QuoteDateTime": "2017-01-04T00:31:00"
            },
            {
                "MinPrice": 809.0,
                "QuoteDateTime": "2017-01-04T00:31:00"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
                "MinPrice": 420.0,
                "QuoteDateTime": "2017-01-08T14:49:00"
            },
            {
                "MinPrice": 399.0,
                "QuoteDateTime": "2017-01-08T18:16:00"
            },
            null,
            null,
            {
                "MinPrice": 576.0,
                "QuoteDateTime": "2016-12-27T10:48:00"
            }
        ],
        [
            {
                "DateString": "2017-03-09"
            },
            {
                "MinPrice": 417.0,
                "QuoteDateTime": "2017-01-07T09:21:00"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
                "MinPrice": 449.0,
                "QuoteDateTime": "2017-01-05T03:32:00"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
                "MinPrice": 419.0,
                "QuoteDateTime": "2017-01-08T20:18:00"
            },
            {
                "MinPrice": 361.0,
                "QuoteDateTime": "2017-01-08T06:56:00"
            },
            null,
            null,
            null
        ],
        [
            {
                "DateString": "2017-03-10"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
                "MinPrice": 918.0,
                "QuoteDateTime": "2017-01-02T10:04:00"
            },
            {
                "MinPrice": 918.0,
                "QuoteDateTime": "2017-01-02T10:04:00"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
                "MinPrice": 413.0,
                "QuoteDateTime": "2017-01-06T16:12:00"
            },
            null,
            null,
            null,
            {
                "MinPrice": 685.0,
                "QuoteDateTime": "2016-12-27T10:48:00"
            }
        ],
        [
            {
                "DateString": "2017-03-11"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
                "MinPrice": 704.0,
                "QuoteDateTime": "2016-12-30T18:39:00"
            },
            null,
            null,
            null,
            null,
            null
        ],
        [
            {
                "DateString": "2017-03-12"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        [
            {
                "DateString": "2017-03-13"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
                "MinPrice": 478.0,
                "QuoteDateTime": "2017-01-05T13:37:00"
            },
            null,
            null,
            null,
            null,
            null
        ],
        [
            {
                "DateString": "2017-03-14"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        [
            {
                "DateString": "2017-03-15"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
                "MinPrice": 433.0,
                "QuoteDateTime": "2017-01-08T02:25:00"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        [
            {
                "DateString": "2017-03-16"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
                "MinPrice": 420.0,
                "QuoteDateTime": "2017-01-09T14:01:00"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        [
            {
                "DateString": "2017-03-17"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
                "MinPrice": 850.0,
                "QuoteDateTime": "2017-01-02T21:55:00"
            },
            {
                "MinPrice": 850.0,
                "QuoteDateTime": "2017-01-02T21:55:00"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
                "MinPrice": 450.0,
                "QuoteDateTime": "2016-12-26T00:27:00"
            },
            null,
            null,
            {
                "MinPrice": 617.0,
                "QuoteDateTime": "2016-12-27T10:48:00"
            }
        ],
        [
            {
                "DateString": "2017-03-18"
            },
            null,
            null,
            {
                "MinPrice": 446.0,
                "QuoteDateTime": "2017-01-03T20:08:00"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
                "MinPrice": 449.0,
                "QuoteDateTime": "2016-12-27T14:24:00"
            },
            {
                "MinPrice": 449.0,
                "QuoteDateTime": "2016-12-27T14:27:00"
            },
            null
        ],
        [
            {
                "DateString": "2017-03-19"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        [
            {
                "DateString": "2017-03-20"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
                "MinPrice": 420.0,
                "QuoteDateTime": "2017-01-08T19:12:00"
            },
            {
                "MinPrice": 420.0,
                "QuoteDateTime": "2017-01-08T19:14:00"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        [
            {
                "DateString": "2017-03-21"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
                "MinPrice": 427.0,
                "QuoteDateTime": "2017-01-08T14:12:00"
            }
        ],
        [
            {
                "DateString": "2017-03-22"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        [
            {
                "DateString": "2017-03-23"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
                "MinPrice": 441.0,
                "QuoteDateTime": "2017-01-08T22:25:00"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        [
            {
                "DateString": "2017-03-24"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        [
            {
                "DateString": "2017-03-25"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        [
            {
                "DateString": "2017-03-26"
            },
            {
                "MinPrice": 459.0,
                "QuoteDateTime": "2017-01-02T15:50:00"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        [
            {
                "DateString": "2017-03-27"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        [
            {
                "DateString": "2017-03-28"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        [
            {
                "DateString": "2017-03-29"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        [
            {
                "DateString": "2017-03-30"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        [
            {
                "DateString": "2017-03-31"
            },
            null,
            null,
            null,
            {
                "MinPrice": 459.0,
                "QuoteDateTime": "2017-01-05T21:10:00"
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ]
    ],
    "Places": [
        {
            "PlaceId": 50290,
            "IataCode": "EWR",
            "Name": "New York Newark",
            "Type": "Station",
            "SkyscannerCode": "EWR",
            "CityName": "New York",
            "CityId": "NYCA",
            "CountryName": "United States"
        },
        {
            "PlaceId": 52337,
            "IataCode": "FRA",
            "Name": "Frankfurt am Main",
            "Type": "Station",
            "SkyscannerCode": "FRA",
            "CityName": "Frankfurt",
            "CityId": "FRAN",
            "CountryName": "Germany"
        },
        {
            "PlaceId": 60987,
            "IataCode": "JFK",
            "Name": "New York John F. Kennedy",
            "Type": "Station",
            "SkyscannerCode": "JFK",
            "CityName": "New York",
            "CityId": "NYCA",
            "CountryName": "United States"
        },
        {
            "PlaceId": 65633,
            "IataCode": "LGA",
            "Name": "New York La Guardia",
            "Type": "Station",
            "SkyscannerCode": "LGA",
            "CityName": "New York",
            "CityId": "NYCA",
            "CountryName": "United States"
        }
    ],
    "Carriers": [
        {
            "CarrierId": 838,
            "Name": "Air France"
        },
        {
            "CarrierId": 1033,
            "Name": "Aer Lingus"
        },
        {
            "CarrierId": 1081,
            "Name": "Icelandair"
        },
        {
            "CarrierId": 1324,
            "Name": "KLM"
        },
        {
            "CarrierId": 1368,
            "Name": "Lufthansa"
        },
        {
            "CarrierId": 1713,
            "Name": "Singapore Airlines"
        },
        {
            "CarrierId": 1717,
            "Name": "Aeroflot"
        },
        {
            "CarrierId": 1755,
            "Name": "Turkish Airlines"
        },
        {
            "CarrierId": 1760,
            "Name": "TAP Portugal"
        },
        {
            "CarrierId": 1793,
            "Name": "United"
        },
        {
            "CarrierId": 1929,
            "Name": "WOW air"
        }
    ],
    "Currencies": [
        {
            "Code": "EUR",
            "Symbol": "€",
            "ThousandsSeparator": " ",
            "DecimalSeparator": ",",
            "SymbolOnLeft": false,
            "SpaceBetweenAmountAndSymbol": true,
            "RoundingCoefficient": 0,
            "DecimalDigits": 2
        }
    ]

}
```

### Getting info about a place
URL: `http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/DE/EUR/en/?api_key=$api_key&query=$query`
Example response:
```
{

    "Places": [
        {
            "PlaceId": "DE-sky",
            "PlaceName": "Germany",
            "CountryId": "DE-sky",
            "RegionId": "",
            "CityId": "-sky",
            "CountryName": "Germany"
        },
        {
            "PlaceId": "FRAN-sky",
            "PlaceName": "Frankfurt",
            "CountryId": "DE-sky",
            "RegionId": "",
            "CityId": "FRAN-sky",
            "CountryName": "Germany"
        },
        {
            "PlaceId": "FRA-sky",
            "PlaceName": "Frankfurt am Main",
            "CountryId": "DE-sky",
            "RegionId": "",
            "CityId": "FRAN-sky",
            "CountryName": "Germany"
        },
        {
            "PlaceId": "HHN-sky",
            "PlaceName": "Frankfurt Hahn",
            "CountryId": "DE-sky",
            "RegionId": "",
            "CityId": "FRAN-sky",
            "CountryName": "Germany"
        },
        {
            "PlaceId": "LEJ-sky",
            "PlaceName": "Leipzig",
            "CountryId": "DE-sky",
            "RegionId": "",
            "CityId": "LEIP-sky",
            "CountryName": "Germany"
        },
        {
            "PlaceId": "DRS-sky",
            "PlaceName": "Dresden",
            "CountryId": "DE-sky",
            "RegionId": "",
            "CityId": "DRES-sky",
            "CountryName": "Germany"
        },
        {
            "PlaceId": "MUC-sky",
            "PlaceName": "Munich",
            "CountryId": "DE-sky",
            "RegionId": "",
            "CityId": "MUNI-sky",
            "CountryName": "Germany"
        },
        {
            "PlaceId": "STR-sky",
            "PlaceName": "Stuttgart",
            "CountryId": "DE-sky",
            "RegionId": "",
            "CityId": "STUT-sky",
            "CountryName": "Germany"
        },
        {
            "PlaceId": "HAJ-sky",
            "PlaceName": "Hannover",
            "CountryId": "DE-sky",
            "RegionId": "",
            "CityId": "HANN-sky",
            "CountryName": "Germany"
        },
        {
            "PlaceId": "HAMB-sky",
            "PlaceName": "Hamburg",
            "CountryId": "DE-sky",
            "RegionId": "",
            "CityId": "HAMB-sky",
            "CountryName": "Germany"
        }
    ]

}
```
