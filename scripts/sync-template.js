#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import chalk from 'chalk';

// Get the directory where the script is located
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Define paths
const tempRepoDir = path.join(rootDir, 'temp-demo-dapp');
const templateDir = path.join(rootDir, 'template');

/**
 * Main function to sync the template
 */
async function syncTemplate() {
  console.log(chalk.cyan('Starting template synchronization...'));
  
  try {
    // Clean up any existing temp directory
    if (fs.existsSync(tempRepoDir)) {
      console.log('Cleaning up existing temporary directory...');
      fs.removeSync(tempRepoDir);
    }
    
    // Clone the original repo
    console.log(chalk.yellow('Cloning the original demo-dapp-starknet repository...'));
    execSync('git clone https://github.com/argentlabs/demo-dapp-starknet.git temp-demo-dapp', {
      stdio: 'inherit',
      cwd: rootDir
    });
    
    // Get the latest commit hash
    const commitHash = execSync('git rev-parse HEAD', {
      cwd: tempRepoDir
    }).toString().trim();
    
    console.log(chalk.green(`Latest commit: ${commitHash}`));
    
    // Ensure template directory exists
    if (!fs.existsSync(templateDir)) {
      fs.mkdirSync(templateDir, { recursive: true });
    }
    
    // Define files and directories to copy
    const itemsToCopy = [
      { src: 'src', dest: 'src' },
      { src: 'public', dest: 'public' },
      { src: '.eslintrc.json', dest: '.eslintrc.json' },
      { src: '.prettierrc', dest: '.prettierrc' },
      { src: '.prettierignore', dest: '.prettierignore' },
      { src: '.gitignore', dest: '.gitignore' },
      { src: 'tailwind.config.ts', dest: 'tailwind.config.ts' },
      { src: 'tsconfig.json', dest: 'tsconfig.json' },
      { src: 'next.config.ts', dest: 'next.config.ts' },
      { src: 'postcss.config.cjs', dest: 'postcss.config.cjs' }
    ];
    
    // Copy files and directories
    console.log(chalk.yellow('Copying files to template directory...'));
    for (const item of itemsToCopy) {
      const sourcePath = path.join(tempRepoDir, item.src);
      const destPath = path.join(templateDir, item.dest);
      
      if (fs.existsSync(sourcePath)) {
        fs.copySync(sourcePath, destPath);
        console.log(`Copied ${item.src} → ${item.dest}`);
      } else {
        console.warn(chalk.yellow(`Warning: ${item.src} not found in source repository`));
      }
    }
    
    // Update package.json with the latest commit hash
    console.log(chalk.yellow('Updating package.json with latest commit hash...'));
    const packageJsonPath = path.join(rootDir, 'package.json');
    
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      packageJson.demoVersion = commitHash;
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log('Updated package.json with latest commit hash');
    } else {
      console.warn(chalk.yellow('Warning: package.json not found, skipping update'));
    }
    
    // Update README.md with latest commit hash
    console.log(chalk.yellow('Updating README.md with latest commit hash...'));
    const readmePath = path.join(rootDir, 'README.md');
    
    if (fs.existsSync(readmePath)) {
      let readmeContent = fs.readFileSync(readmePath, 'utf8');
      readmeContent = readmeContent.replace(/`\[COMMIT_HASH\]`/, `\`${commitHash}\``);
      fs.writeFileSync(readmePath, readmeContent);
      console.log('Updated README.md with latest commit hash');
    } else {
      console.warn(chalk.yellow('Warning: README.md not found, skipping update'));
    }
    
    // Clean up
    console.log(chalk.yellow('Cleaning up temporary directory...'));
    fs.removeSync(tempRepoDir);
    
    console.log(chalk.green('✓ Template successfully synchronized with latest commit:', commitHash));
    console.log(chalk.cyan('Don\'t forget to commit these changes to your repository!'));
  
  } catch (error) {
    console.error(chalk.red('Error during template synchronization:'));
    console.error(error);
    process.exit(1);
  }
}

// Execute the main function
syncTemplate().catch(error => {
  console.error(chalk.red('Unhandled error:'));
  console.error(error);
  process.exit(1);
}); 