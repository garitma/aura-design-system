import { Button } from "@/components/ui/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer";

export const DrawerDemo = () => (
  <Drawer>
    <DrawerTrigger asChild>
      <Button variant="pill">Open Drawer</Button>
    </DrawerTrigger>
    <DrawerContent>
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <div className="p-1.5 pb-0">
          <div className="flex items-center justify-center space-x-2">
            <div className="flex-1 text-center">
              <div className="text-7xl font-bold tracking-tighter">350</div>
              <div className="text-[0.70rem] uppercase text-muted-foreground">
                Calories/day
              </div>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
)