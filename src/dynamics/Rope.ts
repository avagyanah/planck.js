// /*
//  * Planck.js
//  * The MIT License
//  * Copyright (c) 2021 Erin Catto, Ali Shakiba
//  *
//  * Permission is hereby granted, free of charge, to any person obtaining a copy
//  * of this software and associated documentation files (the "Software"), to deal
//  * in the Software without restriction, including without limitation the rights
//  * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  * copies of the Software, and to permit persons to whom the Software is
//  * furnished to do so, subject to the following conditions:
//  *
//  * The above copyright notice and this permission notice shall be included in all
//  * copies or substantial portions of the Software.
//  *
//  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//  * SOFTWARE.
//  */

// import common from '../util/common';
// import { Vec2 } from "../index";
// import options from "../util/options";


// const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;


// export interface RopeDef {
//   vertices: Vec2[];
//   count: number;
//   masses: number[];
//   gravity: Vec2;
//   damping: number;
//   /** Stretching stiffness */
//   k2: number;
//   /** Bending stiffness. Values above 0.5 can make the simulation blow up. */
//   k3: number;
// }

// const RopeDefDefault: RopeDef = {
//   vertices: [],
//   count: 0,
//   masses: [],
//   gravity : Vec2.zero(),
//   damping : 0.1,
//   k2 : 0.9,
//   k3 : 0.1
// };

// export default class Rope {
//   m_gravity = Vec2.zero();
//   m_damping: number;

//   m_count = 0;
//   m_ps: Vec2[] = null;
//   m_p0s: Vec2[] = null;
//   m_vs: Vec2[] = null;
//   m_ims: number[] = null;
//   m_Ls: number[] = null;
//   m_as: number[] = null;

//   m_k2 = 1.0;
//   m_k3 = 0.1;

//   constructor(def) {
//     _ASSERT && common.assert(def.count >= 3);

//     def = options(def, RopeDefDefault);

//     this.m_count = def.count;
//     this.m_ps = [];
//     this.m_p0s = [];
//     this.m_vs = [];
//     this.m_ims = [];

//     for (let i = 0; i < this.m_count; ++i) {
//       this.m_ps[i] = def.vertices[i];
//       this.m_p0s[i] = def.vertices[i];
//       this.m_vs[i].setZero();

//       const m = def.masses[i];
//       if (m > 0.0) {
//         this.m_ims[i] = 1.0 / m;
//       } else {
//         this.m_ims[i] = 0.0;
//       }
//     }

//     const count2 = this.m_count - 1;
//     const count3 = this.m_count - 2;
//     this.m_Ls = []; // [count2]
//     this.m_as = []; // [count3]

//     for (let i = 0; i < count2; ++i) {
//       const p1 = this.m_ps[i];
//       const p2 = this.m_ps[i + 1];
//       this.m_Ls[i] = Vec2.distance(p1, p2);
//     }

//     for (let i = 0; i < count3; ++i) {
//       const p1 = this.m_ps[i];
//       const p2 = this.m_ps[i + 1];
//       const p3 = this.m_ps[i + 2];

//       const d1 = Vec2.sub(p2, p1);
//       const d2 = Vec2.sub(p3, p2);

//       const a = Vec2.cross(d1, d2);
//       const b = Vec2.dot(d1, d2);

//       this.m_as[i] = Math.atan2(a, b);
//     }

//     this.m_gravity = def.gravity;
//     this.m_damping = def.damping;
//     this.m_k2 = def.k2;
//     this.m_k3 = def.k3;
//   }

//   getVertexCount() {
//     return this.m_count;
//   }

//   getVertices() {
//     return this.m_ps;
//   }

//   // h: timeStep
//   step(h, iterations) {
//     if (h == 0.0) {
//       return;
//     }

//     const d = Math.exp(-h * this.m_damping);

