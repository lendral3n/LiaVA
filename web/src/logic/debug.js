// Debug fungsi: Print semua bone yang dikenali oleh VRM Humanoid
export function debugHumanoidBones(vrm) {
  if (!vrm?.humanoid) {
    console.warn("VRM tidak memiliki humanoid");
    return;
  }

  const boneNames = [
    "hips",
    "spine",
    "chest",
    "upperChest",
    "neck",
    "head",
    "leftShoulder",
    "leftUpperArm",
    "leftLowerArm",
    "leftHand",
    "rightShoulder",
    "rightUpperArm",
    "rightLowerArm",
    "rightHand",
    "leftUpperLeg",
    "leftLowerLeg",
    "leftFoot",
    "leftToes",
    "rightUpperLeg",
    "rightLowerLeg",
    "rightFoot",
    "rightToes",
  ];

  console.log("===== Bone Structure =====");
  boneNames.forEach((bone) => {
    const boneNode = vrm.humanoid.getNormalizedBoneNode(bone);
    if (boneNode) {
      console.log(`${bone}:`, boneNode.name);
    } else {
      console.warn(`${bone}: not found`);
    }
  });
}
