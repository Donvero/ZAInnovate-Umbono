import { describe, it, expect } from "vitest";
import { EdgeNeuralEngine, SemanticVectorDoc } from "../src/lib/edge-neural-search";

describe("Umbono™ Edge Neural Search & Vector Engine", () => {
  describe("cosineSimilarity", () => {
    it("should compute exact 1.0 for identical vectors", () => {
      const v = [0.2, 0.5, 0.8, -0.1];
      const similarity = EdgeNeuralEngine.cosineSimilarity(v, v);
      expect(similarity).toBeCloseTo(1.0, 5);
    });

    it("should compute exact 0.0 for orthogonal vectors", () => {
      const v1 = [1, 0, 0];
      const v2 = [0, 1, 0];
      const similarity = EdgeNeuralEngine.cosineSimilarity(v1, v2);
      expect(similarity).toBe(0);
    });

    it("should compute exact -1.0 for opposite vectors", () => {
      const v1 = [1, 2, 3];
      const v2 = [-1, -2, -3];
      const similarity = EdgeNeuralEngine.cosineSimilarity(v1, v2);
      expect(similarity).toBeCloseTo(-1.0, 5);
    });

    it("should return 0 for vectors of mismatched dimensions", () => {
      const v1 = [1, 2];
      const v2 = [1, 2, 3];
      expect(EdgeNeuralEngine.cosineSimilarity(v1, v2)).toBe(0);
    });

    it("should return 0 for zero vectors", () => {
      const v1 = [0, 0, 0];
      const v2 = [1, 2, 3];
      expect(EdgeNeuralEngine.cosineSimilarity(v1, v2)).toBe(0);
    });
  });

  describe("searchOfflineCorpus (Hybrid Neural & Lexical)", () => {
    const mockCorpus: SemanticVectorDoc[] = [
      {
        id: "doc-1",
        subject: "Physical Sciences",
        topic: "Newtonian Mechanics",
        capsReference: "CAPS PS 11.2",
        language: "en",
        contentSnippet: "Newton's second law states that F_net = m * a. Net force equals mass times acceleration.",
        embedding: [0.9, 0.1, 0.0],
      },
      {
        id: "doc-2",
        subject: "Mathematics",
        topic: "Quadratic Equations",
        capsReference: "CAPS MATH 11.1",
        language: "en",
        contentSnippet: "Solve quadratic polynomials using the quadratic formula x = (-b +- sqrt(b^2 - 4ac)) / (2a).",
        embedding: [0.0, 0.9, 0.1],
      },
      {
        id: "doc-3",
        subject: "Life Sciences",
        topic: "Cellular Photosynthesis",
        capsReference: "CAPS LS 10.3",
        language: "en",
        contentSnippet: "Plants convert light energy into glucose using chlorophyll and carbon dioxide.",
        embedding: [0.1, 0.0, 0.9],
      },
    ];

    it("should retrieve the most relevant physics document when querying for Newton and force", () => {
      const queryTokens = ["force", "Newton", "acceleration"];
      const queryVector = [0.85, 0.15, 0.0]; // close to doc-1

      const results = EdgeNeuralEngine.searchOfflineCorpus(queryTokens, queryVector, mockCorpus, 2);
      expect(results.length).toBe(2);
      expect(results[0].doc.id).toBe("doc-1");
      expect(results[0].doc.topic).toBe("Newtonian Mechanics");
      expect(results[0].compositeScore).toBeGreaterThan(0.6);
    });

    it("should retrieve mathematics document when querying for quadratic roots", () => {
      const queryTokens = ["quadratic", "roots", "polynomial"];
      const queryVector = [0.0, 0.88, 0.12]; // close to doc-2

      const results = EdgeNeuralEngine.searchOfflineCorpus(queryTokens, queryVector, mockCorpus, 1);
      expect(results.length).toBe(1);
      expect(results[0].doc.id).toBe("doc-2");
      expect(results[0].doc.subject).toBe("Mathematics");
    });
  });
});
