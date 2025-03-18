# create-starknetkit-app

A command-line tool for bootstrapping Starknet dApps with a single command. This package creates a modern, ready-to-go Starknet dApp based on the [official demo dApp](https://github.com/argentlabs/demo-dapp-starknet) from Argent Labs, pre-configured with StarknetKit and starknet-react.

## Overview

`create-starknetkit-app` provides a streamlined way to start building on Starknet by replicating the same structure and functionality as the [Argent demo dapp](https://github.com/argentlabs/demo-dapp-starknet) repository. It generates a Next.js application pre-configured with:

- [StarknetKit](https://www.starknetkit.com) - A comprehensive toolkit for building dApps on Starknet
- [starknet-react](https://github.com/apibara/starknet-react) - React hooks for Starknet
- TailwindCSS - For styling
- TypeScript - For type safety

The generated dApp includes examples for common operations like:

- Wallet connection/disconnection
- Network switching
- Transaction execution
- Message signing
- ERC-20 token interaction
- Session key management

## Requirements

- Node.js 20.x or later
- pnpm package manager (recommended)

## Getting Started

To create a new Starknet dApp, run one of the following commands:

```bash
# Using npx
npx create-demo-starknetkit-app
```

Follow the interactive prompts to give your project a name. The CLI will then:

1. Create a new directory with your project name
2. Copy the template files into the directory
3. Install dependencies
4. Set up the project structure

## Development

Once complete, you can navigate to your project and start the development server:

To start development:

```bash
cd your-project-name

# Start the development server
pnpm dev

# Build for production
pnpm build

# Start the production server
pnpm start
```

## Project Structure

The generated project follows a modern Next.js application structure, identical to the [Argent demo dApp](https://github.com/argentlabs/demo-dapp-starknet):

```
your-project-name/
├── public/
├── src/
│   ├── abi/
│   ├── app/            # Next.js app directory
│   ├── components/     # Main react components
│   ├── connectors/     # Wallet connectors
│   ├── constants/
│   └── helpers/
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── next.config.ts
├── package.json
├── postcss.config.cjs
├── tailwind.config.ts
└── tsconfig.json
```

## Features

The generated dApp includes fully functional examples of:

- **Wallet Connection**: Connect with StarknetKit or individual wallet connectors
- **Transaction Management**: Send and monitor transactions
- **Message Signing**: Sign and verify messages
- **Network Management**: Switch between mainnet and testnet
- **Token Integration**: Add ERC-20 tokens to your wallet
- **Session Keys**: Implement and manage session keys

## Learn More

- [Starknet Documentation](https://docs.starknet.io/)
- [StarknetKit Docs](https://www.starknetkit.com)
- [Argent docs](https://docs.argent.xyz/)
- [starknet-react GitHub](https://github.com/apibara/starknet-react)
- [Demo dApp GitHub](https://github.com/argentlabs/demo-dapp-starknet)
- [Next.js Documentation](https://nextjs.org/docs)

## Maintenance

This package aims to stay in sync with the [argentlabs/demo-dapp-starknet](https://github.com/argentlabs/demo-dapp-starknet) repository. We maintain compatibility through:

- Regular reviews of the original repository for updates
- Version tracking to identify which commit of the original repository each release corresponds to
- Manual synchronization to ensure the template includes the latest features and best practices

The current template version is based on commit `cea58e6c021da4fe08cabd80ee2f090fa16c59bd` of the original repository. When significant updates are made to the demo dApp, we release new versions of this package with the updated template.

### Checking for Updates

You can manually check if your installation is up-to-date with the original repository by running:

```bash
npx create-demo-starknetkit-app --check-updates
```

### Syncing the Template

For maintainers of this package, you can sync the template with the latest version of the demo dApp by running:

```bash
npm run sync-template
```

This will:

1. Clone the latest version of the demo-dapp-starknet repository
2. Update your local template files
3. Update the commit hash reference in package.json and README.md

After syncing, you should commit the changes and publish a new version of the package.

A GitHub Actions workflow is also available for manual triggering, which will perform the sync operation and create a pull request with the changes for review.
