import {useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Layout from '../layout/MainLayout';
import {registerUser} from '../../store/slices/authSlice';
import {toast} from 'react-toastify';
const Register = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading,error} = useSelector((state) =>state.auth);

    const [formData,setFormData] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
    });
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(formData.password !== formData.confirmPassword){
            //Thêm validation error handling 
            toast.error('Mật khẩu không khớp')
            return;
        }
        try{
            await dispatch(registerUser(formData)).unwrap();
            toast.success('Đăng ký thành công');
            navigate('/login');
        }catch(err){
            toast.error(err.message|| 'Đăng ký thất bại');
            console.error('Register failed:',err);
        }
    }
    return(
        <Layout>
            <div className="min-h-screen flex items-center justify-center">
            <div className= "max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Đăng ký tài khoản
                </h2>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                        </div>
                )}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <input
                        type='text'
                        name='name'
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Họ và tên"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData,name:e.target.value})}
                        >
                        </input>
                        <div>
                            <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="apperance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 forcus:border-indigo-5 focus:z-10 sm:text-sm "
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData,email:e.target.value})}
                            />
                        </div>
                        <div>
                            <input 
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="apperance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Mật Khẩu"
                            value={formData.password}
                            onChange={(e)=> setFormData({...formData,password:e.target.value})}
                            />
                        </div>
                        <div>
                            <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            className="apperance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Nhập lại mật khẩu"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData,confirmPassword:e.target.value})}
                            ></input>
                        </div>
                    </div>
                    <div>
                        <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full h-10 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </Layout>
    )
}
export default Register;
