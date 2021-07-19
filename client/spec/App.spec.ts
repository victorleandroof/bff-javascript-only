import { shallowMount } from "@vue/test-utils";
import App from "../src/App.vue";

describe("App", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should init component", () => {
    const wrapper = shallowMount(App, {
      stubs: ["router-view"],
    });
    expect(App.name).toBe("App");
  });
});
