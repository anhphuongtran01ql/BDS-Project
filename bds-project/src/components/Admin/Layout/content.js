import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllUsers,
  getUserByUsername,
} from "../../../Services/User/UserServices";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import UserDetailInfo from "../Users/detail";
import Loading from "../../Layout/Loading";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Content() {
  const columns = [
    { id: "username", label: "Username" },
    { id: "email", label: "Email" },
    { id: "role", label: "Role" },
    { label: "Detail" },
  ];

  const [search, setSearch] = React.useState("");
  const {
    data: users,
    isLoadingUser,
    isFetchingUser,
  } = useQuery({
    queryKey: ["users", search],
    queryFn: () => getUserByUsername(search),
  });
  const queryClient = useQueryClient();

  const onSearch = (e) => {
    console.log("value", search);
    if (e.keyCode === 13) {
      queryClient.invalidateQueries({ queryKey: ["users", search] });
    }
  };

  // console.log("userscscsc", users);
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchAllUsers(),
  });
  if (isLoading) {
    return <Loading/>;
  }
  if (isError) {
    return <>Error</>;
  }

  return (
    <>
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        <>
          <Grid item>
            {/* <Grid
              item
              sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}
            >
              <Button variant="contained">Add user</Button>
            </Grid> */}
            <AppBar
              position="static"
              color="default"
              elevation={0}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mb: 1,
                borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              }}
            >
              <Toolbar>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <SearchIcon
                      color="inherit"
                      sx={{ display: "block" }}
                      onSearch={onSearch}
                    />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      fullWidth
                      placeholder="Search by name..."
                      InputProps={{
                        disableUnderline: true,
                        sx: { fontSize: "default" },
                      }}
                      variant="standard"
                      onInput={(e) => {
                        setSearch(e.target.value);
                      }}
                      value={search}
                      onKeyDown={onSearch}
                    />
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
            <Paper sx={{ margin: "auto", overflow: "auto" }}>
              {data ? (
                <>
                  <TableContainer
                    sx={{
                      display: "table",
                      tableLayout: "fixed",
                    }}
                  >
                    <Table style={{ minWidth: 600 }}>
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <StyledTableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </StyledTableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((list, index) => (
                          <StyledTableRow key={list.username}>
                            <StyledTableCell component="th" scope="row">
                              {list.username}
                            </StyledTableCell>
                            <StyledTableCell>{list.email}</StyledTableCell>
                            <StyledTableCell>
                              {list.roleList[0].roleName}
                            </StyledTableCell>
                            <StyledTableCell>
                              <UserDetailInfo userId={list.userId} />
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              ) : (
                <Typography
                  sx={{ my: 5, mx: 2 }}
                  color="text.secondary"
                  align="center"
                >
                  No users for this system yet
                </Typography>
              )}
            </Paper>
          </Grid>
        </>
      )}
    </>
  );
}
