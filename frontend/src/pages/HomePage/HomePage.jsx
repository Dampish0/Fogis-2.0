import React from 'react'
import NavBar from '../../components/Navbar/NavBar.jsx';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';
import '@fontsource/roboto/500.css';
import news1Png from "../../assets/background.png";
import "./HomePage.css"; 
import Link from '@mui/material/Link';
import { Backdrop, Typography } from '@mui/material';
import NewsDetail from '../../components/News/NewsDetail.jsx';


export default function HomePage() {

  const [selectedNews, setSelectedNews] = React.useState(false);
  const [selectedNewsId, setSelectedNewsId] = React.useState(1);

  React.useEffect(() => {
    if (selectedNews) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev || ''; };
    }
    return;
  }, [selectedNews]);

  const articles = [
    {
      id: 1,
      title: "Nyhet 1",
      summary: "Bla bla bla",
      image: news1Png,
      dateText: "27 September",
    },
    {
      id: 2,
      title: "ronaldo blir kidnappad",
      summary: "Bla bla bla",
      image: news1Png,
      dateText: "27 September",
    },
    {
      id: 3,
      title: "Nyhet 3",
      summary: "Bla bla bla",
      image: news1Png,
      dateText: "27 September",
    },
    {
      id: 4,
      title: "Nyhet 4",
      summary: "Bla bla bla",
      image: news1Png,
      dateText: "27 September",
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

  const showNewsDetail = (id) => {
    setSelectedNews(true);
    setSelectedNewsId(id);
  }

  return (
    <div style={{
     minHeight: "100vh" }}>
      <NavBar />
      <div style={{height: 'clamp(100px, 8vh, 200px)'}}></div>


      <Backdrop style={{zIndex:10,}} onClick={(e)=>
        {
          if(e.target == e.currentTarget){
            setSelectedNews(false);
          }
        }
      } open={selectedNews}>
        <NewsDetail newsImage={articles[selectedNewsId].image} title={articles[selectedNewsId].title} newsText={articles[selectedNewsId].bodyText} />
      </Backdrop>



      <div style={{ 
        background: "rgba(30, 30, 30, 0.7)",
        backdropFilter: "blur(12px)", 
        WebkitBackdropFilter: "blur(12px)",
        zIndex:6, 
        position:"absolute", 
        left:"50%", 
        top:"clamp(100px, 8vh, 200px)", 
        transform: "translate(-50%, -10%)", 
        marginLeft:'40px',
        borderRadius: "20px", 
        padding: "8px 24px", 
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.7)"
      
      }}>
        <Typography variant="h4" style={{ color: "#fff" }}>SENASTE NYHETER</Typography>
      </div>

      <div className="news-root">
        
        <div className="news-layout">
          <section               onClick={(e) => {
                e.preventDefault();
                showNewsDetail(0);
              }}  aria-label="Utvald nyhet" className="left-col">
            <a 
             className="as-link">
              <article style={{cursor: "pointer"}}  className="hero-card">
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
            <div className="right-header">
              <a href="/news" className="right-more" aria-label="Visa alla nyheter">
                SE FLER NYHETER
              </a>
            </div>

            <ul className="right-list">
              {rightSide.map((a) => (
                <li key={a.id}>
                  <div className="card-block">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        showNewsDetail(a.id-1);
                      }}
                      
                      style={{ cursor: "pointer"}}
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
