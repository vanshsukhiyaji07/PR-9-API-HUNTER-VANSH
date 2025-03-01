import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams , useNavigate } from "react-router-dom";
import { fetchPostsById } from "../features/postslice";
import Loading from "./Loading";
function Details() {
    const {postId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {currentPost,
        status,
        error} = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(fetchPostsById(postId));
    }, [dispatch,postId]);

    if (status === "loading"){
        return <Loading />;
    }

    if (status === "failed"){
        return(
            <div>
                <h2>{error}</h2>
                <button onClick={() => navigate("/")}>Go Back</button>
            </div>
        );
    }

    if (!currentPost){
        return(
            <div>
                <h2>No Post Found</h2>
                <button onClick={() => navigate("/")}>Go Back</button>
            </div>
        );
    }
  return (
    <div className="container mt-4">
          
            <button onClick={() => navigate("/")} className="btn btn-secondary mb-3">
                ← Back
            </button>

            <article className="card shadow p-4 mb-4">
                <h1 className="card-title">{currentPost.title}</h1>
                <p className="card-text">{currentPost.body}</p>
                <span className="badge bg-primary">Post ID: {currentPost.id}</span>
            </article>

            <section>
                <h2 className="mb-3">Comments</h2>
                <div className="row">
                    {currentPost.Comments?.map((comment) => (
                        <div key={comment.id} className="col-md-6 col-lg-4 mb-3">
                            <div className="card h-100 shadow-sm p-3">
                                <h5 className="card-title">{comment.name}</h5>
                                <h6 className="text-muted">{comment.email}</h6>
                                <p className="card-text">{comment.body}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
  )
}

export default Details

