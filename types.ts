export interface PredictionResponse {
  prediction: string;
  theme: 'success' | 'wealth' | 'travel' | 'love' | 'wisdom';
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}