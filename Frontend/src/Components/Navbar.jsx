import React from "react";

function Navbar() {
  const navitem = (
    <>
      <li>
        <a
          href="/"
          className="hover:text-blue-500 hover:border-2 border-blue-500 text-xl font-medium"
        >
          HOME
        </a>
      </li>
      <li>
        <a
          href="/ourcompany"
          className="hover:text-blue-500 hover:border-2 border-blue-500 text-xl font-medium"
        >
          OUR COMPANY
        </a>
      </li>
      <li>
        <a
          href="/ourproducts"
          className="hover:text-blue-500 hover:border-2 border-blue-500 text-xl font-medium"
        >
          OUR PRODUCT
        </a>
      </li>
      <li>
        <a
          href="/contact"
          className="hover:text-blue-500 hover:border-2 border-blue-500 text-xl font-medium"
        >
          CONTACT
        </a>
      </li>
    </>
  );

  return (
    <div className="">
      <div className="navbar bg-base-100 shadow-sm h-16 px-6">
        {/* Left Section */}
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navitem}
            </ul>
          </div>

          {/* Logo */}
          <a href="/">
            <img src="/logo.png" alt="Logo" className="w-28 h-auto" />
          </a>
        </div>

        {/* Center Nav Items (hidden on mobile) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-8">{navitem}</ul>
        </div>

        {/* Right Side (Login Button) */}
        <div className="navbar-end">
          <a
            href="/login"
            className="btn bg-blue-500 text-white hover:bg-blue-600 px-5 rounded-full"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
