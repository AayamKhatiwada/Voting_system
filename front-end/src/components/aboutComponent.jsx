import "./aboutComponent.css"
import NavigateComponent from "./navigateComponent";
import AboutImage from "../assets/about-us.png"

const Aboutcomponent = () => {
    return (
        <>
            <NavigateComponent/>
            
            <div className="about-main">
                <div className="about-left-side">
                    <div className="about-heading">Know More About Us</div>
                    <div className="about-desc">
                        Online Voting System are a software platform used to securely conduct votes and
                        elections. As a digital platform, they eliminate the need to cast your votes 
                        using paper or having to gather in person. <br/><br/> The counting process is fully 
                        automated, giving no chance for manipulation of the results. When the results are
                        ready, it will be posted on the result page along with statistics studies and graphics
                        that explains the results.
                    </div>
                </div>
                <div className="about-right-side">
                    <img src={AboutImage} alt="About-us" width="100%"/>
                </div>
            </div>
        </>
    );
}

export default Aboutcomponent;