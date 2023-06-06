export { default as Settings } from "./Settings";
export {
  default as AABB,
  RayCastCallback,
  RayCastInput,
  RayCastOutput,
} from "./collision/AABB";
export {
  default as Distance,
  DistanceInput,
  DistanceOutput,
} from "./collision/Distance";
export {
  default as DynamicTree,
  DynamicTreeQueryCallback,
} from "./collision/DynamicTree";
export { default as Manifold } from "./collision/Manifold";
export { default as Shape, ShapeType } from "./collision/Shape";
export {
  TOIInput,
  TOIOutput,
  default as TimeOfImpact,
} from "./collision/TimeOfImpact";
export { default as Box } from "./collision/shape/BoxShape";
export { default as Chain } from "./collision/shape/ChainShape";
export { default as Circle } from "./collision/shape/CircleShape";
export { CollideCircles } from "./collision/shape/CollideCircle";
export { CollidePolygonCircle } from "./collision/shape/CollideCirclePolygone";
export { CollideEdgeCircle } from "./collision/shape/CollideEdgeCircle";
export { CollideEdgePolygon } from "./collision/shape/CollideEdgePolygon";
export { CollidePolygons } from "./collision/shape/CollidePolygon";
export { default as Edge } from "./collision/shape/EdgeShape";
export { default as Polygon } from "./collision/shape/PolygonShape";
export { default as Mat22 } from "./common/Mat22";
export { default as Mat33 } from "./common/Mat33";
export { default as Math } from "./common/Math";
export { default as Rot } from "./common/Rot";
export { default as Sweep } from "./common/Sweep";
export { default as Transform } from "./common/Transform";
export { default as Vec2 } from "./common/Vec2";
export { default as Vec3 } from "./common/Vec3";
export { default as Body, BodyDef, BodyType, MassData } from "./dynamics/Body";
export {
  default as Contact,
  ContactCallback,
  ContactEdge,
} from "./dynamics/Contact";
export {
  default as Fixture,
  FixtureDef,
  FixtureOpt,
  FixtureProxy,
} from "./dynamics/Fixture";
export {
  default as Joint,
  JointDef,
  JointEdge,
  JointOpt,
} from "./dynamics/Joint";
export { default as World } from "./dynamics/World";
export {
  default as DistanceJoint,
  DistanceJointDef,
  DistanceJointOpt,
} from "./dynamics/joint/DistanceJoint";
export {
  default as FrictionJoint,
  FrictionJointDef,
  FrictionJointOpt,
} from "./dynamics/joint/FrictionJoint";
export {
  default as GearJoint,
  GearJointDef,
  GearJointOpt,
} from "./dynamics/joint/GearJoint";
export {
  default as MotorJoint,
  MotorJointDef,
  MotorJointOpt,
} from "./dynamics/joint/MotorJoint";
export {
  default as MouseJoint,
  MouseJointDef,
  MouseJointOpt,
} from "./dynamics/joint/MouseJoint";
export {
  default as PrismaticJoint,
  PrismaticJointDef,
  PrismaticJointOpt,
} from "./dynamics/joint/PrismaticJoint";
export {
  default as PulleyJoint,
  PulleyJointDef,
  PulleyJointOpt,
} from "./dynamics/joint/PulleyJoint";
export {
  default as RevoluteJoint,
  RevoluteJointDef,
  RevoluteJointOpt,
} from "./dynamics/joint/RevoluteJoint";
export {
  default as RopeJoint,
  RopeJointDef,
  RopeJointOpt,
} from "./dynamics/joint/RopeJoint";
export {
  default as WeldJoint,
  WeldJointDef,
  WeldJointOpt,
} from "./dynamics/joint/WeldJoint";
export {
  default as WheelJoint,
  WheelJointDef,
  WheelJointOpt,
} from "./dynamics/joint/WheelJoint";
export { default as Serializer } from "./serializer/index";
export type { _ContactImpulse as ContactImpulse };

import { default as Settings } from "./Settings";
import {
  default as Distance,
  DistanceInput,
  DistanceOutput,
  DistanceProxy,
  SimplexCache,
  testOverlap,
} from "./collision/Distance";
import { default as DynamicTree } from "./collision/DynamicTree";
import { default as Manifold } from "./collision/Manifold";
import {
  TOIInput,
  TOIOutput,
  default as TimeOfImpact,
} from "./collision/TimeOfImpact";
import { CollidePolygons } from "./collision/shape/CollidePolygon";
import { default as Sweep } from "./common/Sweep";
import Solver, { TimeStep } from "./dynamics/Solver";

import { default as stats } from "./util/stats"; // todo: what to do with this?

import { ContactImpulse } from "./dynamics/Solver";
type _ContactImpulse = InstanceType<typeof ContactImpulse>;

/** @deprecated Merged with main namespace */
export const internal = {};

// @ts-ignore
internal.CollidePolygons = CollidePolygons;
// @ts-ignore
internal.Settings = Settings;
// @ts-ignore
internal.Sweep = Sweep;
// @ts-ignore
internal.Manifold = Manifold;
// @ts-ignore
internal.Distance = Distance;
// @ts-ignore
internal.TimeOfImpact = TimeOfImpact;
// @ts-ignore
internal.DynamicTree = DynamicTree;
// @ts-ignore
internal.stats = stats;

// @ts-ignore
Solver.TimeStep = TimeStep;

// @ts-ignore
Distance.testOverlap = testOverlap;
// @ts-ignore
Distance.Input = DistanceInput;
// @ts-ignore
Distance.Output = DistanceOutput;
// @ts-ignore
Distance.Proxy = DistanceProxy;
// @ts-ignore
Distance.Cache = SimplexCache;

// @ts-ignore
TimeOfImpact.Input = TOIInput;
// @ts-ignore
TimeOfImpact.Output = TOIOutput;
