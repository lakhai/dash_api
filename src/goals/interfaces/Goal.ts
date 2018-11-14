export enum GoalStatuses {
  InProgress = 'InProgress',
  Completed = 'Completed',
  Failed = 'Failed',
}

export class GoalFillableFields {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
