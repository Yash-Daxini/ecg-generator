import { useEffect, useRef } from "react";
import type { ECGParameters } from "../../models/ECGParameters";
import '../../styles/ECGAnimator.css';

type ECGAnimatorProps = {
    ecgParameters: ECGParameters;
    customBeatsParams: Array<any>; // You may want to type this more strictly
};

const PIXELS_PER_SECOND = 150;
const POINTER_RADIUS = 6;
const ERASE_WIDTH = 12;

const raisedCosinePulse = (t: number, h: number, b: number, t0: number) => {
    if (b === 0 || t < t0 || t > t0 + b) return 0;
    return (h / 2) * (1 - Math.cos((2 * Math.PI * (t - t0)) / b));
};

const ECGAnimator: React.FC<ECGAnimatorProps> = ({
    ecgParameters }) => {

    const svgRef = useRef<SVGSVGElement | null>(null);
    const animationRef = useRef<number>(0);
    const pointerXRef = useRef(0);
    const lastTimestampRef = useRef<number>(0);

    const pointerHeadRef = useRef<SVGCircleElement | null>(null);
    const waveformPathRef = useRef<SVGPathElement | null>(null);
    const drawnPointsRef = useRef<Array<{ x: number; y: number } | null>>([]);

    const pendingPointsRef = useRef<Array<{ x: number; y: number } | null>>([]);
    const pathPointsRef = useRef<Array<{ x: number; y: number }>>([]);


    const generateWaveformPoints = (startX = 0): Array<{ x: number; y: number }> => {

        const pts: Array<{ x: number; y: number }> = [];
        const totalTime = svgRef.current!.clientWidth / PIXELS_PER_SECOND;
        const y0 = svgRef.current!.clientHeight / 2;
        const dt = 1 / PIXELS_PER_SECOND;

        let tElapsed = startX / PIXELS_PER_SECOND;
        while (tElapsed <= totalTime) {
            const p = ecgParameters.WaveParameters;
            const heartPeriod = 60 / ecgParameters.HeartRate;
            const base = p.DefaultPWavesPerQRS * (p.PWaveDimensions.breadth + p.PQSegmentLength) +
                (p.QWaveDimensions.breadth + p.RWaveDimensions.breadth + p.SWaveDimensions.breadth) +
                p.STSegmentLength + p.TWaveDimensions.breadth + p.TPSegmentLength;
            const sf = heartPeriod / base;
            const s = {
                b_p: p.PWaveDimensions.breadth * sf,
                l_pq: p.PQSegmentLength * sf,
                b_q: p.QWaveDimensions.breadth * sf,
                b_r: p.RWaveDimensions.breadth * sf,
                b_s: p.SWaveDimensions.breadth * sf,
                l_st: p.STSegmentLength * sf,
                b_t: p.TWaveDimensions.breadth * sf,
                l_tp: p.TPSegmentLength * sf,
            };

            const times = (() => {
                let off = tElapsed;
                const t = { P: [] as number[], Q: 0, R: 0, S: 0, T: 0 };
                for (let i = 0; i < p.DefaultPWavesPerQRS; i++) {
                    t.P.push(off + i * (s.b_p + s.l_pq));
                }
                off += p.DefaultPWavesPerQRS * (s.b_p + s.l_pq);
                t.Q = off;
                off += s.b_q;
                t.R = off;
                off += s.b_r;
                t.S = off;
                off += s.b_s;
                off += s.l_st;
                t.T = off;
                return t;
            })();

            const tEnd = tElapsed + heartPeriod;

            for (let t = tElapsed; t < tEnd; t += dt) {
                let v = 0;
                for (let start of times.P) {
                    if (t >= start && t < start + s.b_p) {
                        v = raisedCosinePulse(t, p.PWaveDimensions.height, s.b_p, start);
                        break;
                    }
                }
                if (!v && t >= times.Q && t < times.Q + s.b_q)
                    v = raisedCosinePulse(t, p.QWaveDimensions.height, s.b_q, times.Q);
                if (!v && t >= times.R && t < times.R + s.b_r)
                    v = raisedCosinePulse(t, p.RWaveDimensions.height, s.b_r, times.R);
                if (!v && t >= times.S && t < times.S + s.b_s)
                    v = raisedCosinePulse(t, p.SWaveDimensions.height, s.b_s, times.S);
                if (!v && t >= times.T && t < times.T + s.b_t)
                    v = raisedCosinePulse(t, p.TWaveDimensions.height, s.b_t, times.T);

                pts.push({ x: t * PIXELS_PER_SECOND, y: y0 - v * ecgParameters.PixelsPermV });
            }

            tElapsed += base * sf;
        }
        return pts;
    };

    const drawGrid = () => {
        const svg = svgRef.current;
        if (!svg) return;
        const ns = "http://www.w3.org/2000/svg";
        const small = 8;

        const g = document.createElementNS(ns, "g");

        for (let x = 0; x <= svg.clientWidth; x += small) {
            const line = document.createElementNS(ns, "line");
            line.setAttribute("x1", `${x}`);
            line.setAttribute("y1", "0");
            line.setAttribute("x2", `${x}`);
            line.setAttribute("y2", `${svg.clientHeight}`);
            line.setAttribute("stroke", "#eee");
            g.appendChild(line);
        }

        for (let y = 0; y <= svg.clientHeight; y += small) {
            const line = document.createElementNS(ns, "line");
            line.setAttribute("x1", "0");
            line.setAttribute("y1", `${y}`);
            line.setAttribute("x2", `${svg.clientWidth}`);
            line.setAttribute("y2", `${y}`);
            line.setAttribute("stroke", "#eee");
            g.appendChild(line);
        }

        svg.appendChild(g);
    };

    useEffect(() => {
        let currentX = pointerXRef.current;

        const points = generateWaveformPoints(currentX);

        updateGraph(currentX, points);
    }, [ecgParameters]);

    const updateGraph = (currentX: number, points: {
        x: number;
        y: number;
    }[]) => {
        const svg = svgRef.current;
        if (!svg) return;

        // svg.childNodes.forEach(child => {
        //     console.warn(`Child with x1=${currentX} already exists, skipping update.`);
        //     if (child instanceof SVGElement && child.getAttribute('x1') == currentX.toString()) {
        //         console.warn(`Child with x1=${currentX} already exists, skipping update.`);
        //         svg.removeChild(child);
        //     }
        // });

        svg.innerHTML = '';

        drawGrid();
        const ns = "http://www.w3.org/2000/svg";

        const path = document.createElementNS(ns, "path");
        path.setAttribute("stroke", "#2c3e50");
        path.setAttribute("fill", "none");
        path.setAttribute("stroke-width", "2");
        svg.appendChild(path);
        waveformPathRef.current = path;

        const circle = document.createElementNS(ns, "circle");
        circle.setAttribute("r", `${POINTER_RADIUS}`);
        circle.setAttribute("fill", "#fff");
        circle.setAttribute("stroke", "#fff");
        circle.setAttribute("stroke-width", "2");
        svg.appendChild(circle);
        pointerHeadRef.current = circle;

        const alreadyDrawn = drawnPointsRef.current.filter(p => p && p.x <= currentX) as Array<{ x: number; y: number }>;

        if (!points.length) return;

        drawnPointsRef.current = [...alreadyDrawn, ...Array(points.length).fill(null)];
        pendingPointsRef.current = [...Array(alreadyDrawn.length).fill(null), ...points];
        //alreadyDrawn.length is the number of points already drawn or starting points from already moving pointer
        // pendingPointsRef.current = [...points];
        pathPointsRef.current = [...alreadyDrawn, ...points];

        //This will update whole graph with new points
        /* 
        const newPoints = generateWaveformPoints(0);

        const newAlreadyDrawn = newPoints.filter(p => p && p.x <= currentX) as Array<{ x: number; y: number }>;

        drawnPointsRef.current = [...newAlreadyDrawn, ...points];
        */

        // pendingPointsRef.current = [...Array(newAlreadyDrawn.length).fill(null)];

        // Extend drawnPointsRef with new empty slots
        const newDrawnPoints = Array(points.length).fill(null);
        drawnPointsRef.current = [
            ...drawnPointsRef.current.filter(pt => pt && pt.x < pointerXRef.current),
            ...newDrawnPoints
        ];
        lastTimestampRef.current = performance.now();

        const animate = (ts: number) => {
            const svg = svgRef.current;
            if (!svg) return;

            const dt = lastTimestampRef.current ? (ts - lastTimestampRef.current) / 1000 : 0;
            lastTimestampRef.current = ts;
            let nextX = pointerXRef.current + PIXELS_PER_SECOND * dt;

            let idx = pathPointsRef.current.findIndex(pt => pt.x >= nextX);

            const newPoints = generateWaveformPoints(0);

            const newAlreadyDrawn = newPoints.filter(p => p && p.x <= currentX) as Array<{ x: number; y: number }>;

            if (idx < 0) idx = pathPointsRef.current.length - 1;

            for (let i = 0; i < pathPointsRef.current.length; i++) {
                const pt = pendingPointsRef.current[i];
                if (pt && Math.abs(pt.x - pointerXRef.current) <= ERASE_WIDTH / 2) {
                    drawnPointsRef.current[i] = pt;
                    pendingPointsRef.current[i] = null;
                }
            }

            for (let i = 0; i < newAlreadyDrawn.length; i++) {
                const pt = newAlreadyDrawn[i];
                if (pt && Math.abs(pt.x - pointerXRef.current) <= ERASE_WIDTH / 2) {
                    drawnPointsRef.current[i] = pt;
                    pendingPointsRef.current[i] = null;
                }
            }

            waveformPathRef.current?.setAttribute("d",
                drawnPointsRef.current.reduce((str, p, i) => str + (p ? (i ? " L" : "M") + ` ${p.x} ${p.y}` : ""), "")
            );
            
            const cur = pathPointsRef.current[idx];
            if (cur) {
                pointerHeadRef.current?.setAttribute("cx", `${cur.x}`);
                pointerHeadRef.current?.setAttribute("cy", `${cur.y}`);
            }

            pointerXRef.current = nextX > svg.clientWidth ? 0 : nextX;

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }


    return (
        <>
            <svg ref={svgRef} id="ecgSVG" width="1000" height="400"></svg>
        </>
    )
}

export default ECGAnimator