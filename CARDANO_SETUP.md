# Cardano Wallet-to-Wallet Remittance MVP

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Update your `.env` file with:
```
BLOCKFROST_PROJECT_ID="testnetYourProjectIdHere"
NETWORK="testnet"
```

Get your Blockfrost Project ID from: https://blockfrost.io/

### 3. Run the Application
```bash
npm run dev
```

## API Endpoints

### Create Wallet
```
POST /api/wallet/create
Response: { success: true, data: { mnemonic, publicKey, address } }
```

### Get Balance
```
POST /api/wallet/balance
Body: { address: "addr_test1..." }
Response: { success: true, data: { ada: "10.5", tokens: [] } }
```

### Send ADA
```
POST /api/wallet/send
Body: { senderMnemonic: "word1 word2...", receiverAddress: "addr_test1...", amount: 5.0 }
Response: { success: true, data: { txHash: "abc123..." } }
```

## Usage

1. Go to `/wallet` to create a new Cardano wallet
2. Fund your wallet with testnet ADA from: https://testnets.cardano.org/en/testnets/cardano/tools/faucet/
3. Go to `/send` to send ADA to another address
4. View transaction success at `/success`

## Important Notes

- This is for TESTNET only
- Keep your mnemonic phrase secure
- Minimum send amount is 1 ADA due to Cardano UTXO requirements
- Transaction fees are automatically calculated

## File Structure

```
/lib/cardano.ts - Core Cardano utilities
/app/api/wallet/ - API endpoints
/app/wallet/ - Wallet management UI
/app/send/ - Send transaction UI
/app/success/ - Transaction success UI
```