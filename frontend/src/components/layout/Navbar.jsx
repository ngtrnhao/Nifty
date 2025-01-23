import { Link } from "react-router-dom";

const Navbar = () =>{
    return(
        <nav className="bg-white shadow-lg">
            <div className="max-w-6x1 mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/*Logo*/}
                    <Link to="/" className="flex items-center space-x-3">
                    <span className="text-x1 font-bold text-grey-800">Nifty</span>
                    </Link>
                    {/*Navigation Links*/}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link 
                        to="/login"
                        className="py-2 px-4 text-gray-700 hover:text-gray-900"
                        >
                        Đăng nhập
                        </Link>
                        <Link
                        to="/register"
                        className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                        Đăng ký
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;