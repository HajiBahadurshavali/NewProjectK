import { Injectable } from '@angular/core';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders';

@Injectable({
  providedIn: 'root'
})
export class ArService {

  private engine: BABYLON.Engine | null = null;

  async loadARModel(
    canvas: HTMLCanvasElement,
    modelUrl: string,
    textureUrl: string
  ): Promise<BABYLON.Scene> {

    this.engine = new BABYLON.Engine(canvas, true);

    const scene = new BABYLON.Scene(this.engine);

    const camera = new BABYLON.ArcRotateCamera(
      "camera",
      Math.PI / 2,
      Math.PI / 2,
      5,
      BABYLON.Vector3.Zero(),
      scene
    );

    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );

    await BABYLON.SceneLoader.ImportMeshAsync(
      "",
      "",
      modelUrl,
      scene
    );

    this.engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener("resize", () => {
      this.engine?.resize();
    });

    return scene;

  }

  rotateModel(mesh: BABYLON.AbstractMesh, speed: number): void {

    if (!mesh) return;

    mesh.rotation.y += speed;

  }

  zoomModel(camera: BABYLON.Camera, zoomFactor: number): void {

    if (camera instanceof BABYLON.ArcRotateCamera) {

      camera.radius *= zoomFactor;

    }

  }

}