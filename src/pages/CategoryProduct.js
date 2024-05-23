import summaryApi from "common";
import SearchedProductCard from "components/SearchedProductCard";
import productCategory from "helpers/productCategory";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

const CategoryProduct = () => {
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListArray = urlSearch.getAll("category");

  const [showAside,setShowAside] =useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const urlCategoryListObj = {};

  urlCategoryListArray.forEach((el) => {
    urlCategoryListObj[el] = true;
  });

  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [selectCategory, setSelectCategory] = useState(urlCategoryListObj);

  const handleCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };
  const fetchProduct = async () => {
    setLoading(true);
    const request = await fetch(summaryApi.filterProduct.url, {
      method: summaryApi.filterProduct.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });
    const response = await request.json();
    setData(response?.data || []);
    setLoading(false);

  };

  useEffect(() => {
    console.log(filterCategoryList)
    fetchProduct();
  }, [filterCategoryList]);

  useEffect(() => {
    const categoryArray = Object.keys(selectCategory)
      .map((category) => {
        if (selectCategory[category]) {
          return category;
        }
        return null;
      })
      .filter((el) => el);

    setFilterCategoryList(categoryArray);

    //format url
    const formaturl = categoryArray.map((el, index) => {
      if (categoryArray.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });

    navigate("/product-category?" + formaturl.join(""));
  }, [selectCategory]);

  const handleSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);
    if (value === 'asc') {
      setData(prev => prev.sort((a, b) => a.sellingPrice - b.sellingPrice))
    }
    if (value === 'dsc') {
      setData(prev => prev.sort((a, b) => b.sellingPrice - a.sellingPrice))
    }
  }

  useEffect(() => {

  }, [sortBy])
  return (
    <div className="container mx-auto p-4">
      {/* Desktop */}
      <div className="flex items-start w-full h-full min-h-[calc(100vh-90px)] relative">
        {/* Left */}
        <button className='block lg:hidden text-2xl font-semibold my-4 hover:text-red-500' onClick={() => setShowAside(prev => !prev)}><GiHamburgerMenu /></button>
        <div style={showAside ? {display:'inline-block',position:'absolute',top:'0px',left:'0px',zIndex:'10'} : {}} className={`hidden lg:inline-block bg-white max-h-[calc(100vh-120px)] w-full max-w-[200px] p-2 overflow-y-scroll noScrollbar`}>
          {/* SortBy */}
          <button className="hover:text-red-500 text-2xl absolute top-3 right-3 inline-block lg:hidden" onClick={() => setShowAside(prev => !prev)}>
            <IoMdClose />
          </button>
          <div className="">
            <h2 className="text-base uppercase font-medium text-slate-500 pb-1 border-b border-slate-300">
              Sort by
            </h2>
            <form action="" className="flex flex-col gap-2 py-2 text-sm">
              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" checked={sortBy === 'asc'} value={'asc'} onChange={handleSortBy} />
                <label>Price - Low to High</label>
              </div>

              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" checked={sortBy === 'dsc'} value={'dsc'} onChange={handleSortBy} />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* Category */}
          <div className="">
            <h2 className="text-base uppercase font-medium text-slate-500 pb-1 border-b border-slate-300">
              Category
            </h2>
            <form action="" className="flex flex-col gap-2 py-2 text-sm">
              {productCategory.map((category, index) => (
                <div
                  className="flex items-center gap-3"
                  key={category.label + index}
                >
                  <input
                    type="checkbox"
                    name={"category"}
                    id={category.value}
                    value={category.value}
                    onChange={handleCategory}
                    checked={selectCategory[category?.value]}
                  />
                  <label htmlFor={category.value}>{category.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Right - Products */}
        <div className=" px-4 py-2 ">
          <p className="font-medium text-lg my-2 text-slate-800">
            Results : {data.length}
          </p>
          <div className="max-h-[calc(100vh-120px)] overflow-y-scroll noScrollbar">
            {data.length !== 0 && !loading ? (
              <SearchedProductCard data={data} loading={loading} />
            ) : (
              <h2 className="items-center text-xl font-medium">Loading...</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
