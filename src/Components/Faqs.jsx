import React, { useState } from "react";
import { HiMiniPlus, HiMiniXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { HiOutlineChevronRight } from "react-icons/hi2";

const faqs = [
  {
    question: "What is Netflix?",
    answer:
      "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices.\n\nYou can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!",
  },
  {
    question: "How much does Netflix cost?",
    answer: "Netflix pricing varies based on the plan you choose. You can view the latest pricing on the official website.",
  },
  {
    question: "Where can I watch?",
    answer: "Watch Netflix on your phone, tablet, smart TV, laptop, or streaming device, anywhere with an internet connection.",
  },
  {
    question: "How do I cancel?",
    answer: "You can cancel your Netflix subscription anytime through your account settings — no cancellation fees or commitments.",
  },
  {
    question: "What can I watch on Netflix?",
    answer: "Netflix has a wide range of TV shows, movies, documentaries, and originals across many genres and languages.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="flex flex-col items-center bg-black py-16 min-h-screen px-4 sm:px-6 lg:px-8">
      {/* Responsive container width */}
      <h1 className="text-white text-xl sm:text-3xl md:text-3xl mb-12 font-bold w-full max-w-5xl px-4 sm:px-7 text-left">
        Frequently Asked Questions
      </h1>
      <div className="flex flex-col gap-2.5 w-full max-w-5xl px-4 sm:px-7">
        {faqs.map((faq, idx) => (
          <div key={idx}>
            <div
              className="bg-[#2b2b2b] h-[70px] sm:h-[60px] flex items-center justify-between cursor-pointer select-none px-5 sm:px-7 text-white text-md sm:text-lg"
              onClick={() => toggle(idx)}
            >
              <span>{faq.question}</span>
              <span className="text-2xl sm:text-3xl font-bold">
                {openIndex === idx ? <HiMiniXMark /> : <HiMiniPlus />}
              </span>
            </div>
            {openIndex === idx && (
              <div className="bg-[#363636] px-5 sm:px-6 py-4 text-white text-sm sm:text-base whitespace-pre-line">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Email signup section */}
      <p className="text-[#868686] text-center mt-20 mb-6 w-full max-w-5xl px-4 sm:px-7 text-lg sm:text-xl">
        Ready to join with us? Please enter your email
      </p>

      <form className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-5xl px-4 sm:px-7 justify-center">
 
        <Link
          to="/login"
          className="w-full sm:w-[140px] h-[60px] bg-red-600 hover:bg-red-700 text-white font-semibold flex items-center justify-center gap-2 rounded cursor-pointer"
        >
          Get started <HiOutlineChevronRight />
        </Link>
      </form>
    </section>
  );
}
