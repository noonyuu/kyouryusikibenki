import { FC } from "react";
import { PropsWithChildren } from "react";

export type FieldWrapperProps = PropsWithChildren<{
  errorMessage?: string;
}>;

export const FieldWrapper: FC<FieldWrapperProps> = ({
  errorMessage,
  children,
}) => {
  return (
    <div
      className={`${errorMessage ? "border-red-500" : "border-gray-300"} p-2`}
    >
      {children}
      {errorMessage && (
        <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};
