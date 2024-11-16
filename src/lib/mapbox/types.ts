import { Map as MapboxMap } from 'mapbox-gl';

export type MapTheme = 'light' | 'dark' | 'satellite' | 'streets';

export interface MapboxConfig {
  defaultCenter: [number, number];
  defaultZoom: number;
  styles: {
    light: string;
    dark: string;
    satellite: string;
    streets: string;
  };
  navigationControls: boolean;
}