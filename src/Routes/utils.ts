import { atom } from "recoil";

export function makeImagePath(id?: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

export const noImage =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";

export const noPoster =
  "https://1.bp.blogspot.com/-D2I7Z7-HLGU/Xlyf7OYUi8I/AAAAAAABXq4/jZ0035aDGiE5dP3WiYhlSqhhMgGy8p7zACNcBGAsYHQ/s1600/no_image_square.jpg";

export const slidToggle = atom({
  key: "slid",
  default: 0,
});

export const searchKeyword = atom({
  key: "keyword",
  default: "",
});