//     for (let i = 0; i < this.m_count; ++i) {
//       this.m_p0s[i] = this.m_ps[i];
//       if (this.m_ims[i] > 0.0) {
//         this.m_vs[i].addMul(h, this.m_gravity);
//       }
//       this.m_vs[i].mul(d);
//       this.m_ps[i].addMul(h, this.m_vs[i]);

//     }

//     for (let i = 0; i < iterations; ++i) {
//       this.solveC2();
//       this.solveC3();
//       this.solveC2();
//     }

//     const inv_h = 1.0 / h;
//     for (let i = 0; i < this.m_count; ++i) {
//       this.m_vs[i] = inv_h * (this.m_ps[i] - this.m_p0s[i]);
//     }
//   }

//   solveC2() {
//     const count2 = this.m_count - 1;

//     for (let i = 0; i < count2; ++i) {
//       let p1 = this.m_ps[i]; // Vec2
//       let p2 = this.m_ps[i + 1]; // Vec2

//       const d = p2 - p1; // Vec2
//       const L = d.normalize();

//       const im1 = this.m_ims[i];
//       const im2 = this.m_ims[i + 1];

//       if (im1 + im2 == 0.0) {
//         continue;
//       }

//       const s1 = im1 / (im1 + im2);
//       const s2 = im2 / (im1 + im2);

//       p1 -= this.m_k2 * s1 * (this.m_Ls[i] - L) * d;
//       p2 += this.m_k2 * s2 * (this.m_Ls[i] - L) * d;

//       this.m_ps[i] = p1;
//       this.m_ps[i + 1] = p2;
//     }
//   }

//   setAngle(angle) {
//     const count3 = this.m_count - 2;
//     for (let i = 0; i < count3; ++i) {
//       this.m_as[i] = angle;
//     }
//   }

//   solveC3() {
//     const count3 = this.m_count - 2;

//     for (let i = 0; i < count3; ++i) {
//       const p1 = this.m_ps[i];
//       const p2 = this.m_ps[i + 1];
//       const p3 = this.m_ps[i + 2];

//       const m1 = this.m_ims[i];
//       const m2 = this.m_ims[i + 1];
//       const m3 = this.m_ims[i + 2];

//       const d1 = Vec2.sub(p2, p1);
//       const d2 = Vec2.sub(p3, p2);

//       const L1sqr = d1.lengthSquared();
//       const L2sqr = d2.lengthSquared();

//       if (L1sqr * L2sqr == 0.0) {
//         continue;
//       }

//       const a = Vec2.cross(d1, d2);
//       const b = Vec2.dot(d1, d2);

//       let angle = Math.atan2(a, b);

//       const Jd1 = Vec2.mul(Vec2.skew(d1), -1.0 / L1sqr);
//       const Jd2 = Vec2.mul(Vec2.skew(d2), 1.0 / L2sqr);

//       const J1 = Vec2.neg(Jd1);
//       const J2 = Vec2.sub(Jd1, Jd2);
//       const J3 = Jd2.clone();

//       let mass = m1 * Vec2.dot(J1, J1) + m2 * Vec2.dot(J2, J2) + m3 * Vec2.dot(J3, J3);
//       if (mass == 0.0) {
//         continue;
//       }

//       mass = 1.0 / mass;

//       let C = angle - this.m_as[i];

//       while (C > Math.PI) {
//         angle -= 2 * Math.PI;
//         C = angle - this.m_as[i];
//       }

//       while (C < -Math.PI) {
//         angle += 2.0 * Math.PI;
//         C = angle - this.m_as[i];
//       }

//       const impulse = -this.m_k3 * mass * C;

//       p1.addMul(m1 * impulse, J1);
//       p2.addMul(m2 * impulse, J2);
//       p3.addMul(m3 * impulse, J3);

//       this.m_ps[i] = p1;
//       this.m_ps[i + 1] = p2;
//       this.m_ps[i + 2] = p3;
//     }
//   }
// }
