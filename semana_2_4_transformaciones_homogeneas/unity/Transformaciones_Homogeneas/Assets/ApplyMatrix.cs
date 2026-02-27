using UnityEngine;

public class ApplyMatrix : MonoBehaviour
{
    void Start()
    {
        // Punto original (origen en coordenadas locales)
        Vector3 point = Vector3.zero;

        // Crear matriz de traslación
        Matrix4x4 translation = Matrix4x4.Translate(new Vector3(2, 0, 0));

        // Crear matriz de rotación
        Matrix4x4 rotation = Matrix4x4.Rotate(Quaternion.Euler(0, 45, 0));

        // Composición (ORDEN IMPORTA)
        Matrix4x4 composite = translation * rotation;

        // Aplicar transformación al punto
        Vector3 transformedPoint = composite.MultiplyPoint3x4(point);

        // Mover el objeto a la nueva posición
        transform.position = transformedPoint;
    }
}