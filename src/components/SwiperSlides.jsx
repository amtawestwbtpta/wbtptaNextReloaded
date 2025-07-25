"use client";
import React, { useState, useEffect, useCallback } from "react";
import ImageViewer from "react-simple-image-viewer";
import { firestore } from "../context/FirebaseContext";
import { collection, getDocs, query } from "firebase/firestore";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectCube,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-cube";
import Image from "next/image";
import { useGlobalContext } from "../context/Store";
const SwiperSlides = () => {
  const { slideState, setSlideState, slideUpdateTime, setSlideUpdateTime } =
    useGlobalContext();
  const [data, setData] = useState([]);
  const [showSlide, setShowSlide] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [images, setImages] = useState([]);
  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);
  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  const getSlides = async () => {
    let data = [];
    try {
      const q = query(collection(firestore, "slides"));
      const querySnapshot = await getDocs(q);
      data = querySnapshot.docs.map((doc) => ({
        // doc.data() is never undefined for query doc snapshots
        ...doc.data(),
        id: doc.id,
      }));
    } catch (error) {
      console.error("Error fetching slides data: ", error);
      const url = `/api/getSlides`;
      const response = await axios.post(url);
      data = response.data.data;
    }
    let imageUrls = [];
    data.map((el) => imageUrls.push(el.url));
    setImages(imageUrls);
    setData(data);
    setSlideState(data);
    setShowSlide(true);
  };
  const getData = async () => {
    const difference = (slideUpdateTime - Date.now()) / 1000 / 60 / 15;
    if (difference >= 1 || slideState.length == 0) {
      setSlideUpdateTime(Date.now());
      getSlides();
    } else {
      setData(slideState);
      setShowSlide(true);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container-fluid">
      {showSlide ? (
        <Swiper
          modules={[
            Navigation,
            Pagination,
            Scrollbar,
            A11y,
            EffectCube,
            Autoplay,
          ]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          effect={"cube"}
          cubeEffect={{
            slideShadows: true,
            shadowOffset: 5,
            shadowScale: 0.94,
          }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="mySwiper"
        >
          {data.map((el, ind) => {
            return (
              <SwiperSlide key={ind}>
                <div
                  className="title p-2"
                  style={{
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: "#1159cf",
                    fontFamily: "Times",
                  }}
                >
                  {window.screen.width < 780 ? (
                    <h4 className="text-white text-center">{el.title}</h4>
                  ) : (
                    <h3 className="text-white text-center">{el.title}</h3>
                  )}
                </div>
                <div className="slideImage">
                  <Image
                    src={el.url}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }} // optional
                    alt="slideImages"
                    onClick={() => openImageViewer(ind)}
                  />
                </div>

                <div
                  className="description p-2 mb-3"
                  style={{
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    backgroundColor: "#1159cf",
                    fontFamily: "Times",
                  }}
                >
                  <h6 className="text-success text-white ">{el.description}</h6>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : null}
      {isViewerOpen && (
        <ImageViewer
          src={images}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
    </div>
  );
};

export default SwiperSlides;
