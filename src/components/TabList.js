import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectedPost } from "../redux/ducks/posts";
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";

function TabList({
  filteredList,
  deleteList,
  history,
  order,
  orderBy,
  setOrder,
  setOrderBy,
}) {
  const dispatch = useDispatch();
  const onEdit = (el) => {
    dispatch(selectedPost(el));
    history.push(`/edit-post/${el.id}`);
  };
  const handleSort = (cellId) => {
    console.log(orderBy);
    console.log(order);
    let newCellId;
    if (orderBy === "name") {
      newCellId = 2;
    } else if (orderBy === "date") {
      newCellId = 4;
    } else if (orderBy === "id") {
      newCellId = 1;
    }
    const isAsc = cellId === newCellId && order === "asc";
    console.log(cellId === newCellId && order === "asc");
    setOrder(isAsc ? "desc" : "asc");
    let sortBy;
    if (cellId === 2) {
      sortBy = "name";
    } else if (cellId === 4) {
      sortBy = "date";
    } else if (cellId === 1) {
      sortBy = "id";
    }
    setOrderBy(sortBy);
  };

  const headCells = [
    {
      id: 1,
      label: "#ID",
    },
    {
      id: 2,
      label: "Contact Name",
    },
    {
      id: 3,
      label: "Contact Details",
      disableSorting: true,
    },
    {
      id: 4,
      label: "Date Created",
    },
    {
      id: 5,
      label: "Actions",
      disableSorting: true,
    },
  ];
  return (
    <div>
      <table className="w-full border-collapse">
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                {headCell.disableSorting ? (
                  headCell.label
                ) : (
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={() => {
                      handleSort(headCell.id);
                    }}
                  >
                    {headCell.label}
                  </TableSortLabel>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <tbody>
          {filteredList.map((el, index) => {
            return (
              <tr
                key={index}
                className="flex flex-row flex-wrap mb-10 bg-white lg:hover:bg-gray-100 lg:table-row lg:flex-row lg:flex-no-wrap lg:mb-0"
              >
                <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                  {el.id}
                </td>
                <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                  {el.name}
                </td>
                <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                  {el.description > 40
                    ? el.description.substring(0, 40) + "..."
                    : el.description.substring(0, 40) + "..."}
                </td>
                <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                  {moment(el.date).format("MMMM D, YYYY, h:mm a")}
                </td>
                <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                  <Link to={`/view-post/${el.id}`}>
                    <i
                      className="text-yellow-500 fill-current fa fa-eye"
                      aria-hidden="true"
                    ></i>
                  </Link>
                  <button
                    onClick={() => onEdit(el)}
                    className="p-2 focus:outline-none"
                  >
                    <i
                      className="text-green-500 fill-current fa fa-edit"
                      aria-hidden="true"
                    ></i>
                  </button>
                  <button
                    onClick={() => deleteList(el.id)}
                    className="p-2 focus:outline-none"
                  >
                    <i
                      className="text-red-500 fill-current fa fa-times"
                      aria-hidden="true"
                    ></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TabList;
