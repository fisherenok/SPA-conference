import http from "../http-common";

class ParticipantDataService {

  getAll() {
    return http.get("/participants");
  }

  get(id) {
    return http.get(`/participants/${id}`);
  }

  getAllParticipation() {
    return http.get("/participants");
  }

  create(data) {
    return http.post("/participants", data);
  }

  update(id, data) {
    return http.put(`/participants/${id}`, data);
  }

  delete(id) {
    return http.delete(`/participants/${id}`);
  }

  findByDataKey(data, key) {
    return http.get(`/participants?key=${key}, ${data}`);
  }

  findByData(data) {
    return http.get(`/participants?data= ${data}`);
  }
}

export default new ParticipantDataService();
