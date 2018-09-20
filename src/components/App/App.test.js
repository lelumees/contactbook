import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import App from './index.js';

describe('App Snapshot', () => {
    it('renders', () => {
        const component = renderer.create(<App />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('App Component', () => {
    it('renders without crashing', () => {
        shallow(<App />);
    });

    it('renders welcome message', () => {
        const wrapper = shallow(<App />);
        const welcome = <h2 className='App-title'>Welcome to ContactBook!</h2>;
        expect(wrapper.contains(welcome)).toEqual(true);
    });

    it('simulates search event', () => {
        const handleChangeSpy = sinon.spy(App.prototype, 'handleSearchInputChange');
        const wrapper = mount(<App />);
        const event = {target: {name: 'App-searchbar-input', value: 'somequery'}};

        wrapper.find('.App-searchbar-input').simulate('change', event);
        expect(handleChangeSpy.calledOnce).toEqual(true);
    });
});
