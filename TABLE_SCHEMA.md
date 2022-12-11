FiatCurrency
- id - number, auto-increment
- name - string, not null, like USD, EUR, etc.

CryptoCurrency
- id - number, auto-increment
- name - string, not null
- exchange_rate - string (decimal)

CampaignStatus
- id - number, auto-increment
- status - string ('active', 'successful', 'expired', 'fraud')

CampaignOwner
- id - uuid
- user_name - string, not null
- created_at - timestamp, default now
- updated_at - timestamp

CampaignOwnerWallet
- id - uuid
- owner_id - relation to CampaignOwner
- crypto_name - relation to CryptoCurrency (BTC, ETC)
- crypto_wallet_address - string
- created_at - timestamp, default now
- updated_at - timestamp

Campaign
- id - uuid
- name - string not null
- description - string
- goal - decimal not null, positive
- amount - decimal, not null, positive
- fiat_currency - relation to other tabe - FiatCurrency, default USD
- crypto_currency_name - string, optional - relation to other table - CryptoCurrency
- crypto_currency_amount - decimal, optional
- status - relation to other table - CampaignStatus.id
- owner - relation to other table - CampaignOwner.id
- expiration_date - date, not null, min/max
- created_at - timestamp, default now
- updated_at - timestamp

DonationState
- state - string (valid, invalid)

DonationHistory
- id - uuid
- amount - decimal, not null, positive
- fiat_currency - relation to other tabe - FiatCurrency
- nickname - string (letters, digits and underscores)
- state - relation to other db - DonationState