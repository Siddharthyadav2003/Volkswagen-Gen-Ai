'use client';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mapboxConfig } from './config';

class MapboxClient {
  private static instance: MapboxClient;
  private map: mapboxgl.Map | null = null;

  private constructor() {
    if (typeof window !== 'undefined') {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
    }
  }

  static getInstance() {
    if (!MapboxClient.instance) {
      MapboxClient.instance = new MapboxClient();
    }
    return MapboxClient.instance;
  }

  initializeMap(container: HTMLElement) {
    if (!this.map) {
      this.map = new mapboxgl.Map({
        container,
        style: mapboxConfig.styles.light,
        center: mapboxConfig.defaultCenter,
        zoom: mapboxConfig.defaultZoom,
      });

      this.setupControls();
    }
    return this.map;
  }

  private setupControls() {
    if (!this.map) return;

    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new mapboxgl.FullscreenControl());
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      })
    );
  }
}

export const mapboxClient = MapboxClient.getInstance();