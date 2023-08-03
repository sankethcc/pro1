import logo from "../../assets/logo.png"
import Footer from "../Footer"
export default function About(){
    return(
        <>
        <div className="about-page">
            <img src={logo} alt="Logo"></img>
            <h1>Our webapp is selling electronic products</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda commodi, in labore nam optio animi aut nesciunt et perspiciatis a reprehenderit fugiat fuga unde inventore quam sapiente officiis fugit. Perferendis eius impedit repellat beatae ratione iure ut sed doloremque obcaecati? Mollitia et eligendi commodi fugit accusamus quo iure at labore.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda commodi, in labore nam optio animi aut nesciunt et perspiciatis a reprehenderit fugiat fuga unde inventore quam sapiente officiis fugit. Perferendis eius impedit repellat beatae ratione iure ut sed doloremque obcaecati? Mollitia et eligendi commodi fugit accusamus quo iure at labore.</p>

        </div>
        <Footer />
        </>
    )
}