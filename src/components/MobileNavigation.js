import { Popover } from "@headlessui/react";
import { useState } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const MobileNavigation = ({ navigation }) => {
  const [openSubMenus, setOpenSubMenus] = useState({});
  const navigate = useNavigate();

  const handleSubMenuToggle = (index) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleLinkClick = (href, close) => {
    close();
    navigate(href);
  };

  return (
    <>
      <Popover className="lg:hidden z-20">
        {({ open, close }) => (
          <>
            <Popover.Button
              className="relative z-10 inline-flex bg-slate-900 p-[6px] rounded text-white items-center text-slate-900"
              aria-label="Toggle Navigation"
            >
              {open ? <X /> : <Menu />}
            </Popover.Button>
            <Popover.Panel className="absolute inset-x-0 top-full mt-[13px] flex origin-top flex-col bg-white text-lg text-slate-900 shadow-xl">
              <ul>
                {navigation.map((item, index) => (
                  <li
                    key={index}
                    className="relative px-5 py-2 group transition duration-300"
                  >
                    <button
                      onClick={() => handleLinkClick(item.href, close)}
                      className="text-left w-full"
                    >
                      {item.name}
                    </button>
                    {item.submenu && (
                      <span
                        onClick={() => handleSubMenuToggle(index)}
                        className="absolute top-2 right-[20px] text-xl cursor-pointer"
                      >
                        {!openSubMenus[index] ? (
                          <ChevronDown />
                        ) : (
                          <ChevronUp />
                        )}
                      </span>
                    )}
                    {item.submenu && (
                      <>
                        <ul
                          className={`z-40 top-full w-full bg-white shadow-2xl p-2 border border-gray-200 ${
                            !openSubMenus[index] ? "hidden" : "mt-3"
                          }`}
                        >
                          {item.submenu.map((subItem, subIndex) => (
                            <li
                              key={subIndex}
                              className={`${
                                subIndex !== item.submenu.length - 1
                                  ? "border-b pb-1"
                                  : ""
                              }`}
                            >
                              <button
                                onClick={() =>
                                  handleLinkClick(subItem.href, close)
                                }
                                className="text-left w-full"
                              >
                                {subItem.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </>
  );
};

export default MobileNavigation;
