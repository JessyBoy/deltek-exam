const ADD_POSTS = "addPosts";
const EDIT_POST = "editPost";
const DELETE_POST = "deletePost";
const SELECTED_POST = "selectedPost";

export const addPosts = (data) => ({
  type: ADD_POSTS,
  payload: data,
});

export const editPost = (data, id) => ({
  type: EDIT_POST,
  payload: {
    data: data,
    id: id,
  },
});

export const deletePost = (id) => ({
  type: DELETE_POST,
  payload: id,
});

export const selectedPost = (data) => ({
  type: SELECTED_POST,
  payload: data,
});

const initialState = {
  posts: [
    {
      id: 1,
      name: "playing",
      description: "it is good to play outside on a sunny season",
      date: "January 20, 2021 10:00 pm",
    },
    {
      id: 2,
      name: "reading",
      description: "reading is always the key to greater knowledge",
      date: "December 20, 2020 6:00 pm",
    },
    {
      id: 3,
      name: "coding",
      description:
        "developing softwares are to hard if you don't have patience and enough understanding",
      date: "November 20, 2020 2:00 pm",
    },
    {
      id: 4,
      name: "skating",
      description:
        "developing softwares are to hard if you don't have patience and enough understanding",
      date: "October 20, 2020 12:00 pm",
    },
    {
      id: 5,
      name: "Buying",
      description:
        "developing softwares are to hard if you don't have patience and enough understanding",
      date: "September 20, 2020 11:00 am",
    },
  ],
  selectedPost: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POSTS: {
      action.payload.id =
        state.posts.length < 1 ? 1 : state.posts[state.posts.length - 1].id + 1;

      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    }
    case EDIT_POST: {
      const posts = state.posts.map((post) => {
        console.log("posts", post);
        console.log("payload", action.payload);

        if (post.id === parseInt(action.payload.id)) {
          post.name = action.payload.data.name;
          post.description = action.payload.data.description;
        }
        return post;
      });
      console.log("posts_list", posts);
      return {
        ...state,
        posts: posts,
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((list) => list.id !== action.payload),
      };
    }
    case SELECTED_POST: {
      return {
        ...state,
        selectedPost: action.payload,
      };
    }
    default:
      return initialState;
  }
};

export default reducer;
