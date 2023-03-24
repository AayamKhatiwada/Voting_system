import NavigateComponent from './navigateComponent';
import './votePartyComponent.css'

const VotePartyComponent = () => {
    return (
        <>
            <NavigateComponent />
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-6 p-5">
                        <h4>Register</h4>
                        <form action="#" method="POST">
                            <div class="form-group">
                                <label for="firstName">First Name</label>
                                <input type="text" name="firstName" id="firstName" class="form-control" required />
                            </div>
                            <div class="form-group">
                                <label for="lastName">Last Name</label>
                                <input type="text" name="lastName" id="lastName" class="form-control" required />
                            </div>
                            <div class="form-group">
                                <label for="email">Email Address</label>
                                <input type="email" name="email" id="email" class="form-control" required />
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" name="password" id="password" class="form-control" required />
                            </div>
                            <div class="form-group">
                                <label for="confirmPassword">Confirm Password</label>
                                <input type="password" name="confirmPassword" id="confirmPassword" class="form-control" required />
                            </div>
                            <button type="submit" class="btn btn-primary btn-block">Register</button>
                        </form>
                    </div>
                    <div class="col-md-6 right-half">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12">
                                    <h1 class="text-white">Welcome to our site!</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VotePartyComponent;