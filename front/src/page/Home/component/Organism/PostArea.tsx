import { Icon } from "../Atoms/Icon";
import { Button } from "../Atoms/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../schema/FormSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "../Molecules/Form";
import { z } from "zod";

type FormValues = z.infer<typeof formSchema>;

export const PostArea = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmits: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };
  return (
    <form
      className="min-h-sm w-sm flex flex-col bg-slate-950"
      onSubmit={handleSubmit(onSubmits)}
    >
      <div className="flex space-x-4 px-6 pt-4">
        <Icon iconPath="preview.jpeg" rounded={true} />
        <Form name="textInput" control={control} />
      </div>
      <div className="flex grow items-end justify-end py-3 pr-4">
        {/* TODO: このボタンの左側の空きスペースに何か入れる */}
        <Button text="流す" bgColor="lightBlue" textColor="white" />
      </div>
    </form>
  );
};
