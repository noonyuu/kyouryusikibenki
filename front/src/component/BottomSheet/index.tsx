import { useState } from "react";
import { Drawer } from "vaul";
import { Card } from "./card";

interface CardDate {
  day: string;
  image: string;
  person: number;
}

export const BottomSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const cardDate: CardDate[] = [
    {
      day: "2024-07-27",
      image: "https://benki.noonyuu.com/image/get?date=2024-07-28T00:00:00Z",
      person: 3,
    },
  ];

  return (
    <>
      <Drawer.Root
        open={isOpen}
        onOpenChange={setIsOpen}
        shouldScaleBackground
        snapPoints={["400px", "500px", 1]}
      >
        <Drawer.Trigger asChild>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={
              isOpen
                ? "hidden"
                : "fixed bottom-0 left-0 right-0 flex h-16 cursor-pointer items-center justify-center rounded-t-xl bg-primary"
            }
          >
            <div className="flex w-fit flex-col justify-center">
              <div className="w-full">
                <div className="mx-auto mb-2 h-1.5 w-12 rounded-full bg-zinc-300" />
              </div>
              <div className="text-lg">次回排水まで</div>
            </div>
          </div>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex h-[96%] flex-col rounded-t-[10px] bg-zinc-100">
            <div className="flex-1 rounded-t-[10px] bg-gradient-to-bl from-gradation-s/20 via-primary to-gradation-e/20 p-4">
              <div className="w-full border-b border-white/20">
                <div
                  className="mx-auto mb-2 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300"
                  onClick={() => setIsOpen(!isOpen)}
                />
                <div className="mb-6 w-full text-center text-lg">
                  次回排水まで
                </div>
              </div>
              <div className="max-w-full">
                <Drawer.Title className="mb-4 text-center text-3xl font-medium">
                  排泄履歴
                </Drawer.Title>
                <div className="flex w-full justify-start overflow-x-auto">
                  {cardDate.map((card, index) => (
                    <div className="mr-4" key={index}>
                      <Card
                        key={index}
                        day={card.day}
                        image={card.image}
                        person={card.person}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
};
