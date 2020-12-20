import React, {useState } from "react";
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const AddBeerModal = (props) => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [brewery, setBrewery] = useState("");
    const [beer, setBeer] = useState("");
    const [rating, setRating] = useState("");
    const [notes, setNotes] = useState("");


  const handleSubmit = (evt) => {
      evt.preventDefault();

        const addBeer = {
          brewery: brewery,
          beer: beer,
          rating: rating,
          notes: notes
        };

        console.log(addBeer, ' this is addBeer');


      axios.post(`/api/mybeers/${props.user._id}/add-beer`, addBeer)
      .then(response => {
      console.log(response)
      })
      .catch(error => {
      console.log(error.response)
      })

      };


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    console.log(props.user._id)
    // email)
    // console.log(props.user.id, ' .id')
    // console.log(propser._id, ' ._id')
    //
    return (
        <div>

            <Button variant="contained" color="primary" onClick={handleOpen}>
                Open Modal
            </Button>

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>

                    <h2>Simple React Modal</h2>
                    <>
                    <form onSubmit={handleSubmit}>
                      <label>
                        Brewery:
                        <input
                          type="text"
                          value={brewery}
                          onChange={e => setBrewery(e.target.value)}
                        />
                      </label>
                      <label>
                        Beer:
                        <input
                          type="text"
                          value={beer}
                          onChange={e => setBeer(e.target.value)}
                        />
                      </label>
                      <label>
                        Rating:
                        <input
                          type="text"
                          value={rating}
                          onChange={e => setRating(e.target.value)}
                        />
                      </label>
                      <label>
                        Notes:
                        <input
                          type="text"
                          value={notes}
                          onChange={e => setNotes(e.target.value)}
                        />
                      </label>
                      <input type="submit" value="Submit" />
                    </form>
                </>
                </div>
            </Modal>
        </div>
    );
}

export default AddBeerModal;
