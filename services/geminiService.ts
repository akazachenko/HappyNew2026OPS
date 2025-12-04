import { PredictionResponse } from "../types";
import { PREDICTIONS } from "../data/predictions";

export const generateNewYearPrediction = async (): Promise<PredictionResponse> => {
  // Simulate network delay for the magical effect (Crystal Ball animation)
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Pick a random prediction from the local file
  const randomIndex = Math.floor(Math.random() * PREDICTIONS.length);
  return PREDICTIONS[randomIndex];
};