export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Create Event",
    route: "/events/create",
  },
  {
    label: "My Profile",
    route: "/profile",
  },
];

export const eventDefaultValues = {
  title: "",
  description: "",
  caption: "",
  location: "",
  imageUrl: "",
  startDateTime: new Date(),
  endDateTime: "",
  categoryId: "",
  price: "",
  isFree: false,
  url: "",
  isAllDay: false,
};

export const socialHandles = [
  {
    name: "instagram",
    logoLink:
      "https://cdn.brandfetch.io/instagram.com/w/512/h/512/theme/light/symbol?c=1idm9p80ui1hF-h94fJ",
  },
  {
    name: "x",
    logoLink:
      "https://cdn.brandfetch.io/x.com/w/512/h/512/theme/light/symbol?c=1idm9p80ui1hF-h94fJ",
  },
  {
    name: "snapchat",
    logoLink:
      "https://cdn.brandfetch.io/snapchat.com/w/512/h/512/theme/light/symbol?c=1idm9p80ui1hF-h94fJ",
  },
  {
    name: "tiktok",
    logoLink:
      "https://cdn.brandfetch.io/tiktok.com/w/512/h/512/theme/light/symbol?c=1idm9p80ui1hF-h94fJ",
  },
];
