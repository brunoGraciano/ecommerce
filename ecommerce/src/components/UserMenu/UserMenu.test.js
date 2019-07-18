import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import UserMenu from "./UserMenu";
import { Link } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("<UserMenu />", () => {
  let wrapper;
  const setRouteLeaveHook = jest.fn();
  beforeEach(() => {
    wrapper = shallow(
      <UserMenu.WrappedComponent params={{ router: setRouteLeaveHook }} />
    );
  });

  it("should render one <Link /> elements if authenticated has role USER", () => {
    wrapper.setProps({ role: "ROLE_USER" });
    expect(wrapper.find(Link)).toHaveLength(1);
  });

  it("should render five <Link /> elements if authenticated has role ADMIN", () => {
    wrapper.setProps({ role: "ROLE_ADMIN" });
    expect(wrapper.find(Link)).toHaveLength(5);
  });
});
