import techImg from "../assets/theme-tech.jpg";
import marketingImg from "../assets/theme-marketing.jpg";
import dataImg from "../assets/theme-data.jpg";
import businessImg from "../assets/theme-business.jpg";
import defaultImg from "../assets/theme-default.jpg";
import productImg from "../assets/theme-product.jpg";
import designImg from "../assets/theme-design.jpg";

const THEME_IMAGES = {
  Tech: techImg,
  Marketing: marketingImg,
  Data: dataImg,
  Business: businessImg,
  Design: designImg,
  Product: productImg,
};

export function getThemeImage(theme) {
  return THEME_IMAGES[theme] || defaultImg;
}
