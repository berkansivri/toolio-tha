import Vuetify from "vuetify";
import { mount, createLocalVue, shallowMount } from "@vue/test-utils";
import Products from "@/components/Products.vue";
import { getProducts } from "@/service/product.js";

jest.mock("@/service/product.js", () => {
  return {
    getProducts: jest.fn(() => {
      return [
        { id: 1, title: "test1" },
        { id: 2, title: "test2" },
        { id: 3, title: "test3" },
      ];
    }),
  };
});

describe("Products.vue", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("renders a vue instance", () => {
    expect(shallowMount(Products).vm).toBeTruthy();
  });

  it("should call products api on render", (done) => {
    const wrapper = mount(Products, {
      localVue,
      vuetify,
    });

    wrapper.vm.$nextTick(() => {
      expect(getProducts).toHaveBeenCalled();
      expect(wrapper.vm.products).toEqual(getProducts());

      done();
    });
  });

  it("should get products when press enter on search input", async () => {
    const wrapper = mount(Products, {
      localVue,
      vuetify,
    });

    const searchInput = wrapper.find("input");
    searchInput.setValue("test");
    expect(wrapper.vm.query.title).toBe("test");

    await searchInput.trigger("keydown.enter");
    expect(getProducts).toHaveBeenCalledWith(wrapper.vm.query);
  });

  it("should prompt an error when api request failed", (done) => {
    const errorMessage = "test error";
    getProducts.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    const wrapper = mount(Products, {
      localVue,
      vuetify,
    });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.error).toEqual(errorMessage);

      const prompter = wrapper.find(".v-snack__wrapper");
      expect(prompter.exists());
      expect(prompter.isVisible()).toBe(true);

      done();
    });
  });
});
