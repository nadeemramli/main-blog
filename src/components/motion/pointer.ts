/** Shared pointer store. PointerLight writes it once per frame; the desk
 *  shader and the 3D reference unit read it instead of adding their own
 *  listeners. Coordinates are viewport-centred, -1..1 (x right, y down). */

export interface PointerState {
  nx: number;
  ny: number;
  /** False until the first fine-pointer move, and after the pointer leaves. */
  active: boolean;
}

type Listener = (state: PointerState) => void;

const state: PointerState = { nx: 0, ny: 0, active: false };
const listeners = new Set<Listener>();

export const pointer = {
  get(): PointerState {
    return state;
  },
  set(nx: number, ny: number, active: boolean) {
    state.nx = nx;
    state.ny = ny;
    state.active = active;
    listeners.forEach((fn) => fn(state));
  },
  subscribe(fn: Listener): () => void {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
};
