import { FormLogin } from "../../src/models/form-login.interface";
import { AxiosResponse, AxiosError } from "axios";

const postAxiosMock = jest.fn();

jest.mock("axios", () => ({
  post: postAxiosMock,
}));

import { ApiService } from "../../src/services/api";
describe("Api", () => {
  const requestLogin: FormLogin = {
    username: "mock",
    password: "password",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should return url to callback when service return success", async () => {
      const responseMock = {
        data: {
          url: "callback",
        },
      } as AxiosResponse;

      postAxiosMock.mockResolvedValueOnce(responseMock);

      const response = await ApiService.login(requestLogin);

      expect(postAxiosMock).toBeCalledWith("/login", requestLogin, {
        withCredentials: true,
      });
      expect(response.url).toEqual(responseMock.data.url);
    });

    it("should throw error when service has error", async () => {
      const responseWithError = {
        response: {
          data: {
            message: "failed",
          },
        },
      } as AxiosError;
      postAxiosMock.mockRejectedValueOnce(responseWithError);
      try {
        await ApiService.login(requestLogin);
      } catch (error) {
        expect(error.response.data.message).toEqual("failed");
      }
    });
  });
});
