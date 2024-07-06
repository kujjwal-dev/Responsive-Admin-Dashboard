import { MdOutlineMenu } from "react-icons/md";
import "./CategoryTop.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { SidebarContext } from "../../../context/SidebarContext";


const CategoryTop = () => {
  const { openSidebar } = useContext(SidebarContext);
 

  return (
    <section className="content-area-top">
      <div className="area-top-l">
        <button
          className="sidebar-open-btn"
          type="button"
          onClick={openSidebar}
        >
          <MdOutlineMenu size={24} />
        </button>
        <h2 className="area-top-title">Category</h2>
      </div>
    </section>
  );
};

export default CategoryTop;
