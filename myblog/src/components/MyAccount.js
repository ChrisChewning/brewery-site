import React, { Component } from 'react';
import axios from "axios";
import CreateUser from "../components/CreateUser";
import { Link } from "react-router-dom";

class MyAccount extends Component {
  constructor(props) {
    super(props);

//console.log(PROCESS.env.PUBLIC_URL, ' process env')
    //this.onFormSubmit = this.onFormSubmit.bind(this);
    //this.onChange = this.onChange.bind(this);

    this.state = {

      image: this.props.user.image,
      imageError: '',
      file: null,
      user: {}
    };

    this.handleSuccessAuth = this.handleSuccessAuth.bind(this);
    this.changeImage = this.changeImage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.user = window.localStorage.getItem('user'); //this.user allows it to be accessible instead of const user

  }


  changeImage = e => {
    e.preventDefault();

    const formData = new FormData();
        formData.append('image', this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
    console.log('clicked')
    axios.post(`http://localhost:8000/users/update-image/${this.user}`, formData, config)
  .then(res => {
    console.log(res.data, ' res.data')
  this.setState({image: URL.createObjectURL(e.target.files[0])})
console.log(this.state.image, ' new image')
  })
  .catch(error => {
    console.log(error.res) //undefined
  //  this.setState({imageError: error.response.data.msg})
    console.log(this.state.imageError) //undefined
  })


}

onChange(e) {
        this.setState({file:e.target.files[0]});
        file: URL.createObjectURL(e.target.files[0])

    }

handleSuccessAuth(data){
  //update parent component

  //redirect user
  this.props.history.push("/myaccount"); //access to history

}

  render() {
    console.log(this.props.user)
    console.log(localStorage, 'local storage')
    let buttons;

    if(this.props.user) {
      buttons = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-pages" id="auth">
          <Link to={'/'} onClick={() => localStorage.clear()}>Logout </Link>
        </li>
      </ul>
    )
    } else {
      buttons = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-pages" id="auth">
      <Link to="/Login">Login </Link>
        </li>
      </ul>
  )
    }


    return (
      <>
      <p>My Account Page</p>
        <h2>hi {this.props.user.username}</h2>
        <h3>email address: {this.props.user.email}</h3>
        <h3>Member since: {this.props.user.register_date}</h3>

        <form enctype="multipart/form-data" name="image" onSubmit={this.changeImage}>
          <div class="form-group">
            <label for="image">Upload image</label>
      <input type="file" name="image" id="image" class="form-control-file" onChange= {this.onChange}></input>

</div>
      <div className="form-group">
        <button
          type="submit"
          name="image"
          className="btn btn-primary">Save</button>
    </div>
    </form>
    <p> image here: </p>
            <img src = {this.state.image}  />
    {buttons}
    </>
    )
}
}
export default MyAccount;
