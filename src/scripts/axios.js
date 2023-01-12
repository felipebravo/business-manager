const token = localStorage.getItem("@kenzieCompanies:token");

export const instance = axios.create({
  baseURL: "http://localhost:6278",
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
