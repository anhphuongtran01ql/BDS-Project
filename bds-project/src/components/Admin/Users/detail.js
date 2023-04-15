import { Button } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { BiDetail } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "../../../Services/User/UserServices";

export function UserInfo() {
  const { userId } = useParams();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserById(userId),
  });
  // console.log("data", data);
  return (
    <>
      {isFetching || isLoading ? (
        <>Loading</>
      ) : (
        <>
          <h1>Info</h1>
        </>
      )}
    </>
  );
}

function UserDetailInfo({ userId }) {
  return (
    <>
      <Link to={`/admin/list-users/${userId}`}>
        <Button>
          <BiDetail size={18} style={{ marginRight: 5 }} />
        </Button>
      </Link>
    </>
  );
}

export default UserDetailInfo;
