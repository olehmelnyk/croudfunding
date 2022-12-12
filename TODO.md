- add seed for domain state and domain history
- implement backend endpoints, including input validation with zod
- add postman colletion to the repo with api endpoints and examples
- implement DB procedures
- implement caching (Redis?)
- implement frontend
- cover backend and frontend with tests
- improve docs
- code cleanup and refactoring
- add pre-commit and pre-push hooks using husky (linting, code formatting, etc.)

---
Implement Express endpoints:
- list of all campaigns with active status (with pagination)
- get campaign by id
- make a donation
- mark all campaigns as a fraud by campaign owner id
- list all fiat_currency and crypto_currency (2 endpoints)

---
Implemebt DB Procedures:
- check every 10 seconds if campaign is expired or reached the desired goal - to change state to 'expired' or 'successful'