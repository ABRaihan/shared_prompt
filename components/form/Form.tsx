"use client";
import { PromptFromSchema } from "@models";
import classNames from "classnames";
import Link from "next/link";
import { Controller, useFormContext } from "react-hook-form";

type FromProps = {
  loading?: boolean;
  onSubmit?: () => void;
};
const Form = ({ loading, onSubmit }: FromProps) => {
  //? @___Hook Form___@
  const {
    formState: { errors },
    control,
  } = useFormContext<PromptFromSchema>();

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Create Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        Create and share amazing prompts with the world, and let your imagination run wild with any
        AI-powered platform.
      </p>

      <form
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        onSubmit={onSubmit}
      >
        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base text-gray-700">Your AI Prompt</span>
          <Controller
            name="prompt"
            control={control}
            render={({ field }) => (
              <textarea
                className={classNames("form_textarea", {
                  "border-red-500": errors.prompt?.message,
                  border: errors.prompt?.message,
                })}
                placeholder="Write your prompt here..."
                {...field}
              ></textarea>
            )}
            rules={{ required: "Prompt is required" }}
          />
          {errors.prompt?.message && (
            <p className="text-red-500 text-xs italic">{errors.prompt?.message}</p>
          )}
        </label>

        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag <span className="font-normal">(#product, #web_development, #idea)</span>
          </span>
          <Controller
            name="tag"
            control={control}
            render={({ field }) => (
              <input
                className={classNames("form_input", {
                  border: errors.tag?.message,
                  "border-red-500": errors.tag?.message,
                })}
                placeholder="#tag"
                {...field}
              />
            )}
            rules={{ required: "Tag is required" }}
          />
          {errors.tag?.message && (
            <p className="text-red-500 text-xs italic">{errors.tag?.message}</p>
          )}
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </section>
  );
};
export default Form;
