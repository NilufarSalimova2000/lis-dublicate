import { useCallback, useState } from "react";

export const useToggle = (initialState = false) => {
  const [open, setOpen] = useState(initialState);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen(prev => !prev), [])

  return {
    open,
    handleOpen,
    handleClose,
    toggle
  };
};
