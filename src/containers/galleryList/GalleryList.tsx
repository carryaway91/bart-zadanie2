import React, { useContext, useEffect, useState } from 'react'
import GallerySelector from '../../components/gallerySelector/GallerySelector'
import { Container } from './GalleryListStyles'
import Add from '../../img/icons/add.png'
import { GalleryContext } from '../../context/galleryContext'
import Selection from '../../components/selection/Selection'

interface IProps {
    images: { header: string, coverPic: string, link: string, count: number}[],
    selectGallery: (selector: string, title: string) => void
}



const GalleryList: React.FC<IProps> = ({images, selectGallery}) => {

    const [showSelection, setShowSelection] = useState(false)

    const { showOverlay, overlay } = useContext(GalleryContext)

    const handleShowSelection = () => {
        setShowSelection(true)
        showOverlay()
    }

    
    useEffect(() => {
        if(!overlay) {
            setShowSelection(false)
        }
    }, [overlay])
    
    return (
        <Container>
            {
                images && images.map((i: {header: string, coverPic: string, link: string, count: number}, idx: number) => (
                <GallerySelector 
                    isGallery={true}
                    key={idx} 
                    count={i.count} 
                    image={i.coverPic} 
                    header={i.header} 
                    link={i.link} 
                    selectGallery={(selector: string, title: string) => selectGallery(selector, title)} />)
                )
            }

                <GallerySelector 
                    isGallery={false}
                    image={Add}
                    openSelection={handleShowSelection}
                    h="246px"
                />
                {
                    showSelection && <Selection close={() => setShowSelection(false)}/>
                }
        </Container>
    )
}

export default GalleryList