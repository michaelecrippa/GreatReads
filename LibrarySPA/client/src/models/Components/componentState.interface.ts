export interface ComponentState<T> {
  availableEntities: T[];
  data: T | undefined;
  loading: boolean;
  error: any;
}
