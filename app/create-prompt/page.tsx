"use client";
import { Form } from "@components/form";
import { PromptFromSchema } from "@models";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const CreatePrompt = () => {
  //? @___Locale State___@
  const [loading, setLoading] = useState(false);

  //? @___Router Hooks___@
  const router = useRouter();

  //? @___Hook Form___@
  const methods = useForm<PromptFromSchema>({
    defaultValues: {
      prompt: "",
      tag: "",
    },
  });

  //? @___Handler Functions___@
  const handleCreatePrompt = (form: PromptFromSchema) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/");
    }, 2500);
  };
  return (
    <FormProvider {...methods}>
      <Form loading={loading} onSubmit={methods.handleSubmit(handleCreatePrompt)} />
    </FormProvider>
  );
};
export default CreatePrompt;
