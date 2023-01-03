import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Posts } from "./Posts"
import { Resources } from "./Resources"


// set state then create useeffect 
export const ResourceList = ({ searchTermState }) => {
    const [posts, setPosts] = useState([])
    const [filteredPosts, setPostList]= useState([])
    const navigate = useNavigate()
    const localReconnectUser = localStorage.getItem("reconnect_user")
    const reconnectUserObject = JSON.parse(localReconnectUser)

 
    useEffect(
        () => {
            fetch('http://localhost:8088/posts?_expand=topic')
            .then(response => response.json())
            .then((ticketArray) => {
                setPosts(ticketArray)
                return ticketArray
                
            }) .then((ticketArray) => {
                const copyFilter = ticketArray.filter((element) => {return element.isApproved === true && element.isPost === false} )
                setPostList(copyFilter)
            })
        },
    [] 
)

   
    return <>


    <h1>Community Resources</h1>

        <article className='posts'>
            {
                filteredPosts.map(
                    (post) => <Resources key={`post---${post.id}`}
                    post={post}
                    currentUser={reconnectUserObject}
                    setPosts={setPosts}
                    setPostList={setPostList}
                    />
                    
                )
            }
        </article>
        </>
}