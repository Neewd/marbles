import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'em-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @ViewChild('canvas') canvas!: ElementRef;
  constructor() {}
  ngOnInit(): void {
    const scene = new THREE.Scene();
  }
}
