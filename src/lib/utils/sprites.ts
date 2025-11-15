export type SpriteCoords = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const UI_SPRITES = {
  // Panels
  panelLarge: { x: 248, y: 40, width: 96, height: 96 },
  panelMedium: { x: 4, y: 4, width: 64, height: 64 },
  panelSmall: { x: 248, y: 140, width: 64, height: 48 },

  // Buttons
  buttonLarge: { x: 84, y: 36, width: 64, height: 20 },
  buttonMedium: { x: 84, y: 60, width: 64, height: 16 },
  buttonSmall: { x: 84, y: 80, width: 48, height: 12 },

  // Tiles for gem slots (bottom left of sprite sheet)
  tileDarkLarge: { x: 4, y: 244, width: 56, height: 56 },
  tileDarkMedium: { x: 80, y: 192, width: 20, height: 20 },
  tileDarkSmall: { x: 104, y: 192, width: 20, height: 20 },
  tileBlue: { x: 80, y: 224, width: 20, height: 20 },
  tileRed: { x: 152, y: 192, width: 20, height: 20 },

  // Progress bars
  barBackground: { x: 152, y: 36, width: 64, height: 16 },
  barRed: { x: 152, y: 56, width: 64, height: 12 },
  barBlue: { x: 152, y: 72, width: 64, height: 12 },
  barGreen: { x: 152, y: 88, width: 64, height: 12 },

  // Score display panel
  scorePanel: { x: 248, y: 192, width: 180, height: 48 }
};

export const getSpriteCss = (sprite: SpriteCoords, scale: number = 1): string => {
  return `
    background-image: url('/assets/ui/UI_Normal.png');
    background-position: -${sprite.x * scale}px -${sprite.y * scale}px;
    width: ${sprite.width * scale}px;
    height: ${sprite.height * scale}px;
    background-size: ${440 * scale}px ${300 * scale}px;
    image-rendering: pixelated;
  `;
};
