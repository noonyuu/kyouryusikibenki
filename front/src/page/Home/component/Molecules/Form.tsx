import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { FieldWrapper, FieldWrapperProps } from "../Atoms/FieldWrapper";
import { Textarea } from "../Atoms/Textarea";

export type TextInputProps<T extends FieldValues> = UseControllerProps<T> &
  Pick<FieldWrapperProps, "errorMessage">;

export const Form = <T extends FieldValues>({
  ...props
}: TextInputProps<T>): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <FieldWrapper errorMessage={error?.message}>
      <Textarea placeholder="にゅうりょくしてね" {...field} />
    </FieldWrapper>
  );
};
