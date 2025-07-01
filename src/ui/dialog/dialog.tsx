import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  description?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  width?: number | string;
}

export const ReusableDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
  showCancelButton = true,
  showConfirmButton = true,
  width,
}: ConfirmDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: width || "500px",
          maxWidth: "100%",
        },
      }}
    >
      {title && <DialogTitle variant="h3">{title}</DialogTitle>}
      <DialogContent>{description}</DialogContent>
      {(showCancelButton || showConfirmButton) && (
        <DialogActions>
          {showCancelButton && (
            <Button onClick={onClose} color="inherit">
              {cancelText}
            </Button>
          )}
          {showConfirmButton && (
            <Button
              onClick={onConfirm}
              // color="error"
              variant="contained"
              autoFocus
            >
              {confirmText}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};
