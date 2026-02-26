export default function Objects() {
  return (
    <>
      {/* Objeto cercano */}
      <mesh position={[-2, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>

      {/* Objeto medio */}
      <mesh position={[0, 0, -3]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      {/* Objeto lejano */}
      <mesh position={[2, 0, -6]}>
        <coneGeometry args={[0.7, 1.5, 32]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </>
  );
}