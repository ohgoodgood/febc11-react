import useAxiosInstance from "@hooks/useAxiosInstance";
import useFetch from "@hooks/useFetch";
import TodoListItem from "@pages/TodoListItem";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import "../Pagination.css";
import Pagination from "@components/Pagination";
import { useMutation, useQuery } from "@tanstack/react-query";

function TodoList() {
  const searchRef = useRef();

  // 쿼리 스트링 정보를 읽어 오기 / 설정하기
  // /list?keyword=환승&page=3 => new URLSearchParams('keyword=환승&page=3')
  const [searchParams, setSearchParams] = useSearchParams();

  const params = {
    keyword: searchParams.get("keyword") || "",
    page: searchParams.get("page") || 1,
    limit: 5,
  };

  // axios 인스턴스
  const axios = useAxiosInstance();

  // const [data, setData] = useState();

  // // 마운트 직후 뿐만 아니라 할 일 삭제 후에도 목록 업데이트
  // const fetchList = async () => {
  //   const res = await axios.get("/todolist", { params: params });
  //   setData(res.data);
  // };

  // // 마운트 직후 목록 로드
  // useEffect(() => {
  //   fetchList();
  // }, [searchParams]);

  const { data, refetch } = useQuery({
    queryKey: ["할일목록을 조회하는 쿼리", params],
    queryFn: () => axios.get("/todolist", { params: params }),
    select: (res) => res.data,
    staleTime: 1000 * 60, // 캐시가 fresh에서 stale 상태로 전환되는 데 걸리는 시간 (fresh 상태가 유지되는 시간). 기본값은 0. 동일한 쿼리가 실행되면 일단 stale이 된 캐시를 먼저 출력한 뒤에, 서버에 새로운 데이터를 요청하고 새로운 데이터가 도착하면 출력함.
    gcTime: 1000 * 60 * 5, // 캐시된 데이터가 얼마 동안 사용되지 않으면 제거할지
  });

  // 삭제 작업
  // const handleDelete = async (_id) => {
  //   try {
  //     // API 서버에 삭제 요청
  //     await axios.delete(`/todolist/${_id}`);
  //     alert("할일이 삭제 되었습니다.");

  //     // 목록을 다시 조회
  //     refetch();
  //   } catch (err) {
  //     console.error(err);
  //     alert("할일 삭제에 실패했습니다.");
  //   }
  // };

  const deleteItem = useMutation({
    mutationFn: (_id) => {
      axios.delete(`/todolist/${_id}`);
    },
    onSuccess: () => {
      alert("할일이 삭제 되었습니다.");
      // 목록을 다시 조회
      refetch();
    },
    onError: (err) => {
      console.error(err);
      alert("할일 삭제에 실패했습니다.");
    },
  });

  const itemList = data?.items.map((item) => (
    <TodoListItem
      key={item._id}
      item={item}
      handleDelete={() => deleteItem.mutate(item._id)}
    />
  ));

  // 검색
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams(new URLSearchParams(`keyword=${searchRef.current.value}`));
  };

  return (
    <div id="main">
      <h2>할일 목록</h2>
      <div className="todo">
        <Link to="/list/add">추가</Link>
        <br />
        <form className="search" onSubmit={handleSearch}>
          <input
            type="text"
            autoFocus
            defaultValue={params.keyword}
            ref={searchRef}
          />
          <button type="submit">검색</button>
        </form>
        <ul className="todolist">{itemList}</ul>
      </div>

      {data && (
        <Pagination
          totalPages={data.pagination.totalPages}
          current={data.pagination.page}
        />
      )}
    </div>
  );
}

export default TodoList;
