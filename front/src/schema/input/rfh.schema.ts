import React from "react";
import { useForm } from "react-hook-form";
import { ZodSchemaType, zodSchema } from "@/schema/input/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";

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
    console.log(data);
  };

  return {
    register,
    errors,
    onSubmit: handleSubmit(onSubmit),
    setValue,
  };
};
