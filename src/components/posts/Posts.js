import { useNavigate, useParams } from "react-router-dom"

export const Posts = ({post}) => { 
    const navigate = useNavigate()
    const handleEdit = (click) => {
        click.preventDefault()
        navigate(`postEdit/${post.id}`)
    }
    return <>
    <div>{post.content}</div><button onClick={click => handleEdit(click)}>Edit</button><button>Delete</button>
    </>
}