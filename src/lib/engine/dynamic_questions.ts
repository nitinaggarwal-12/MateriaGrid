/**
 * MATERIAGRID — DYNAMIC CLINICAL QUESTION SELECTOR
 * -------------------------------------------------------------
 * Evaluates active case state and generates ONE targeted clinical follow-up question
 * using either Bönninghausen's 4-component framework or Sehgal's PPP mental state analysis.
 */

export interface QuestionContextState {
  missingComponents: ('LOCATION' | 'SENSATION' | 'MODALITY' | 'CONCOMITANT')[];
  hasMentalStateEntered: boolean;
  hasPhysicalSymptomEntered: boolean;
  lastTopicMentioned?: string;
}

export function selectNextTargetedQuestion(state: QuestionContextState): string {
  // If physical symptom lacks modality (what makes it better/worse), probe modality first
  if (state.missingComponents.includes('MODALITY')) {
    return `Could you describe what environmental conditions, temperature, or physical motions make your "${state.lastTopicMentioned || 'discomfort'}" significantly better or worse?`;
  }

  // If missing concomitant symptom (unrelated symptom occurring simultaneously)
  if (state.missingComponents.includes('CONCOMITANT')) {
    return `Do you notice any seemingly unrelated physical changes—such as cold sweat, altered thirst, or unusual sensations—that happen at the exact same time as your "${state.lastTopicMentioned || 'symptom'}"?`;
  }

  // Sehgal ROH Present, Predominating, and Persisting Mental State probe
  if (!state.hasMentalStateEntered) {
    return `During this physical discomfort, what is your predominant mood or mental state? How do you react emotionally when the symptom is at its peak?`;
  }

  return `Are there any specific times of day or night when you notice your symptoms reliably change or awaken you?`;
}
