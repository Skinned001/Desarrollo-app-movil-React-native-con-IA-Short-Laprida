import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import {
  createSCP as createSCPService,
  deleteSCP as deleteSCPService,
  getAllSCPs,
  updateSCP as updateSCPService,
  type NewSCPData,
  type UpdateSCPData,
} from "../services/scpService";
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

export const SCPContext = createContext<SCPContextType | undefined>(undefined);

export function SCPProvider({ children }: PropsWithChildren) {
  const [scps, setScps] = useState<SCPEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reloadSCPs = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

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
  }, []);

  useEffect(() => {
    void reloadSCPs();
  }, [reloadSCPs]);

  const createSCP = async (data: NewSCPData): Promise<SCPEntity> => {
    setLoading(true);
    setError(null);

    try {
      const createdSCP = await createSCPService(data);
      setScps((currentSCPs) => [...currentSCPs, createdSCP]);
      return createdSCP;
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "No se pudo crear el SCP";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const updateSCP = async (
    id: string,
    data: UpdateSCPData,
  ): Promise<SCPEntity> => {
    setLoading(true);
    setError(null);

    try {
      const updatedSCP = await updateSCPService(id, data);
      setScps((currentSCPs) =>
        currentSCPs.map((scp) => (scp.id === id ? updatedSCP : scp)),
      );
      return updatedSCP;
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "No se pudo actualizar el SCP";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const deleteSCP = async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await deleteSCPService(id);
      setScps((currentSCPs) => currentSCPs.filter((scp) => scp.id !== id));
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "No se pudo eliminar el SCP";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const contextValue: SCPContextType = {
    scps,
    loading,
    error,
    reloadSCPs,
    createSCP,
    updateSCP,
    deleteSCP,
  };

  return (
    <SCPContext.Provider value={contextValue}>{children}</SCPContext.Provider>
  );
}

export function useSCP(): SCPContextType {
  const context = useContext(SCPContext);

  if (!context) {
    throw new Error("useSCP debe utilizarse dentro de un SCPProvider");
  }

  return context;
}
