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
