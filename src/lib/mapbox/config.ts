'use client';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

class MapboxClient {
  private static instance: MapboxClient;
  private map: mapboxgl.Map | null = null;

  constructor() {
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
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-74.5, 40],
        zoom: 12,
        attributionControl: true,
      });

      this.map.addControl(new mapboxgl.NavigationControl());
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
    return this.map;
  }

  removeMap() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }
}

export const mapboxClient = MapboxClient.getInstance();