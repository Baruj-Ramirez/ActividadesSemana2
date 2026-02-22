using UnityEngine;
using UnityEngine.UI;

public class CameraModeController : MonoBehaviour
{
    [Header("References")]
    [SerializeField] private Camera targetCamera;
    [SerializeField] private Toggle orthoToggle;
    [SerializeField] private Slider orthoSizeSlider;

    [Header("Orthographic Settings")]
    [SerializeField] private float minOrthoSize = 1f;
    [SerializeField] private float maxOrthoSize = 20f;

    [Header("Debug")]
    [SerializeField] private bool logProjectionMatrix = false;

    private void Start()
    {
        if (targetCamera == null)
            targetCamera = Camera.main;

        // Configurar slider
        orthoSizeSlider.minValue = minOrthoSize;
        orthoSizeSlider.maxValue = maxOrthoSize;
        orthoSizeSlider.value = targetCamera.orthographicSize;

        // Estado inicial
        orthoToggle.isOn = targetCamera.orthographic;
        UpdateCameraMode(orthoToggle.isOn);

        // Listeners
        orthoToggle.onValueChanged.AddListener(UpdateCameraMode);
        orthoSizeSlider.onValueChanged.AddListener(UpdateOrthoSize);
    }

    private void UpdateCameraMode(bool isOrtho)
    {
        targetCamera.orthographic = isOrtho;
        orthoSizeSlider.gameObject.SetActive(isOrtho);

        if (logProjectionMatrix)
            LogProjectionMatrix();
    }

    private void UpdateOrthoSize(float value)
    {
        if (!targetCamera.orthographic) return;

        targetCamera.orthographicSize = value;

        if (logProjectionMatrix)
            LogProjectionMatrix();
    }

    private void LogProjectionMatrix()
    {
        Matrix4x4 m = targetCamera.projectionMatrix;

        Debug.Log(
            $"Projection Matrix:\n" +
            $"{m.m00:F3} {m.m01:F3} {m.m02:F3} {m.m03:F3}\n" +
            $"{m.m10:F3} {m.m11:F3} {m.m12:F3} {m.m13:F3}\n" +
            $"{m.m20:F3} {m.m21:F3} {m.m22:F3} {m.m23:F3}\n" +
            $"{m.m30:F3} {m.m31:F3} {m.m32:F3} {m.m33:F3}"
        );
    }
}
