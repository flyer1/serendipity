export interface NotifierModel {
  type: notifierTypes;
  message: string;
}

export declare type notifierTypes = 'info' | 'warning' | 'error';
