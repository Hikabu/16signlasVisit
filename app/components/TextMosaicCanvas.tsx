// 'use client';

// import { useCallback, useEffect, useMemo, useRef, type PointerEvent, type WheelEvent } from 'react';
// import densityMap from '@/density-map.json';

// type TextMosaicCanvasProps = {
//   className?: string;
// };

// type DensityMapData = {
//   width: number;
//   height: number;
//   cells: number[];
// };

// type Region = {
//   id: number;
//   x: number;
//   y: number;
//   w: number;
//   h: number;
//   bucket: number;
// };

// type Bounds = {
//   x: number;
//   y: number;
//   w: number;
//   h: number;
// };

// type Transform = {
//   scale: number;
//   offsetX: number;
//   offsetY: number;
// };

// type QuadtreeNode = {
//   bounds: Bounds;
//   items: Region[];
//   children: QuadtreeNode[] | null;
// };

// const FONT_STACK = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
// const CELL_SIZE = 12;
// const SIMILARITY_THRESHOLD = 1;
// const MAX_TREE_ITEMS = 36;
// const MAX_TREE_DEPTH = 8;
// const MIN_SCALE = 0.1;
// const MAX_SCALE = 40;

// const PRIMARY_A = { r: 0x00, g: 0x9a, b: 0x93 };
// const PRIMARY_B = { r: 0x56, g: 0x64, b: 0x4b };

// const LEVEL_1_TEXT = ['87%', '92%', '14%', '63%', '0.3%', '99.2%'];
// const LEVEL_2_TEXT = ['87%', '92%', '14%', '63%', 'fraud', 'crime', 'risk', 'score', '99.2%'];
// const LEVEL_3_TEXT = ['crime_rate++', 'risk_score += 1', 'fraud_detected', 'return score', 'for(...)', 'while(...)', 'if(...)'];
// const LEVEL_4_TEXT = [
//   'for (int i = 0; i < records.size(); i++)',
//   '{',
//   '  riskScore += records[i];',
//   '}',
//   'if (score > threshold) { fraud_detected++; }',
//   'while (true) { risk_score += 1; break; }',
// ];

// function clamp(value: number, min: number, max: number): number {
//   return Math.max(min, Math.min(max, value));
// }

// function hash32(seed: number): number {
//   let h = seed | 0;
//   h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
//   h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
//   return h ^ (h >>> 16);
// }

// function areSimilar(a: number, b: number): boolean {
//   return Math.abs(a - b) <= SIMILARITY_THRESHOLD;
// }

// function blendColor(t: number): string {
//   const r = Math.round(PRIMARY_A.r + (PRIMARY_B.r - PRIMARY_A.r) * t);
//   const g = Math.round(PRIMARY_A.g + (PRIMARY_B.g - PRIMARY_A.g) * t);
//   const b = Math.round(PRIMARY_A.b + (PRIMARY_B.b - PRIMARY_A.b) * t);
//   return `rgb(${r}, ${g}, ${b})`;
// }

// function regionColor(bucket: number): string {
//   const normalized = clamp(bucket / 15, 0, 1);
//   // Slightly bias toward darker tones for cyber-intelligence look.
//   return blendColor(0.08 + normalized * 0.84);
// }

// function buildRegions(data: DensityMapData): Region[] {
//   const { width, height, cells } = data;
//   const visited = new Uint8Array(width * height);
//   const regions: Region[] = [];
//   let id = 0;

//   for (let y = 0; y < height; y++) {
//     for (let x = 0; x < width; x++) {
//       const index = y * width + x;
//       if (visited[index]) continue;

//       const base = cells[index] ?? 0;
//       let w = 1;
//       while (x + w < width) {
//         const nextIndex = y * width + x + w;
//         if (visited[nextIndex]) break;
//         if (!areSimilar(cells[nextIndex] ?? 0, base)) break;
//         w += 1;
//       }

