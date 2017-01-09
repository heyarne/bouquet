# External API documentation

This file is meant to be a quick reference for working with external APIs. You
will find what errors and succesfull responses look like, as well as links
to the official docs or additional useful information.

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
