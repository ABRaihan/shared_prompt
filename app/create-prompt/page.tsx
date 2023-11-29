"use client";
import { Form } from "@components/form";
import { PromptFromSchema, UserSchema } from "@models";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const CreatePrompt = () => {
  //? @___Locale State___@
  const [loading, setLoading] = useState(false);

  //? @___Router Hooks___@
  const router = useRouter();
  const { data: session } = useSession();

  //? @___Hook Form___@
  const methods = useForm<PromptFromSchema>({
    defaultValues: {
      prompt: "",
      tag: "",
    },
  });

  //? @___Handler Functions___@
  const handleCreatePrompt = async (form: PromptFromSchema) => {
    setLoading(true);
    try {
      const response = await fetch("/api/prompt", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          userId: `${(session?.user as UserSchema)?.id}`,
        },
      });
      if (response.ok) throw new Error();
      methods.reset();
      router.push("/");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  return (
    <FormProvider {...methods}>
      <Form loading={loading} onSubmit={methods.handleSubmit(handleCreatePrompt)} />
    </FormProvider>
  );
};
export default CreatePrompt;
