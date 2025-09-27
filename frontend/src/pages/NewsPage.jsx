import React from "react";
import NavBar from "../components/navbar";
import "./NewsPage.css";
import news1Png from "../assets/background.png";

export default function NewsPage() {
  const articles = [
    {
      id: 1,
      title: "Sverige gjorde horhus med spanien",
      summary: "Svergie töjde Spanien i vm-kvalet som aldrig förr",
      image: news1Png,
      publishedAt: "2025-09-24T09:30:00Z",
      dateText: "27 September",
    },
    {
      id: 2,
      title: "Filip har en riktigt jävla hårig röv",
      image: news1Png,
      publishedAt: "2025-09-23T15:00:00Z",
      dateText: "Tis 23 sep 2025",
    },
    {
      id: 3,
      title: "Tredje nyheten",
      image: news1Png,
      publishedAt: "2025-09-22T12:00:00Z",
      dateText: "Mån 22 sep 2025",
    },
    {
      id: 4,
      title: "Fjärde nyheten",
      image: news1Png,
      publishedAt: "2025-09-21T18:45:00Z",
      dateText: "Sön 21 sep 2025",
    },
    {
      id: 5,
      title: "Fjärde nyheten",
      image: news1Png,
      publishedAt: "2025-09-21T18:45:00Z",
      dateText: "Sön 21 sep 2025",
    },
  ];

  if (!articles?.length) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <NavBar />
        <div className="container-narrow">
          <h1 className="page-title">Nyheter</h1>
          <p>Inga nyheter tillgängliga.</p>
        </div>
      </div>
    );
  }

  const [first, ...rest] = articles;
  const rightSide = rest.slice(0, 4);

  return (
    <div style={{ minHeight: "100vh" }}>
      <NavBar />

      <h1>Nyheter</h1>

      <div className="news-root">
        <div className="news-layout">
         
          <section aria-label="Utvald nyhet" className="left-col">
            <a href={`/news/${first.id}`} className="as-link">
              <article className="hero-card">
                {first.image && (
                  <img
                    src={first.image}
                    alt={first.title}
                    className="hero-img"
                    loading="eager"
                  />
                )}
                <div className="hero-content">
                  {first.dateText && (
                    <div className="hero-meta">
                      <time aria-label={`Publicerad ${first.dateText}`}>
                        {first.dateText}
                      </time>
                    </div>
                  )}

                  <h2 className="hero-title">{first.title}</h2>
                  {first.summary && (
                    <p style={{ marginTop: 6, opacity: 0.9 }}>{first.summary}</p>
                  )}
                </div>
              </article>
            </a>
          </section>

          <section aria-label="Fler nyheter" className="right-col">
            <ul className="right-list">
              {rightSide.map((a) => (
                <li key={a.id}>
                  <div className="card-block">
                    <a
                      href={`/news/${a.id}`}
                      className="as-link"
                      aria-label={`Läs: ${a.title}`}
                    >
                      <div className="newscard glass">
                        <div className="newscard__header newscard__header--split">
                          {a.image && (
                            <img
                              src={a.image}
                              alt={a.title}
                              className="newscard__media"
                              loading="lazy"
                            />
                          )}

                          <div className="newscard__text">
                            {a.dateText && (
                              <time
                                className="newscard__date"
                                aria-label={`Publicerad ${a.dateText}`}
                              >
                                {a.dateText}
                              </time>
                            )}
                            <h2 className="newscard__title">{a.title}</h2>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
