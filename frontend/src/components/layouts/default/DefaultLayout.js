import Header from "../Header";

const DefaultLayout = ({children}) => {
    return <div className="wrapper">
        <Header />
        <div className="main">
            {children}
        </div>
        <footer className="text-center">@2022</footer>
    </div>
}

export default DefaultLayout;