import { describe, it, expect } from "vitest";
import { EdgeNeuralEngine } from "../src/lib/edge-neural-search";

describe("CAPS DBE Multilingual STEM Ontology", () => {
  it("should contain foundational South African STEM curriculum concepts", () => {
    const dictionary = EdgeNeuralEngine.CAPS_STEM_DICTIONARY;
    expect(dictionary.length).toBeGreaterThanOrEqual(2);

    const quad = dictionary.find((c) => c.conceptKey === "QUADRATIC_FORMULA");
    expect(quad).toBeDefined();
    expect(quad?.capsGrade).toBe(11);
    expect(quad?.isixhosa).toContain("Kwadratikhi");
    expect(quad?.afrikaans).toContain("Kwadrantiese");

    const newton = dictionary.find((c) => c.conceptKey === "NEWTON_SECOND_LAW");
    expect(newton).toBeDefined();
    expect(newton?.capsGrade).toBe(11);
    expect(newton?.isixhosa).toContain("Umthetho");
    expect(newton?.isizulu).toContain("Umthetho");
  });

  it("should provide non-empty definitions for every curriculum concept", () => {
    for (const concept of EdgeNeuralEngine.CAPS_STEM_DICTIONARY) {
      expect(concept.english.length).toBeGreaterThan(0);
      expect(concept.isixhosa.length).toBeGreaterThan(0);
      expect(concept.isizulu.length).toBeGreaterThan(0);
      expect(concept.afrikaans.length).toBeGreaterThan(0);
      expect(concept.definition.length).toBeGreaterThan(0);
      expect(concept.capsGrade).toBeGreaterThanOrEqual(8);
      expect(concept.capsGrade).toBeLessThanOrEqual(12);
    }
  });
});
