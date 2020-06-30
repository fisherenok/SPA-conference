import React, { Component } from "react";
import ParticipantDataService from "../services/participant.service";
import { Link } from "react-router-dom";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {toast, ToastContainer} from "react-toastify";

export default class ParticipantsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchData = this.onChangeSearchData.bind(this);
    this.retrieveParticipants = this.retrieveParticipants.bind(this);
    this.searchByFIO = this.searchByFIO.bind(this);
    this.searchByFIOEng = this.searchByFIOEng.bind(this);
    this.searchByRank = this.searchByRank.bind(this);
    this.searchByEmail = this.searchByEmail.bind(this);
    this.searchByPhone = this.searchByPhone.bind(this);
    this.searchByCountry = this.searchByCountry.bind(this);
    this.searchByCity = this.searchByCity.bind(this);
    this.searchByData = this.searchByData.bind(this);
    this.searchByJob = this.searchByJob.bind(this);
    this.searchByNote = this.searchByNote.bind(this);
    this.searchByDegree = this.searchByDegree.bind(this);
    this.getAllParticipation = this.getAllParticipation.bind(this);
    this.getStatusCopied = this.getStatusCopied.bind(this);


    this.state = {
      participants: [],
      searchData: "",
      value: "",
      copied: false,
      fio: "fio",
      fioEng: 'fioEng',
      rank: "rank",
      email: "email",
      city: "city",
      country: "country",
      phone: "phone",
      job: 'job',
      note: 'note',
      degree: 'degree',
    };
  }

  componentDidMount() {
    this.retrieveParticipants();
  }

  onChangeSearchData(e) {
    const searchData = e.target.value;
    this.setState({
      searchData: searchData
    });
  }

  retrieveParticipants() {
    ParticipantDataService.getAll()
      .then(response => {
        this.setState({
          participants: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  getAllParticipation() {
    let participants = undefined;
    ParticipantDataService.getAllParticipation()
      .then(response =>  participants = response.data )
      .catch(e => {
        console.log(e);
      });
    participants = this.state.participants.filter(i => i.participation);
    this.setState({
      participants,
    })
  }

  searchByFIO() {
    ParticipantDataService.findByDataKey(this.state.searchData, this.state.fio)
      .then(response => {
        this.setState({
          participants: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchByFIOEng() {
    ParticipantDataService.findByDataKey(this.state.searchData, this.state.fioEng)
      .then(response => {
        this.setState({
          participants: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchByRank() {
    ParticipantDataService.findByDataKey(this.state.searchData, this.state.rank)
      .then(response => {
        this.setState({
          participants: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchByEmail() {
    ParticipantDataService.findByDataKey(this.state.searchData, this.state.email)
      .then(response => {
        this.setState({
          participants: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchByPhone() {
    ParticipantDataService.findByDataKey(this.state.searchData, this.state.phone)
      .then(response => {
        this.setState({
          participants: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchByCountry() {
    ParticipantDataService.findByDataKey(this.state.searchData, this.state.country)
      .then(response => {
        this.setState({
          participants: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchByCity() {
    ParticipantDataService.findByDataKey(this.state.searchData, this.state.city)
      .then(response => {
        this.setState({
          participants: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchByJob() {
    ParticipantDataService.findByDataKey(this.state.searchData, this.state.job)
      .then(response => {
        this.setState({
          participants: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchByNote() {
    ParticipantDataService.findByDataKey(this.state.searchData, this.state.note)
      .then(response => {
        this.setState({
          participants: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchByDegree() {
    ParticipantDataService.findByDataKey(this.state.searchData, this.state.degree)
      .then(response => {
        this.setState({
          participants: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchByData() {
    ParticipantDataService.findByData(this.state.searchData)
      .then(response => {
        this.setState({
          participants: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  getStatusCopied() {
    setTimeout(() => {
      if (this.state.copied) {
        toast.success('🚀 All E-mails copied!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error('😲 E-mails not copied!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    },)
  }

  render() {
    let { searchData, value } = this.state;
    const participants = this.state.participants.sort((a, b) => a.fio > b.fio ? 1 : -1);
    console.log(participants)
    const emailArr = []; let i = 0;
    this.state.participants.filter((value) => value.email !== null ? emailArr.push(value.email) : '');
    value = emailArr.join(' ');
    return (
    <div>
      <ToastContainer />
      <div className="row main-search">
        <div className="col-md-12">
          <div className="input-group mb-3">

            <input
              type="text"
              className="form-control input-search"
              placeholder="Input what you need find"
              value={searchData}
              onChange={this.onChangeSearchData}
            />
            <button
              className="btn btn-outline-secondary btn-up"
              type="button"
              onClick={this.searchByData}
            >
              Search
            </button>
            <div className="input-group-append">
              <div className="btn-group">
                <button type="button" className="btn btn-outline-secondary dropdown-toggle btn-up " data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                  Search by
                </button>
                <div className="dropdown-menu">
                  <button
                    className="btn btn-sm btn-outline-success btn-search"
                    type="button"
                    onClick={this.searchByFIO}
                  >
                    Full name Rus
                  </button>

                  <button
                    className="btn btn-sm btn-outline-success btn-search"
                    type="button"
                    onClick={this.searchByFIOEng}
                  >
                    Full name Eng
                  </button>

                  <button
                    className="btn btn-sm btn-outline-success btn-search"
                    type="button"
                    onClick={this.searchByRank}
                  >
                    Rank
                  </button>

                  <button
                    className="btn btn-sm btn-outline-success btn-search"
                    type="button"
                    onClick={this.searchByDegree}
                  >
                    Degree
                  </button>

                  <button
                    className="btn btn-sm btn-outline-success btn-search"
                    type="button"
                    onClick={this.searchByEmail}
                  >
                    Email
                  </button>

                  <button
                    className="btn btn-sm btn-outline-success btn-search"
                    type="button"
                    onClick={this.searchByPhone}
                  >
                    Phone
                  </button>

                  <button
                    className="btn btn-sm btn-outline-success btn-search"
                    type="button"
                    onClick={this.searchByCountry}
                  >
                    Country
                  </button>

                  <button
                    className="btn btn-sm btn-outline-success btn-search"
                    type="button"
                    onClick={this.searchByCity}
                  >
                    City
                  </button>

                  <button
                    className="btn btn-sm btn-outline-success btn-search"
                    type="button"
                    onClick={this.searchByJob}
                  >
                    Job
                  </button>

                  <button
                    className="btn btn-sm btn-outline-success btn-search"
                    type="button"
                    onClick={this.searchByNote}
                  >
                    Note
                  </button>

                </div>
              </div>
            </div>

            <button
              className="btn btn-outline-secondary btn-up"
              type="button"
              onClick={this.getAllParticipation}
            >
              Participation
            </button>

            <div>
              <CopyToClipboard text={value} onCopy={() => this.setState({copied: true})}>
                <button
                  className="btn btn-success btn-copy"
                  onClick={this.getStatusCopied}>
                  Copy all E-mails
                </button>
              </CopyToClipboard>
            </div>

          </div>

          </div>
        </div>



      <div className="table-responsive-xl">
        <table className="table table-hover">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Full name</th>
            <th scope="col">Rank / Degree</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Country</th>
            <th scope="col">City</th>
            <th scope="col">Job</th>
            <th scope="col">Note</th>
            <th scope="col">Invite</th>
            <th scope="col">Edit</th>
          </tr>
          </thead>
          <tbody>
          { participants.map(n =>
            <tr key={n.id}>
              <th scope="row">{++i}</th>
              <td><b>Rus:</b> {n.fio}<br/><b>Eng:</b> {n.fioEng}</td>
              <td className='form-table'><b>Rank:</b> {n.rank}<br/><b>Deg:</b> {n.degree}</td>
              <td className='form-table-email'>{n.email}</td>
              <td className='form-table'>{n.phone}</td>
              <td>{n.country}</td>
              <td>{n.city}</td>
              <td className='form-table'>{n.job}</td>
              <td className='form-table'>{n.note}</td>
              <td className='form-table-min'>{n.participation ? "Yes" : "No"}</td>
              <td className='form-table-min'>
                <Link
                  to={"/participants/" + n.id}
                  className="btn btn-warning btn-sm"
                >
                  Edit
                </Link>
              </td>
            </tr>
          )}
          </tbody>
          <tbody className='footer-line'><tr><td>-</td></tr></tbody>
        </table>
      </div>
      </div>
    );
  }
}
