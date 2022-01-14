import { useContext, useEffect } from "react"
import { GalleryContext } from "../../context/galleryContext"
import Button from "../UI/button/Button"
import { Container, Form, InnerWrap, Input, InputName, SVG } from "./SelectionStyles"

interface IProps{
    close: () => void
}

const Selection: React.FC<IProps> = ({ close }) => {

    const { closeOverlay } = useContext(GalleryContext)

 
    const handleClose = () => {
        close()
        closeOverlay()
    }
    return (
        <Container>
            <InnerWrap>
                <h3>Pridať kategóriu</h3>
                <SVG onClick={handleClose} fill="#000000" viewBox="0 0 24 24" width="24px" height="24px"><path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"/></SVG>
            </InnerWrap>
            <InputName>Názov kategórie *</InputName>
            <Form>
                <Input autoFocus type="text" />
                <Button bg="#000" color="#fff">Pridať</Button>
            </Form>
        </Container>
    )
}

export default Selection