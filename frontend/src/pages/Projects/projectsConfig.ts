export type Project = {
  title: string;
  description: string;
  image: string;
  link: string;
};

const projects: Project[] = [
  {
    title: "React Game",
    description: "A simple React game built with TypeScript",
    image:
      "https://media.licdn.com/dms/image/v2/C4E12AQGoAiCvhcQWoA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1593179967215?e=2147483647&v=beta&t=WlGbGUf9QzF3JBKnILbh_MsfZbyh6UzR2l22gsxxWhs",
    link: "/react-game",
  },
  {
    title: "Pixi JS animation",
    description: "My animation made with Pixi JS library",
    image:
      "https://reffect.co.jp/wp-content/uploads/2020/09/PixiJS.png",
    link: "/pixi-js",
  },
  {
    title: "Python Web Scraper",
    description: "A web scraper built with Python and Beautiful Soup",
    image:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*3IcLSFuT8PQg4cUBaRXH1A.png",
    link: "/python-web-scraper",
  },
];

export default projects;
