import { EmployeeViews } from "./EmployeeView"
import { CustomerViews } from "./CustomerView"


// this function is checking to see if the person who logged in is an employee. IF they are it will return the vioew for employees. if they are not it will return the customer view
export const ApplicationViews = () => {
	
	const localReconnectUser = localStorage.getItem("reconnect_user")
    const reconnectUserObject = JSON.parse(localReconnectUser)
	
		if (reconnectUserObject.staff) {
			return <EmployeeViews />
		}
		else {
			return <CustomerViews/>
       
		}
}