#!/usr/bin/env node

/**
 * This script provides a function to display information about 
 * the version of the demo dApp that the template is based on.
 */

import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJsonPath = path.join(__dirname, '..', 'package.json');

/**
 * Display version information about the template
 */
export function displayVersionInfo() {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const demoVersion = packageJson.demoVersion || 'unknown';
    
    console.log(chalk.cyan('┌─────────────────────────────────────────────────────┐'));
    console.log(chalk.cyan('│                                                     │'));
    console.log(chalk.cyan('│  ') + chalk.bold('Argent dApp generator') + chalk.cyan('                      │'));
    console.log(chalk.cyan('│                                                     │'));
    console.log(chalk.cyan('└─────────────────────────────────────────────────────┘'));
    
    console.log('\nThis template is based on the Argent Demo dApp');
    
    if (demoVersion !== 'unknown') {
      console.log(`Template version: ${chalk.green(demoVersion.substring(0, 7))}`);
      console.log(`Original repo: ${chalk.blue('https://github.com/argentlabs/demo-dapp-starknet')}`);
    } else {
      console.log(chalk.yellow('Template version information not available'));
    }
    
    console.log('\n');
  } catch (error) {
    // Silently fail - this is just informational
  }
}

/**
 * Check if the template is up to date with the original repo
 * (This would require network access, so we just show how to check)
 */
export function checkForUpdates() {
  console.log(chalk.cyan('\nTo check for updates, run:'));
  console.log('  npx create-demo-starknetkit-app --check-updates');
  console.log('\nOr visit:');
  console.log(`  ${chalk.blue('https://github.com/argentlabs/demo-dapp-starknet')}`);
}

// If this script is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  displayVersionInfo();
  checkForUpdates();
} 