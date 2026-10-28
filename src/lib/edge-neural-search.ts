/**
 * UMBONO™ SOVEREIGN EDGE NEURAL SEARCH & STEM ONTOLOGY
 * ZAInnovate Technologies (Pty) Ltd | Sovereign Engineering Lab
 * 
 * Zero-Data Local Vector Cosine & CAPS Semantic Retrieval Engine.
 * Runs 100% in-browser / on-device via IndexedDB without internet or cloud APIs.
 */

export interface SemanticVectorDoc {
  id: string;
  subject: string;
  topic: string;
  capsReference: string;
  language: 'en' | 'xh' | 'zu' | 'af';
  contentSnippet: string;
  embedding: number[]; // Quantized float32 vector
}

export interface MultilingualConcept {
  conceptKey: string;
  english: string;
  isixhosa: string;
  isizulu: string;
  afrikaans: string;
  definition: string;
  capsGrade: number;
}

export class EdgeNeuralEngine {
  /**
   * Fast Vector Cosine Similarity
   */
  public static cosineSimilarity(vecA: number[], vecB: number[]): number {
    if (vecA.length !== vecB.length || vecA.length === 0) return 0;
    let dot = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
      dot += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    if (normA === 0 || normB === 0) return 0;
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  /**
   * Hybrid Offline Retrieval: Cosine Vector + BM25 Lexical Term Matching
   */
  public static searchOfflineCorpus(
    queryTokens: string[],
    queryVector: number[],
    corpus: SemanticVectorDoc[],
    topK = 5
  ): { doc: SemanticVectorDoc; compositeScore: number }[] {
    const scored = corpus.map((doc) => {
      // 1. Vector similarity
      const vectorScore = doc.embedding.length > 0 ? this.cosineSimilarity(queryVector, doc.embedding) : 0;

      // 2. Lexical keyword intersection
      const contentLower = (doc.topic + ' ' + doc.contentSnippet).toLowerCase();
      let lexicalMatches = 0;
      for (const t of queryTokens) {
        if (contentLower.includes(t.toLowerCase())) {
          lexicalMatches++;
        }
      }
      const lexicalScore = queryTokens.length > 0 ? lexicalMatches / queryTokens.length : 0;

      // Composite 60% semantic + 40% lexical
      const compositeScore = Number((0.6 * vectorScore + 0.4 * lexicalScore).toFixed(4));
      return { doc, compositeScore };
    });

    return scored
      .sort((a, b) => b.compositeScore - a.compositeScore)
      .slice(0, topK);
  }

  /**
   * Pre-compiled DBE CAPS Multilingual STEM Ontology (isiXhosa, Zulu, Afrikaans, English)
   */
  public static readonly CAPS_STEM_DICTIONARY: MultilingualConcept[] = [
    {
      conceptKey: 'QUADRATIC_FORMULA',
      english: 'Quadratic Formula',
      isixhosa: 'Ifomula ye-Kwadratikhi (x = [-b ± √(b² - 4ac)] / 2a)',
      isizulu: 'Ifomula ye-Kwadratikhi',
      afrikaans: 'Kwadrantiese Formule',
      definition: 'Algebraic method to find roots of second-degree polynomials.',
      capsGrade: 11,
    },
    {
      conceptKey: 'NEWTON_SECOND_LAW',
      english: "Newton's Second Law of Motion",
      isixhosa: 'Umthetho Wesibini Ka-Newton Wentshukumo (F_net = ma)',
      isizulu: 'Umthetho Wesibili Ka-Newton Wokunyakaza',
      afrikaans: 'Newton se Tweede Bewegingswet',
      definition: 'The net force acting on an object is equal to its mass multiplied by acceleration.',
      capsGrade: 11,
    },
    {
      conceptKey: 'PHOTOSYNTHESIS',
      english: 'Photosynthesis',
      isixhosa: 'Ifotosinthesisi (Ukuguqulwa kokukhanya kwelanga kube ngamandla ekhemikhali)',
      isizulu: 'Ifothosinthesisi',
      afrikaans: 'Fotosintese',
      definition: 'Biological synthesis of glucose and oxygen from carbon dioxide and water using sunlight.',
      capsGrade: 10,
    },
    {
      conceptKey: 'ELECTRIC_CIRCUITS',
      english: "Ohm's Law (V = IR)",
      isixhosa: 'Umthetho Ka-Ohm (Amandla Ombane, Umsinga, Nenkcaso)',
      isizulu: 'Umthetho Ka-Ohm',
      afrikaans: 'Ohm se Wet',
      definition: 'Direct proportionality between potential difference and current through an ohmic conductor.',
      capsGrade: 10,
    },
  ];
}
