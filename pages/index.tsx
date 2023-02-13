import BlogReview from "@/components/BlogReview";
import { getBlogs } from "@/server/blog";
import { BlogPost } from "@/types/blog";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useEffect, useMemo, useState } from "react";

const Home: NextPage = ({
  blogData,
  tags,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [fileterWord, setFileterWord] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number[]>([]);
  const filterBlog: BlogPost[] = useMemo(() => {
    // co tu nao do trong filterword tra ve nhung bai blog co chua filter da loc
    return fileterWord.length > 0
      ? blogData.filter((blog: BlogPost) => {
          return fileterWord.every((filter) => blog.tags.includes(filter));
        })
      : blogData;
  }, [fileterWord]);
  const filterLabel = (tag: any, index: number) => {
    // chon truoc roi
    if (selectedIndex.includes(index)) {
      // duoc chon
      setSelectedIndex(selectedIndex.filter((id) => id !== index));
      setFileterWord(fileterWord.filter((filter) => filter !== tag.innerText));
    }
    // chua duoc chon trc
    else {
      setSelectedIndex([...selectedIndex, index]);
      setFileterWord([...fileterWord, tag.innerText]);
    }
  };
  // useEffect(()=>{
  //   console.log(fileterWord)
  // },[fileterWord])
  return (
    <main
      className="w-screen h-screen overflow-auto flex flex-col items-center 
 bg-zinc-600 text-neutral-300 font-poppins "
    >
      <title> Home Page</title>
      <section>
        <div className="mt-3 text-center ">
          <h1 className="text-[3rem]">Welcome to DevBlog</h1>
          <p>
            Build and Deploy full-stack Blog Project với Next.js, TypeScript,
            TailwindCSS, Github GraphQL
          </p>
        </div>
      </section>
      <section className="flex flex-col items-center text-[1.15rem] mt-12">
        <div className="flex gap-3 mb-12">
          {tags.map((tag: string, index: number) => {
            return (
              <button
                className={`${
                  selectedIndex.includes(index)
                    ? "bg-sky-500 px-2 mt-2 font-semibold rounded-xl text-neutral-800 hover:bg-sky-400 transition-all duration-300 "
                    : "bg-sky-800 px-2 mt-2 font-semibold rounded-xl text-zinc-800 hover:bg-sky-400 transition-all duration-300"
                }`}
                onClick={(e) => filterLabel(e.target, index)}
                key={index}
              >
                {tag}
              </button>
            );
          })}
        </div>
        {filterBlog.map((blog: BlogPost) => {
          return (
            <div
              className="max-w-[28em] max-h-[20em] overflow-hidden mx-6 
              mb-6 bg-neutral-300 text-zinc-800 rounded-lg p-4
               hover:bg-neutral-500 hover:text-neutral-300 
               transition-all duration-300"
              key={blog.id}
            >
              <a href={blog.url} target="_blank" rel="noreferrer">
                <BlogReview
                  title={blog.title}
                  bodyText={blog.bodyText}
                  createdAt={blog.createdAt}
                  author={blog.author}
                  tags={blog.tags}
                />
              </a>
            </div>
          );
        })}
      </section>
    </main>
  );
};
export default Home;
export const getServerSideProps: GetServerSideProps = async () => {
  let blogs: BlogPost[] = await getBlogs();
  let tags: string[] = [];
  for (const blog of blogs) {
    for (const tag of blog.tags) {
      if (!tags.includes(tag)) {
        // tranh lap lai cac tag
        tags.push(tag);
      }
    }
  }
  // console.log(tags)
  return {
    props: {
      blogData: blogs,
      tags,
    },
  };
};
