import axios from "axios";
import { useEffect, useState } from "react";
import EmptyCardSkeleton from "./EmptyCardSkeleton";
import postImg from "../assets/images/devops.jpg";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  ArrowRightIcon,
} from "@heroicons/react/20/solid";
import EditDataModal from "./EditDataModal";

const HomeComponent = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    key: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(function (response) {
        const responseObject = response.data.map((item) => {
          return {
            key: item.id,
            name: item.title ? item.title : item.name,
            description: item.body ? item.body : item.email,
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

  const handleEdit = (item) => {
    setIsEditing(true);
    setCurrentItem(item);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updatedData = apiData.map((item) =>
      item.key === currentItem.key ? currentItem : item
    );
    setApiData(updatedData);
    setIsEditing(false);
    setCurrentItem({ key: "", name: "", description: "" });
  };

  return (
    <>
      <div className="container mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 mb-10">
            <EmptyCardSkeleton count={12} />
          </div>
        ) : (
          <>
            <EditDataModal
              handleSave={handleSave}
              currentItem={currentItem}
              setCurrentItem={setCurrentItem}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 mb-10">
              {apiData.map((singleRecord) => (
                <div
                  key={singleRecord.key}
                  className="flex flex-col bg-white group shadow-[0_4px_25px_rgba(56,75,255,0.15)] transform relative overflow-hidden transition delay-150 duration-200 ease-in-out"
                >
                  <div className="absolute top-0 w-full h-1 right-0 bg-[#FF3600]" />
                  <Menu
                    as="div"
                    className="absolute right-2 top-2 inline-block text-left"
                  >
                    <div>
                      <MenuButton className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        <EllipsisVerticalIcon
                          aria-hidden="true"
                          className="-mr-1 h-5 w-5 text-gray-400"
                        />
                      </MenuButton>
                    </div>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-20 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <div className="py-1">
                        <MenuItem>
                          <button
                            onClick={() => handleEdit(singleRecord)}
                            className="w-full text-left block px-2 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                          >
                            Edit
                          </button>
                        </MenuItem>
                      </div>

                      <div className="py-1">
                        <MenuItem>
                          <button
                            onClick={() => handleDelete(singleRecord.key)}
                            className="w-full text-left text-red-600 px-2"
                          >
                            Delete
                          </button>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Menu>
                  <div className="w-full p-3 h-[250px] mb-2 flex justify-center group-hover:border-white">
                    <img
                      className="object-cover"
                      src={postImg}
                      alt="post banner"
                    />
                  </div>
                  <div className="text p-4 mb-20">
                    <div className="text-xl font-oswald font-semibold text-slate-900 xl:text-lg">
                      <Link
                        className="capitalize mb-2 block"
                        to={`/post/${singleRecord.key}`}
                      >
                        {singleRecord.name}
                      </Link>
                    </div>
                    <div className="flex justify-center flex-col group-hover:text-black transition delay-150 duration-200 ease-in-out">
                      {singleRecord.description}
                    </div>
                  </div>
                  <div className="flex border-t gap-5 justify-between absolute bottom-0 w-full p-4 right-0">
                    <Link
                      to={`/post/${singleRecord.key}`}
                      className="gap-2 w-full flex items-center font-medium text-[#FF3600]"
                    >
                      View Detail <ArrowRightIcon className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HomeComponent;
