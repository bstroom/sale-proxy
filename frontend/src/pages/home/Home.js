import {useSelector} from "react-redux";

const Home = () => {
    const profile = useSelector(state => state.auth.user);
    return <div>
        Xin chào {profile.last_name + ' ' + profile.first_name} !
    </div>
}

export default Home;