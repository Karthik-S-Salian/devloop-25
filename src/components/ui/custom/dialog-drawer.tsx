import { useWindowWidth } from "@react-hook/window-size";
import * as React from "react";

import { WIDTH_THRESHOLD } from "~/components/ui/config";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";

// TODO(Omkar): Refining the types for the components

const DialogDrawer = ({ ...props }: React.ComponentProps<typeof Drawer>) =>
  useWindowWidth() >= WIDTH_THRESHOLD ? (
    <Dialog {...props} />
  ) : (
    <Drawer {...props} />
  );

const DialogDrawerTrigger = ({
  ...props
}: React.ComponentProps<typeof DrawerTrigger>) =>
  useWindowWidth() >= WIDTH_THRESHOLD ? (
    <DialogTrigger {...props} />
  ) : (
    <DrawerTrigger {...props} />
  );

const DialogDrawerPortal = ({
  ...props
}: React.ComponentProps<typeof DrawerPortal>) =>
  useWindowWidth() >= WIDTH_THRESHOLD ? (
    <DialogPortal {...props} />
  ) : (
    <DrawerPortal {...props} />
  );

const DialogDrawerClose = ({
  ...props
}: React.ComponentProps<typeof DrawerClose>) =>
  useWindowWidth() >= WIDTH_THRESHOLD ? (
    <DialogClose {...props} />
  ) : (
    <DrawerClose {...props} />
  );

const DialogDrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerOverlay>,
  React.ComponentPropsWithoutRef<typeof DrawerOverlay>
>((props, ref) =>
  useWindowWidth() >= WIDTH_THRESHOLD ? (
    <DialogOverlay ref={ref} {...props} />
  ) : (
    <DrawerOverlay ref={ref} {...props} />
  ),
);
DialogDrawerOverlay.displayName = "DialogDrawerOverlay";

const DialogDrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerContent>,
  React.ComponentPropsWithoutRef<typeof DrawerContent>
>((props, ref) =>
  useWindowWidth() >= WIDTH_THRESHOLD ? (
    <DialogContent ref={ref} {...props} />
  ) : (
    <DrawerContent ref={ref} {...props} />
  ),
);
DialogDrawerContent.displayName = "DialogDrawerContent";

const DialogDrawerHeader = ({
  ...props
}: React.ComponentProps<typeof DrawerHeader>) =>
  useWindowWidth() >= WIDTH_THRESHOLD ? (
    <DialogHeader {...props} />
  ) : (
    <DrawerHeader {...props} />
  );

const DialogDrawerFooter = ({
  ...props
}: React.ComponentProps<typeof DrawerFooter>) =>
  useWindowWidth() >= WIDTH_THRESHOLD ? (
    <DialogFooter {...props} />
  ) : (
    <DrawerFooter {...props} />
  );

const DialogDrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerTitle>,
  React.ComponentPropsWithoutRef<typeof DrawerTitle>
>((props, ref) =>
  useWindowWidth() >= WIDTH_THRESHOLD ? (
    <DialogTitle ref={ref} {...props} />
  ) : (
    <DrawerTitle ref={ref} {...props} />
  ),
);
DialogDrawerTitle.displayName = "DialogDrawerTitle";

const DialogDrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerDescription>,
  React.ComponentPropsWithoutRef<typeof DrawerDescription>
>((props, ref) =>
  useWindowWidth() >= WIDTH_THRESHOLD ? (
    <DialogDescription ref={ref} {...props} />
  ) : (
    <DrawerDescription ref={ref} {...props} />
  ),
);
DialogDrawerDescription.displayName = "DialogDrawerDescription";

export {
  DialogDrawer,
  DialogDrawerPortal,
  DialogDrawerOverlay,
  DialogDrawerTrigger,
  DialogDrawerClose,
  DialogDrawerContent,
  DialogDrawerHeader,
  DialogDrawerFooter,
  DialogDrawerTitle,
  DialogDrawerDescription,
};
