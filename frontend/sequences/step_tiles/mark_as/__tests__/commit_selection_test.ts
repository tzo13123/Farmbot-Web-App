import { fakeMarkAsProps } from "../test_support";
import { commitStepChanges } from "../commit_step_changes";
import { UpdateResource, TaggedSequence } from "farmbot";
import { Actions } from "../../../../constants";
import { unpackUUID } from "../../../../util";

describe("commitSelection", () => {
  it("commits changes in a <MarkAs/> component", () => {
    const p = fakeMarkAsProps();
    const results = commitStepChanges({
      nextAction: { label: "X", value: "some_action" },
      nextResource: undefined,
      step: p.currentStep as UpdateResource,
      index: p.index,
      sequence: p.currentSequence
    });
    expect(results.type).toBe(Actions.OVERWRITE_RESOURCE);
    const { payload } = results;
    expect(unpackUUID(payload.uuid).kind).toBe("Sequence");
    const s = payload.update as TaggedSequence["body"];
    expect(s.kind).toBe("sequence");
    const step = (s.body || [])[0] as UpdateResource;
    expect(step.body?.[0].args.value).toBe("some_action");
  });
});
