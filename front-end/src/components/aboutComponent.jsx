import "./aboutComponent.css"
import NavigateComponent from "./navigateComponent";
import AboutImage from "../assets/AboutImage.png"

const Aboutcomponent = () => {
    return (
        <>
            <NavigateComponent />

            <div className="about-main">
                <div className="about-left-side col-sm-6">
                    <img src={AboutImage} alt="" width="90%" />
                </div>

                <div className="about-right-side col-sm-6">
                    <div className="about-title">
                        About <span>Us</span>
                    </div>

                    <div className="about-desc">
                        Online Voting System are a software platform used to
                        securely conduct votes and elections. As a digital
                        platform, they eliminate the need to cast your votes
                        using paper or having to gather in person.The counting process is fully automated, giving no chance for manipulation of the results. When the results are
                        ready, it will be posted on the result page along
                        with statistics studies and graphics that explains
                        the results.
                    </div>
                </div>
            </div>
        </>
    );
}

export default Aboutcomponent;