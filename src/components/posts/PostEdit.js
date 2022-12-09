import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const EditForm = () => {
    const navigate = useNavigate()
    const { postId } = useParams()
    const id = postId
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [topics, updateTopics] = useState([])
    const [post, updatePost] = useState({
        // userId: 0,
        // isPost: true,
        // topicId: 0,
        // dateSubmitted: "",
        // content: "",
        // isApproved: true,
        // anonymous: false,
        // moderatorId: 0
            
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */

    const localReconnectUser = localStorage.getItem("reconnect_user")
    const reconnectUserObject = JSON.parse(localReconnectUser)

    useEffect(() => {
    fetch(`http://localhost:8088/topics`)
    .then(response => response.json())
    .then((topicsArray) => {
        updateTopics(topicsArray)
    })
    .then(fetch(`http://localhost:8088/posts?id=${postId}`))
    .then(response => response.json())
    .then((data) => {
        const postObject = data[0]
        updatePost(postObject)
    })
    
},
[] // When this array is empty, you are observing initial component state
)


    
    
    const handleSaveButtonClick = (event) => {
        event.preventDefault()


        // TODO: Create the object to be saved to the API
        const postToSendToAPI = {
            userId: reconnectUserObject.id,
            isPost: true,
            topicId: post.topicId,
            dateSubmitted: new Date(),
            content: post.content,
            isApproved: true,
            anonymous: false,
            moderatorId: post.userId

        }

        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/posts/${postId}` , {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
        },
            body: JSON.stringify(postToSendToAPI)
    })
        .then(response => response.json())
        .then(() => {
            navigate("/posts")
        })   
        }

    return (
        <form className="contributeForm">
            <h2 className="contributeForm__title">Contribute</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder={post.content}
                        value={post.content}
                        onChange={
                            (evt) => {
                                const copy={...post}
                                copy.content = evt.target.value
                                // passes copy back to be the new state of the page
                                updatePost(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
            <div className="form-group">
            <select onChange={(evt) => {
                const copy = { ...topics };
                copy.topicId = parseInt(evt.target.value);
                updatePost(copy);
            }}>
                <option value={0}>Choose a Topic</option>
                {topics.map((topic) =>
                <option key={`topicType--${topic.id}`} value={topic.id}>{topic.name}</option>
                )
                }
            </select>
        </div>
        </fieldset>
            {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Anonymous:</label>
                    <input type="checkbox"
                        value={post.anonymous}
                        onChange={
                            (evt) => {
                                // copy variable below creates a copy of existing state... shorthand notation for copying the existing state is {...ticket}
                                const copy = {...post}
                                // modifying the copy of the existing state. new value of description property should be whatever the current value of the input value is. whatever is currently in the input field
                                copy.anonymous = evt.target.checked
                                updatePost(copy)
                            }
                        } />
                </div>
            </fieldset> */}
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
             className="btn btn-primary">
                Submit Post
            </button>
        </form>
    )
}