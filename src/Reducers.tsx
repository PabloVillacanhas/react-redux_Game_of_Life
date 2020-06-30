import * as models from "./models";
import { ActionTypes } from "./Actions";
import { combineReducers } from "redux";

export const mousedown = (
  mousedown: boolean = false,
  action: models.Action,
): boolean => {
  switch (action.type) {
    case ActionTypes.TOGGLE_MOUSE_STATUS:
      let newmousedown = !mousedown;
      return newmousedown;
    default:
      return mousedown;
  }
};

export const gliderSelected = (
  gliderSelected: string = "",
  action: models.Action,
): string => {
  switch (action.type) {
    case ActionTypes.DRAG_GLIDER:
      console.log(action.payload.type);
      let news = action.payload.type;
      console.log(news === gliderSelected);

      return news;
    case ActionTypes.FINISH_DRAG:
      return action.payload.type;
    default:
      return "";
  }
};

export const grid = (
  grid: Array<Array<models.ICell>> = [[]],
  action: models.Action,
): Array<Array<models.ICell>> => {
  let newGrid = grid.map((row) => row.map((cell) => Object.assign({}, cell)));
  switch (action.type) {
    case ActionTypes.TOGGLE_AD:
      let cell = newGrid[action.payload.row][action.payload.column];
      cell.alive = !cell.alive;
      return newGrid;
    case ActionTypes.NEXT_GRID:
      let maxindex = grid.length - 1;
      newGrid.map((row, ridx) => {
        let prevrow = ridx - 1 < 0 ? maxindex : ridx - 1;
        let nextrow = ridx + 1 > maxindex ? 0 : ridx + 1;
        row.map((cell, cidx) => {
          let prevcol = cidx - 1 < 0 ? maxindex : cidx - 1;
          let nextcol = cidx + 1 > maxindex ? 0 : cidx + 1;

          let tl = grid[prevrow][prevcol];
          let tt = grid[prevrow][cidx];
          let tr = grid[prevrow][nextcol];
          let sl = grid[ridx][prevcol];
          let sr = grid[ridx][nextcol];
          let bl = grid[nextrow][prevcol];
          let bb = grid[nextrow][cidx];
          let br = grid[nextrow][nextcol];
          let neighbours = [tl, tt, tr, sl, sr, bl, bb, br];
          let aliveNeighbours = neighbours.filter((cell) => cell.alive).length;
          //Any live cell with fewer than two live neighbours dies.
          if (cell.alive && aliveNeighbours < 2) cell.alive = false;
          //Any live cell with two or three live neighbours lives
          else if (
            cell.alive &&
            (aliveNeighbours === 3 || aliveNeighbours === 2)
          )
            cell.alive = true;
          //Any dead cell with exactly three live neighbours becomes a live cell.
          else if (!cell.alive && aliveNeighbours === 3) {
            cell.alive = true;
          }
          //Any live cell with more than three live neighbours dies
          else if (cell.alive && aliveNeighbours > 3) cell.alive = false;
          //All other live cells die in the next generation. Similarly, all other dead cells stay dead.
          else cell.alive = false;
          return cell;
        });
        return row;
      });
      return newGrid;
    case ActionTypes.RESET_GRID:
      newGrid = Array(50)
        .fill(null)
        .map(() =>
          Array(50)
            .fill(null)
            .map(
              (): models.ICell => ({
                alive: Math.random() >= 0.5,
                preview: false,
              }),
            ),
        );
      return newGrid;
    case ActionTypes.PREVIEW_GLIDER:
      switch (action.payload.type) {
        case "glider":
          let glider = [[0, 0, 1], [1, 0, 1], [0, 1, 1]];
          for (let row = 0; row < glider.length; row++) {
            for (let col = 0; col < glider.length; col++) {
              newGrid[action.payload.row][action.payload.column].preview = true;
            }
          }
      }
      return newGrid;
    default:
      return grid;
  }
};

const rootReducer = combineReducers({ mousedown, gliderSelected, grid });

export default rootReducer;
