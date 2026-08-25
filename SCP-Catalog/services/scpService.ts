import type { SCPEntity } from '../types/scp';
import { scpData } from '../constants/scpData';

export const scpDataReference: SCPEntity[] = scpData;

export const delay = (milliseconds: number = 500): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });