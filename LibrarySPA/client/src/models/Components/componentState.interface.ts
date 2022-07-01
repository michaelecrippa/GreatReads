export interface ComponentState<T, U> {
  availableEntities: T[];
  data: U | undefined;
  loading: boolean;
  error: any;
}
