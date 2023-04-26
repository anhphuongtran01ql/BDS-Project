import * as React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Loading from "../../Layout/Loading";
import { Button } from "@mui/material";
import { fetchAllTypeApartments } from "../../../Services/TypeApartment/TypeApartmentServices";
import EditTypeApartment from "./edit";
import CreateTypeApartment from "./create";

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

export default function ListOfTypeOfApartments() {
  const columns = [
    { id: "id", label: "ID", width: 80, align: "center" },
    { id: "typeOfApartment", label: "Type of Apartment", maxWidth: 400 },
    { label: "" },
  ];

  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["typesApartment"],
    queryFn: () => fetchAllTypeApartments(),
  });

  if (isLoading) {
    return <Loading />;
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
            <Grid
              item
              sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}
            >
              <CreateTypeApartment />
            </Grid>

            <Paper sx={{ margin: "auto", overflow: "auto", maxWidth: 1100 }}>
              {data ? (
                <TableContainer
                  sx={{
                    display: "table",
                    tableLayout: "fixed",
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <StyledTableCell
                            key={column.id}
                            align={column.align}
                            style={{ width: column.width }}
                          >
                            {column.label}
                          </StyledTableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((list, index) => (
                        <StyledTableRow key={list.id}>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            align="center"
                          >
                            {list.id}
                          </StyledTableCell>
                          <StyledTableCell>
                            {list.typeOfApartment}
                          </StyledTableCell>

                          <StyledTableCell align="right">
                            <EditTypeApartment typeId={list.id} />
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography
                  sx={{ my: 5, mx: 2 }}
                  color="text.secondary"
                  align="center"
                >
                  No type of apartment for this system yet
                </Typography>
              )}
            </Paper>
          </Grid>
        </>
      )}
    </>
  );
}
