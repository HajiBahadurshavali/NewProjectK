import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DesignService } from '../../services/design.service';
import { ArService } from '../../services/ar.service';
import { Design } from '../../models/design.model';
import * as BABYLON from '@babylonjs/core';

@Component({
  selector: 'app-ar-preview',
  templateUrl: './ar-preview.component.html',
  styleUrls: ['./ar-preview.component.css']
})
export class ARPreviewComponent implements OnInit, AfterViewInit {

  @ViewChild('renderCanvas')
  renderCanvas!: ElementRef<HTMLCanvasElement>;

  design: Design | null = null;
  scene: BABYLON.Scene | null = null;

  rotationSpeed = 0.02;
  zoomLevel = 1;

  constructor(
    private route: ActivatedRoute,
    private designService: DesignService,
    private arService: ArService
  ) {}

  ngOnInit(): void {

    const designId = this.route.snapshot.paramMap.get('id');

    if (designId) {
      this.loadDesign(Number(designId));
    }

  }

  ngAfterViewInit(): void {

    if (this.design?.arModel) {
      this.initializeAR();
    }

  }

  loadDesign(designId: number): void {

    this.designService.getDesignById(designId).subscribe({

      next: (design: Design) => {

        this.design = design;

        if (design.arModel && this.renderCanvas) {
          this.initializeAR();
        }

      },

      error: (error: any) => {

        console.error('Error loading design:', error);

      }

    });

  }

  async initializeAR(): Promise<void> {

    if (!this.design?.arModel) return;

    const canvas = this.renderCanvas.nativeElement;

    this.scene = await this.arService.loadARModel(
      canvas,
      this.design.arModel.modelUrl,
      this.design.arModel.textureUrl
    );

  }

  rotate(): void {

    if (this.scene && this.scene.meshes.length > 0) {

      const mesh = this.scene.meshes[0];

      this.arService.rotateModel(mesh, this.rotationSpeed);

    }

  }

  zoomIn(): void {

    this.zoomLevel += 0.1;

    if (this.scene?.activeCamera) {

      this.arService.zoomModel(this.scene.activeCamera, 1.1);

    }

  }

  zoomOut(): void {

    this.zoomLevel -= 0.1;

    if (this.scene?.activeCamera) {

      this.arService.zoomModel(this.scene.activeCamera, 0.9);

    }

  }

}