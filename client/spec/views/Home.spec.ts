import { mount, shallowMount } from "@vue/test-utils";
import { ApiService } from "../../src/services/api";
import Home from "../../src/views/Home.vue";

describe("Home", () => {
  const flushAllPromises = () => {
    return new Promise((resolve) => setImmediate(resolve));
  };
  const bvToastMock = {
    show: jest.fn(),
  };
  const apiLoginMock = jest.fn();
  const selectors = {
    page: "[data-test-home-page]",
    createAccountTitle: "[data-test-create-account-title]",
    createAccountSubtitle: "[data-test-create-account-subtitle]",
    createAccountLink: "[data-test-create-account-link]",
    toastError: "[data-test-toast]",
    formLogin: "[data-test-form-login]",
    inputUsername: "[data-test-input-username]",
    inputPassword: "[data-test-input-password]",
    formLoading: "[data-test-form-loading]",
    formSubmit: "[data-test-form-submit]",
    resetPassword: "[data-test-reset-password]",
  };

  beforeEach(() => {
    ApiService.login = apiLoginMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should init component", async () => {
    shallowMount(Home);
    expect(Home.name).toBe("Home");
  });

  it("should verify title, subtitle and link from create account grid", () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.find(selectors.createAccountTitle).text()).toEqual(
      "Bem-Vindo"
    );
    expect(wrapper.find(selectors.createAccountSubtitle).text()).toContain(
      "Novo aqui?"
    );
    expect(wrapper.find(selectors.createAccountLink).text()).toEqual(
      "Criar uma conta"
    );
    expect(wrapper.find(selectors.createAccountLink).attributes().href).toEqual(
      "/create-account"
    );
  });

  it("should verify texts of toast error", () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.find(selectors.toastError).text()).toEqual(
      "Usuário ou senha Inválido"
    );
  });

  it("should verify texts of buttom submit", () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.find(selectors.formSubmit).text()).toEqual("Entrar");
  });

  it("should verify link to reset password", () => {
    const wrapper = shallowMount(Home);
    const linkResetPassword = wrapper.find(selectors.resetPassword);
    expect(linkResetPassword.text()).toEqual("Esqueceu a senha?");
    expect(linkResetPassword.attributes().href).toEqual("/reset-password");
  });

  it("should show toast when username and password is empty", async () => {
    const wrapper = shallowMount(Home, {
      mocks: {
        $bvToast: bvToastMock,
      },
    });

    wrapper.setData({ username: "     ", password: "" });

    const formLogin = wrapper.find(selectors.formLogin);

    formLogin.trigger("submit");
    await wrapper.vm.$nextTick();

    expect(ApiService.login).not.toBeCalled();
    expect(wrapper.vm.$bvToast.show).toBeCalledWith("invalidForm");
  });

  it("should show toast when api login has error", async () => {
    const wrapper = shallowMount(Home, {
      mocks: {
        $bvToast: bvToastMock,
      },
    });
    const error = new Error("error");
    apiLoginMock.mockRejectedValueOnce(error);
    const dataLogin = { username: "mock", password: "mock" };
    wrapper.setData(dataLogin);

    const formLogin = wrapper.find(selectors.formSubmit);

    formLogin.trigger("submit");
    await flushAllPromises();

    expect(ApiService.login).toBeCalledWith(dataLogin);
    expect(wrapper.vm.$bvToast.show).toBeCalledWith("invalidForm");
  });

  it("should redirect to url callback when api login return success", async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete window.location;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.location = { replace: jest.fn() };
    const wrapper = shallowMount(Home, {
      mocks: {
        $bvToast: bvToastMock,
      },
    });
    apiLoginMock.mockResolvedValueOnce({ url: "http://mock" });
    const dataLogin = { username: "mock", password: "mock" };
    wrapper.setData(dataLogin);

    const formLogin = wrapper.find(selectors.formSubmit);

    formLogin.trigger("submit");
    await flushAllPromises();

    expect(ApiService.login).toBeCalledWith(dataLogin);
    expect(wrapper.vm.$bvToast.show).not.toBeCalled();
    expect(window.location.replace).toBeCalledWith("http://mock");
  });
});
