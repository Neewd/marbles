import { Component, OnInit } from '@angular/core';
import { throttleTime } from 'rxjs';
import * as THREE from 'three';

@Component({
  selector: 'em-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    const scene = new THREE.Scene();
  }
}
