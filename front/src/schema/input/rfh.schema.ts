import { useForm } from "react-hook-form";
import { ZodSchemaType, zodSchema } from "@/schema/input/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { getCurrentDateTimeRFC3339 } from "@/common/time";

export const RfhSchema = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ZodSchemaType>({
    resolver: zodResolver(zodSchema),
  });

  const onSubmit = (data: ZodSchemaType) => {
    const dataFormat = {
      word: data.userInput,
      day: getCurrentDateTimeRFC3339(),
    };
    axios
      .post("https://benki.noonyuu.com/app/v1/word-list", dataFormat)
      .catch((error: any) => {
        console.log(error);
      })
      .then(() => {
        setValue("userInput", "");
        console.log;
      });
  };

  return {
    register,
    errors,
    onSubmit: handleSubmit(onSubmit),
    setValue,
  };
};
