import React from "react";
import { OtaTimeSelector, changeOtaHour } from "..";
import { shallow } from "enzyme";
import { FBSelect } from "../../../../../ui";
import { fakeDevice } from "../../../../../__test_support__/resource_index_builder";

describe("OTA time selector", () => {
  it("selects an OTA update time", () => {
    const onUpdate = jest.fn();
    const el = shallow(<OtaTimeSelector onChange={onUpdate} value={3} />);
    el.find(FBSelect).simulate("change", { label: "at 5 PM", value: 17 });
    expect(onUpdate).toHaveBeenCalledWith(17);
  });

  it("unselects an OTA update time", () => {
    const onUpdate = jest.fn();
    const el = shallow(<OtaTimeSelector onChange={onUpdate} value={3} />);
    el.find(FBSelect).simulate("change", { label: "no", value: -1 });
    // tslint:disable-next-line:no-null-keyword
    expect(onUpdate).toHaveBeenCalledWith(null);
  });

  it("changes the OTA hour", () => {
    const device = fakeDevice();
    const dispatch = jest.fn();
    const fn = changeOtaHour(dispatch, device);
    fn(3);
    expect(dispatch).toHaveBeenCalledWith({
      "payload": {
        "specialStatus": "DIRTY",
        "update": {
          "ota_hour": 3,
        },
        "uuid": device.uuid,
      },
      "type": "EDIT_RESOURCE",
    });
  });
});
