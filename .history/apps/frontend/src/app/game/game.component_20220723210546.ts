import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'em-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements AfterViewInit {
  @ViewChild('canvas') canvas!: ElementRef;
  constructor() {}
  ngAfterViewInit(): void {
    const scene = new THREE.Scene();

    const geomtry = new THREE.SphereGeometry(2);
    const material = new THREE.MeshBasicMaterial({ color: 'purple' });
    const mesh = new THREE.Mesh(geomtry, material);
  }
}
