import { mount } from '@vue/test-utils';
import MyComponent from '@/views/HomeView.vue';

describe('MyComponent', () => {
  it('renders correctly', () => {
    const wrapper = mount(MyComponent);
    expect(wrapper.exists()).toBe(true);
  });

  it('activates search bar when icon is clicked', async () => {
    const wrapper = mount(MyComponent);
    const icon = wrapper.find('.icon');
    await icon.trigger('click');
    expect(wrapper.vm.searchBarOn).toBe(true);
  });

  it('performs search when enter key is pressed', async () => {
    const wrapper = mount(MyComponent);
    const input = wrapper.find('input');
    await input.setValue('test');
    await input.trigger('keyup.enter');
    expect(wrapper.vm.loadingSpinner).toBe(true);
  });

  // You can write more tests for other functionality as needed
});
