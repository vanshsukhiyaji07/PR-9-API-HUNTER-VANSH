import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async ({page = 1,limit = 10}) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`);
    const total = parseInt(response.headers["x-total-count"] || "100");
    return { posts: response.data, total };
});

export const fetchPostsById = createAsyncThunk("posts/fetchPostsById", async (id) => {
    const [postresponse, commentsresponse] = await Promise.all([
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`),
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    ]);
    return {
        ...postresponse.data,
        Comments: commentsresponse.data,
    };
});

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        data:[],
        currentPost : null,
        status: "idle",
        error : null,
        search:"",
        currentPage:1,
        limit:10,
        total:0,
        filters:{
            userId:null,
        },
    },
    reducers: {
        setCurrentPage(state,action){
            state.currentPage = action.payload;
        },
        setSearch(state,action){
            state.search = action.payload;
            state.currentPage = 1;
        },
        setFilters(state,action){
            state.filters ={...state.filters,...action.payload};
            state.currentPage = 1;
        },
        clearFilters(state){
            state.filters = {userId:null};
            state.currentPage = 1;
            state.search = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload.posts;
                state.total = action.payload.total;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchPostsById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPostsById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.currentPost = action.payload;
            })
            .addCase(fetchPostsById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },

});

export const {setCurrentPage,setSearch,setFilters,clearFilters} = postsSlice.actions;
export default postsSlice.reducer;
