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
      className={`w-full ${errorMessage ? "border border-red-500" : null} rounded-md p-2`}
    >
      {children}
      {errorMessage && (
        <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};
