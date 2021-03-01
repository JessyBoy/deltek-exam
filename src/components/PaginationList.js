import React from "react";
import { TablePagination } from "@material-ui/core";

function PaginationList({
  rowsPerPageOptions,
  rowspage,
  page,
  count,
  handleChange,
  changeRowsPerPage,
  component,
}) {
  return (
    <div className="flex justify-end py-4">
      <TablePagination
        component={component}
        rowsPerPageOptions={rowsPerPageOptions}
        page={page}
        rowsPerPage={rowspage}
        count={count}
        onChangePage={handleChange}
        onChangeRowsPerPage={changeRowsPerPage}
      />
    </div>
  );
}

export default PaginationList;
