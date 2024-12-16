import ListItem from "@/app/[type]/ListItem";
import { createParamsFromClient } from "next/dist/server/request/params";
import Link from "next/link";

// 게시물 목록 조회 기능
async function fetchPosts(type) {
  const url = `https://11.fesp.shop/posts?type=${type}`;
  const res = await fetch(url, {
    headers: { "client-id": "00-board" },
  });
  return await res.json();
}

export default async function Page({ params }) {
  // const { type } = params; // Next.js 14까지는 params가 객체로 전달됨
  // Next.js 15에서는 params가 Promise로 전달됨
  const { type } = await params;

  const data = await fetchPosts(type);

  console.log(data.item.length, "건 조회됨.");

  const list = data.item.map((item) => <ListItem key={item._id} item={item} />);

  return (
    <main className="min-w-80 p-10">
      <div className="text-center py-4">
        <h2 className="pb-4 text-2xl font-bold text-gray-700 dark:text-gray-200">
          {type} 게시판
        </h2>
      </div>

      <div className="flex justify-end mr-4">
        <form action="#">
          <input
            className="dark:bg-gray-600 bg-gray-100 p-1 rounded"
            type="text"
            name="keyword"
          />
          <button
            type="submit"
            className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
          >
            검색
          </button>
        </form>

        <Link
          href="/info/new"
          className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
        >
          글작성
        </Link>
      </div>

      <section className="pt-10">
        <table className="border-collapse w-full table-fixed">
          <colgroup>
            <col className="w-[10%] sm:w-[10%]" />
            <col className="w-[60%] sm:w-[30%]" />
            <col className="w-[30%] sm:w-[15%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[25%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-solid border-gray-600">
              <th className="p-2 whitespace-nowrap font-semibold">번호</th>
              <th className="p-2 whitespace-nowrap font-semibold">제목</th>
              <th className="p-2 whitespace-nowrap font-semibold">글쓴이</th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                조회수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                댓글수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                작성일
              </th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
        <hr />

        <div>
          <ul className="flex justify-center gap-3 m-4">
            <li className="font-bold text-blue-700">
              <Link href="/info?page=1">1</Link>
            </li>
            <li>
              <Link href="/info?page=2">2</Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
