import { useState } from "react"
import UserOrders from "./UserOrders";
import RecentChecks from "./RecentChecks";

type UserHistoryType = "Orders" | "Recent Checks";

const UserHistory = () => {
    const [userHistory,setUserHistory] = useState<UserHistoryType>("Orders");
  return (
    <div>
        <div className="w-full flex flex-col items-center justify-center">
            {/* user history menu */}
            <div className="flex h-14 w-[90%] justify-evenly items-center border rounded-md">
                <div className={`w-[40%] flex justify-center items-center h-[90%]
                    ${userHistory === "Orders" && "border-b-2 border-black text-gray-400"} hover:cursor-pointer`}>
                    <p className="text-sm md:font-bold font-serif"
                    onClick={()=>setUserHistory("Orders")}
                    >
                        Orders
                    </p>
                </div>
                <div className={`w-[40%] flex justify-center items-center h-[90%]
                    ${userHistory === "Recent Checks" && "border-b-2 border-black text-gray-400"} hover:cursor-pointer`}>
                    <p className="text-sm md:font-bold font-serif"
                    onClick={()=>setUserHistory("Recent Checks")}
                    >
                        Recent Checks
                    </p>
                </div>
            </div>

            {/* user history according to history menu */}
            {userHistory === "Orders" && <UserOrders/>}
            {userHistory === "Recent Checks" && <RecentChecks/>}
        </div>
    </div>
  )
}

export default UserHistory