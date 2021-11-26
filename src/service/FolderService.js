import http from "./http-common";

class FolderService {
    getAll() {
        return http.get("/folders");
    }

    get(id) {
        return http.get(`/folders/${id}`);
    }

    count() {
        return http.get(`/folders/count`);
    }

    create(data) {
        return http.post("/folder/create", data);
    }

    update(id, data) {
        return http.put(`/folder/update/${id}`, data);
    }

    delete(id) {
        return http.delete(`/folder/delete/${id}`);
    }

}

export default new FolderService();