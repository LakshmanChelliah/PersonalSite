"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
export default function ModelViewer() {
  const root = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("Loading product model…");
  useEffect(() => {
    const container = root.current;
    if (!container) return;
    let disposed = false;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setStatus(
        "3D is unavailable in this browser. Explore the product film instead.",
      );
      return;
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
    renderer.setClearColor(0x10131c, 1);
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 100);
    camera.position.set(2.8, 2, 3.4);
    scene.add(new THREE.HemisphereLight(0xc4d8ff, 0x272132, 3));
    const key = new THREE.DirectionalLight(0xffffff, 5);
    key.position.set(3, 5, 2);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x8e75ff, 5);
    rim.position.set(-3, 1, -2);
    scene.add(rim);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 1.5;
    controls.maxDistance = 7;
    controls.autoRotate = !matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    controls.autoRotateSpeed = 1.5;
    const grid = new THREE.GridHelper(8, 24, 0x3a3956, 0x232438);
    grid.position.y = -0.65;
    scene.add(grid);
    let model: THREE.Object3D | null = null;
    const disposeObject = (object: THREE.Object3D) =>
      object.traverse((child) => {
        if (
          child instanceof THREE.Mesh ||
          child instanceof THREE.LineSegments
        ) {
          child.geometry.dispose();
          const mats = Array.isArray(child.material)
            ? child.material
            : [child.material];
          for (const mat of mats) {
            for (const value of Object.values(mat))
              if (value instanceof THREE.Texture) value.dispose();
            mat.dispose();
          }
        }
      });
    new GLTFLoader().load(
      "/media/storm-pegasus.glb",
      (gltf) => {
        if (disposed) {
          disposeObject(gltf.scene);
          return;
        }
        model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const scale = 2 / Math.max(size.x, size.y, size.z);
        model.position.sub(center);
        const group = new THREE.Group();
        group.add(model);
        group.scale.setScalar(scale);
        scene.add(group);
        setStatus("Drag to orbit · scroll or pinch to zoom");
      },
      undefined,
      () =>
        setStatus(
          "The model could not load. The product film is still available.",
        ),
    );
    const resize = () => {
      const w = container.clientWidth,
        h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();
    let active = true;
    const visibility = new IntersectionObserver(([e]) => {
      active = e.isIntersecting;
    });
    visibility.observe(container);
    renderer.setAnimationLoop(() => {
      if (active && !document.hidden) {
        controls.update();
        renderer.render(scene, camera);
      }
    });
    return () => {
      disposed = true;
      observer.disconnect();
      visibility.disconnect();
      renderer.setAnimationLoop(null);
      controls.dispose();
      disposeObject(scene);
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);
  return (
    <>
      <div
        className="three-viewport"
        ref={root}
        aria-label="Interactive BeyWeb spinning-top product model"
        role="img"
      />
      <span className="viewer-caption" role="status">
        {status}
      </span>
    </>
  );
}
