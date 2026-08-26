import type { NewSCPData, UpdateSCPData } from "../services/scpService";
import type { SCPEntity } from "../types/scp";

export interface SCPContextType {
  scps: SCPEntity[];
  loading: boolean;
  error: string | null;
  reloadSCPs: () => Promise<void>;
  createSCP: (data: NewSCPData) => Promise<SCPEntity>;
  updateSCP: (id: string, data: UpdateSCPData) => Promise<SCPEntity>;
  deleteSCP: (id: string) => Promise<void>;
}
