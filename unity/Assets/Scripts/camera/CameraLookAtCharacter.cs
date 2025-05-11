using UnityEngine;

public class AssistantCamera : MonoBehaviour
{
    public Transform target;
    private Vector3 offset = new Vector3(0, 0, 0.5f);// Kamera di depan karakter, sedikit ke atas

    void LateUpdate()
    {
        if (target == null) return;

        Vector3 targetPosition = target.position + target.forward * offset.z + target.up * offset.y + target.right * offset.x;
        transform.position = targetPosition;
        transform.LookAt(target.position + Vector3.up * 0.2f); // fokus ke atas sedikit (mata)
    }
}