import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.useQuery(["hello", { text: "from tRPC" }]);
  const exampleData = trpc.useQuery(["example"]);
  const { invalidateQueries } = trpc.useContext();
  const createExample = trpc.useMutation("create-example", {
    onSuccess: () => invalidateQueries("example"),
  });

  return (
    <>
      <Head>
        <title>Create t3 App</title>
        <meta name="description" content="Generated by create t3 app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center justify-center w-1/2 min-h-screen mx-auto">
        <h1 className="font-extrabold text-center text-7xl">
          Create <span className="text-blue-500">t3</span> App
        </h1>

        <div className="w-fit">
          <h3 className="mt-4 text-3xl">This Stack uses:-</h3>
          <ul className="self-start text-xl underline list-disc">
            <li>
              <a href="https://nextjs.org" target="_blank">
                Next.js
              </a>
            </li>
            <li>
              <a href="https://trpc.io" target="_blank">
                tRPC
              </a>
            </li>
            <li>
              <a href="https://tailwindcss.com" target="_blank">
                TailwindCSS
              </a>
            </li>
            <li>
              <a href="https://typescriptlang.org" target="_blank">
                TypeScript
              </a>
            </li>
            <li>
              <a href="https://www.prisma.io/" target="_blank">
                Prisma
              </a>
            </li>
          </ul>

          <div className="py-6 text-2xl">
            {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
          </div>
          <div className="py-6 text-2xl">
            <p>Data from Prisma:</p>
            {exampleData.data ? (
              <div>
                {exampleData.data.length === 0 ? (
                  <p className="text-2xl">No data available, create new!</p>
                ) : (
                  exampleData.data.map(({ id }) => <p key={id}>{id}</p>)
                )}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <button
            onClick={() => createExample.mutate()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create New Example
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
