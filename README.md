# MsanziShield - Cyber Safety for South Africans

A comprehensive cybersecurity awareness platform designed specifically for South Africans, featuring AI-powered threat detection, scam reporting, and multilingual safety education.

## Features

- **Link Checker**: Analyze suspicious URLs for potential threats
- **Password Checker**: Test password strength and vulnerability assessment
- **Scam Reporting**: Report and view reported scams in your community
- **Safety Tips**: Learn cyber safety best practices in your language
- **Multilingual Support**: Available in English, Afrikaans, isiZulu, isiXhosa, Sepedi, Setswana, Tswana, siSwati, Tshivenda, and isiNdebele

## Tech Stack

- **Frontend**: React with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn-ui with Radix UI
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Backend Functions**: Supabase Edge Functions

## Getting Started

### Prerequisites

- Node.js & npm (install via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd msanzishield

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Development

### Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build for production
- `npm run build:dev` - Build with development mode enabled
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn-ui components
│   ├── Header.tsx
│   ├── LinkChecker.tsx
│   ├── PasswordChecker.tsx
│   └── ...
├── pages/              # Page components
├── contexts/           # React Context for language
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and translations
├── integrations/       # External service integration (Supabase)
└── styles/             # Global styles
```

## Deployment

### Build for Production

```sh
npm run build
```

The optimized build will be created in the `dist/` directory.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is built to protect and serve South Africans. Use it to spread cyber awareness and security.

## Support

For issues, questions, or suggestions, please open an issue in the repository.

---

**© 2026 MsanziShield. Protecting South Africans online.**
