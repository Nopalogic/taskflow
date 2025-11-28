export type Project = {
  id: string;
  name: string;
  workspaceId: string;
};

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
