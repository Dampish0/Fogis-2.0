import React from "react";
import NavBar from "../components/navbar";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import news1Png from "../assets/background.png";

function NewsCard({ title, image, summary }) {
  return (
    <>
      <div className="newscard">
        {image && (
          <img
            src={image}
            alt={title}
            className="newscard__img"
            loading="lazy"
          />
        )}
        <h2 className="newscard__title">{title}</h2>
      </div>
    </>
  );
}

function NewsPage() {
  const articles = [
    { id: 1, title: "Första nyheten", image: news1Png},
    { id: 2, title: "Andra nyheten"},
    { id: 3, title: "Tredje nyheten"},
  ];

  return (
    <div style={{ minHeight: "100vh" }}>
      <NavBar />
      <div className="container-narrow">
        <h1 className="page-title">Nyheter</h1>

        <ul className="list-space-y-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {articles.map((a) => (
            <li key={a.id}>
              <NewsCard title={a.title} image={a.image} summary={a.summary} />
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <Button
            variant="contained"
            type="button"
            onClick={() => toast.success("News loaded (demo)")}
          >
            Visa mer
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NewsPage;

