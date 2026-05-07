"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    mount.appendChild(renderer.domElement);

    // Wireframe icosahedron — refined accent
    const geo = new THREE.IcosahedronGeometry(2.2, 1);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0xd6ff3d,
      transparent: true,
      opacity: 0.55,
    });
    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(geo),
      wireMat
    );
    scene.add(wire);

    // Inner solid sphere for soft contrast
    const innerGeo = new THREE.IcosahedronGeometry(2.15, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x0a0a0a,
      transparent: true,
      opacity: 0.8,
    });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    scene.add(inner);

    // Particle field
    const pCount = 1200;
    const positions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const r = 4 + Math.random() * 8;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(p) * Math.cos(t);
      positions[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      positions[i * 3 + 2] = r * Math.cos(p);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.012,
      transparent: true,
      opacity: 0.6,
    });
    const pts = new THREE.Points(pGeo, pMat);
    scene.add(pts);

    // Mouse parallax
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouse = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    if (!reduced) window.addEventListener("mousemove", onMouse);

    let raf: number;
    const tick = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      wire.rotation.y += 0.0025;
      wire.rotation.x += 0.0012;
      wire.rotation.y += mouse.x * 0.005;
      wire.rotation.x += mouse.y * 0.005;

      inner.rotation.copy(wire.rotation);

      pts.rotation.y += 0.0008;
      pts.rotation.y += mouse.x * 0.001;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => {
      const W = mount.clientWidth;
      const H = mount.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geo.dispose();
      innerGeo.dispose();
      pGeo.dispose();
      wireMat.dispose();
      innerMat.dispose();
      pMat.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 -z-0" aria-hidden="true" />;
}
