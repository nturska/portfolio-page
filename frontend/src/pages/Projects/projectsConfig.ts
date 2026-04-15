export type Project = {
  title: string;
  description: string;
  image: string;
  link: string;
};

const projects: Project[] = [
  {
    title: "PDF QA Agent",
    description: "A chatbot that can answer questions about a PDF file using Gemini API",
    image:
      "https://s.smallpdf.com/static/cms/f/102628/528x476/6f2813d069/extract-pdf-pages.png",
    link: "/pdf-qa",
  },
];

export default projects;
