import { clsx } from "clsx";
import { DateTime } from "luxon";

import { twMerge } from "tailwind-merge";
// import qs from "query-string";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatDateTime = (dateString) => {
  const dateTimeOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateOptions = {
    weekday: "short", // full weekday name (e.g., 'Monday')
    month: "short", // abbreviated month name (e.g., 'Oct')
    // year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime = new Date(dateString)
    .toLocaleString("en-US", dateTimeOptions)
    .replace(/,/g, "");

  const formattedDate = new Date(dateString)
    .toLocaleString("en-US", dateOptions)
    .replace(/,/g, "");

  const formattedTime = new Date(dateString)
    .toLocaleString("en-US", timeOptions)
    .replace(/,/g, "");

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export const convertFileToUrl = (file) => URL.createObjectURL(file);

export const convertFiletoBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      resolve(reader.result); // Resolve the promise with the base64 string
    };

    reader.onerror = (error) => {
      reject(error); // Reject the promise if there's an error
    };
  });
};

export const formatDateFromJSDate = (date) => {
  const luxonDate = DateTime.fromJSDate(date);
  const formattedDate = luxonDate.toFormat("cccc, LLL d, yyyy");
  return formattedDate;
};

export const formatTime = (time) => {
  const [hours, minutes] = time.split(":");
  const newTime = new Date(0, 0, 0, hours, minutes);

  const formattedTime = newTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  return formattedTime;
};

export const formatPrice = (price) => {
  const amount = parseFloat(price);
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  return formattedPrice;
};

export function formUrlQuery({ params, key, value }) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
}

export function removeKeysFromQuery({ params, keysToRemove }) {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
}

export const handleError = (error) => {
  console.error(error);
  throw new Error(error === "string" ? error : JSON.stringify(error));
};
