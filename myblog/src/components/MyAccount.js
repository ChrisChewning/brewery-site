import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import MyBeer from "../components/MyBeer";
//import MyFutureBeer from "../components/MyFutureBeer";
import Moment from "react-moment";
import Modal from "@material-ui/core/Modal";
//import AddBeerModal from "../components/AddBeer";
import Card from "@material-ui/core/Card";
//import List from '@material-ui/core/List'
//import ListItem from '@material-ui/core/ListItem'
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
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
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

uploadImg = () => {
  this.setState({uploadImg: true})
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
  };

  onChange(e) {
    this.setState({ file: e.target.files[0] });
    file: URL.createObjectURL(e.target.files[0]);
  }

  handleLogout() {
    this.setState({ loggedOut: true });
    window.localStorage.clear();
  }




  render() {
    if (!this.user) {
      this.setState({ loggedOut: true });
    }
    if (this.state.loggedOut) {
      return <Redirect to={"/"} />;
    }

    return (
  <>
    <div className="my-account-parent">
      <Card className="my-account-parent">
          <p className="account-page-titles">My Account</p>
          <div className="img-username-changeimg-email">
        <img className="profile" src={this.state.image} alt="profile" />
          <p>{this.props.user.username}</p>
          <div className="form-group">
            <label htmlFor="image" onClick={this.uploadImg} className={this.state.uploadImg ? 'img-btn-hide-save' : 'account-label'}>Upload Image</label>
            <input
              type="file"
              name="image"
              id="image"
              className="form-control-file"
              onChange={this.onChange}
            ></input>
            <form
              encType="multipart/form-data"
              name="image"
              onSubmit={this.onSubmit}
            >
              <div className="form-group">
                <button type="submit" name="image" id="img-save-btn" className={this.state.uploadImg ? 'account-label' : 'img-btn-hide-save'}>
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
          <label onClick="" className="account-label">Update Email</label>
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
