import Buyername from "./Buyername";
import Navbar from "./Navbar";

export default function main(){
    return(
        <>
        <Navbar />
        <div className="container">
        <a href="/addmember">
              <button className="btn btn-primary mt-4" >
                Add Member
              </button></a>
        </div>
        
        <Buyername />
        </>
    )
}