import Layout from '../components/layout/MainLayout';

const Home = () =>{
    return(
        <Layout>
            <div className="text-center">
                <h1 className="text-4xl font-bold text-grey-900 mb-4">
                    Chào mừng đến với Nifty
                </h1>
                <p className="text-xl text-gray-600">
                    Nơi kết nối và chia sẻ với mọi người 
                </p>
            </div>
        </Layout>

    )
}
export default Home;