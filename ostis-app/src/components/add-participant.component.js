import React, { Component } from "react";
import ParticipantDataService from "../services/participant.service";
import {Link} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

export default class AddParticipant extends Component {
  constructor(props) {
    super(props);
    this.onChangeFIO = this.onChangeFIO.bind(this);
    this.onChangeFIOEng = this.onChangeFIOEng.bind(this);
    this.onChangeRank = this.onChangeRank.bind(this);
    this.onChangeDegree = this.onChangeDegree.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeJob = this.onChangeJob.bind(this);
    this.onChangeNote = this.onChangeNote.bind(this);
    this.saveParticipant = this.saveParticipant.bind(this);
    this.newParticipant = this.newParticipant.bind(this);

    this.state = {
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
      participation: false,

      submitted: false
    };
  }

  onChangeFIO = (e) => {
    this.setState({
      fio: e.target.value
    });
  }

  onChangeFIOEng = (e) => {
    this.setState({
      fioEng: e.target.value
    });
  }

  onChangeRank = (e) => {
    this.setState({
      rank: e.target.value
    });
  }

  onChangeDegree = (e) => {
    this.setState({
      degree: e.target.value
    });
  }

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  onChangeCity = (e) => {
    this.setState({
      city: e.target.value
    });
  }

  onChangeCountry = (e) => {
    this.setState({
      country: e.target.value
    });
  }

  onChangePhone = (e) => {
    this.setState({
      phone: e.target.value
    });
  }

  onChangeJob = (e) => {
    this.setState({
      job: e.target.value
    });
  }

  onChangeNote = (e) => {
    this.setState({
      note: e.target.value
    });
  }

  saveParticipant() {
    let data = {
      fio: this.state.fio,
      fioEng: this.state.fioEng,
      rank: this.state.rank,
      degree: this.state.degree,
      email: this.state.email,
      city: this.state.city,
      country: this.state.country,
      phone: this.state.phone,
      job: this.state.job,
      note: this.state.note,
    };

    ParticipantDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          fio: response.data.fio,
          fioEng: response.data.fioEng,
          rank: response.data.rank,
          email: response.data.email,
          city: response.data.city,
          country: response.data.country,
          phone: response.data.phone,
          degree: response.data.degree,
          job: response.data.job,
          note: response.data.note,
          participation: response.data.participation,

          submitted: true
        });
        setTimeout(() => {
          toast.success('🚀 You submitted successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }, 50)
      })
      .catch(e => {
        console.log(e);
        (() => {
          toast.error('😲 Content with required field cannot be empty!!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })();
      });
  }

  newParticipant() {
    this.setState({
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
      participation: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        <ToastContainer />
        {this.state.submitted ? (
          <div className='add-success'>
            <h4>You submitted successfully!</h4>
            <ToastContainer />
            <button className="btn btn-success" onClick={this.newParticipant}>
              Add more
            </button>

            <Link
              to={"/"}
              className="btn btn-warning btn-home"
            >
              Home
            </Link>
          </div>
        ) : (
          <div>
            <h3 className='info-edit'>Create</h3>
            <div className="form-group">
              <label htmlFor="fio">Full name Rus*</label>
              <input
                type="text"
                className="form-control"
                id="fio"
                required
                placeholder='Required field'
                value={this.state.fio}
                onChange={this.onChangeFIO}
                name="fio"
              />
            </div>

            <div className="form-group">
              <label htmlFor="fioEng">Full name Eng</label>
              <input
                type="text"
                className="form-control"
                id="fioEng"
                required
                value={this.state.fioEng}
                onChange={this.onChangeFIOEng}
                name="fioEng"
              />
            </div>

            <div className="form-group">
              <label htmlFor="rank">Rank</label>
              <input
                type="text"
                className="form-control"
                id="rank"
                required
                value={this.state.rank}
                onChange={this.onChangeRank}
                name="rank"
              />
            </div>

            <div className="form-group">
              <label htmlFor="degree">Degree</label>
              <input
                type="text"
                className="form-control"
                id="degree"
                required
                value={this.state.degree}
                onChange={this.onChangeDegree}
                name="degree"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <input
                type="text"
                className="form-control"
                id="email"
                required
                placeholder='Required field'
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                required
                value={this.state.phone}
                onChange={this.onChangePhone}
                name="phone"
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">Country*</label>
              <input
                type="text"
                className="form-control"
                id="country"
                required
                placeholder='Required field'
                value={this.state.country}
                onChange={this.onChangeCountry}
                name="country"
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City*</label>
              <input
                type="text"
                className="form-control"
                id="city"
                required
                placeholder='Required field'
                value={this.state.city}
                onChange={this.onChangeCity}
                name="city"
              />
            </div>

            <div className="form-group">
              <label htmlFor="job">Job</label>
              <input
                type="text"
                className="form-control"
                id="job"
                required
                value={this.state.job}
                onChange={this.onChangeJob}
                name="job"
              />
            </div>

            <div className="form-group">
              <label htmlFor="note">Note</label>
              <input
                type="text"
                className="form-control"
                id="note"
                required
                value={this.state.note}
                onChange={this.onChangeNote}
                name="note"
              />
            </div>

            <div className="btn-submit">
              <button onClick={this.saveParticipant} className="btn btn-success btn-submit">
                Submit
              </button>
            </div>

          </div>
        )}
      </div>
    );
  }
}
