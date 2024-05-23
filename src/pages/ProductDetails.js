import summaryApi from "common";
import RecommendProduct from "components/RecommendProduct";
import addToCart from "helpers/addTocart";
import displayCurrency from "helpers/displayCurrency";
import fetchUserCartItem from "helpers/fetchUserCartItemCount";
import React, { useCallback, useEffect, useState } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setCartItem } from "store/slices/userCartItemCount";

const ProductDetails = () => {
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);
  const productImage = new Array(4).fill(null);
  const [currentImage, setCurrentImage] = useState("");
  const [zoomImage, setZoomImage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [zoomImageCordinates, setZoomImageCordinates] = useState({
    x: 0,
    y: 0,
  });
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const fetchProductDetail = async () => {
    setLoading(true);
    const fetchApi = await fetch(summaryApi.productDetail.url, {
      method: summaryApi.productDetail.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
      }),
    });
    const dataResponse = await fetchApi.json();
    setData(dataResponse.data);
    setCurrentImage(dataResponse?.data.productImage[0]);
    setLoading(false);
  };
  useEffect(() => {
    window.scrollTo(0,0)
    fetchProductDetail();
  }, [productId]);

  const onMouseEnterImage = (imgUrl) => {
    setCurrentImage(imgUrl);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageCordinates({
        x,
        y,
      });
    },
    [zoomImageCordinates]
  );

  const handleAddToCart = async (e,id) =>{
    await addToCart(e,id);
    const fetchCartItemCount = await fetchUserCartItem();
    if(!fetchCartItemCount.err){
      dispatch(setCartItem(fetchCartItemCount.data));
    }
  }
  const handleBuy = async (e,id) =>{
    await addToCart(e,id);
    const fetchCartItemCount = await fetchUserCartItem();
    if(!fetchCartItemCount.err){
      dispatch(setCartItem(fetchCartItemCount.data));
    }
    navigate('/my-cart')
  }
  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* Product Image */}
        <div className="h-96 flex flex-col items-center lg:flex-row-reverse gap-4">
          {loading ? (
            <div className="h-[280px] w-[280px] md:w-80 md:h-80 lg:h-96 lg:w-96 bg-slate-200 "></div>
          ) : (
            <div className="h-[280px] w-[280px] md:w-80 md:h-80 lg:h-96 lg:w-96 bg-slate-200 relative">
              <img
                onMouseMove={handleZoomImage}
                onMouseLeave={() => setZoomImage(false)}
                src={currentImage}
                alt=""
                className="w-full h-full mix-blend-multiply object-scale-down cursor-pointer"
              />
              {zoomImage && (
                <div className="hidden lg:block min-w-[450px] min-h-[400px] bg-slate-200 rounded p-1 absolute top-0 -right-[calc(100%+80px)] overflow-hidden">
                  <div
                    className="w-full h-full min-h-[400px] min-w-[450px] max-w-[450px] mix-blend-multiply scale-130"
                    style={{
                      backgroundImage: `url(${currentImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: `${zoomImageCordinates.x * 100}% ${
                        zoomImageCordinates.y * 100
                      }%`,
                    }}
                  ></div>
                </div>
              )}
            </div>
          )}

          <div className=" h-fit lg:h-full">
            {loading ? (
              <>
                <div className="flex gap-2 lg:flex-col overflow-scroll noScrollbar h-full">
                  {productImage?.map((el, index) => (
                    <div
                      key={"loading" + index}
                      className="h-20 w-20 rounded bg-slate-200 animate-pulse"
                    ></div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="max-w-[90vw] sm:w-full flex gap-2 flex-nowrap lg:flex-col overflow-scroll noScrollbar h-full">
                  {data?.productImage?.map((imageUrl, index) => (
                    <div
                      onMouseEnter={() => onMouseEnterImage(imageUrl)}
                      onClick={() => onMouseEnterImage(imageUrl)}
                      key={imageUrl._id + "image" + index}
                      className="min-h-20 min-w-20 max-h-20 max-w-20 rounded bg-slate-200 p-1 cursor-pointer"
                    >
                      <img
                        src={imageUrl}
                        alt=""
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Product detail */}
        {loading ? (
          <div className="flex flex-col gap-1 w-full">
            <p className="bg-slate-200 w-full h-6 lg:h-8 rounded animate-pulse"></p>
            <h2 className="bg-slate-200 w-full h-6 lg:h-8 rounded animate-pulse"></h2>
            <p className="bg-slate-200 w-full h-6 lg:h-8 rounded animate-pulse"></p>

            <div className="bg-slate-200 w-full h-6 lg:h-8 rounded animate-pulse"></div>

            <div className="flex items-center gap-2 lg:gap-3 text-2xl lg:text-3xl my-1 font-medium">
              <p className="bg-slate-200 w-full h-6 lg:h-8 rounded animate-pulse"></p>
              <p className="bg-slate-200 w-full h-6 lg:h-8 rounded animate-pulse "></p>
            </div>
            <div className="flex items-center gap-2 my-2">
              <button className="bg-slate-200 w-full h-6 lg:h-8 rounded animate-pulse "></button>
              <button className="bg-slate-200 w-full h-6 lg:h-8 rounded animate-pulse"></button>
            </div>
            <div>
              <p className="bg-slate-200 w-full h-6 lg:h-8 rounded animate-pulse">
                {" "}
              </p>
              <p className="bg-slate-200 w-full h-20 rounded animate-pulse"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1 max-h-[400px] overflow-y-scroll noScrollbar ">
            <p className="bg-red-200 text-red-600 px-2 rounded-full w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              {data?.productName}
            </h2>
            <p className="text-slate-500 capitalize">{data?.category}</p>

            <div className="flex gap-1 text-xl lg:text-2xl text-red-600">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>

            <div className="flex items-center gap-2 lg:gap-3 text-2xl lg:text-3xl my-1 font-medium">
              <p className="text-red-600 ">
                {displayCurrency(data?.sellingPrice)}
              </p>
              <p className="text-slate-500 line-through ">
                {displayCurrency(data?.price)}
              </p>
            </div>
            <div className="flex items-center gap-2 my-2">
              <button className="border-2 rounded border-red-600 px-3 py-1 min-w-[120px] text-red-600 font-medium hover:text-white hover:bg-red-600 " onClick={(e)=>handleBuy(e,data?._id)}>
                Buy
              </button>
              <button className="border-2 rounded border-red-600 px-3 py-1 min-w-[120px] text-white font-medium bg-red-600 hover:text-red-600 hover:bg-white " onClick={(e)=>handleAddToCart(e,data?._id)}>
                Add to cart
              </button>
            </div>
            <div>
              <p className="text-slate-600 font-medium my-1">Description : </p>
              <p className="text-base lg:text-md font-normal">
                {data?.description}
              </p>
            </div>
          </div>
        )}
      </div>

      {data.category &&(
        <RecommendProduct category={data.category} heading={"Recommended Products"}/>
      )}
    </div>
  );
};

export default ProductDetails;
