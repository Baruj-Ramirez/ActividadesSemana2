using UnityEngine;

public class MatrixExample : MonoBehaviour
{
    void Start()
    {
        Matrix4x4 translation = Matrix4x4.Translate(new Vector3(2, 0, 0));
        Matrix4x4 rotation = Matrix4x4.Rotate(Quaternion.Euler(0, 45, 0));

        Matrix4x4 TR = translation * rotation;
        Matrix4x4 RT = rotation * translation;

        Debug.Log("Translation * Rotation:\n" + TR);
        Debug.Log("Rotation * Translation:\n" + RT);
        Matrix4x4 inverse = TR.inverse;
        Matrix4x4 identity = TR * inverse;

        Debug.Log("T * T^-1:\n" + identity);
    }
}