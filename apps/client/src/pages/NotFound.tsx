import { FC } from "react";
import { Link } from "react-router-dom";

const NotFound: FC = () => {
  return (
    <section className="h-full w-full flex justify-center items-center gap-8 p-6 flex-col md:flex-row">
      <div className="rounded-full w-36 h-36 bg-black font-semibold flex justify-center items-center text-6xl text-white">
        404
      </div>
      <div className="flex flex-col items-end text-end">
        <div className="text-5xl">Oops</div>
        <div className="text-2xl mt-2 mb-6">This page doesn't exist</div>
        <Link to="/">
          <span className="bg-black text-white px-4 py-2 rounded-md cursor-pointer">
            Home
          </span>
        </Link>
      </div>
    </section>
  );
};

export { NotFound };
