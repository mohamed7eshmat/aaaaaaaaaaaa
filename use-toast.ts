import { toast as sonnerToast } from "sonner";

type ToastOpts = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

export const toast = ({ title, description, variant }: ToastOpts) => {
  if (variant === "destructive") {
    sonnerToast.error(title ?? "", { description });
  } else {
    sonnerToast(title ?? "", { description });
  }
};

export const useToast = () => ({ toast });
