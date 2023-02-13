import { BlogPost } from "@/types/blog";
import React from "react";
import BlogHeader from "./BlogHeader";

const BlogReview: React.FC<BlogPost> = (props) => {
  const { bodyText, title, createdAt, tags, author } = props;
  const previewText: string = bodyText.substring(0, 150) + "...";

  return (
    <section>
      <BlogHeader createdAt={createdAt} author={author} />
      <h2 className="font-bold">{title}</h2>
      <p className="mt-2">{previewText}</p>
      <div className="flex gap-3">
        {tags.map((tag, index) => {
          return (
            <p
              className="bg-sky-500 px-2 mt-2 font-semibold rounded-xl text-zinc-800"
              key={index}
            >
              {tag}
            </p>
          );
        })}
      </div>
    </section>
  );
};

export default BlogReview;
