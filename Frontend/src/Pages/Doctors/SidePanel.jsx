import React from "react";
import { BASE_URL, token } from './../../config';

const SidePanel = ({ doctorId, ticketPrice, timeSLots }) => {
  const bookingHandler = async () => {
    try {
      const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
        method: 'POST', // Ensure the correct HTTP method
        headers: {
          Authorization: `Bearer ${token}`, // Corrected the Authorization header
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message + ' Please try again');
      }

      if (data.session.url) {
        window.location.href = data.session.url;
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text_para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          {ticketPrice} INR
        </span>
      </div>
      <div className="mt-[30px]">
        <p className="text_para mt-0 font-semibold text-headingColor">
          Available Time Slots:
        </p>
        <ul className="mt-3">
          {timeSLots?.map((item, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {item.day}
              </p>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {item.startingTime} - {item.endingTime}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={bookingHandler} className="btn px-2 w-full rounded-md">Book Appointment</button>
    </div>
  );
};

export default SidePanel;
