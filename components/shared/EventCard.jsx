import React from "react";
import { Share2, CalendarCheck, MapPin } from "lucide-react";
import { default as ShareIcon2 } from "@/public/assets/icons/share.svg";
import { default as ShareIcon } from "@/public/assets/icons/share-from-square.svg";

const EventCard = () => {
  return (
    <div className="container">
      <div className="mx-auto my-8 max-w-sm overflow-hidden rounded-lg bg-white shadow-md">
        <div className="flex p-4">
          <div className="mr-2 flex-1">
            <p className="mb-2 text-sm text-gray-500">THUR OCT 4 | 7:30PM</p>
            <h2 className="mb-2 line-clamp-3 font-semibold leading-snug text-gray-800">
              Hackoholics 5.0: Digitech Solutions for Africa’s Prosperity
            </h2>
            <div className="mb-6 flex items-center text-sm text-gray-600">
              <MapPin className="mr-1 h-5 w-5 text-gray-700" />
              <p className="line-clamp-1">
                Owolabi Hall or wherever you want to be
              </p>
            </div>
            <div className="flex items-center">
              <div className="mr-2 flex items-center justify-center rounded-full bg-[#f5f5f5] p-3">
                <Share2 className="h-4 w-4 text-gray-700" />
              </div>
              <div className="mr-2 flex items-center justify-center rounded-full bg-[#f5f5f5] p-3">
                <CalendarCheck className="h-4 w-4 text-gray-700" />
              </div>
              {/* <p className="text-sm italic">see details</p> */}
            </div>
          </div>
          <div
            className="h-40 w-24 rounded-lg bg-gray-800"
            style={{ backgroundImage: "url('/assets/marvel 150.jpg')" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// export default EventCard;

// import React from "react";
// import { Share, CalendarCheck, MapPin } from "lucide-react";

const EventCard2 = () => {
  return (
    <div className="mx-auto my-8 max-w-sm">
      <div className="flex rounded-lg bg-white p-4 shadow-md">
        <div className="flex flex-col">
          <span className="mb-2 text-sm text-gray-500">
            THUR OCT 4 | 7:30PM
          </span>
          <h2
            className="mb-4 text-lg font-semibold text-gray-800"
            style={{ letterSpacing: "-0.4px" }}
          >
            Hackoholics 5.0: Digitech Solutions for Africa’s Prosperity
          </h2>
          <div className="mb-4 flex items-center">
            <MapPin className="mr-2 text-black opacity-60" size={14} />
            <span className="text-sm text-black opacity-60">Owolabi Hall</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 flex h-6 w-6 items-center justify-center rounded bg-gray-300">
              <Share2 className="text-gray-600" size={12} />
            </div>
            <div className="mr-2 flex h-6 w-6 items-center justify-center rounded bg-gray-300">
              <CalendarCheck className="text-black opacity-60" size={12} />
            </div>
            <span className="text-sm italic text-black">see details</span>
          </div>
        </div>
        <div className="">
          <div
            className="h-40 w-24 rounded-lg bg-gray-800"
            style={{
              backgroundImage: `url('/assets/marvel 150.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

// export default EventCard;
