import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { api } from "../../api"
import { Container, ImageContainer, Img, PhotoContainer, SelectedImage, Wrapper } from "./GalleryStyles"
import { GalleryContext } from '../../context/galleryContext'
import PicSelector from '../../components/UI/picSelector/PicSelector'
import Next from '../../img/icons/right.png'
import Prev from '../../img/icons/left.png'
interface IParams {
    slug: string,
}

interface IProps {
    setHeader: (slug: string) => void,
}


const Gallery: React.FC<IProps> = ({ setHeader }) => {
    
    const { slug } = useParams<IParams>()
    const [imgs, setImgs] = useState<any>([])
    const [displayedImg, setDisplayedImg] = useState('')
    const [imgIdx, setImgIdx] = useState<number>(0)
    const [picActive, setPicActive] = useState<boolean>(false)
    
    const {showOverlay, closeOverlay } = useContext(GalleryContext)
    
    useEffect(() => {
        setImgs(api.galleries[slug])
        setHeader(slug)
    }, [])

    const handleShowPic = (i: string) => {
        showOverlay()
        setDisplayedImg(i)
        const idx = imgs.indexOf(i)
        setImgIdx(idx)
        setPicActive(true)
    }

    const handleClosePic = () => {
        closeOverlay()
        setDisplayedImg('')
        setPicActive(false)
    }   

    const handleNextPic = () => {
        
        if(imgIdx !== undefined && imgIdx < imgs.length - 1) {
            setImgIdx(prev => prev + 1)
            setDisplayedImg(imgs[imgIdx + 1])
        } else {
            setImgIdx(0)
            setDisplayedImg(imgs[0])
        }
    }

    const handlePrevPic = () => {
        if(imgIdx !== undefined && imgIdx > 0) {
            setImgIdx(prev => prev && prev - 1)
            setDisplayedImg(imgs[imgIdx - 1])
        } else {
            setImgIdx(imgs.length - 1)
            setDisplayedImg(imgs[imgs.length - 1])
        }
    }

    const handleClose = () => {
        closeOverlay()
        setDisplayedImg('')
    }

    return (
        <Container>

                {
                    imgs && imgs.map((i: string, idx: number) => (
                        <PhotoContainer key={idx}>
                            <Img src={i} key={idx} onClick={() => handleShowPic(i)}/> 
                        </PhotoContainer>
                        )   
                    )
                }
                {
                    displayedImg && (
                    <ImageContainer onClick={handleClose} showImage={picActive}>
                        <Wrapper onClick={(e:  React.MouseEvent<HTMLElement>) => e.stopPropagation()}>
                            <PicSelector top="1rem" right={1} bg="rgba(0, 0, 0, .6)" onClick={() => handleClosePic()}>
                                <svg fill="#fff" viewBox="0 0 24 24" width="16px" height="16px"><path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"/></svg>
                            </PicSelector>
                            <PicSelector top='calc(50% - 1.5rem)' right={-1.5} bg="white" onClick={handleNextPic}>
                                <img src={Next} width="17px" />
                            </PicSelector>
                            <PicSelector top='calc(50% - 1.5rem)' left={-1.5} bg="white" onClick={handlePrevPic}>
                                <img src={Prev} width="17px" />
                            </PicSelector>

                        <SelectedImage src={displayedImg} />
                        </Wrapper>
                    </ImageContainer>
                )}
        </Container>
    )
}

export default Gallery