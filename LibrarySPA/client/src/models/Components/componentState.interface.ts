export interface ComponentState<T> {
  availableEntities: T[];
  loading: boolean;
  error: any;
}