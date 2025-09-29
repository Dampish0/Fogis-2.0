import React from "react";
import NavBar from "../../components/Navbar/NavBar.jsx";
import "./NewsPage.css";               
import news1Png from "../../assets/background.png";
import toast from 'react-hot-toast';
import Link from '@mui/material/Link'
import { Typography } from '@mui/material';

export default function HomePage() {
  const articles = [
    {
      id: 1,
      title: "Nyhet",
      summary: "Bla bla bla",
      image: news1Png,
      dateText: "27 September",
    },
    {
      id: 2,
      title: "Nyhet 2",
      image: news1Png,
      dateText: "Tis 23 sep 2025",
    },
    {
      id: 3,
      title: "Tredje nyheten",
      image: news1Png,
      dateText: "Mån 22 sep 2025",
    },
    {
      id: 4,
      title: "Fjärde nyheten",
      image: news1Png,
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


      <div style={{ background: "rgba(30, 30, 30, 0.7)",
      backdropFilter: "blur(12px)", 
      WebkitBackdropFilter: "blur(12px)",
      zIndex:6, position:"absolute", left:"50%", top:"clamp(100px, 8vh, 200px)", transform: "translate(-50%, -10%)", marginLeft:'40px',
      borderRadius: "20px", padding: "8px 24px", boxShadow: "0 4px 16px rgba(0, 0, 0, 0.7)"
      
      }}>
        <Typography variant="h4" style={{ color: "#fff" }}>NYHETER</Typography>
      </div>


      <div className="news-root1">
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

          <section aria-label="Fler nyheter" className="right1-col">
            
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
