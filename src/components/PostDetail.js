import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import EmptyCardSkeleton from "./EmptyCardSkeleton";
import { MoveLeft } from "lucide-react";

const PostDetail = () => {
  const { id } = useParams();
  const [postDetail, setPostDetail] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        setPostDetail(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <>
        <div className="container mx-auto mt-10">
          <EmptyCardSkeleton count={1} />
        </div>
      </>
    );
  }

  return (
    <div className="container mx-auto mt-10">
      <Link
        className="mb-4 text-slate-900 font-bold flex gap-3 items-ceter"
        to="/"
      >
        <MoveLeft />
        Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-5">{postDetail.title}</h1>
      <p>{postDetail.body}</p>
    </div>
  );
};

export default PostDetail;
