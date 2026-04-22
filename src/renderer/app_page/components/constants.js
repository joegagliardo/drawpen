export const timeStep = 100;
// export const laserTime = 2000; // schema.laser_time.default
export const laserTimeMin = 300;
export const laserTimeMax = 5000;
// export const fadeDisappearAfter = 1500; // schema.fade_disappear_after_ms.default
export const fadeDisappearAfterMin = 300;
export const fadeDisappearAfterMax = 15000;
// export const fadeOutDurationTime = 1000; // schema.fade_out_duration_time_ms.default
export const fadeOutDurationTimeMsMin = 300;
export const fadeOutDurationTimeMsMax = 5000;
export const fadeOutDestroyAfterMs = 300;

export const eraserTime = 100;
export const rainbowScaleFactor = 0.03;
export const minObjectDistance = 5; // Minimum length of drawn object
export const figureMinScale = 0.2;
export const pastCooldownMs = 300;
export const escDoubleTapMs = 300;
export const SNAP_ANGLE = Math.PI / 12; // 45°
export const highlighterAlpha = 0.35;
export const eraserAlpha = 0.5;

export const palmMinContactLength = 35; // Min touch contact length to detect a palm/fist
export const palmMinContactArea = 2000;

export const brushList = ['pen', 'fadepen'];
export const shapeList = ['arrow', 'flat_arrow', 'rectangle', 'rectangle_filled', 'oval', 'oval_filled', 'line'];

export const dotRadius = 5;
export const dotStrokeWidth = 1;
export const dotHoverRadius = 10;
export const dotBorderColor = '#6CC3E2';
export const dotHoverColor = dotBorderColor + '99';
export const dotTextMargin = 5;

export const colorList = [
  { color: '#000000', name: 'color_rainbow' },
  { color: '#E05252', name: 'color_red' },
  { color: '#E052A5', name: 'color_magenta' },
  { color: '#E0A552', name: 'color_orange' },
  { color: '#FFEE00', name: 'color_yellow' },
  { color: '#52E06C', name: 'color_green' },
  { color: '#4169E1', name: 'color_blue' },
  { color: '#A552E0', name: 'color_purple' },
  { color: '#1E1E1E', name: 'color_black' },
  { color: '#FFFFFF', name: 'color_white' },
  { color: 'transparent', name: 'color_clear' },
];

// - font_y_offset_compensation: Hack to make HTML similar to Canvas
//   Data taken from Retina display
// - font_line_height_compensation: Hack to compensate for line height
//   const lineHeightMultiplier = 1.25;
//   const offsetY = ((fontSize * lineHeightMultiplier) - fontSize) / 2;

export const widthList = [
  { pen_width: 4,  highlighter_width: 8,  rainbow_pen_width: 3,  laser_width: [2,   5],  figure_size: 4,  icon_size: 14, name: 'thin',   font_size: 20,  font_y_offset_compensation: 4,    font_y_offset_compensation_retina: 4,    font_line_height_compensation: 2,    close_point_distance: 1 },
  { pen_width: 8,  highlighter_width: 16, rainbow_pen_width: 4,  laser_width: [3,   8],  figure_size: 6,  icon_size: 16, name: 'light',  font_size: 28,  font_y_offset_compensation: 5,    font_y_offset_compensation_retina: 5,    font_line_height_compensation: 3,    close_point_distance: 2 },
  { pen_width: 12, highlighter_width: 24, rainbow_pen_width: 8,  laser_width: [4.5, 12], figure_size: 8,  icon_size: 18, name: 'medium', font_size: 42,  font_y_offset_compensation: 6.5,  font_y_offset_compensation_retina: 7.5,  font_line_height_compensation: 5.25, close_point_distance: 3 },
  { pen_width: 16, highlighter_width: 32, rainbow_pen_width: 12, laser_width: [6,   16], figure_size: 10, icon_size: 20, name: 'bold',   font_size: 56,  font_y_offset_compensation: 9.5,  font_y_offset_compensation_retina: 9.5,  font_line_height_compensation: 7,    close_point_distance: 4 },
  { pen_width: 32, highlighter_width: 64, rainbow_pen_width: 24, laser_width: [12,  32], figure_size: 20, icon_size: 26, name: 'x-bold', font_size: 112, font_y_offset_compensation: 19.0, font_y_offset_compensation_retina: 19.0, font_line_height_compensation: 14,   close_point_distance: 8 },
  { pen_width: 48, highlighter_width: 96, rainbow_pen_width: 36, laser_width: [18,  48], figure_size: 30, icon_size: 32, name: 'u-bold', font_size: 168, font_y_offset_compensation: 28.5, font_y_offset_compensation_retina: 28.5, font_line_height_compensation: 21,   close_point_distance: 12 },
]

export const erasedFigureColor = '#D3D3D3'; // lightgray
export const eraserTailColor = '#69696969'; // dimgray with opacity

export const interpolate = (a, b, t) => {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.map((val, i) => interpolate(val, b[i], t));
  }
  return a + (b - a) * t;
};

export const interpolateWidthSettings = (value) => {
  const index = Math.floor(value);
  const nextIndex = Math.min(index + 1, widthList.length - 1);
  const t = value - index;

  const a = widthList[index];
  const b = widthList[nextIndex];

  const result = {};
  Object.keys(a).forEach((key) => {
    if (typeof a[key] === 'number' || Array.isArray(a[key])) {
      result[key] = interpolate(a[key], b[key], t);
    } else {
      result[key] = t < 0.5 ? a[key] : b[key];
    }
  });

  return result;
};