//       let h = 1;
//       rowLoop: while (y + h < height) {
//         for (let ix = 0; ix < w; ix++) {
//           const rowIndex = (y + h) * width + (x + ix);
//           if (visited[rowIndex]) break rowLoop;
//           if (!areSimilar(cells[rowIndex] ?? 0, base)) break rowLoop;
//         }
//         h += 1;
//       }

//       let bucketSum = 0;
//       for (let yy = y; yy < y + h; yy++) {
//         for (let xx = x; xx < x + w; xx++) {
//           const idx = yy * width + xx;
//           visited[idx] = 1;
//           bucketSum += cells[idx] ?? 0;
//         }
//       }

//       const avgBucket = Math.round(bucketSum / (w * h));
//       regions.push({
//         id: id++,
//         x: x * CELL_SIZE,
//         y: y * CELL_SIZE,
//         w: w * CELL_SIZE,
//         h: h * CELL_SIZE,
//         bucket: avgBucket,
//       });
//     }
//   }

//   return regions;
// }

// function intersects(a: Bounds, b: Bounds): boolean {
//   return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
// }

// function contains(outer: Bounds, inner: Bounds): boolean {
//   return (
//     inner.x >= outer.x &&
//     inner.y >= outer.y &&
//     inner.x + inner.w <= outer.x + outer.w &&
//     inner.y + inner.h <= outer.y + outer.h
//   );
// }

// function regionBounds(region: Region): Bounds {
//   return { x: region.x, y: region.y, w: region.w, h: region.h };
// }

// function subdivide(bounds: Bounds): [Bounds, Bounds, Bounds, Bounds] {
//   const halfW = bounds.w / 2;
//   const halfH = bounds.h / 2;
//   return [
//     { x: bounds.x, y: bounds.y, w: halfW, h: halfH },
//     { x: bounds.x + halfW, y: bounds.y, w: halfW, h: halfH },
//     { x: bounds.x, y: bounds.y + halfH, w: halfW, h: halfH },
//     { x: bounds.x + halfW, y: bounds.y + halfH, w: halfW, h: halfH },
//   ];
// }

// function buildQuadtree(regions: Region[], bounds: Bounds, depth = 0): QuadtreeNode {
//   if (depth >= MAX_TREE_DEPTH || regions.length <= MAX_TREE_ITEMS) {
//     return { bounds, items: regions, children: null };
//   }

//   const childBounds = subdivide(bounds);
//   const childBuckets: Region[][] = [[], [], [], []];
//   const ownItems: Region[] = [];

//   for (const region of regions) {
//     const rb = regionBounds(region);
//     let assigned = false;
//     for (let i = 0; i < childBounds.length; i++) {
//       if (contains(childBounds[i], rb)) {
//         childBuckets[i].push(region);
//         assigned = true;
//         break;
//       }
//     }
//     if (!assigned) ownItems.push(region);
//   }

//   const children: QuadtreeNode[] = [];
//   for (let i = 0; i < childBounds.length; i++) {
//     if (childBuckets[i].length === 0) continue;
//     children.push(buildQuadtree(childBuckets[i], childBounds[i], depth + 1));
//   }

//   if (children.length === 0) {
//     return { bounds, items: regions, children: null };
//   }

//   return { bounds, items: ownItems, children };
// }

// function queryQuadtree(node: QuadtreeNode, viewport: Bounds, out: Region[]): void {
//   if (!intersects(node.bounds, viewport)) return;
//   for (const region of node.items) {
//     if (intersects(regionBounds(region), viewport)) out.push(region);
//   }
//   if (!node.children) return;
//   for (const child of node.children) queryQuadtree(child, viewport, out);
// }

// function chooseText(regionId: number, zoom: number): string {
//   const seed = Math.abs(hash32(regionId * 2654435761));
//   if (zoom < 1.25) return LEVEL_1_TEXT[seed % LEVEL_1_TEXT.length];
//   if (zoom < 2.8) return LEVEL_2_TEXT[seed % LEVEL_2_TEXT.length];
//   if (zoom < 5.5) return LEVEL_3_TEXT[seed % LEVEL_3_TEXT.length];
//   return LEVEL_4_TEXT[seed % LEVEL_4_TEXT.length];
// }

