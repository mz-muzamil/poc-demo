import { Link } from "react-router-dom";
import MobileNavigation from "./MobileNavigation";
import logo from "../assets/images/logo.png";
import { useEffect, useState } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const navigation = [
    { name: "Home", href: "/" },
    {
      name: "Services",
      href: "/services",
      submenu: [
        {
          name: "Service One",
          href: "/service-one",
        },
        {
          name: "Service two",
          href: "/service-two",
        },
      ],
    },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "/contact" },
  ];
  return (
    <>
      <header
        className={`header bg-white shadow-[0_4px_20px_rgba(18,96,254,0.12)] border-b border-gray-200 py-3 lg:py-0 xl:py-0 ${
          isScrolled &&
          "fixed top-0 w-full z-20 animate__animated animate__slideInDown"
        }`}
      >
        <div className="xl:container lg:mx-auto px-6 flex relative">
          <div className="flex w-full lg:h-20 items-center">
            <div className="flex w-full items-center justify-between">
              <div className="flex-shrink-0">
                <Link to="/">
                  <img src={logo} alt="logo" />
                </Link>
              </div>
              <div className="hidden lg:block ml-10">
                <div className="navigation flex items-baseline space-x-4 ml-auto">
                  <ul className="flex">
                    {navigation.map((item, index) => (
                      <li
                        key={index}
                        className="relative px-5 py-9 group transition duration-300"
                      >
                        <Link
                          to={item.href}
                          className={classNames(
                            "font-semibold uppercase text-base transition delay-75 duration-150 ease-in-out"
                          )}
                        >
                          {item.name}
                        </Link>

                        {item.submenu && (
                          <>
                            <ul className="absolute z-40 top-full w-[350px] bg-white shadow-2xl p-4 border border-gray-200 opacity-0 invisible transition-all duration-600 transform translate-y-2 group-hover:-translate-y-2 group-hover:opacity-100 group-hover:visible">
                              {item.submenu.map((subItem, subIndex) => (
                                <li
                                  key={subIndex}
                                  className={`py-1 ${
                                    subIndex !== item.submenu.length - 1
                                      ? "border-b pb-3"
                                      : ""
                                  }`}
                                >
                                  <Link to={subItem.href}>{subItem.name}</Link>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <MobileNavigation navigation={navigation} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
