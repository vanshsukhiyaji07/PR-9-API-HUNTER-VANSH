import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import Pagination from "./Pagination";
import Loading from "../components/Loading"
import{
    fetchPosts,
    setSearch,
    setCurrentPage,
    setFilters,
    clearFilters
} from "../features/postslice";

const List = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const{
        data,
        status,
        error,
        search,
        currentPage,
        limit,
        total,
        filters,
    }= useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(fetchPosts({page:currentPage,limit:limit}));
    }, [dispatch,currentPage,limit]);

    const handlesearch = (e) => {
        dispatch(setSearch(e.target.value));
    };

    const userFilter = (userId) => {
        dispatch(setFilters({userId}));
    }

    const clearFilter = () => {
        dispatch(clearFilters());
    }

    const postclick = (postId) => {
        navigate(`/post/${postId}`);
    };

    if(status === "loading") {
        return <Loading/>
    }

    if (status === "failed") {
        return (
            <div>
                <h2>{error}</h2>
                <button onClick={()=> dispatch(fetchPosts({page: 1,limit : limit}))}>Pleace Try Again</button>
            </div>
        );
    }

    const filteredPosts = data.filter((post) => {
        const matchSearch = post.title.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filters.userId === null || post.userId === filters.userId;
        return matchSearch && matchFilter;
    });

    return (
        <div className="container mt-4">
          
            <div className="row mb-4 align-items-center">
             
                <div className="col-md-6 mb-3 mb-md-0">
                    <div className="input-group">
                        <input
                            type="text"
                            value={search}
                            onChange={handlesearch}
                            placeholder="Search posts..."
                            className="form-control"
                        />
                        {search && (
                            <button
                                onClick={() => dispatch(setSearch(""))}
                                className="btn btn-outline-secondary"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="input-group">
                        <select 
                            value={filters.userId || ""} 
                            onChange={(e) => userFilter(e.target.value ? Number(e.target.value) : null)}
                            className="form-select"
                        >
                            <option value="">Filter by User</option>
                            {[...Array(10)].map((_, index) => (
                                <option key={index + 1} value={index + 1}>
                                    User {index + 1}
                                </option>
                            ))}
                        </select>
                        {(filters.userId || search) && (
                            <button 
                                onClick={clearFilter} 
                                className="btn btn-danger"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>
            </div>

           
            <div className="row">
                {filteredPosts.map((post) => (
                    <div className="col-md-6 col-lg-4 mb-4" key={post.id}>
                        <div 
                            className="card h-100 shadow-sm"
                            onClick={() => postclick(post.userId)}
                            style={{ cursor: "pointer" }}
                        >
                            <div className="card-body">
                            <h2 className="text-muted">User ID: {post.userId}</h2>
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.body}</p>
                                
                                <button 
                                    onClick={() => {

                                        postclick(post.userId);
                                    }} 
                                    className="btn btn-primary"
                                >
                                    Read More
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

           
            <div className="mt-4 d-flex justify-content-center">
                <Pagination
                    currentPage={currentPage}
                    totalPosts={total}
                    postsPerPage={limit}
                    setCurrentPage={(page) => dispatch(setCurrentPage(page))}
                />
            </div>
        </div>
    )
}

export default List;