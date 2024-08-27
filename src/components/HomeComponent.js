import axios from "axios";
import { useEffect, useState } from "react";
import EmptyCardSkeleton from "./EmptyCardSkeleton";
import postImg from "../assets/images/devops.jpg";
import { Link } from "react-router-dom";

const HomeComponent = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(function (response) {
        const responseObject = response.data.map((item) => {
          return {
            key: item.id,
            name: item.title,
            description: item.body,
          };
        });
        setApiData(responseObject);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    const filteredData = apiData.filter((item) => item.key !== id);
    setApiData(filteredData);
  };

  return (
    <>
      <div className="container mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-3 mt-10 mb-10">
            <EmptyCardSkeleton count={9} />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-3 mt-10 mb-10">
            {apiData.map((singleRecord) => (
              <div
                key={singleRecord.key}
                className="flex flex-col justify-center bg-white group shadow-[0_4px_25px_rgba(56,75,255,0.15)] transform hover:-translate-y-1 relative overflow-hidden transition delay-150 duration-200 ease-in-out"
              >
                <div className="absolute top-0 w-full h-1 right-0 bg-slate-900"></div>
                <div className="w-full h-[250px] bg-slate-900/10 mb-5 flex justify-center group-hover:border-white">
                  <img src={postImg} alt="post banner" />
                </div>
                <div className="text p-8">
                  <div className="mb-3 mt-3 text-xl font-oswald font-semibold text-slate-900 xl:text-xl">
                    <Link to={`/post/${singleRecord.key}`}>
                      {singleRecord.name}
                    </Link>
                  </div>
                  <div className="flex justify-center flex-col group-hover:text-black transition delay-150 duration-200 ease-in-out">
                    <p>{singleRecord.description}</p>
                  </div>
                  <div className="flex gap-5 justify-between">
                    <Link
                      to={`/post/${singleRecord.key}`}
                      className="mt-5 flex bg-slate-900 text-white px-2 py-1 rounded justify-center"
                    >
                      View Detail
                    </Link>
                    <button
                      onClick={() => handleDelete(singleRecord.key)}
                      className="mt-5 flex bg-red-600 text-white px-2 py-1 rounded justify-center"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HomeComponent;
