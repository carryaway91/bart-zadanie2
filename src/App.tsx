import './App.css';
import GalleryList from './containers/galleryList/GalleryList'
import { BackArrow, Categories, Container, Header, Overlay } from './AppStyles';
import { Link, Route, Switch } from 'react-router-dom';
import Gallery from './containers/gallery/Gallery';
import { api } from './api'
import { useEffect, useState } from 'react';
import { GalleryContext } from './context/galleryContext'
import Back from './img/icons/left.png'

function App() {

  const [imgs, setImgs] = useState<{header: string, coverPic: string, link: string, count: number }[]>([])
  const [selectedGallery, setSelecteGallery] = useState()
  const [overlay, setOverlay] = useState(false)
  const [header, setHeader] = useState('')


  useEffect(() => {
    setImgs(api.headers)
  }, [])


  const handleSelectGallery = (sel: string, title: string) => {
    setSelecteGallery(api.galleries[sel])
  }

  const handleSetHeader = (slug: string) => {
    const header = api.headers.find(h => h.link === slug)
    if(header) {
      setHeader(header.header)
    } else {
      setHeader('')
    }
  }

  const handleGoBack = () => {
    setHeader('')
  }



  return (
    <div className="App" style={{ position: 'relative'}}>
      <Container>
        <Header className='relative'>Fotogaléria</Header>
        <Categories className='relative'>{ header != '' ?  <Link to="/" style={{ textDecoration: 'none', color:'#000'}} onClick={handleGoBack}>
          
         <BackArrow src={Back} /> { header }</Link>  : 'Kategórie' }</Categories>

        <GalleryContext.Provider value={{
            showOverlay: () => setOverlay(true),
            closeOverlay: () => setOverlay(false),
            overlay: overlay
            }}>
              
          <Switch>
            <Route path="/" exact render={() => <GalleryList images={imgs} selectGallery={(selector: string, title: string) => handleSelectGallery(selector, title)} />} />
            <Route path="/gallery/:slug" exact render={() => <Gallery setHeader={(slug: string) => handleSetHeader(slug)}  />} />
          </Switch>
        </GalleryContext.Provider>
      </Container>
        { overlay && <Overlay className="overlay" onClick={() => setOverlay(false)} />}
    </div>
  );
}

export default App;
