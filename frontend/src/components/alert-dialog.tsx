import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OctagonAlert } from "lucide-react";
import { useEffect, useState } from "react";

interface AlertDialogProps {
  // id: string | number;
  onDelete: () => void;
  // label: string;
}

export default function AlertDialog({ onDelete }: AlertDialogProps) {
  const [open, setOpen] = useState(false);

  // Fix: Force-clean ARIA states on close
  useEffect(() => {
    if (!open) {
      const cleanup = () => {
        document.querySelectorAll('[aria-hidden="true"]').forEach((el) => {
          if (el.contains(document.activeElement)) {
            el.removeAttribute("aria-hidden");
          }
        });
        document.body.focus();
      };
      const timer = setTimeout(cleanup, 10);
      return () => clearTimeout(timer);
    }
  }, [open]);
  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}  
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="items-center">
          <DialogTitle>
            <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
              <OctagonAlert className="h-7 w-7 text-destructive" />
            </div>
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className="text-center text-[15px]">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-2 sm:justify-center">
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="destructive"
            onClick={() => {
              onDelete?.();
              setOpen(false);
            }}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
