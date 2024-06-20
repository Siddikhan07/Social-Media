import React, { useEffect } from "react";
import "./Posts.css";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts } from "../../actions/postAction";
import { useParams } from "react-router-dom";

const Posts = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const { posts, loading } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, [dispatch, user._id]);

  if (!posts) return 'No Posts';
  const filteredPosts = id ? posts.filter((post) => post.userId === id) : posts;

  return (
    <div className="Posts">
      {loading
        ? "Fetching Posts..."
        : filteredPosts.map((post, index) => (
            <Post data={post} key={index} />
          ))}
    </div>
  );
};

export default Posts;
