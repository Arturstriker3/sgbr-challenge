// loaderComponent.spec.js
import { shallowMount } from '@vue/test-utils';
import LoaderComponent from '@/components/loaderComponent.vue';

describe('LoaderComponent', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(LoaderComponent);
    expect(wrapper.exists()).toBe(true);
  });

  it('has 12 spinner divs', () => {
    const wrapper = shallowMount(LoaderComponent);
    const spinnerDivs = wrapper.findAll('.lds-spinner div');
    expect(spinnerDivs.length).toBe(12);
  });

  it('applies correct animation delay to each spinner div', () => {
    const wrapper = shallowMount(LoaderComponent);
    const spinnerDivs = wrapper.findAll('.lds-spinner div');
    spinnerDivs.wrappers.forEach((div, index) => {
      const expectedDelay = `${-0.1 * (index + 1)}s`;
      expect(div.element.style.animationDelay).toBe(expectedDelay);
    });
  });

  it('applies correct color to spinner divs', () => {
    const wrapper = shallowMount(LoaderComponent);
    const spinnerDivs = wrapper.findAll('.lds-spinner div:after');
    spinnerDivs.wrappers.forEach(div => {
      expect(div.element.style.background).toBe('color1');
    });
  });
});