// function drawRegionText(ctx: CanvasRenderingContext2D, region: Region, text: string, zoom: number): void {
//   const seed = Math.abs(hash32(region.id * 7919));
//   const pxX = region.x;
//   const pxY = region.y;
//   const pxW = region.w;
//   const pxH = region.h;

//   if (zoom < 1.25) {
//     const fontSize = clamp(Math.min(pxW * 0.42, pxH * 0.8), 10, 44);
//     ctx.font = `${fontSize}px ${FONT_STACK}`;
//     ctx.textAlign = 'center';
//     ctx.textBaseline = 'middle';
//     ctx.fillText(text, pxX + pxW / 2, pxY + pxH / 2, pxW * 0.96);
//     return;
//   }

//   const baseSize = zoom < 2.8 ? clamp(Math.min(pxH * 0.5, pxW * 0.28), 10, 30) : clamp(Math.min(pxH * 0.36, pxW * 0.2), 10, 24);
//   ctx.font = `${baseSize}px ${FONT_STACK}`;
//   ctx.textAlign = 'left';
//   ctx.textBaseline = 'top';

//   const metrics = ctx.measureText(text);
//   const textWidth = Math.max(metrics.width, baseSize * 2);
//   const stepX = Math.max(baseSize * 1.2, textWidth + 10);
//   const stepY = Math.max(baseSize * 1.15, baseSize + 6);
//   const startOffsetX = (seed % 11) * 0.09 * stepX;
//   const startOffsetY = ((seed >>> 3) % 11) * 0.08 * stepY;

//   for (let y = pxY - startOffsetY; y < pxY + pxH; y += stepY) {
//     for (let x = pxX - startOffsetX; x < pxX + pxW; x += stepX) {
//       const clippedX = Math.max(x, pxX);
//       const clippedY = Math.max(y, pxY);
//       if (clippedX > pxX + pxW || clippedY > pxY + pxH) continue;
//       ctx.fillText(text, clippedX + 2, clippedY + 1, pxW - (clippedX - pxX));
//     }
//   }
// }

// export default function TextMosaicCanvas({ className }: TextMosaicCanvasProps) {
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const dprRef = useRef(1);
//   const rafRef = useRef<number | null>(null);
//   const dragRef = useRef({ active: false, x: 0, y: 0 });
//   const transformRef = useRef<Transform>({ scale: 1, offsetX: 0, offsetY: 0 });

//   const mapData = densityMap as DensityMapData;
//   const regions = useMemo(() => buildRegions(mapData), [mapData]);
//   const worldBounds = useMemo<Bounds>(
//     () => ({ x: 0, y: 0, w: mapData.width * CELL_SIZE, h: mapData.height * CELL_SIZE }),
//     [mapData.height, mapData.width],
//   );
//   const quadtree = useMemo(() => buildQuadtree(regions, worldBounds), [regions, worldBounds]);

//   const renderFrame = useCallback(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     const dpr = dprRef.current;
//     const { scale, offsetX, offsetY } = transformRef.current;
//     const viewportWorld: Bounds = {
//       x: -offsetX / scale,
//       y: -offsetY / scale,
//       w: canvas.width / dpr / scale,
//       h: canvas.height / dpr / scale,
//     };

//     const visible: Region[] = [];
//     queryQuadtree(quadtree, viewportWorld, visible);

//     ctx.setTransform(1, 0, 0, 1, 0, 0);
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.fillStyle = '#04130f';
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     ctx.setTransform(scale * dpr, 0, 0, scale * dpr, offsetX * dpr, offsetY * dpr);
//     ctx.imageSmoothingEnabled = false;
//     ctx.globalAlpha = 0.98;

//     for (const region of visible) {
//       if (region.w * region.h < 10) continue;
//       ctx.save();
//       ctx.beginPath();
//       ctx.rect(region.x, region.y, region.w, region.h);
//       ctx.clip();
//       ctx.fillStyle = regionColor(region.bucket);
//       const text = chooseText(region.id, scale);
//       drawRegionText(ctx, region, text, scale);
//       ctx.restore();
//     }
//   }, [quadtree]);

