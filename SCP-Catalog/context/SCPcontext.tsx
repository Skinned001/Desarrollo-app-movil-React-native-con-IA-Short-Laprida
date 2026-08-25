import {
  createContext,
  type PropsWithChildren,
  useState,
} from 'react';
import type { SCPEntity } from '../types/scp';
import type { NewSCPData, UpdateSCPData } from '../services/scpService';

interface SCPContextType {
  scps: SCPEntity[];
  loading: boolean;
  error: string | null;
  reloadSCPs: () => Promise<void>;
  createSCP: (data: NewSCPData) => Promise<SCPEntity>;
  updateSCP: (id: string, data: UpdateSCPData) => Promise<SCPEntity>;
  deleteSCP: (id: string) => Promise<void>;
}

export const SCPContext = createContext<SCPContextType | undefined>(
  undefined,
);

export const SCPProvider = ({ children }: PropsWithChildren) => {
  const [scps, setScps] = useState<SCPEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const contextValue: SCPContextType = {
    scps,
    loading,
    error,
    reloadSCPs: async () => {},
    createSCP: async () => {
      throw new Error('createSCP aún no implementado');
    },
    updateSCP: async () => {
      throw new Error('updateSCP aún no implementado');
    },
    deleteSCP: async () => {},
  };

  return (
    <SCPContext.Provider value={contextValue}>
      {children}
    </SCPContext.Provider>
  );
};