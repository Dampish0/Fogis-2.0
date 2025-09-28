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
      bodyText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium sagittis convallis. Nam blandit suscipit dolor, vel commodo ex venenatis ac. Pellentesque semper sodales enim a posuere. Sed quis aliquam nulla. Aliquam eget aliquet libero, eu scelerisque tortor. Fusce eleifend molestie elit non sollicitudin. Etiam volutpat, nisi vitae tristique tempor, orci elit dignissim lacus, ut iaculis arcu dolor sed nibh.

Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut consequat, orci non fermentum tempus, ipsum dui volutpat urna, eget tempor elit nunc sed tortor. Morbi sodales sem sed diam hendrerit, vel aliquam sem ultricies. Etiam blandit neque vitae laoreet varius. Curabitur quis blandit erat, nec rhoncus erat. Cras hendrerit urna volutpat mi lacinia congue. Proin vehicula sollicitudin maximus. Donec vel iaculis urna, sit amet viverra nunc. Praesent varius magna quis dolor auctor viverra quis placerat magna. Etiam lobortis quam erat, sit amet sollicitudin orci convallis eu. Duis non urna vel metus volutpat euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam at massa mi. Maecenas aliquam tempus mi, in porta est iaculis eget. Sed eu volutpat orci.

Nam nulla mi, eleifend et erat nec, dignissim aliquam sem. Aliquam suscipit arcu in tellus bibendum imperdiet. Suspendisse tincidunt mauris egestas vehicula ornare. Cras suscipit finibus pellentesque. Sed cursus suscipit tristique. Sed malesuada, sem eu semper vehicula, leo risus ultricies est, at varius urna purus id eros. Quisque tincidunt purus enim, eu fermentum quam laoreet non. Aliquam at rhoncus nunc. Nullam sed erat at nisi laoreet placerat et non tellus. Praesent posuere risus vitae ante sollicitudin dapibus.

Praesent aliquam vitae quam ut pretium. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi sit amet enim tincidunt, ultrices enim ut, rutrum eros. Sed ultrices turpis in risus varius, eu mattis neque rutrum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam varius tortor magna, id luctus leo bibendum nec. Sed viverra lorem sit amet magna tempus, eu vehicula mi porta. Etiam ullamcorper volutpat erat. Nam scelerisque lorem sed mauris elementum, id tempus lacus malesuada. Donec laoreet, lacus vitae ultrices ullamcorper, velit orci scelerisque lacus, et accumsan dui sem vitae eros. Phasellus ut sodales odio.

