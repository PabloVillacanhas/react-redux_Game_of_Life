export interface ICell {
  alive: boolean;
  preview: boolean;
}
export interface Action {
  type: string;
  payload?: any;
}

export interface IAppStatus {
  gliderDragged: string;
  mousedown: boolean;
  grid: Array<Array<ICell>>;
}
