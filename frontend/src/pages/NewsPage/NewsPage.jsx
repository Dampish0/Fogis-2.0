import React from "react";
import NavBar from "../../components/navbar/Navbar.jsx";
import "./NewsPage.css";
import news1Png from "../../assets/Mbappe.png";
import news2Png from "../../assets/Olsen.png";
import news3Png from "../../assets/Noah.png";
import news4Png from "../../assets/Malmo.png";
import news5Png from "../../assets/Nahir.png";
import news6Png from "../../assets/Anders.png";
import news7Png from "../../assets/Foyton.png";
import news8Png from "../../assets/Jesper.png";
import { Backdrop, Typography } from "@mui/material";
import NewsDetail from "../../components/News/NewsDetail.jsx";

export default function NewsPage() {

  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  
  React.useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev || "";
      };
    }
  }, [isOpen]);

 
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
    {
      id: 5,
      title: "Nahir Besara är Månadens Spelare i Allsvenskan",
      image: news5Png,
      dateText: "5 September",
      bodyText: `Hammarbys lagkapten Nahir Besara utses till Månadens Spelare i Allsvenskan efter en stark augusti där han gjorde mål i varje match. Månaden innehöll bland annat två snygga frisparksmål – ett mot GAIS och ett mot Östers IF – samt två målgivande passningar. Hammarby gick igenom perioden med två segrar, ett kryss och en förlust, men Besaras jämna nivå och avgörande aktioner stack ut.
    
    Som vinnare tilldelas Besara 10 000 kronor från elitfotbollens huvudsponsor Unibet att skänka till ett samhällsengagemang i klubben. Övriga nominerade den här månaden var August Priske (Djurgården), Elliot Stroud (Mjällby AIF), Noel Törnqvist (Mjällby AIF) och Victor Lind (BP).
    
    Utmärkelsen Månadens Spelare delas ut av Svensk Elitfotboll i samarbete med Unibet. Juryn består av de 16 lagkaptenerna och huvudtränarna i Allsvenskan samt sportjournalister från riks- och lokalmedia. Juryn tar fram fem finalister, därefter får supportrar rösta, och en totalsumma räknas fram där media/tränare/lagkaptener står för två tredjedelar och supportrarna för en tredjedel.
    
    Tidigare vinnare 2025:
    • April: Christoffer Nyman (IFK Norrköping)
    • Maj: Ibrahim Diabaté (GAIS)
    • Juli: Ibrahim Diabaté (GAIS)`
    },
    {
      id: 6,
      title: "Torstensson är Månadens Tränare - för tredje gången",
      image: news6Png,
      dateText: "5 September",
      bodyText: `Anders Torstensson tar hem Månadens Tränare i Allsvenskan för tredje gången den här säsongen. Mjällby AIFs augusti blev ännu ett kvitto på lagets stabilitet och formtopp: starka bortavinster med 3-1 mot Malmö FF och 2-0 mot GAIS, en sen kvittering mot Djurgården och en 1-0-seger mot Halmstads BK.
    
    Resultatraden har gett Mjällby ett rejält grepp om tabelltoppen. Inför slutspurten leder laget Allsvenskan med åtta poäng ner till tvåan Hammarby och 13 poäng till trean AIK, med åtta omgångar kvar att spela. Klubben står därmed i pole position för att jaga sitt första SM-guld.
    
    Utmärkelsen delas ut av Svensk Elitfotboll i samarbete med Unibet. Vinnaren får 10 000 kronor att skänka till ett samhällsengagemang i klubben. Övriga nominerade den här månaden var Stefan Billborn (IFK Göteborg) och Andreas Engelmark (IK Sirius).
    
    Månadens Tränare utses sex gånger under året. Juryn består av de 16 lagkaptenerna och huvudtränarna i Allsvenskan samt sportjournalister från riks- och lokalmedia. Juryn tar fram tre finalister varje månad, därefter adderas supportrarnas röster till en totalsumma där media/tränare/lagkaptener står för två tredjedelar och supportrarna för en tredjedel.
    
    Tidigare vinnare 2025:
    • April: Anders Torstensson (Mjällby AIF)
    • Maj: Anders Torstensson (Mjällby AIF)
    • Juli: Fredrik Holmberg (GAIS)`
    }
    ,
    {
      id: 7,
      title: "Foyston lämnar Öster - sparkas",
      image: news7Png,
      dateText: "4 September",
      bodyText: `Östers IF meddelar att klubben och huvudtränaren Martin Foyston går skilda vägar. Beskedet kommer med åtta omgångar kvar av Allsvenskan, där nykomlingen just nu ligger på kvalplats. Foyston ledde laget till uppflyttning under sin första säsong i klubben i fjol.
    
    I sitt uttalande tackar Öster tränaren för hans insatser och önskar honom lycka till vidare: ”Vi riktar ett varmt tack till Martin för hans insatser i Östers IF och önskar honom lycka till framöver.”`
    }
    ,
    {
      id: 8,
      title: "Hyllades i 300:e matchen: ”Man får gåshud”",
      image: news8Png,
      dateText: "3 September",
      bodyText: `Mjällbys lagkapten Jesper Gustavsson nådde milstolpen 300 matcher och hyllades stort efter 1–0-segern borta mot Brommapojkarna. Inför avspark höll de tillresta supportrarna upp en banderoll med texten ”Jesper 300 Gustavsson”, något som mittfältaren beskriver som gåshudsframkallande. Vinsten gör att serieledaren Mjällby nu har elva poäng ner till tvåan Hammarby.
    
    Efter matchen fick Gustavsson lovord från både ledare och lagkamrater. Sportchefen Hasse Larsson kallade honom en enorm ledare som utvecklats kraftigt de senaste två åren och menade att han numera tillhör de bästa sexorna i Allsvenskan. Lagkamraten Elliot Stroud fyllde i och lyfte fram Gustavsson som en underskattad tvåvägsspelare, inte bara en bollvinnare.
    
    Gustavsson själv höll en ödmjuk ton, konstaterade att han tagit stora steg men har mer att lära, och betonade lagets kollektiva resa. Han pekade på hur Mjällby utvecklat sitt spel från mer direkt och fysiskt till ett mer konstruktivt och bolltryggt uttryck under de senaste säsongerna – något som, enligt kaptenen, gett tydliga resultat.`
    }
    ,
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
  const rightSide = rest.slice(0, 3); 
  const secondRow = rest.slice(3, 7); 


  const openById = (id) => {
    const idx = articles.findIndex((a) => a.id === id);
    setSelectedIndex(idx >= 0 ? idx : 0);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  const selectedArticle = articles[selectedIndex] || articles[0];

  return (
    <div style={{ minHeight: "100vh" }}>
      <NavBar />

      <div
        style={{
          background: "rgba(30, 30, 30, 0.7)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          zIndex: 6,
          position: "absolute",
          left: "50%",
          top: "clamp(100px, 8vh, 200px)",
          transform: "translate(-50%, -10%)",
          marginLeft: "40px",
          borderRadius: "20px",
          padding: "8px 24px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.7)",
        }}
      >
        <Typography variant="h4" style={{ color: "#fff" }}>
          NYHETER
        </Typography>
      </div>

      <Backdrop
        style={{ zIndex: 10 }}
        open={isOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <NewsDetail
          newsImage={selectedArticle.image}
          title={selectedArticle.title}
          newsText={selectedArticle.bodyText || selectedArticle.summary || ""}
        />
      </Backdrop>

      <div className="news-root1">
        <div className="news-layout">
          <section aria-label="Utvald nyhet" className="left-col">
            <a
              href="#"
              className="as-link"
              onClick={(e) => {
                e.preventDefault();
                openById(first.id);
              }}
            >
              <article className="hero-card" style={{ cursor: "pointer" }}>
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
                    <p style={{ marginTop: 6, opacity: 0.9 }}>
                      {first.summary}
                    </p>
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
                      href="#"
                      className="as-link"
                      aria-label={`Läs: ${a.title}`}
                      onClick={(e) => {
                        e.preventDefault();
                        openById(a.id);
                      }}
                      style={{ cursor: "pointer" }}
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

          <section aria-label="Nyheter under" className="below-grid">
            <ul className="grid-list">
              {secondRow.map((a) => (
                <li key={a.id}>
                  <a
                    href="#"
                    className="as-link"
                    aria-label={`Läs: ${a.title}`}
                    onClick={(e) => {
                      e.preventDefault();
                      openById(a.id);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <article className="newscard newscard--vertical glass">
                      {a.image && (
                        <img
                          src={a.image}
                          alt={a.title}
                          className="newscard__media newscard__media--top"
                          loading="lazy"
                        />
                      )}
                      <div className="newscard__text newscard__text--tight">
                        {a.dateText && (
                          <time
                            className="newscard__date"
                            aria-label={`Publicerad ${a.dateText}`}
                          >
                            {a.dateText}
                          </time>
                        )}
                        <h3 className="newscard__title">{a.title}</h3>
                      </div>
                    </article>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
