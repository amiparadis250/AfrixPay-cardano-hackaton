# AfriXPay - Cross-Border Remittance Platform

A Next.js-based MVP for cross-border money transfers across Africa with simulated Cardano blockchain integration.

## Features

- 📱 Phone number-based user registration
- 🔐 Optional KYC verification system
- 💱 Real-time currency conversion between African currencies
- 🌍 Support for RWF, KES, NGN, GHS, UGX, TZS, ZAR
- ⛓️ Simulated Cardano blockchain transfers
- 📊 Transaction history and status tracking
- 💳 Fee calculation and balance management

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens
- **Blockchain**: Cardano simulation (ready for real integration)

## Project Structure

```
afrixpay/
├── app/
│   ├── api/
│   │   ├── auth/register/          # User registration
│   │   ├── currencies/convert/     # Currency conversion
│   │   ├── transactions/
│   │   │   ├── send/              # Send money
│   │   │   └── history/           # Transaction history
│   │   └── users/profile/         # User profile
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                   # Main dashboard
├── components/
│   ├── RegisterForm.tsx           # User registration form
│   ├── SendMoney.tsx             # Money transfer interface
│   └── TransactionHistory.tsx     # Transaction list
├── lib/
│   ├── auth.ts                   # JWT authentication
│   ├── cardano.ts                # Blockchain simulation
│   ├── currency.ts               # FX conversion logic
│   └── prisma.ts                 # Database client
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Initial data seeding
└── .env.local                    # Environment variables
```

## Database Schema

### Users
- Phone number (unique identifier)
- Personal information (optional)
- KYC status and verification
- Account balance

### Transactions
- Sender/receiver relationship
- Multi-currency amounts
- Exchange rates and fees
- Cardano transaction hashes
- Status tracking

### Currencies
- Supported African currencies
- Real-time exchange rates
- Country mappings

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration

### Currency Operations
- `POST /api/currencies/convert` - Get conversion rates

### Transactions
- `POST /api/transactions/send` - Send money
- `GET /api/transactions/history` - Transaction history

### User Management
- `GET /api/users/profile` - User profile

## Setup Instructions

### 1. Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### 2. Installation
```bash
# Clone and install dependencies
npm install

# Install additional dependency
npm install tsx
```

### 3. Database Setup
```bash
# Set up your PostgreSQL database
# Update DATABASE_URL in .env.local

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed initial data
npm run db:seed
```

### 4. Environment Variables
Update `.env.local`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/afrixpay"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
CARDANO_API_KEY="your-cardano-api-key"
EXCHANGE_RATE_API_KEY="your-exchange-rate-api-key"
```

### 5. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Usage Flow

1. **Registration**: Users register with phone number and basic info
2. **Send Money**: Select recipient, amount, and currencies
3. **Conversion**: Real-time FX rates with fee calculation
4. **Transfer**: Simulated Cardano blockchain transaction
5. **Tracking**: Monitor transaction status and history

## Supported Currencies

| Currency | Country | Code |
|----------|---------|------|
| Rwandan Franc | Rwanda | RWF |
| Kenyan Shilling | Kenya | KES |
| Nigerian Naira | Nigeria | NGN |
| Ghanaian Cedi | Ghana | GHS |
| Ugandan Shilling | Uganda | UGX |
| Tanzanian Shilling | Tanzania | TZS |
| South African Rand | South Africa | ZAR |

## Cardano Integration

Currently simulated for MVP. Ready for real integration:
- Mock transaction hashes
- 95% success rate simulation
- 2-second network delay simulation
- Address generation for users

## Security Features

- JWT-based authentication
- Input validation with Zod
- SQL injection protection via Prisma
- Phone number uniqueness enforcement
- Transaction status tracking

## Scaling Considerations

### For Production:
1. **Real Cardano Integration**: Replace simulation with actual blockchain calls
2. **Live Exchange Rates**: Integrate with forex APIs
3. **KYC Verification**: Add document upload and verification
4. **Mobile App**: React Native implementation
5. **Payment Gateways**: Local payment method integration
6. **Compliance**: Regulatory compliance for each country
7. **Monitoring**: Transaction monitoring and fraud detection

### Performance:
- Database indexing on phone numbers and transaction IDs
- Caching for exchange rates
- Background job processing for blockchain transactions
- CDN for static assets

## Development Notes

This is an MVP built for hackathon demonstration. Key areas for production enhancement:

- Real blockchain integration
- Enhanced security measures
- Comprehensive error handling
- Mobile responsiveness improvements
- Advanced transaction monitoring
- Multi-language support
- Customer support integration

## License

MIT License - Built for AfriXPay hackathon project.