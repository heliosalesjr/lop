'use client'

import React, { createContext, useState, useContext } from 'react'

type DialogContextType = {
  isDialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  triggerRef: React.RefObject<HTMLDivElement | null>; // Adicionado aqui
};


const DialogContext = createContext<DialogContextType | undefined>(undefined)

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openDialog = () => setIsDialogOpen(true)
  const closeDialog = () => setIsDialogOpen(false)

  return (
    <DialogContext.Provider value={{ isDialogOpen, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  )
}

export function useDialog() {
  const context = useContext(DialogContext)
  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogProvider')
  }
  return context
}
