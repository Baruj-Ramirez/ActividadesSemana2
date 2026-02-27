using UnityEngine;

public class DrawAxes : MonoBehaviour
{
    public float axisLength = 1f;

    void OnDrawGizmos()
    {
        // Eje X (rojo)
        Gizmos.color = Color.red;
        Gizmos.DrawLine(transform.position, transform.position + transform.right * axisLength);

        // Eje Y (verde)
        Gizmos.color = Color.green;
        Gizmos.DrawLine(transform.position, transform.position + transform.up * axisLength);

        // Eje Z (azul)
        Gizmos.color = Color.blue;
        Gizmos.DrawLine(transform.position, transform.position + transform.forward * axisLength);
    }
}