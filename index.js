#!/usr/bin/env node

import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log(chalk.bold.cyan('Creating a new Starknet dApp...'));

  const response = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'What is your project named?',
      default: 'my-starknet-dapp',
      validate: (input) => {
        if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
        return 'Project name may only include letters, numbers, underscores and hashes.';
      }
    }
  ]);
  
  const projectName = response.projectName;
  const currentDir = process.cwd();
  const projectDir = path.join(currentDir, projectName);

  if (fs.existsSync(projectDir)) {
    console.log(chalk.red.bold('Error: Directory already exists!'));
    process.exit(1);
  }
  fs.mkdirSync(projectDir);

  const templateDir = path.join(__dirname, 'template');
  fs.copySync(templateDir, projectDir);

  const templatePackageJson = {
    "name": projectName,
    "version": "0.1.0",
    "private": true,
    "packageManager": "pnpm@9.1.4",
    "engines": {
      "node": "20.x"
    },
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint"
    },
    "dependencies": {
      "@argent/x-sessions": "7.0.0",
      "@starknet-io/get-starknet-core": "4.0.4",
      "@starknet-react/chains": "^3.1.0",
      "@starknet-react/core": "^3.5.0",
      "next": "15.0.2",
      "react": "19.0.0-rc-02c0e824-20241028",
      "react-dom": "19.0.0-rc-02c0e824-20241028",
      "starknet": "^6.11.0",
      "starknetkit": "2.6.2"
    },
    "devDependencies": {
      "@starknet-io/types-js": "^0.7.7",
      "@types/node": "^20",
      "@types/react": "^18",
      "@types/react-dom": "^18",
      "autoprefixer": "^10.4.20",
      "eslint": "^8",
      "eslint-config-next": "15.0.2",
      "postcss": "^8.4.49",
      "prettier": "^3.3.3",
      "tailwindcss": "^3.4.15",
      "typescript": "^5"
    }
  };

  fs.writeJsonSync(
    path.join(projectDir, 'package.json'),
    templatePackageJson,
    { spaces: 2 }
  );

  console.log(chalk.green('\nInstalling dependencies...\n'));

  process.chdir(projectDir);
  execSync('pnpm install', { stdio: 'inherit' });

  console.log(chalk.green('\nDone! Created', projectName, 'at', projectDir));
  console.log('\nInside that directory, you can run several commands:');
  console.log(chalk.cyan('\n  pnpm dev'));
  console.log('    Starts the development server.');
  console.log(chalk.cyan('\n  pnpm build'));
  console.log('    Builds the app for production.');
  console.log(chalk.cyan('\n  pnpm start'));
  console.log('    Runs the built app in production mode.');
  console.log('\nWe suggest that you begin by typing:');
  console.log(chalk.cyan('\n  cd'), projectName);
  console.log(chalk.cyan('  pnpm dev'));
  console.log('\nHappy hacking!');
}

main().catch((err) => {
  console.error(chalk.red('Error:'), err);
  process.exit(1);
});