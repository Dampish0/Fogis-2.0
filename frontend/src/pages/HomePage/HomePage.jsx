import React from 'react'
import NavBar from '../../components/Navbar/NavBar.jsx';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';
import '@fontsource/roboto/500.css';
import news1Png from "../../assets/Mbappe.png";
import news2Png from "../../assets/Olsen.png";
import news3Png from "../../assets/Noah.png";
import news4Png from "../../assets/Malmo.png";
import "./HomePage.css"; 
import Link from '@mui/material/Link';
import { Backdrop, Typography } from '@mui/material';
import NewsDetail from '../../components/News/NewsDetail.jsx';
import PageFooter from '../../components/PageFooter.jsx';


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
      title: "Mbappé hattrick när Real Madrid körde över Kairat Almaty",
      summary: "Kylian Mbappé dominerade med tre mål när Real Madrid tog en övertygande seger i Champions League mot Kairat Almaty.",
      image: news1Png,
      dateText: "30 September",
      bodyText: `Real Madrid tog ett tidigt grepp om matchen och satte tempot direkt från avspark. Bortalaget rullade boll med tålamod och växlade snabbt upp när ytorna öppnade sig. Kairat Almaty försökte ligga kompakt, men fick svårt att hantera Madrids rörelse och genombrottskraft.
    
    Kylian Mbappé var konstant spelbar i djupled och kombinerade fint med lagkamraterna. Efter ett par tidiga försök kom utdelningen, och därefter fortsatte Real Madrid att kontrollera händelserna. I andra halvlek ökade bortalaget trycket ytterligare, och Mbappé fullbordade sitt hattrick efter ett väl avvägt inspel i straffområdet och en säker avslutning från elvameterspunkten.
    
    Mot slutet av matchen behöll Real Madrid sin struktur och stängde ner hemmalagets försök till anfall. Helhetsintrycket var ett disciplinerat bortalag med tydlig matchplan och hög kvalitet i sista tredjedelen. Resultatet speglade händelseförloppet och gav Real Madrid en välförtjänt seger samt en tydlig signal inför kommande omgångar.`
    },
    {
      id: 2,
      title: "Robin Olsen slutar i landslaget",
      image: news2Png,
      dateText: "30 September",
      bodyText: `Robin Olsen meddelar att han slutar i det svenska herrlandslaget. Beskedet kommer mitt under VM-kvalet och sätter punkt för en landslagskarriär som omfattar 79 A-landskamper sedan debuten 2015. Han har representerat Sverige i två EM-slutspel och ett VM.
    
    I samband med beslutet lyfter Olsen fram den senaste tidens förändrade förtroendesituation under förbundskapten Jon Dahl Tomasson. Han gör klart att han inte ser någon återkomst så länge nuvarande ledarstab är på plats, men betonar samtidigt stolthet över åren i Blågult.
    
    Svenska landslaget går nu vidare med en ny målvaktslösning inför kommande kvalmatcher.`
    },
    {
      id: 3,
      title: "Tolf varnades i slutminuterna - missar Hammarby",
      image: news3Png,
      dateText: "29 September",
      bodyText: `IFK Göteborgs ytterback Noah Tolf varnades i den 94:e minuten borta mot Öster efter ett gruff med Patriot Sejdiu när bollen skulle sättas i spel. Situationen uppstod när Tolf ville få igång spelet snabbt vid ett inkast och spelarna rök ihop - domaren visade gult till båda.

      Varningen innebär att Tolf är avstängd i nästa match mot Hammarby, något han själv beskriver som onödigt. Han tar på sig ansvaret och säger att han “får lära sig tänka lite extra när det är 90+”.

      Utöver avstängningen väntar sannolikt böter till lagets interna böteskassa, som sköts av Jonas Bager och Pontus Dahlberg. “Det kommer nog svida lite om jag får böter”, konstaterar Tolf.`
    },
    {
      id: 4,
      title: "Publiktapp när MFF vände och vann mot Värnamo",
      image: news4Png,
      dateText: "28 September",
      bodyText: `Malmö FF bröt sin svaga hemmatrend genom att vända och vinna med 3-2 mot IFK Värnamo, men på läktarna märktes läget i klubben. Endast 15 226 åskådare tog sig till Eleda Stadion - den sämsta allsvenska publiksiffran för MFF på nära tre år. Mittbacken Pontus Jansson reagerade när siffran lästes upp under matchen och konstaterade att trenden är negativ.
    
    Publiktappet följer på en period utan hemmaseger på nästan sex veckor och en svag Europa League-premiär i veckan, då 11 478 såg förlusten mot Ludogorets. Mot Värnamo fick publiken åtminstone se en vändning, men Jansson menar att det krävs mer än tre poäng för att vända stämningen: segrar är avgörande, men supportrarna behöver också något tydligt att tro på.
    
    Nu väntar en period utan hemmamatcher. Nästa gång MFF spelar på Eleda Stadion är den 23 oktober i Europa League mot Dinamo Zagreb. Fram till dess väntar tre raka bortamatcher i liga och Europa - med ett landslagsuppehåll insprängt däremellan.`
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
     minHeight: "100vh", overflowX: "hidden",  }}>
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
        borderRadius: "20px", 
        padding: "8px 24px", 
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.7)"
      
      }}>
        <Typography variant="h6" style={{ color: "#fff" }}>SENASTE NYHETER</Typography>   
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
              <a href="/nyheter" className="right-more" aria-label="Visa alla nyheter">
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

      <div style={{ 
        background: "rgba(30, 30, 30, 0.7)",
        backdropFilter: "blur(12px)", 
        WebkitBackdropFilter: "blur(12px)",
        zIndex:6, 
        position:"relative", 
        left:"50%", 
        transform: "translate(-50%, 0%)",
        width: "fit-content",
        borderRadius: "20px", 
        padding: "8px 24px", 
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.7)",
        marginBottom: "80px"
      }}>
        <Typography variant="h6" style={{ color: "#fff" }}>Top lagen i serien</Typography>   
      </div>
      <div style={{ color: "#000000", textAlign: "center", margin:"0 auto", marginBottom: "400px" }}>
        <Typography variant="h3">Här är en tabell med top 5 lagen i serien.</Typography>
      </div>
      <PageFooter />
    </div>
  );
}
