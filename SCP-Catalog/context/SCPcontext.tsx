import { useEffect, useState, type PropsWithChildren } from "react";
import { getAllSCPs, type NewSCPData, type UpdateSCPData } from "../services/scpService";
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

export function SCPProvider({ children }: PropsWithChildren) {
  const [scps, setScps] = useState<SCPEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInitialSCPs = async (): Promise<void> => {
      try {
        const loadedSCPs = await getAllSCPs();
        setScps(loadedSCPs);
      } catch (caughtError) {
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "No se pudieron cargar los SCPs",
        );
      } finally {
        setLoading(false);
      }
    };

    void loadInitialSCPs();
  }, []);

  return children;
}
