base url: http://localhost:3333/

## GET list of campaigns
- GET /api/campaigns - returns a list of active campaigns by default

- GET /api/campaigns?status=active - returns a list of active campaigns
- GET /api/campaigns?status=successful - returns a list of successful campaigns
- GET /api/campaigns?status=fraud - returns a list of fraud campaigns
- GET /api/campaigns?status=expired - returns a list of fraud expired

- GET /api/campaigns?status=active?perPage=25&page=3 - example of pagination

## Get campaign by id
- GET /api/campaigns/:campaignId - returns single campaign by id

## Currency
- GET /api/currency/fiat - returns a list of fiat currencies (USD, EUR, UAH)
- GET /api/currency/crypto - returns a list of crypto currencies

## Report fraud
- PATCH /api/report/fraud/:campaignOwnerId - update campaign status to fraud by campaign owner ID

## Donate
- POST /api/donate/:campaignId - makes a donation;

body params:
{
  "amount": 100,
  "fiat_currency": "USD",
  "nickname": "oleh_melnyk"
}