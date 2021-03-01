import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import * as emailjs from 'emailjs-com';


const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [form, showForm] = useState(false);

  const resetForm = () =>  {
    showForm(false)
    setName("")
    setEmail("")
    setMessage("")
  }

  const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Submitting your ${message}`)

      const templateParams = {
      from_name: name,
      from_email: email,
      to_name: 'atxbrews@gmail.com',
      message_html: message,
    };
    emailjs.send(
      'service_el1dqnl',
      'template_yl9wt3d',
       templateParams,
      'user_CcAYIofUs80cDNbvq18lu'
    )
    resetForm();
  };

//SERVICE ID service_el1dqnl


console.log(form)

    return (
      <>
      <Card className="contact-card">
        <h3 className="contact-header">Contact Me:</h3>

        <div className="contact-text">
        <p>I created and maintain this site to develop my coding skills and to explore what Austin's beer scene has to offer.</p>
        <p>Drop a line or mention an upcoming event or news, below!</p>
        <i>-Chris Chewning</i>
        </div>
        {!form ? (
          <ArrowDropDownIcon onClick={() => showForm(true)} />
        ) :
        <form className="contact-form" onSubmit={handleSubmit}>
             <label className="contact-email-label">Your Email Address</label>
             <input className="contact-email-input"
               type="email"
               value={email}
               required
               onChange ={e => setEmail(e.target.value)}
             ></input>

             <label className="contact-name-label">Your Name</label>
             <input className="contact-name-input"
               type="text"
               value={name}
               required
               onChange ={e => setName(e.target.value)}
             ></input>

             <label type ="text" className="contact-text-label">Text</label>
             <textarea className="contact-text-input"
               type="text"
               value={message}
               rows="8"
               required
               onChange  ={e => setMessage(e.target.value)}
             ></textarea>

             <Button variant="contained" color="primary" className="login-btn"
               input type="submit" value="Contact">Submit</Button>

            </form>
          }
    </Card>
      </>
    );
}

export default Contact;
