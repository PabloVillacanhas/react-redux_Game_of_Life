import React from "react";
import * as models from "./models";
import { useSelector, useDispatch } from "react-redux";
import { toggleLiveDead, previewGlider, dropGlider } from "./Actions";

interface IGridProps {
  diagonal: number;
}

export function Grid(props: IGridProps) {
  const grid = useSelector((state: models.IAppStatus) => state.grid);
  const mousedown = useSelector((state: models.IAppStatus) => state.mousedown);
  const gliderDragged = useSelector(
    (state: models.IAppStatus) => state.gliderDragged,
  );
  const dispatch = useDispatch();

  return (
    <div className="conway-grid">
      <table>
        <tbody>
          {[...Array(props.diagonal)].map((row, r_idx) => (
            <tr key={`row${r_idx}`} id={`row${r_idx}`}>
              {[...Array(props.diagonal)].map((column, c_idx) => (
                <td
                  id={`cell${grid[r_idx][c_idx]}`}
                  key={`${r_idx}-${c_idx}`}
                  className={`cell ${
                    grid[r_idx][c_idx].alive ? "alive" : "dead"
                  }
                  ${grid[r_idx][c_idx].dragged && "preview"}`}
                  onClick={(event) => {
                    dispatch(toggleLiveDead(r_idx, c_idx));
                  }}
                  onMouseEnter={(event) => {
                    console.log(mousedown + " " + gliderDragged);
                    if (mousedown) dispatch(toggleLiveDead(r_idx, c_idx));
                    else if (gliderDragged) {
                      console.log("enteresd");
                      dispatch(previewGlider(r_idx, c_idx, gliderDragged));
                    }
                  }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
