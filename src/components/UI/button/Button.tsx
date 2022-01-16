import { Btn } from "./ButtonStyles"

interface IProps {
    bg: string,
    color: string
}

const Button: React.FC<IProps> = (props) => {
    return (
        <Btn bg={props.bg} color={props.color}>
            { props.children }
        </Btn>
    )
}

export default Button