import {
  PerspectiveCamera,
  OrthographicCamera,
} from "@react-three/drei";

export default function Cameras({ type }) {
  return (
    <>
      {type === "perspective" && (
        <PerspectiveCamera
          makeDefault
          position={[5, 5, 5]}
          fov={60}
        />
      )}

      {type === "orthographic" && (
        <OrthographicCamera
          makeDefault
          position={[5, 5, 5]}
          zoom={80}
        />
      )}
    </>
  );
}