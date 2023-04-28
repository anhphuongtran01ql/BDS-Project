import React, { useState } from "react";
import {
  fetchAllPosts,
  getTotalPost,
} from "../../../Services/Post/PostServices";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../Layout/Loading";
import { Box, Pagination } from "@mui/material";
import PostCard from "./card";

function ListPost() {
  const PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  let paramQuery = {
    page: currentPage,
    pageSize: PER_PAGE,
  };

  const { data: totalData } = useQuery({
    queryKey: ["total"],
    queryFn: () => getTotalPost(),
  });

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["posts", paramQuery],
    queryFn: () => fetchAllPosts(paramQuery),
  });

  let countPage = Math.ceil(totalData / PER_PAGE);

  const handleChange = (event, value) => {
    setCurrentPage(value);
    queryClient.invalidateQueries({ queryKey: ["posts", paramQuery] });
  };

  return (
    <>
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        <Box>
          {data &&
            data.map((item, index) => {
              return <PostCard item={item} key={index} />;
            })}
          {totalData >= PER_PAGE && (
            <Pagination
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
              size="small"
              color="primary"
              count={countPage}
              page={currentPage}
              onChange={handleChange}
            />
          )}
        </Box>
      )}
    </>
  );
}

export default ListPost;
