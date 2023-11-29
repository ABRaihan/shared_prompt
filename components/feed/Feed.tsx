"use client";

import { PromptCard } from "@components/promptCard";
import { PromptSchema } from "@models";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const Feed = () => {
  //? @___Locale State___@
  const [posts, setPosts] = useState<Array<PromptSchema>>([]);

  //? @___Hook Form___@
  const form = useForm({
    defaultValues: {
      query: "",
    },
  });

  //? @___Handler Functions___@
  const handleGetPrompts = async () => {
    try {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  //? @___Mount Effects___@
  useEffect(() => {
    handleGetPrompts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <Controller
          name="query"
          control={form.control}
          rules={{ required: "Please type your query" }}
          render={({ field }) => (
            <input
              className="search_input peer"
              type="text"
              placeholder="Search for a tag or a username"
              {...field}
            />
          )}
        />
      </form>

      <div className="mt-16 prompt_layout">
        {posts.map((post) => (
          <PromptCard key={post._id} post={post} onClickTag={(tag) => console.log(tag)} />
        ))}
      </div>
    </section>
  );
};
export default Feed;
