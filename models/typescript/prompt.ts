import { UserSchema } from "@models/typescript/user";

export type PromptFromSchema = {
  prompt: string;
  tag: string;
};

export type PromptSchema = {
  _id: string;
  prompt: string;
  tag: string;
  creator: UserSchema;
};
