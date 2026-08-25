export type SCPClass = 'Safe' | 'Euclid' | 'Keter' | 'Thaumiel';

export interface SCPEntity {
  id: string;
  ItemNumber: string;
  Class: SCPClass;
  ContainmentProcedures: string;
  Description: string;
}