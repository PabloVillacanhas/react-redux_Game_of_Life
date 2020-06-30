export enum ActionTypes {
  TOGGLE_AD = "TOGGLE_AD",
  TOGGLE_MOUSE_STATUS = "TOGGLE_MOUSE_STATUS",
  NEXT_GRID = "NEXT_GRID",
  RESET_GRID = "RESET_GRID",
  DRAG_GLIDER = "DRAG_GLIDER",
  PREVIEW_GLIDER = "PREVIEW_GLIDER",
  DROP_GLIDER = "DROP_GLIDER",
  FINISH_DRAG = "FINISH_DRAG",
}

export const toggleLiveDead = (row: number, column: number) => {
  return {
    type: ActionTypes.TOGGLE_AD,
    payload: {
      row: row,
      column: column,
    },
  };
};

export const next = () => {
  return {
    type: ActionTypes.NEXT_GRID,
  };
};

export const reset = () => {
  return {
    type: ActionTypes.RESET_GRID,
  };
};

export const toggleMouseStatus = () => {
  return {
    type: ActionTypes.TOGGLE_MOUSE_STATUS,
  };
};

export const dragGlider = (type: string) => {
  return {
    type: ActionTypes.DRAG_GLIDER,
    payload: {
      type: type,
    },
  };
};

export const previewGlider = (row: number, column: number, type: string) => {
  return {
    type: ActionTypes.PREVIEW_GLIDER,
    payload: {
      row: row,
      column: column,
      type: type,
    },
  };
};

export const dropGlider = (row: number, column: number, type: string) => {
  return {
    type: ActionTypes.DROP_GLIDER,
    payload: {
      type: type,
    },
  };
};
