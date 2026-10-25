import { ColorKey, Phone } from "../types";

declare const require: (path: string) => number;

export const PHONE_COLORS: Record<
  ColorKey,
  { label: string; hex: string; image: number }
> = {
  silver: {
    label: "bạc",
    hex: "#C9EEFA",
    image: require("../../assets/phones/silver.png"),
  },
  red: {
    label: "đỏ",
    hex: "#E53A2F",
    image: require("../../assets/phones/red.png"),
  },
  black: {
    label: "đen",
    hex: "#000000",
    image: require("../../assets/phones/black.png"),
  },
  blue: {
    label: "xanh",
    hex: "#2A4494",
    image: require("../../assets/phones/blue.png"),
  },
};
export const COLOR_ORDER: ColorKey[] = ["silver", "red", "black", "blue"]; // thứ tự 4 ô màu

const BADGE = "Ở ĐÂU RẺ HƠN HOÀN TIỀN";

export const PHONES: Phone[] = [
  {
    id: "1",
    name: "Điện Thoại Vsmart Joy 3 - Hàng chính hãng",
    price: 1790000,
    oldPrice: 1790000,
    rating: 5,
    reviewCount: 828,
    supplier: "Tiki Tradding",
    badge: BADGE,
    colors: COLOR_ORDER,
    defaultColor: "blue",
  },
  {
    id: "2",
    name: "Điện Thoại Vsmart Live 4 - Hàng chính hãng",
    price: 3990000,
    oldPrice: 4490000,
    rating: 4,
    reviewCount: 512,
    supplier: "Tiki Tradding",
    badge: BADGE,
    colors: COLOR_ORDER,
    defaultColor: "blue",
  },
  {
    id: "3",
    name: "Điện Thoại Vsmart Star 5 - Hàng chính hãng",
    price: 2490000,
    oldPrice: 2790000,
    rating: 5,
    reviewCount: 340,
    supplier: "Tiki Tradding",
    badge: BADGE,
    colors: COLOR_ORDER,
    defaultColor: "red",
  },
  {
    id: "4",
    name: "Điện Thoại Vsmart Active 3 - Hàng chính hãng",
    price: 3490000,
    oldPrice: 3990000,
    rating: 4,
    reviewCount: 275,
    supplier: "Cellphones",
    badge: BADGE,
    colors: COLOR_ORDER,
    defaultColor: "black",
  },
  {
    id: "5",
    name: "Điện Thoại Vsmart Aris Pro - Hàng chính hãng",
    price: 6990000,
    oldPrice: 7490000,
    rating: 5,
    reviewCount: 190,
    supplier: "Cellphones",
    badge: BADGE,
    colors: COLOR_ORDER,
    defaultColor: "silver",
  },
  {
    id: "6",
    name: "Điện Thoại Vsmart Bee 3 - Hàng chính hãng",
    price: 1290000,
    oldPrice: 1490000,
    rating: 4,
    reviewCount: 960,
    supplier: "Tiki Tradding",
    badge: BADGE,
    colors: COLOR_ORDER,
    defaultColor: "blue",
  },
];
