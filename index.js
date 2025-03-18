#!/usr/bin/env node

import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import { execSync } from 'child_process';
import { displayVersionInfo } from './scripts/version-info.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
if (args.includes('--check-updates')) {
  checkForUpdates();
  process.exit(0);
}

async function main() {
  // Display version information
  displayVersionInfo();
  
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
      "@starknet-react/chains": "^3.1.2",
      "@starknet-react/core": "^3.7.2",
      "next": "15.2.2",
      "react": "19.0.0-rc-02c0e824-20241028",
      "react-dom": "19.0.0-rc-02c0e824-20241028",
      "starknet": "^6.23.1",
      "starknetkit": "^2.8.1-beta-wallet-account.1"
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

  // Get the original package.json to extract the demo version
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  const demoVersion = packageJson.demoVersion || 'unknown';
  
  // Add template metadata to the generated package.json
  templatePackageJson.templateInfo = {
    source: "create-demo-starknetkit-app",
    version: packageJson.version,
    demoVersion: demoVersion
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
  console.log(chalk.dim(`\nTemplate based on demo-dapp-starknet ${demoVersion.substring(0, 7)}`));
}

// Function to check for updates
function checkForUpdates() {
  console.log(chalk.cyan('Checking for updates to the original demo-dapp-starknet...'));
  
  try {
    // Get the current version from package.json
    const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
    const currentVersion = packageJson.demoVersion || '';
    
    // Clone the repo to a temporary directory to check the latest commit
    const tempDir = path.join(__dirname, 'temp-check');
    if (fs.existsSync(tempDir)) {
      fs.removeSync(tempDir);
    }
    
    console.log('Fetching latest version information...');
    execSync('git clone --depth 1 https://github.com/argentlabs/demo-dapp-starknet.git temp-check', {
      stdio: 'pipe',
      cwd: __dirname
    });
    
    const latestVersion = execSync('git rev-parse HEAD', {
      cwd: path.join(__dirname, 'temp-check')
    }).toString().trim();
    
    // Clean up
    fs.removeSync(tempDir);
    
    if (currentVersion === latestVersion) {
      console.log(chalk.green('\n✓ Your template is up to date with the latest version!'));
      console.log(`Current version: ${chalk.cyan(currentVersion.substring(0, 7))}`);
    } else {
      console.log(chalk.yellow('\n! Your template is not in sync with the latest version.'));
      console.log(`Your version:   ${chalk.cyan(currentVersion.substring(0, 7) || 'unknown')}`);
      console.log(`Latest version: ${chalk.cyan(latestVersion.substring(0, 7))}`);
      
      console.log('\nTo update your template, run:');
      console.log(chalk.cyan('  npm run sync-template'));
    }
  } catch (error) {
    console.error(chalk.red('Error checking for updates:'), error.message);
  }
}

main().catch((err) => {
  console.error(chalk.red('Error:'), err);
  process.exit(1);
});