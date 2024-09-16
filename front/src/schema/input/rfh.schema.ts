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
    console.log(getCurrentDateTimeRFC3339());
    const dataFormat = {
      word: data.userInput,
      day: getCurrentDateTimeRFC3339(),
    };

    axios
      .post("https://benki.noonyuu.com/app/v1/word-list", dataFormat, {
        headers: {
          key: import.meta.env.VITE_APP_KEY,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setValue("userInput", ""); // フォームのクリア
        console.log("Post successful");
      })
      .catch((error: any) => {
        if (error.response) {
          console.log("Error Data:", error.response.data);
          console.log("Error Status:", error.response.status);
          console.log("Error Headers:", error.response.headers);
        } else if (error.request) {
          console.log("No response received:", error.request);
        } else {
          console.log("Error:", error.message);
        }
      });
    return false;
  };

  return {
    register,
    errors,
    onSubmit: handleSubmit(onSubmit),
    setValue,
  };
};
