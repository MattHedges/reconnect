import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Contribute.css"
export const ContributeForm = () => {
    const navigate = useNavigate()
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [topics, updateTopics] = useState([])
    const [post, updatePost] = useState({
        userId: 0,
        isPost: false,
        topicId: 0,
        dateSubmitted: "",
        content: "",
        isApproved: false,
        anonymous: false,
        moderatorId: 0
            
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
    
},
[] // When this array is empty, you are observing initial component state
    )


    
    
    const handleSaveButtonClick = (event) => {
        event.preventDefault()


        // TODO: Create the object to be saved to the API
        const postToSendToAPI = {
            userId: reconnectUserObject.id,
            isPost: post.isPost,
            topicId: post.topicId,
            dateSubmitted: new Date(),
            content: post.content,
            isApproved: false,
            anonymous: false,
            moderatorId: post.userId

    //         "isPost": true,
    //   "dateSubmitted": "2022-12-09T16:48:11.959Z",
    //   "isApproved": true,
    //   "anonymous": false,
    //   "id": 10
        }

        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/posts` , {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
        },
            body: JSON.stringify(postToSendToAPI)
    })
        .then(response => response.json())
        .then(() => { 
            // put if else statement here to route to specific page using navigate
            navigate("/posts")
        })   
        }

    return (
        <form className="contributeForm">
            <h1 className="contributeForm__title">Contribute</h1>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Insert Content Here"
                        value={post.content}
                        onChange={
                            (evt) => {
                                const copy = {...post}
                                copy.content = evt.target.value
                                updatePost(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
            <div className="form-group">
            <select onChange={(evt) => {
                const copy = { ...post };
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
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Community Post:</label>
                    <input type="checkbox"
                        value={post.isPost}
                        onChange={
                            (evt) => {
                                // copy variable below creates a copy of existing state... shorthand notation for copying the existing state is {...ticket}
                                const copy = {...post}
                                // modifying the copy of the existing state. new value of description property should be whatever the current value of the input value is. whatever is currently in the input field
                                copy.isPost = !post.isPost
                                updatePost(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
             className="button">
                Submit Post
            </button>
        </form>
    )
}