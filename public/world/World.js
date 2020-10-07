import { json } from "express";
import {loadJson} from "../other/util"
export default class World {
    isLoaded = false;
    constructor(jsonUrl) {
        this.jsonUrl = jsonUrl;
        this.load
        loadJson(jsonUrl, json => this.json = json);
        this.name = name;
        this.tileProvider = tileProvider;
        this.entities = [];
    }
    async load(){
        this.json = loadJson(this.jsonUrl)
    }

    draw() {
        if (!this.isLoaded)return;
        const tilesX = window.innerWidth / this.tileProvider.tileWidth + 1;
        const tilesY = window.innerHeight / this.tileProvider.tileHeight + 1;

        for (let x = 0; x < tilesX; x++) {
            for (let y = 0; y < tilesY; y++) {
                this.tileProvider.drawTile(
                    x * this.tileProvider.tileWidth,
                    y * this.tileProvider.tileHeight,
                    x,
                    y
                );
            }
        }

        this.entities.forEach(entity => {
            entity.draw();
        });
    }
}
