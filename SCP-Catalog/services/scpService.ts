import type { SCPEntity } from '../types/scp';
import { scpData } from '../constants/scpData';

export const scpDataReference: SCPEntity[] = scpData;

export const delay = (milliseconds: number = 500): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });

export const getAllSCPs = async (): Promise<SCPEntity[]> => {
  await delay();
  return scpDataReference.map((scp) => ({ ...scp }));
};

export const getSCPById = async (id: string): Promise<SCPEntity> => {
  const scp = scpDataReference.find((item) => item.id === id);

  await delay();

  if (!scp) {
    throw new Error(`SCP con ID ${id} no encontrado`);
  }

  return { ...scp };
};

export type NewSCPData = Omit<SCPEntity, 'id'>;

export const createSCP = async (data: NewSCPData): Promise<SCPEntity> => {
  const createdSCP: SCPEntity = {
    id: `scp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ...data,
  };

  await delay();
  scpDataReference.push(createdSCP);

  return { ...createdSCP };
};

export type UpdateSCPData = Partial<NewSCPData>;

export const updateSCP = async (
  id: string,
  data: UpdateSCPData,
): Promise<SCPEntity> => {
  const scpIndex = scpDataReference.findIndex((item) => item.id === id);

  await delay();

  if (scpIndex === -1) {
    throw new Error(`SCP con ID ${id} no encontrado`);
  }

  const updatedSCP = {
    ...scpDataReference[scpIndex],
    ...data,
  };

  scpDataReference[scpIndex] = updatedSCP;

  return { ...updatedSCP };
};

export const deleteSCP = async (id: string): Promise<void> => {
  const scpIndex = scpDataReference.findIndex((item) => item.id === id);

  await delay();

  if (scpIndex === -1) {
    throw new Error(`SCP con ID ${id} no encontrado`);
  }

  scpDataReference.splice(scpIndex, 1);
};