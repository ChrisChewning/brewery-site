import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import MyBeer from "../components/MyBeer";
import Moment from "react-moment";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';



class MyAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: this.props.user.image,
      imageError: "",
      file: null,
      loggedOut: false,
      user: {},
      uploadImg: false,
      posts: 0,
      comments: 0,
      updateEmailModal: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeImg = this.onChangeImg.bind(this);
    this.user = window.localStorage.getItem("user"); //this.user allows it to be accessible instead of const user
    this.handleLogout = this.handleLogout.bind(this);
  }


handler = () => {
  this.setState({ user: this.props.user, image: this.props.user.image });
}

componentDidMount() {
  this.handler();
  this.getPosts();
  this.getComments();
}



//GET POSTS FOR USER
getPosts = (posts) => {
  axios
    .get(
      `http://localhost:3000/api/community/posts/posts/${this.props.user.username}`
    )
    .then((response) => {
      this.setState({ posts: response.data });
    })
    .catch((error) => {
      console.log(error.response);
    });
}

getComments = (comments) => {
  axios.get(
    `http://localhost:3000/api/community/posts/comments/${this.props.user.username}`
  )
  .then((response) => {
    this.setState({ comments: response.data });
  })
  .catch((error) => {
    console.log(error.response);
  });
}


//UPDATE REQUESTS &  MODAL


openModal = () => {
  this.setState({updateEmailModal: true})
  console.log('CLICKED')
}

uploadImg = () => {
  this.setState({uploadImg: true})
}


updateEmail = (e) => {
  e.preventDefault();

  const editEmail = {
    email: this.state.user.email
  }

  axios.post(`http://localhost:3000/users/update-email/${this.props.user._id}`, editEmail)
  .then((response) => {
    return response
  })
  .catch((error) => {
    console.log(error.response);
  });
  this.setState({ updateEmailModal: false });
}



  onSubmit = (e) => {
    const formData = new FormData();
    formData.append("image", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(
        `http://localhost:8000/users/update-image/${this.user}`,
        formData,
        config
      )
      .then((res) => {
        this.setState({ image: URL.createObjectURL(e.target.files[0]) });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  onChangeImg = (e) => {
    this.setState({ file: e.target.files[0] });
    file: URL.createObjectURL(e.target.files[0]);
  }


  onChangeEmail = (e) => {
    const {value} = e.target; //before calling setState, grab e.target.value  synthetic event
    console.log(value)
    this.setState(prevState => {
  let user = Object.assign({}, prevState.user);  // creating copy of state variable jasper
  user.email = value          // update the name property, assign a new value
  return { user };                                 // return new object jasper object
})
}





  handleLogout() {
    this.setState({ loggedOut: true });
    window.localStorage.clear();
  }




  render() {
    console.log(this.state.user)
    if (!this.user) {
      this.setState({ loggedOut: true });
    }
    if (this.state.loggedOut) {
      return <Redirect to={"/"} />;
    }

    return (
  <>
    <div className="my-account-parent">

      <>
      <Card>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.updateEmailModal}
        >
        <div className="modalStyle">
          <h2 className="modalTitle">Update Email Address</h2>

            <form className="modalContent">
              <div className="modalBreweryBeerRating">
                <label>
                  Update Email:
                  <input
                    type="text"
                    value={this.state.user.email}
                    onChange={this.onChangeEmail}
                  />
                </label>

                <button type="button" value="Submit" className="modalButton" onClick={this.updateEmail}>Update</button>

              </div>
                </form>

        </div>
      </Modal>
      </Card>
        </>
      <Card className="my-account-parent">
          <p className="account-page-titles">My Account</p>
          <div className="img-username-changeimg-email">
        <img className="profile-img" src={this.state.image} alt="profile" />
          <p>{this.props.user.username}</p>
          <div className="form-group">
            <label htmlFor="image" onClick={this.uploadImg} className={this.state.uploadImg ? 'img-btn-hide-save' : 'account-label'}>Upload Image</label>
            <input
              type="file"
              name="image"
              id="image"
              className="form-control-file"
              onChange={this.onChangeImg}
            ></input>
            <form
              encType="multipart/form-data"
              name="image"
              onSubmit={this.onSubmit}
            >
              <div className="form-group">
                <button name="image" id="img-save-btn" className={this.state.uploadImg ? 'account-label' : 'img-btn-hide-save'}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="img-username-changeimg-email">
          <MailOutlineIcon className="email-outline" />
        <p>{this.props.user.email}</p>
        <div className="form-group">
          <label onClick={this.openModal} className="account-label">Update Email</label>
        </div>
      </div>
        </Card>

    <Card className="mbr-posts-comments-card">
        <div className="member-posts-comments">
          <PersonOutlineIcon className="person-outline" />
        <p className="member-since">Member Since: <Moment format=" MMM D, YYYY">{this.props.user.register_date}</Moment></p>
        </div>
      <div className="user-comments-parent">
        <CreateOutlinedIcon className="posts-outline" />
        <p className="user-posts-total">Posts: {this.state.posts} </p>
        <ChatOutlinedIcon className="comments-outline" />
        <p className="user-comments-total">Comments: {this.state.comments} </p>
        </div>
      </Card>


      <Card>

        </Card>

        <>
          <div className="beerList">
            <MyBeer user={this.props.user} addBeer={this.handler} />
          </div>
        </>
      </div>
      </>
    );
  }
}
export default MyAccount;
