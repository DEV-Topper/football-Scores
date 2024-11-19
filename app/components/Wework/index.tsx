"use client";
import Slider from "react-slick";
import React, { Component } from "react";
import Image from "next/image";

// CAROUSEL DATA
interface DataType {
  profession: string;
  name: string;
  imgSrc: string;
}

const postData: DataType[] = [
  {
    profession: "Co-founder",
    name: "Nwachukwu Ekene",
    imgSrc: "/images/wework/ekenepic.webp",
  },
  {
    profession: "Co-founder",
    name: "Rufai Ahmed",
    imgSrc: "/images/wework/Rufai.jpeg",
  },
];

// CAROUSEL SETTINGS
export default class MultipleItems extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 2,
      centerMode: true,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
          },
        },
      ],
    };

    return (
      <div className="bg-wework py-32">
        <div className="mx-auto max-w-2xl lg:max-w-7xl sm:py-4 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl sm:text-6xl font-bold text-black my-2">
              We work in several verticals.
            </h3>
            <h3 className="text-4xl sm:text-6xl font-bold text-black opacity-50 my-2">
              We work in several verticals.
            </h3>
            <h3 className="text-4xl sm:text-6xl font-bold text-black opacity-25 my-2">
              We work in several verticals.
            </h3>
          </div>
        </div>

        <Slider {...settings}>
          {postData.map((item, i) => (
            <div key={i} className="flex justify-center">
              <div className="bg-white m-3 py-14 text-center shadow-xl rounded-3xl w-80">
                <div className="relative">
                  <Image
                    src={item.imgSrc}
                    alt={`${item.name}'s profile`}
                    width={182}
                    height={182}
                    className="inline-block m-auto rounded-lg"
                  />
                  <Image
                    src="/images/wework/linkedin.svg"
                    alt="LinkedIn icon"
                    width={70}
                    height={70}
                    className="absolute top-3 right-3"
                  />
                </div>
                <h4 className="text-2xl font-bold pt-6">{item.name}</h4>
                <h3 className="text-lg font-normal pt-2 text-gray-600">
                  {item.profession}
                </h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
