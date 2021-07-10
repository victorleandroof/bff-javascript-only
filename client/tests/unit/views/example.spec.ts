import { shallowMount } from "@vue/test-utils";
import Home from "../../../src/views/Home.vue";

describe("Home.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(Home);
    expect(wrapper.text()).toMatch(msg);
  });
});
