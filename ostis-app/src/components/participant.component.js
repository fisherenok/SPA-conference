import React, { Component } from "react";
import ParticipantDataService from "../services/participant.service";
import {Link} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

export default class Participant extends Component {
  constructor(props) {
    super(props);
    this.onChangeFIO = this.onChangeFIO.bind(this);
    this.onChangeFIOEng = this.onChangeFIOEng.bind(this);
    this.onChangeRank = this.onChangeRank.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeDegree = this.onChangeDegree.bind(this);
    this.onChangeJob = this.onChangeJob.bind(this);
    this.onChangeNote = this.onChangeNote.bind(this);
    this.getParticipant = this.getParticipant.bind(this);
    this.updateParticipation = this.updateParticipation.bind(this);
    this.updateParticipant = this.updateParticipant.bind(this);
    this.deleteParticipant = this.deleteParticipant.bind(this);

    this.state = {
      currentParticipant: {
        id: null,
        fio: "",
        fioEng: "",
        rank: "",
        degree: "",
        email: "",
        city: "",
        country: "",
        phone: "",
        job: "",
        note: "",
        participation: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getParticipant(this.props.match.params.id);
  }

  onChangeFIO = (e) => {
    const fio = e.target.value;

    this.setState(prevState => ({
      currentParticipant: {
        ...prevState.currentParticipant,
        fio: fio
      }
    }));
  }

  onChangeFIOEng = (e) => {
    const fioEng = e.target.value;

    this.setState(prevState => ({
      currentParticipant: {
        ...prevState.currentParticipant,
        fioEng: fioEng
      }
    }));
  }

  onChangeRank = (e) => {
    const rank = e.target.value;

    this.setState(prevState => ({
      currentParticipant: {
        ...prevState.currentParticipant,
        rank: rank
      }
    }));
  }

  onChangeEmail = (e) => {
    const email = e.target.value;

    this.setState(prevState => ({
      currentParticipant: {
        ...prevState.currentParticipant,
        email: email
      }
    }));
  }

  onChangeCity = (e) => {
    const city = e.target.value;

    this.setState(prevState => ({
      currentParticipant: {
        ...prevState.currentParticipant,
        city: city
      }
    }));
  }

  onChangePhone = (e) => {
    const phone = e.target.value;

    this.setState(prevState => ({
      currentParticipant: {
        ...prevState.currentParticipant,
        phone: phone
      }
    }));
  }

  onChangeDegree = (e) => {
    const degree = e.target.value;

    this.setState(prevState => ({
      currentParticipant: {
        ...prevState.currentParticipant,
        degree: degree
      }
    }));
  }

  onChangeJob = (e) => {
    const job = e.target.value;

    this.setState(prevState => ({
      currentParticipant: {
        ...prevState.currentParticipant,
        job: job
      }
    }));
  }

  onChangeNote = (e) => {
    const note = e.target.value;

    this.setState(prevState => ({
      currentParticipant: {
        ...prevState.currentParticipant,
        note: note
      }
    }));
  }

  onChangeCountry = (e) => {
    const country = e.target.value;

    this.setState(prevState => ({
      currentParticipant: {
        ...prevState.currentParticipant,
        country: country
      }
    }));
  }

  getParticipant = (id) => {
    ParticipantDataService.get(id)
      .then(response => {
        this.setState({
          currentParticipant: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  getToastSuccess(test) {
    toast.success(`🚀 ${test}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  getToastError(test) {
    toast.error(`😲 ${test}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  updateParticipation = (status) => {
    let data = {
      id: this.state.currentParticipant.id,
      fio: this.state.currentParticipant.fio,
      fioEng: this.state.currentParticipant.fioEng,
      rank: this.state.currentParticipant.rank,
      email: this.state.currentParticipant.email,
      city: this.state.currentParticipant.city,
      phone: this.state.currentParticipant.phone,
      country: this.state.currentParticipant.country,
      degree: this.state.currentParticipant.degree,
      job: this.state.currentParticipant.job,
      participation: status
    };

    ParticipantDataService.update(this.state.currentParticipant.id, data)
      .then(() => {
        this.setState(prevState => ({
          currentParticipant: {
            ...prevState.currentParticipant,
            participation: status
          }
        }));
        if (this.state.currentParticipant.participation) {
            this.getToastSuccess('The participant was added to conference!');
        } else {
          this.getToastError('The participant was deleted to conference!')
        }

      })
      .catch(e => {
        console.log(e);
        this.getToastError('Content with required field cannot be empty!')
      });
  }

  updateParticipant = () =>  {
    ParticipantDataService.update(
      this.state.currentParticipant.id,
      this.state.currentParticipant
    )
      .then(() => {
        this.getToastSuccess('The participant was updated successfully!')
      })
      .catch(e => {
        console.log(e);
        this.getToastError('Content with required field cannot be empty!')
      });
  }

  deleteParticipant = () => {
    ParticipantDataService.delete(this.state.currentParticipant.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/participants')
        setTimeout(() => {
          this.getToastSuccess('Participant deleted successfully!')
        }, 50)
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentParticipant } = this.state;

    return (
      <div>
          <div className="edit-form">
            <ToastContainer />
            <h3 className='info-edit'>Data</h3>
            <form>
              <div className="form-group">
                <label htmlFor="fio">Full name Rus*</label>
                <input
                  type="text"
                  className="form-control"
                  id="fio"
                  placeholder='Required field'
                  value={currentParticipant.fio}
                  onChange={this.onChangeFIO}
                />
              </div>

              <div className="form-group">
                <label htmlFor="fioEng">Full name Eng</label>
                <input
                  type="text"
                  className="form-control"
                  id="fioEng"
                  value={currentParticipant.fioEng}
                  onChange={this.onChangeFIOEng}
                />
              </div>

              <div className="form-group">
                <label htmlFor="rank">Rank</label>
                <input
                  type="text"
                  className="form-control"
                  id="rank"
                  value={currentParticipant.rank}
                  onChange={this.onChangeRank}
                />
              </div>

              <div className="form-group">
                <label htmlFor="degree">Degree</label>
                <input
                  type="text"
                  className="form-control"
                  id="degree"
                  value={currentParticipant.degree}
                  onChange={this.onChangeDegree}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email*</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder='Required field'
                  value={currentParticipant.email}
                  onChange={this.onChangeEmail}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  value={currentParticipant.phone}
                  onChange={this.onChangePhone}
                />
              </div>

              <div className="form-group">
                <label htmlFor="country">Country*</label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  placeholder='Required field'
                  value={currentParticipant.country}
                  onChange={this.onChangeCountry}
                />
              </div>

              <div className="form-group">
                <label htmlFor="city">City*</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  placeholder='Required field'
                  value={currentParticipant.city}
                  onChange={this.onChangeCity}
                />
              </div>

              <div className="form-group">
                <label htmlFor="job">Job</label>
                <input
                  type="text"
                  className="form-control"
                  id="job"
                  value={currentParticipant.job}
                  onChange={this.onChangeJob}
                />
              </div>

              <div className="form-group">
                <label htmlFor="note">Note</label>
                <input
                  type="text"
                  className="form-control"
                  id="note"
                  value={currentParticipant.note}
                  onChange={this.onChangeNote}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Conference participant:</strong>
                </label>
                {currentParticipant.participation ? ' Yes' : " No"}
              </div>
            </form>

            <button
              className="btn btn-danger btn-sm"
              onClick={this.deleteParticipant}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-success btn-sm"
              onClick={this.updateParticipant}
            >
              Update
            </button>

            {currentParticipant.participation ? (
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => this.updateParticipation(false)}
              >
                Delete from participants
              </button>
            ) : (
              <button
                className="btn btn-outline-primary btn-sm btn-copy"
                onClick={() => this.updateParticipation(true)}
              >
                Add to participants
              </button>
            )}

            <Link
              to={"/"}
              className="btn btn-warning btn-sm"
            >
              Home
            </Link>

            <p>{this.state.message}</p>
          </div>
      </div>
    );
  }
}