Duis dui purus, vulputate quis ultricies id, vestibulum sit amet metus. Nulla facilisis malesuada nisl ac mollis. Nunc nec aliquet metus. Sed blandit augue sit amet magna aliquam, et elementum lacus iaculis. Aenean pretium nunc in quam vehicula, at laoreet urna accumsan. Vestibulum turpis elit, dapibus sit amet blandit eu, laoreet ac risus. Vestibulum tincidunt eleifend erat nec fringilla. Nunc urna felis, interdum nec erat eu, vulputate accumsan ligula. Ut posuere urna eu venenatis ornare. Vivamus eget ipsum tempus, commodo lorem nec, fringilla eros. Phasellus malesuada massa vitae fringilla laoreet. Morbi lacus quam, vestibulum eget cursus a, venenatis vitae purus. Quisque a leo a risus varius aliquet. Nullam dolor nisl, maximus eget auctor pulvinar, efficitur ultricies mi.`,
      image: news1Png,
      dateText: "27 September",
    },
    {
      id: 2,
      title: "ronaldo blir kidnappad",
      summary: "Bla bla bla",
      bodyText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a tortor a risus consectetur vulputate quis in lacus. Nulla quis aliquet nulla, et auctor ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dui diam, pharetra vel leo id, lacinia viverra turpis. Vestibulum purus quam, dictum eget venenatis et, venenatis nec felis. Quisque vehicula bibendum dui, hendrerit vehicula ante dignissim et. Sed tincidunt ultricies magna et rhoncus. Vestibulum rhoncus quam mauris, sed gravida libero accumsan eget. Nam sit amet felis mauris. Nulla tristique est eget commodo euismod. Integer et sollicitudin neque, et lacinia risus. Suspendisse sed facilisis tortor, non venenatis massa. Cras quis quam vestibulum, tempor erat ac, ornare justo. Sed nec lorem orci. Maecenas eleifend hendrerit malesuada.

Sed vel venenatis urna, dictum pretium turpis. Donec in auctor risus, fermentum varius ex. Sed at est euismod diam iaculis accumsan et at mi. Maecenas quis est nec erat ultrices bibendum. Fusce elementum urna sit amet lectus accumsan consequat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce sit amet dictum erat. Nam condimentum malesuada turpis, eget cursus massa. Maecenas consequat, diam id fringilla luctus, sapien felis semper leo, vestibulum lobortis nisi enim eu massa. Aenean euismod dolor eu ante commodo suscipit. Nullam nec turpis eu velit porta suscipit.
\n\n\n\n\n\n
Suspendisse viverra dignissim tempor. Phasellus non turpis justo. In imperdiet malesuada pretium. In est arcu, tempus a viverra quis, aliquet non felis. Nunc bibendum sem vel lacus maximus rutrum. Etiam nulla velit, mollis vitae tellus id, ullamcorper rhoncus eros. Curabitur in ante elit. Duis nunc eros, varius eu lorem ac, facilisis finibus dolor. Maecenas eu metus eget purus molestie blandit eu eu libero. Fusce venenatis purus vitae nisi pharetra, sed fringilla lectus pulvinar. Etiam id libero turpis. Quisque commodo augue in dolor pharetra mollis. Mauris tempor sem lacus, quis varius purus viverra porta. Nunc ullamcorper porta metus, ut luctus tortor fermentum vitae. Fusce consectetur dui quam, quis volutpat lacus mollis quis. Morbi porta feugiat eros luctus cursus.

Praesent facilisis mauris ac sapien fermentum, ut pulvinar est convallis. Morbi ultrices nunc in tempor tristique. Quisque interdum pharetra metus, bibendum pulvinar lectus auctor nec. Donec sed gravida libero. Ut et placerat dui. Morbi convallis posuere pulvinar. Mauris cursus dictum erat vitae euismod. Donec blandit ornare leo quis porttitor. Duis lectus arcu, pellentesque nec ligula sed, posuere ullamcorper arcu. Duis condimentum ornare risus eget scelerisque.

Integer sagittis dapibus mauris, id fringilla lectus hendrerit bibendum. Nunc vel mollis lacus. Suspendisse non sollicitudin quam. Ut consectetur odio a cursus placerat. Phasellus volutpat pretium venenatis. Ut quis felis laoreet, fringilla lacus vel, vulputate lorem. Cras maximus felis odio, quis maximus tortor consequat sed. Maecenas pulvinar, dui varius elementum posuere, erat est vestibulum dui, vel sodales mi nulla in ipsum. Nam vitae vehicula erat. Aliquam pharetra aliquam gravida. Etiam vel lacinia mauris. Phasellus nibh magna, varius in dolor in, vestibulum tempus nisi.

In auctor porta porta. Etiam aliquet viverra lorem nec pharetra. Praesent ultricies cursus odio ut tincidunt. Pellentesque convallis, massa quis faucibus commodo, magna felis rhoncus mauris, eget aliquam arcu justo in ligula. Vivamus et mattis purus. Nam efficitur eu urna et finibus. Curabitur sed rhoncus est. Aenean at orci id velit ornare tempor. Nullam imperdiet turpis non urna rutrum vehicula at et mi. Curabitur vehicula est ut lacinia eleifend. Integer rutrum lectus in egestas malesuada. Etiam maximus dui eget congue scelerisque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin non tristique odio. Nunc ac maximus mauris, sit amet imperdiet neque.

In hac habitasse platea dictumst. Integer rutrum eget nisl sed molestie. Sed vel nisi erat. Morbi et viverra lorem. Nulla facilisis rutrum arcu, sit amet sodales justo sollicitudin at. Proin eget lectus nisi. Etiam efficitur, est non placerat tristique, mauris massa tempus turpis, ut facilisis quam nisi vitae quam. Integer ut sapien eget velit elementum luctus. Fusce quis neque in magna rhoncus faucibus. Sed orci felis, convallis ac sagittis et, fermentum vitae sem. Curabitur eu mollis libero, sed finibus mauris. Donec sodales nunc tortor, id varius nibh pellentesque at. Nunc tincidunt faucibus pretium. Maecenas tincidunt sem sed efficitur fermentum. Aliquam tellus arcu, luctus et lacinia eu, molestie eget mi. Nulla pretium, nulla non aliquet iaculis, sem sem pretium ipsum, a eleifend dui nunc non ante.

Duis quis est in velit malesuada porta vel quis metus. Integer eget ex non felis aliquet finibus. Duis quis sapien id felis hendrerit placerat ut a turpis. In mattis pharetra elit lacinia tempor. Nam laoreet laoreet convallis. Nulla ullamcorper ipsum non auctor molestie. Integer vel cursus felis. Cras eu sollicitudin enim, nec scelerisque ligula. Nulla pretium rutrum risus, non mattis lectus laoreet ac. Vivamus suscipit volutpat justo, eu posuere dolor vulputate in. Duis ac enim sed elit pharetra laoreet vel ac erat.
\n\n
Aenean iaculis non sapien sed fermentum. Donec cursus sed sem a maximus. Morbi ut maximus mauris. Mauris gravida metus et viverra pretium. Vestibulum aliquam lacus vitae risus porta viverra. Sed fringilla augue nisi. Suspendisse potenti. Morbi feugiat tellus tortor, in cursus enim posuere eget. Sed vitae nisl congue, vestibulum risus id, eleifend massa. Suspendisse in lorem varius, mattis nisl id, porta nulla. In egestas nec nulla non eleifend. Nullam pretium dapibus purus ac cursus. Maecenas aliquet varius tincidunt. Proin tristique neque in mauris posuere, non vulputate sapien consectetur.

Phasellus pharetra consectetur tellus, a porta nunc facilisis et. Phasellus quis suscipit nulla. Nulla dapibus condimentum dictum. Quisque nulla erat, malesuada sit amet vulputate id, dignissim at metus. Curabitur cursus, nibh a venenatis tempor, nisl libero sodales turpis, et cursus risus magna vitae magna. Phasellus bibendum, enim vitae interdum luctus, metus elit vehicula ligula, sed euismod tortor ligula vitae arcu. Aliquam feugiat sodales fermentum. Cras pulvinar hendrerit enim, non consectetur urna cursus eu. Morbi congue nulla eget tristique sodales. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque condimentum bibendum turpis, vel ullamcorper tortor feugiat maximus. In id odio diam. Quisque suscipit dolor sem, at porta ligula cursus bibendum. Sed orci turpis, ultrices interdum lorem quis, sollicitudin accumsan ligula. Nulla eu sapien vitae eros pellentesque molestie et ac arcu. Aenean tempor felis orci, in blandit turpis ullamcorper nec.

Nunc sed dolor nulla. Nulla sed tortor et arcu vestibulum rhoncus in ut libero. Sed id sagittis erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse id nulla vitae leo posuere luctus. Ut nec mi id justo sollicitudin consequat. Suspendisse hendrerit nibh eu erat porttitor vestibulum. Integer neque lorem, finibus sed mi quis, vestibulum sollicitudin libero. Curabitur porta vitae erat sit amet ornare. In congue blandit dui. Donec dignissim non lectus ac mollis.

Sed porttitor purus purus, at facilisis nisi bibendum et. Proin erat orci, gravida sed pellentesque a, gravida et nulla. Aenean ut aliquet felis. Ut semper ex orci, et faucibus mauris luctus a. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras molestie sed mauris eu vulputate. Curabitur dui velit, lobortis ut augue a, eleifend porttitor purus. Donec quis dolor libero. Nunc convallis magna magna, non consequat nunc molestie nec. Maecenas eu fringilla metus. Phasellus eu elit aliquet, ullamcorper ipsum eget, pulvinar nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

In finibus felis non eros viverra, at efficitur quam interdum. In fringilla dignissim neque at dapibus. Ut est dolor, mollis convallis tristique vel, mattis id lorem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas placerat vestibulum sem, eget gravida tortor varius ut. Nam sit amet metus eget dui sagittis posuere nec eget elit. Nullam tincidunt tortor convallis augue tempus, sit amet euismod magna eleifend. Nullam elit justo, vehicula non enim at, venenatis hendrerit purus.

Donec quis tortor a neque congue vehicula sed sit amet leo. Morbi quis risus ipsum. Cras auctor fringilla nisi ac dapibus. Praesent sit amet dolor eleifend, dignissim dui laoreet, interdum mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut ultrices odio. Nulla tortor dui, dapibus sit amet est et, aliquam dictum mi. Suspendisse in turpis eu enim venenatis convallis. Mauris in convallis enim. Proin gravida risus ex, nec placerat velit ullamcorper vel. Nullam rutrum, massa in congue aliquet, metus augue elementum risus, a dictum erat turpis at libero. Proin sed elementum tellus. Integer ornare fermentum dictum. Quisque posuere augue feugiat augue molestie convallis. Mauris mattis dignissim condimentum.

Suspendisse suscipit elementum sapien sed semper. Nulla consequat eleifend auctor. Morbi suscipit, lacus sollicitudin venenatis faucibus, diam turpis convallis dolor, quis finibus quam lectus nec tortor. Sed mattis tincidunt consequat. Sed luctus finibus ante, at efficitur dolor fermentum non. Curabitur euismod neque quis nisi porta, vitae condimentum augue fringilla. Cras quis urna turpis. Cras felis nisi, lacinia ac eros at, maximus aliquet ante. Pellentesque pretium iaculis orci, in convallis sem commodo dignissim. Nulla facilisi. Sed vel erat bibendum, auctor enim eget, eleifend nulla. Etiam scelerisque dui risus, a tempor erat sodales et. Integer ut congue magna, id malesuada mauris. Vivamus scelerisque, nisl a ultricies tempor, sem neque viverra dui, ut scelerisque quam velit nec tellus.`,

      image: news1Png,
      dateText: "27 September",
    },
    {
      id: 3,
      title: "Nyhet 3",
      summary: "Bla bla bla",
      bodyText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium sagittis convallis. Nam blandit suscipit dolor, vel commodo ex venenatis ac. Pellentesque semper sodales enim a posuere. Sed quis aliquam nulla. Aliquam eget aliquet libero, eu scelerisque tortor. Fusce eleifend molestie elit non sollicitudin. Etiam volutpat, nisi vitae tristique tempor, orci elit dignissim lacus, ut iaculis arcu dolor sed nibh.

Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut consequat, orci non fermentum tempus, ipsum dui volutpat urna, eget tempor elit nunc sed tortor. Morbi sodales sem sed diam hendrerit, vel aliquam sem ultricies. Etiam blandit neque vitae laoreet varius. Curabitur quis blandit erat, nec rhoncus erat. Cras hendrerit urna volutpat mi lacinia congue. Proin vehicula sollicitudin maximus. Donec vel iaculis urna, sit amet viverra nunc. Praesent varius magna quis dolor auctor viverra quis placerat magna. Etiam lobortis quam erat, sit amet sollicitudin orci convallis eu. Duis non urna vel metus volutpat euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam at massa mi. Maecenas aliquam tempus mi, in porta est iaculis eget. Sed eu volutpat orci.

Nam nulla mi, eleifend et erat nec, dignissim aliquam sem. Aliquam suscipit arcu in tellus bibendum imperdiet. Suspendisse tincidunt mauris egestas vehicula ornare. Cras suscipit finibus pellentesque. Sed cursus suscipit tristique. Sed malesuada, sem eu semper vehicula, leo risus ultricies est, at varius urna purus id eros. Quisque tincidunt purus enim, eu fermentum quam laoreet non. Aliquam at rhoncus nunc. Nullam sed erat at nisi laoreet placerat et non tellus. Praesent posuere risus vitae ante sollicitudin dapibus.

Praesent aliquam vitae quam ut pretium. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi sit amet enim tincidunt, ultrices enim ut, rutrum eros. Sed ultrices turpis in risus varius, eu mattis neque rutrum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam varius tortor magna, id luctus leo bibendum nec. Sed viverra lorem sit amet magna tempus, eu vehicula mi porta. Etiam ullamcorper volutpat erat. Nam scelerisque lorem sed mauris elementum, id tempus lacus malesuada. Donec laoreet, lacus vitae ultrices ullamcorper, velit orci scelerisque lacus, et accumsan dui sem vitae eros. Phasellus ut sodales odio.

Duis dui purus, vulputate quis ultricies id, vestibulum sit amet metus. Nulla facilisis malesuada nisl ac mollis. Nunc nec aliquet metus. Sed blandit augue sit amet magna aliquam, et elementum lacus iaculis. Aenean pretium nunc in quam vehicula, at laoreet urna accumsan. Vestibulum turpis elit, dapibus sit amet blandit eu, laoreet ac risus. Vestibulum tincidunt eleifend erat nec fringilla. Nunc urna felis, interdum nec erat eu, vulputate accumsan ligula. Ut posuere urna eu venenatis ornare. Vivamus eget ipsum tempus, commodo lorem nec, fringilla eros. Phasellus malesuada massa vitae fringilla laoreet. Morbi lacus quam, vestibulum eget cursus a, venenatis vitae purus. Quisque a leo a risus varius aliquet. Nullam dolor nisl, maximus eget auctor pulvinar, efficitur ultricies mi.`,

      image: news1Png,
      dateText: "27 September",
    },
    {
      id: 4,
      title: "Nyhet 4",
      summary: "Bla bla bla",
      bodyText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium sagittis convallis. Nam blandit suscipit dolor, vel commodo ex venenatis ac. Pellentesque semper sodales enim a posuere. Sed quis aliquam nulla. Aliquam eget aliquet libero, eu scelerisque tortor. Fusce eleifend molestie elit non sollicitudin. Etiam volutpat, nisi vitae tristique tempor, orci elit dignissim lacus, ut iaculis arcu dolor sed nibh.

Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut consequat, orci non fermentum tempus, ipsum dui volutpat urna, eget tempor elit nunc sed tortor. Morbi sodales sem sed diam hendrerit, vel aliquam sem ultricies. Etiam blandit neque vitae laoreet varius. Curabitur quis blandit erat, nec rhoncus erat. Cras hendrerit urna volutpat mi lacinia congue. Proin vehicula sollicitudin maximus. Donec vel iaculis urna, sit amet viverra nunc. Praesent varius magna quis dolor auctor viverra quis placerat magna. Etiam lobortis quam erat, sit amet sollicitudin orci convallis eu. Duis non urna vel metus volutpat euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam at massa mi. Maecenas aliquam tempus mi, in porta est iaculis eget. Sed eu volutpat orci.

Nam nulla mi, eleifend et erat nec, dignissim aliquam sem. Aliquam suscipit arcu in tellus bibendum imperdiet. Suspendisse tincidunt mauris egestas vehicula ornare. Cras suscipit finibus pellentesque. Sed cursus suscipit tristique. Sed malesuada, sem eu semper vehicula, leo risus ultricies est, at varius urna purus id eros. Quisque tincidunt purus enim, eu fermentum quam laoreet non. Aliquam at rhoncus nunc. Nullam sed erat at nisi laoreet placerat et non tellus. Praesent posuere risus vitae ante sollicitudin dapibus.

Praesent aliquam vitae quam ut pretium. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi sit amet enim tincidunt, ultrices enim ut, rutrum eros. Sed ultrices turpis in risus varius, eu mattis neque rutrum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam varius tortor magna, id luctus leo bibendum nec. Sed viverra lorem sit amet magna tempus, eu vehicula mi porta. Etiam ullamcorper volutpat erat. Nam scelerisque lorem sed mauris elementum, id tempus lacus malesuada. Donec laoreet, lacus vitae ultrices ullamcorper, velit orci scelerisque lacus, et accumsan dui sem vitae eros. Phasellus ut sodales odio.

Duis dui purus, vulputate quis ultricies id, vestibulum sit amet metus. Nulla facilisis malesuada nisl ac mollis. Nunc nec aliquet metus. Sed blandit augue sit amet magna aliquam, et elementum lacus iaculis. Aenean pretium nunc in quam vehicula, at laoreet urna accumsan. Vestibulum turpis elit, dapibus sit amet blandit eu, laoreet ac risus. Vestibulum tincidunt eleifend erat nec fringilla. Nunc urna felis, interdum nec erat eu, vulputate accumsan ligula. Ut posuere urna eu venenatis ornare. Vivamus eget ipsum tempus, commodo lorem nec, fringilla eros. Phasellus malesuada massa vitae fringilla laoreet. Morbi lacus quam, vestibulum eget cursus a, venenatis vitae purus. Quisque a leo a risus varius aliquet. Nullam dolor nisl, maximus eget auctor pulvinar, efficitur ultricies mi.`,

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
      <div style={{height: '8vh'}}></div>


      <Backdrop style={{zIndex:10,}} onClick={(e)=>
        {
          if(e.target == e.currentTarget){
            setSelectedNews(false);
          }
        }
      } open={selectedNews}>
        <NewsDetail newsImage={articles[selectedNewsId].image} title={articles[selectedNewsId].title} newsText={articles[selectedNewsId].bodyText} />
      </Backdrop>



      <div style={{ background: "rgba(30, 30, 30, 0.7)",
      backdropFilter: "blur(12px)", 
      WebkitBackdropFilter: "blur(12px)",
      zIndex:6, position:"absolute", left:"50%", top:"9vh", transform: "translate(-50%, -10%)", marginLeft:'40px',
      borderRadius: "20px", padding: "8px 24px", boxShadow: "0 4px 16px rgba(0, 0, 0, 0.7)"
      
      }}>
        <Typography variant="h4" style={{ color: "#fff" }}>Nyheter</Typography>
      </div>

      <div className="news-root">
        
        <div className="news-layout">
          <section               onClick={(e) => {
                e.preventDefault();
                showNewsDetail(0);
              }}  aria-label="Utvald nyhet" className="left-col">
            <a 
            //href={`/news/${first.id}`}
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
                Se fler nyheter
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
                      //href={`/news/${a.id}`}
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
