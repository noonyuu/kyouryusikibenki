import React from "react";

type CardProps = {
  day: string;
  image: string;
  person: number;
};

export const Card: React.FC<CardProps> = ({ day, image, person }) => {
  const today = new Date();
  const dayDate = new Date(day);

  console.log("Day prop:", day);
  console.log("Converted Day:", dayDate);
  console.log("Is dayDate a Date object?", dayDate instanceof Date);

  const mouth = dayDate.getMonth() + 1;
  const date = dayDate.getDate();

  return (
    <div
      className={`${dayDate.toLocaleDateString() === today.toLocaleDateString() ? "bg-purple" : "bg-lightPurple/20"} h-44 w-20 rounded-full`}
    >
      <div className="text-md flex h-[30%] items-center justify-center pt-2 text-white">
        {mouth}/{date}
      </div>
      <img src={image} alt="image" className="mx-auto h-[40%]" />
      <div className="text-md flex h-[30%] items-center justify-center text-center text-white">
        {person}人
      </div>
    </div>
  );
};
