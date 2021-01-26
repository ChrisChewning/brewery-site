import React, {Component} from 'react';


class ForgotPassword extends Component {

onChange = (e) => {

}


onSubmit = (e) => {
  e.preventDefault();
}

  render() {

    return (
      <>
        <h3>Forgot Password</h3>

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="email"
              required
              className="form-control"
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Login" className="btn btn-primary" />
          </div>
        </form>
      </>
    );


    }

  }

export default ForgotPassword;
