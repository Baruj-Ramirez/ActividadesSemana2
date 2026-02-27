using UnityEngine;

public class RobotArm : MonoBehaviour
{
    public Transform joint1;
    public Transform joint2;

    public float angle1;
    public float angle2;

    void Update()
    {
        joint1.localRotation = Quaternion.Euler(0, angle1, 0);
        joint2.localRotation = Quaternion.Euler(0, angle2, 0);
    }
}