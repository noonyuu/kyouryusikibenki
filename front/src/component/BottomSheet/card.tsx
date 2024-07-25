import React from "react";

type CardProps = {
  day: Date;
  image: string;
  person: number;
};

export const Card: React.FC<CardProps> = ({ day, image, person }) => {
  day;
  image;
  person;

  const today = new Date();

  const mouth = day.getMonth() + 1;
  const date = day.getDate();

  return (
    <div
      className={`${day.toLocaleDateString() == today.toLocaleDateString() ? "bg-purple" : "bg-lightPurple/20"} h-44 w-20 rounded-full`}
    >
      <div className="text-md flex h-[30%] items-center justify-center pt-2 text-white">
        {mouth}/{date}
      </div>
      <img src={image} alt="image" className="h-[40%]" />
      <div className="text-md flex h-[30%] items-center justify-center text-center text-white">
        {person}人
      </div>
    </div>
  );
};