//   const queueRender = useCallback(() => {
//     if (rafRef.current !== null) return;
//     rafRef.current = window.requestAnimationFrame(() => {
//       rafRef.current = null;
//       renderFrame();
//     });
//   }, [renderFrame]);

//   useEffect(() => {
//     const container = containerRef.current;
//     const canvas = canvasRef.current;
//     if (!container || !canvas) return;

//     const resizeCanvas = () => {
//       const rect = container.getBoundingClientRect();
//       const dpr = window.devicePixelRatio || 1;
//       dprRef.current = dpr;
//       canvas.width = Math.max(1, Math.round(rect.width * dpr));
//       canvas.height = Math.max(1, Math.round(rect.height * dpr));
//       canvas.style.width = `${rect.width}px`;
//       canvas.style.height = `${rect.height}px`;

//       if (transformRef.current.scale === 1) {
//         const fitScale = Math.min(rect.width / worldBounds.w, rect.height / worldBounds.h);
//         transformRef.current = {
//           scale: fitScale,
//           offsetX: (rect.width - worldBounds.w * fitScale) / 2,
//           offsetY: (rect.height - worldBounds.h * fitScale) / 2,
//         };
//       }
//       queueRender();
//     };

//     resizeCanvas();
//     const observer = new ResizeObserver(resizeCanvas);
//     observer.observe(container);

//     return () => {
//       observer.disconnect();
//       if (rafRef.current !== null) {
//         cancelAnimationFrame(rafRef.current);
//         rafRef.current = null;
//       }
//     };
//   }, [queueRender, worldBounds.h, worldBounds.w]);

//   const onPointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     canvas.setPointerCapture(event.pointerId);
//     dragRef.current = { active: true, x: event.clientX, y: event.clientY };
//   };

//   const onPointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
//     if (!dragRef.current.active) return;
//     const dx = event.clientX - dragRef.current.x;
//     const dy = event.clientY - dragRef.current.y;
//     dragRef.current = { active: true, x: event.clientX, y: event.clientY };
//     transformRef.current = {
//       ...transformRef.current,
//       offsetX: transformRef.current.offsetX + dx,
//       offsetY: transformRef.current.offsetY + dy,
//     };
//     queueRender();
//   };

//   const onPointerUp = (event: PointerEvent<HTMLCanvasElement>) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     if (canvas.hasPointerCapture(event.pointerId)) {
//       canvas.releasePointerCapture(event.pointerId);
//     }
//     dragRef.current.active = false;
//   };

//   const onWheel = (event: WheelEvent<HTMLCanvasElement>) => {
//     event.preventDefault();
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const rect = canvas.getBoundingClientRect();
//     const mouseX = event.clientX - rect.left;
//     const mouseY = event.clientY - rect.top;

//     const prev = transformRef.current;
//     const zoomFactor = Math.exp(-event.deltaY * 0.0012);
//     const nextScale = clamp(prev.scale * zoomFactor, MIN_SCALE, MAX_SCALE);
//     const ratio = nextScale / prev.scale;

//     transformRef.current = {
//       scale: nextScale,
//       offsetX: mouseX - (mouseX - prev.offsetX) * ratio,
//       offsetY: mouseY - (mouseY - prev.offsetY) * ratio,
//     };
//     queueRender();
//   };

//   return (
//     <div ref={containerRef} className={className ?? 'fixed inset-0 overflow-hidden bg-[#02120d]'}>
//       <canvas
//         ref={canvasRef}
//         className="h-full w-full touch-none cursor-grab active:cursor-grabbing"
//         onPointerDown={onPointerDown}
//         onPointerMove={onPointerMove}
//         onPointerUp={onPointerUp}
//         onPointerCancel={onPointerUp}
//         onWheel={onWheel}
//       />
//     </div>
//   );
// }
