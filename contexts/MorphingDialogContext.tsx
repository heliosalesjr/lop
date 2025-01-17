import React, { createContext, useContext, useState, useRef } from 'react';

interface MorphingDialogContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uniqueId: string;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

const MorphingDialogContext = createContext<MorphingDialogContextType | undefined>(undefined);

export function MorphingDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useRef(`morphing-dialog-${Math.random().toString(36).substr(2, 9)}`).current;
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const contextValue: MorphingDialogContextType = {
    isOpen,
    setIsOpen,
    uniqueId,
    triggerRef
  };

  return (
    <MorphingDialogContext.Provider value={contextValue}>
      {children}
    </MorphingDialogContext.Provider>
  );
}

export function useMorphingDialog() {
  const context = useContext(MorphingDialogContext);
  if (context === undefined) {
    throw new Error('useMorphingDialog must be used within a MorphingDialogProvider');
  }
  return context;
}

