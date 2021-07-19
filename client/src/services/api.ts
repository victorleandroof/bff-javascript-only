import axios from "axios";
import { FormLogin, LoginResponse } from "../models/form-login.interface";

export class ApiService {
  public static async login(formLogin: FormLogin) {
    const response = await axios.post<LoginResponse>("/login", formLogin, {
      withCredentials: true,
    });
    return response.data;
  }
}
