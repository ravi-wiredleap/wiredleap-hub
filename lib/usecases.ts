import fs from 'fs';
import path from 'path';
import { UseCase } from '@/types';

/**
 * Loads all use cases from individual JSON files in the content/usecases directory
 * This function runs on the server side only
 */
export function loadUseCases(): UseCase[] {
  const usecasesDir = path.join(process.cwd(), 'content', 'usecases');

  // Read all files from the usecases directory
  const files = fs.readdirSync(usecasesDir);

  // Filter only JSON files
  const jsonFiles = files.filter(file => file.endsWith('.json'));

  // Read and parse each file
  const usecases: UseCase[] = jsonFiles.map(file => {
    const filePath = path.join(usecasesDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent) as UseCase;
  });

  return usecases;
}

/**
 * Loads a single use case by ID
 */
export function loadUseCaseById(id: string): UseCase | null {
  const filePath = path.join(process.cwd(), 'content', 'usecases', `${id}.json`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContent) as UseCase;
}

/**
 * Client-side data import for static data
 * This maintains backward compatibility with existing imports
 */
export function getStaticUseCases() {
  // For client-side, we'll need to fetch from API
  // This is a placeholder that should not be used directly
  throw new Error('Use loadUseCases() on server or fetch from API on client');
}
