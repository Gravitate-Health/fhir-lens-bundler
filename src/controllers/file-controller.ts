import * as fs from 'node:fs'

import { LensFhirResource } from '../models/lens-fhir-resource.js';

export function getFileData(file: string): string {
    let fileData;
    try {
      fileData = fs.readFileSync(file, 'utf8');
    } catch (error) {
      console.log('Error reading file:', error);
      throw error;
    }

    return fileData;
}

export function writeBundleToFile(bundle: LensFhirResource): void {
    const bundleJson = JSON.stringify(bundle, null, 2);
    const bundleFileName = `${bundle.name}.json`;
    try {
      fs.writeFileSync(bundleFileName, bundleJson);
    } catch (error) {
      console.log('Error writing bundle to file:', error);
      throw error;
    }
  }