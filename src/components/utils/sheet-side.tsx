import { ReactNode } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"

enum SheetContentSide {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left'
}

type FormSheetSideProps = {
  open: boolean;
  setSheetOpen: (open: boolean) => void;
  side?: SheetContentSide;
  title?: string;
  description?: string;
  children: ReactNode;
}

export function SheetSide({
  open,
  setSheetOpen,
  side = SheetContentSide.LEFT,
  title = 'Edit',
  description,
  children
}: FormSheetSideProps) {
  return (
    <Sheet open={open} onOpenChange={setSheetOpen}>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle className="mb-8">{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
