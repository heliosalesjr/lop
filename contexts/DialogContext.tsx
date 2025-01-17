"use client" 


import React, { createContext, useContext, useState, useRef } from 'react';

interface DialogContextType {
  isDialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <DialogContext.Provider value={{ isDialogOpen, openDialog, closeDialog, triggerRef }}>
      {children}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
}

