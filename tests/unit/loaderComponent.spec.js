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
  });
