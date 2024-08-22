
function Home() {
    const username = localStorage.getItem('username' || 'Guest'); //retrived username from localstorage
    return (
        <>
            <h1 className="text">Hello! {username} Welcome to Pizza Store.</h1>
            <img className="background"
                src="https://t3.ftcdn.net/jpg/08/33/60/46/240_F_833604648_go1nsz0KItTHQY1OBolA9dSxRV89bMeA.jpg" alt=" " />

        </>
    );
}
export default Home;
