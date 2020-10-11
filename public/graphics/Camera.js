import Position from '../world/entity/components/Position';
export default class Camera {
    x = 0;
    y = 0;
    /** @type {{position:Position}|null} */
    follow = null;
    fov = 200;
    minFov = 100;
    maxFov = 500;
    zoomSensitivity = 0.01;
    /** @param {number} delta*/
    zoom(delta) {
        this.fov = Math.max(
            this.minFov,
            Math.min(
                this.maxFov,
                (this.fov *= 1 + delta * this.zoomSensitivity)
            )
        );
    }
}
