import { FC } from "react";

type IconProps = {
  iconPath: string;
  rounded?: boolean;
  size?: number;
};

export const Icon: FC<IconProps> = ({
  iconPath,
  rounded = false,
  size = 32,
}) => {

  return (
    <img
      src={iconPath}
      alt={iconPath}
      className={`${rounded} size-${size / 4}`}
    />
  );
};
