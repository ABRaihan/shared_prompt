"use client";

import { PromptSchema } from "@models";
import Image from "next/image";
import { useState } from "react";

type PromptCardProps = {
  post: PromptSchema;
  onClickTag: (tag: string) => void;
};
const PromptCard = ({ post, onClickTag }: PromptCardProps) => {
  //? @___Locale State___@
  const [copied, setCopied] = useState("");

  //? @___Handler Functions___@
  const handleCopy = (text: string) => {
    setCopied(text);
    navigator.clipboard.writeText(text);
    setTimeout(() => setCopied(""), 3000);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image as string}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">{post.creator.username}</h3>
            <p className="font-inter text-sm text-gray-500">{post.creator.email}</p>
          </div>
        </div>

        <div className="copy-btn cursor-pointer" onClick={() => handleCopy(post.prompt)}>
          <Image
            src={copied === post.prompt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
            alt="copied"
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue-gradient cursor-pointer"
        onClick={() => onClickTag(post.tag)}
      >
        {post.tag}
      </p>
    </div>
  );
};
export default PromptCard;
