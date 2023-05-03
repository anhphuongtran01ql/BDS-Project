import React, { useState } from "react";
import { fetchAllPostsByUserId } from "../../../Services/Post/PostServices";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../Layout/Loading";
import { Box, Pagination } from "@mui/material";
import Nodata from "../../Layout/Noda";
import { useGetUserInfo } from "../../Auth/Authorization/getUserInfo";
import PostCard from "../../Admin/Post/card";

function ListPostByUserId() {
  const { userId } = useGetUserInfo();
  const PER_PAGE = 24;
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  let paramQuery = {
    page: currentPage,
    pageSize: PER_PAGE,
  };

  //   const { data: totalData } = useQuery({
  //     queryKey: ["total"],
  //     queryFn: () => getTotalPost(),
  //   });

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["posts", paramQuery, userId],
    queryFn: () => fetchAllPostsByUserId(paramQuery, userId),
  });

  //   let countPage = Math.ceil(totalData / PER_PAGE);
  // const handleChange = (event, value) => {
  //   setCurrentPage(value);
  //   queryClient.invalidateQueries({ queryKey: ["posts", paramQuery] });
  // };

  return (
    <>
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        <Box sx={{ margin: "20px" }}>
          {data?.length > 0 ? (
            <>
              {data?.map((item, index) => {
                return <PostCard item={item} key={index} />;
              })}
              {/* {totalData >= PER_PAGE && (
                <Pagination
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "20px",
                  }}
                  size="small"
                  color="primary"
                  count={2}
                  page={currentPage}
                  onChange={handleChange}
                />
              )} */}
            </>
          ) : (
            <Nodata />
          )}
        </Box>
      )}
    </>
  );
}

export default ListPostByUserId;
