import { shallowMount } from "@vue/test-utils";
import Banner from "../../src/components/Banner.vue";

describe("Banner", () => {
  const selectors = {
    banner: "[data-test-banner]",
    link: "[data-test-banner-logo-link]",
    logo: "[data-test-banner-logo]",
    title: "[data-test-banner-title]",
    background: "[data-test-banner-background]",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should init component", async () => {
    shallowMount(Banner);
    expect(Banner.name).toBe("Banner");
  });

  it("should verify link banner logo", () => {
    const wrapper = shallowMount(Banner);
    const bannerLogoLinkAtributes = wrapper.find(selectors.link).attributes();
    expect(bannerLogoLinkAtributes.href).toEqual("/");
  });

  it("should verify banner logo", () => {
    const wrapper = shallowMount(Banner);
    const bannerLogoAtributes = wrapper.find(selectors.logo).attributes();
    expect(bannerLogoAtributes.src).toEqual("../assets/logo.png");
  });

  it("should verify banner title", () => {
    const wrapper = shallowMount(Banner);
    const bannerTitleElement = wrapper.find(selectors.title);
    expect(bannerTitleElement.text()).toEqual(
      `A Informação Traduzida
        em Desenvolvimento`
    );
  });

  it("should verify banner background", () => {
    const wrapper = shallowMount(Banner);
    const bannerBackgroundElement = wrapper.find(selectors.background);
    const includeLoginBanner = bannerBackgroundElement.classes().includes("login-banner\n");
    expect(includeLoginBanner).toBeTruthy();
  });
});
