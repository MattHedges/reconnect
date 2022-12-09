import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Posts } from "./Posts"


// set state then create useeffect 
export const PostList = ({ searchTermState }) => {
    const [posts, setPosts] = useState([])
    const [employees, setEmployees] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()

    //gets honey_user object from local storage to allow it to be used in the code. login button function is what stores "honey_user" in local storage
    const localHoneyUser = localStorage.getItem("honey_user")

    //this variable converts the info pulled from local storage and converts theJSON string into an object.
    //now honeyUserObject will be an object with two keys on it.    id and staff in the dev tools.
    const honeyUserObject = JSON.parse(localHoneyUser)

// searchedTickets is a new variable we made to contain the filtered information. so setFiltered is the change of state and searched tickets
    // this use effect is filtering down all tickets from the original tickets state to show only tickets. it is comparing the ticket description with the info provided in the searchTermState
    // the setFiltered is updating the page to show only the filtered tickets with matching criteria 
    // toLowerCase() is making all letters in the ticket.description and all characters in the searchTermState lower case so they will always match
    // useEffect(
    //     () => {
    //         const searchedTickets = tickets.filter(ticket => {
    //           return  ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase())
    //         })
    //         setFiltered(searchedTickets)
    //     },
    //     [ searchTermState ]
    // )

    
    // // this ueEffect filters tickets to see if they are labeled as an emergency and stores them in the emergencyTickets variable
    // useEffect(
    //     () => {
    //         if (emergency) {
    //             const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
    //             setFiltered(emergencyTickets)
    //         }   
    //         else {
    //             setFiltered(tickets)
    //         }
    //     },
    //     [emergency]
    // )

     const getAllPosts = () => {
        fetch('http://localhost:8088/posts')
            .then(response => response.json())
            .then((ticketArray) => {
                setPosts(ticketArray)
            })
    }
    useEffect(
        () => {
            getAllPosts()


            // fetch('http://localhost:8088/employees?_expand=user')
            // .then(response => response.json())
            // .then((employeeArray) => {
            //     setEmployees(employeeArray)
            // })
            
        },
        [] // When this array is empty, you are observing initial component state
    )

    // the whole point of useEffect function is to observe state
    // useEffect(
    //     () => {
    //         if (honeyUserObject.staff) {
    //             // For Employees
    //             setFiltered(tickets)
    //         }
    //         else {
    //             // For customers
    //             //the variable myTickets is all tickets filtered down. it checks to see if ticket.userId matches the honeyUserObject.id. 
    //             // if they do match then those object will push to the myTickets array
    //             const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)


    //             // setFiltered(myTickets) sets the state of setFiltered variable on line 5
    //             setFiltered(myTickets)
    //         }
    //     },
    //     [tickets]
    // )
// this useEffect is observing the current state of openOnly... if openOnly is true the tickets are filtered to show open tickets. and looks to see if date completed is not an empty string
// if openOnly is true it will return open tickets if the ticket.UserID is equal to honeyUserObject.id and the date completed is an empty string. 
//setFiltered returns the open tickets if openOnly is true. and myTickets if the openOnly shows false
// useEffect (
//     () => {
//         if (openOnly) {
//         const openTicketArray = tickets.filter(ticket => {
//             return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
//               })
//               setFiltered(openTicketArray)
//             }
//             else {
//                 const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
//                 setFiltered(myTickets)
//             }
//             },

//     [openOnly]
// )

    return <>
{/* //the below ternary operator only shows the emergency only button to employees */}
    {/* {
        honeyUserObject.staff
            ? <>
            <button onClick={ () => {setEmergency(true)}} > Emergency Only</button>
            <button onClick={ () => {setEmergency(false)}} > Show All</button>
            </>
        : <>
        <button onClick={ () => {navigate("/ticket/create")}} > Create Ticket</button>
       
        <button onClick={ () => updateOpenOnly(true)} > Open Ticket</button>
        <button onClick={ () => updateOpenOnly(false)} > All My Tickets</button>
        </>

    } */}

    <h2>List of Tickets</h2>

        <article className='tickets'>
            {
                posts.map(
                    (post) => <Posts key={`post---${post.id}`}
                    post={post}
                    />
                    
                )
            }
        </article>
        </>
}