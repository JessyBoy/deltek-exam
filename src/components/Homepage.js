import React, { useState } from "react";
import _ from "lodash";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addPosts, deletePost } from "../redux/ducks/posts";

//Components
import Search from "./Search";
import TabList from "./TabList";
import AddList from "./AddList";
import PaginationList from "./PaginationList";

function HomePage({ history }) {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPage, setRowsPage] = useState(2);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const posts = useSelector((state) => state.post.posts);

  const deleteList = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        Swal.fire("Post Deleted", {
          icon: "success",
        });
        dispatch(deletePost(id));
      }
    });
  };

  const onChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPage = (e) => {
    setRowsPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else return items.filter((x) => x.name.includes(target.value));
      },
    });
  };

  function stableSort(array, comparator) {
    let stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    let pos1 = a[orderBy];
    let pos2 = b[orderBy];
    if (orderBy === "date") {
      pos1 = new Date(pos1);
      pos2 = new Date(pos2);
    }
    if (pos2 < pos1) {
      return -1;
    }
    if (pos2 > pos1) {
      return 1;
    }
    return 0;
  }

  const postsSorted = () => {
    // console.log(order);
    // console.log(orderBy);
    return stableSort(filterFn.fn(posts), getComparator(order, orderBy)).slice(
      page * rowsPage,
      page * rowsPage + rowsPage
    );
  };

  const onSubmit = (data, e) => {
    if (_.find(posts, { name: data.name })) {
      Swal.fire({
        title: "Error",
        text: "Post already exists",
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Success",
        text: "Post successfully added",
        icon: "success",
      }).then((willAdd) => {
        if (willAdd) {
          dispatch(
            addPosts({
              name: data.name,
              description: data.description,
              date: Date.now(),
            })
          );
        }
      });
    }
    e.target.reset();
  };

  return (
    <>
      <div className="my-8 border border-black">
        <p className="w-full p-5 text-2xl text-center">Add Contact</p>
      </div>
      <div>
        <AddList
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          errors={errors}
        />
      </div>
      <div className="my-8 border border-black">
        <p className="w-full p-5 text-2xl text-center">Contact Lists</p>
      </div>
      <div>
        <div className="flex justify-end">
          <Search handleSearch={handleSearch} />
        </div>
        <br />
        {/* Show List */}
        <div>
          <TabList
            history={history}
            filteredList={postsSorted()}
            deleteList={deleteList}
            order={order}
            orderBy={orderBy}
            setOrder={setOrder}
            setOrderBy={setOrderBy}
          />
        </div>
        <div>
          <PaginationList
            component="div"
            rowsPerPageOptions={[2, 3]}
            rowspage={rowsPage}
            page={page}
            count={posts.length}
            handleChange={onChangePage}
            changeRowsPerPage={handleRowsPerPage}
          />
        </div>
      </div>
    </>
  );
}

export default HomePage;
