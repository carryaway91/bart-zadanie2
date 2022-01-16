import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { Add, Container, Description, PhotoCount, Thumbnail } from "./GallerySelectorStyles"


interface IProps {
    isGallery: boolean,
    image: string,
    header?: string,
    link?: string,
    count?: number,
    h?: string,
    selectGallery?: (selector: string, title: string) => void,
    openSelection?: () => void
}


const GallerySelector: React.FC<IProps> = ({ image, header, link, count, isGallery, h, selectGallery, openSelection }) => {


    return (
        <Container>
            {
                isGallery ? (
                    <React.Fragment>
                        <Link to={`/gallery/${link}`} onClick={() => link && header && selectGallery && selectGallery(link, header)}>
                            <Thumbnail img={image}>
                                <PhotoCount>
                                    {
                                        count !== undefined && count > 4 || count == 0 ? <span>{ count } fotiek</span> 
                                        :
                                        count !== undefined && count < 5 && count > 1 ? <span>{ count } fotky</span>
                                        :
                                        <span>{ count } fotka</span>
                                    }
                                </PhotoCount>
                            </Thumbnail> 
                        </Link>
                        <Description>{ header }</Description>
                    </React.Fragment>
                )
                :
                <Add onClick={openSelection} h={h}>
                    <img src={image} />
                    <p>Pridať kategóriu</p>
                </Add>
            }


        </Container>
    )
}


export default GallerySelector