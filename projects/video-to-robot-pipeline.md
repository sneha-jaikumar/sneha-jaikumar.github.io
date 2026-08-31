---
layout: project
title: "Scalable Human-to-Robot Demonstration Pipeline"
permalink: /projects/video-to-robot-pipeline/
kicker: "Internship · Amazon"
subtitle: "How I turned ordinary phone video into executable humanoid robot motion."
description: "An end-to-end pipeline that turns ordinary phone video into executable humanoid robot motion, validated on a physical Unitree G1 and now feeding a demo at AWS re:Invent 2026."
meta:
  - "Amazon · Robotics"
  - "Perception + Retargeting + Sim2Real"
  - "Unitree G1"
---

<div class="callout">
<p><strong>TL;DR</strong> - I built a pipeline that turns a normal phone video of a person moving into motion a humanoid robot can actually execute. No VR headset, no mocap suit, no lab required. I validated the whole loop on a real Unitree G1, and it's now the data engine behind a live humanoid demo planned for AWS re:Invent 2026.</p>
</div>

## The problem

Every humanoid robotics team runs into the same wall eventually: you need thousands of examples of humans doing a task before a robot can learn to do anything useful with it. Before this project, "collecting a demonstration" meant strapping a Meta Quest headset to someone, walking them through a scripted setup, and recording them in a controlled room. One headset, one operator, maybe 5–10 demos a day on a good day. It didn't scale, and it wasn't exactly fun for the person wearing the headset either.

On the software side, there was no real path to plugging into NVIDIA's current robotics stack (GR00T, SONIC, SOMA). 

So: expensive hardware on one end, outdated software on the other. Fixing just one of those doesn't get you anywhere. I set out to solve both.

## What I built instead

I swapped the VR headset for a phone and rebuilt the whole processing pipeline on NVIDIA's current tooling. One script, front to back:

<div class="arch-diagram-wrap">
<svg class="arch-diagram" viewBox="0 0 1040 370" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Architecture diagram: phone video is captured, sent to an AWS EC2 L40S GPU instance where GEM-X perceives 3D human pose, SOMA Retargeter retargets it to G1 joint angles, a converter maps and reformats the trajectory, a kinematic check validates it against GEM-X's own render, and the SONIC policy simulates it by tracking the trajectory in MuJoCo, all backed by S3 storage for video input and motion output, before the validated trajectory is executed on the physical Unitree G1 robot.">
  <defs>
    <marker id="d1-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0,0 L8,4 L0,8 Z" class="arch-arrowhead" />
    </marker>
    <marker id="d1-arrow-accent" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0,0 L8,4 L0,8 Z" class="arch-arrowhead is-emphasis" />
    </marker>
  </defs>

  <!-- zones -->
  <rect class="arch-zone" x="20" y="70" width="150" height="170" rx="10" />
  <text class="arch-zone-label" x="22" y="60">Capture</text>

  <rect class="arch-zone" x="190" y="70" width="650" height="170" rx="10" />
  <text class="arch-zone-label" x="200" y="60">Compute — AWS EC2 (L40S GPU)</text>

  <rect class="arch-zone" x="870" y="70" width="150" height="170" rx="10" />
  <text class="arch-zone-label" x="872" y="60">Robot — Unitree G1</text>

  <!-- phone box -->
  <rect class="arch-box" x="40" y="130" width="110" height="100" rx="8" />
  <text class="arch-tag" x="52" y="150">00 · Capture</text>
  <text class="arch-title" x="52" y="172">Phone Video</text>
  <text class="arch-sub" x="52" y="198">handheld,</text>
  <text class="arch-sub" x="52" y="212">any angle</text>

  <!-- stage 1: perception -->
  <rect class="arch-box" x="215" y="130" width="100" height="100" rx="8" />
  <text class="arch-tag" x="227" y="150">01 · Perceive</text>
  <text class="arch-title" x="227" y="172">GEM-X</text>
  <text class="arch-sub" x="227" y="198">3D human pose</text>
  <text class="arch-sub" x="227" y="212">77 joints</text>

  <!-- stage 2: retargeting -->
  <rect class="arch-box" x="340" y="130" width="100" height="100" rx="8" />
  <text class="arch-tag" x="352" y="148">02 · Retarget</text>
  <text class="arch-title" x="352" y="166">SOMA</text>
  <text class="arch-title" x="352" y="182">Retargeter</text>
  <text class="arch-sub" x="352" y="200">Human pose</text>
  <text class="arch-sub" x="352" y="213">→ G1 IK</text>

  <!-- stage 3: conversion -->
  <rect class="arch-box" x="465" y="130" width="100" height="100" rx="8" />
  <text class="arch-tag" x="477" y="148">03 · Convert</text>
  <text class="arch-title" x="477" y="168">MuJoCo FK</text>
  <text class="arch-sub" x="477" y="186">Joint mapping</text>
  <text class="arch-sub" x="477" y="200">+ trajectory</text>
  <text class="arch-sub" x="477" y="213">conversion</text>

  <!-- stage 4: kinematic correctness check -->
  <rect class="arch-box" x="590" y="130" width="100" height="100" rx="8" />
  <text class="arch-tag" x="602" y="148">04 · Validate</text>
  <text class="arch-title" x="602" y="166">Kinematic</text>
  <text class="arch-title" x="602" y="182">Check</text>
  <text class="arch-sub" x="602" y="200">Pose comparison</text>
  <text class="arch-sub" x="602" y="213">+ render</text>

  <!-- stage 5: sim2sim (key gate before hardware) -->
  <rect class="arch-box is-key" x="715" y="130" width="100" height="100" rx="8" />
  <text class="arch-tag" x="727" y="148">05 · Simulate</text>
  <text class="arch-title" x="727" y="166">SONIC</text>
  <text class="arch-title" x="727" y="182">Policy</text>
  <text class="arch-sub" x="727" y="200">Tracks</text>
  <text class="arch-sub" x="727" y="213">in MuJoCo</text>

  <!-- robot box -->
  <rect class="arch-box" x="890" y="130" width="110" height="100" rx="8" />
  <text class="arch-tag" x="902" y="150">06 · Execute</text>
  <text class="arch-title" x="902" y="172">SONIC WBC</text>
  <text class="arch-sub" x="902" y="198">Unitree G1,</text>
  <text class="arch-sub" x="902" y="212">29-DOF</text>

  <!-- cross-zone flow (labeled) -->
  <line class="arch-arrow is-emphasis" x1="150" y1="180" x2="211" y2="180" marker-end="url(#d1-arrow-accent)" />
  <text class="arch-flow-label" x="182" y="165">video.mp4</text>

  <line class="arch-arrow is-emphasis" x1="815" y1="180" x2="886" y2="180" marker-end="url(#d1-arrow-accent)" />
  <text class="arch-flow-label" x="850" y="165">trajectory</text>

  <!-- internal zone flow (plain) -->
  <line class="arch-arrow" x1="315" y1="180" x2="336" y2="180" marker-end="url(#d1-arrow)" />
  <line class="arch-arrow" x1="440" y1="180" x2="461" y2="180" marker-end="url(#d1-arrow)" />
  <line class="arch-arrow" x1="565" y1="180" x2="586" y2="180" marker-end="url(#d1-arrow)" />
  <line class="arch-arrow" x1="690" y1="180" x2="711" y2="180" marker-end="url(#d1-arrow)" />

  <!-- persistent storage -->
  <line class="arch-connector" x1="515" y1="240" x2="515" y2="278" />
  <rect class="arch-store" x="460" y="278" width="110" height="65" rx="8" />
  <text class="arch-tag" x="472" y="294">Storage</text>
  <text class="arch-title" x="472" y="310">Amazon S3</text>
  <text class="arch-sub" x="472" y="324">video in,</text>
  <text class="arch-sub" x="472" y="336">motion out</text>
</svg>
</div>

## Does it actually work on a real robot?

Yes! Phone video in, simulation check, then a physical Unitree G1 executing the motion. Fully automated, one command, reproducible: infrastructure-as-code via CloudFormation, deterministic outputs, error reporting at every stage so you know exactly where it broke if it does.

## Where this is headed: AWS re:Invent 2026

The video-to-robot pipeline is designed to serve as a scalable data-generation layer for the **AWS Swag Factory**, a planned humanoid demonstration at re:Invent 2026 where a Unitree G1 will perform tasks such as picking, sorting, and distributing items.

The path from the pipeline I built to that larger system looks like this:

<div class="arch-diagram-wrap">
<svg class="arch-diagram" viewBox="0 0 1150 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Roadmap diagram: the video-to-robot pipeline I built generates G1 demonstrations, which scale into a training dataset, which downstream teams use to fine-tune NVIDIA GR00T on demonstrations and robot camera observations, targeting a deployed policy on the Unitree G1 at the AWS Swag Factory demo.">
  <defs>
    <marker id="d2-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0,0 L8,4 L0,8 Z" class="arch-arrowhead is-emphasis" />
    </marker>
  </defs>

  <rect class="arch-box" x="25" y="45" width="200" height="110" rx="8" />
  <text class="arch-tag" x="37" y="65">Step 1 · Data Generation</text>
  <text class="arch-title" x="37" y="87">Video-to-Robot Pipeline</text>
  <text class="arch-sub" x="37" y="113">phone video →</text>
  <text class="arch-sub" x="37" y="127">G1 demonstrations</text>

  <rect class="arch-box" x="325" y="45" width="200" height="110" rx="8" />
  <text class="arch-tag" x="337" y="65">Step 2 · Scale</text>
  <text class="arch-title" x="337" y="87">Demonstration Dataset</text>
  <text class="arch-sub" x="337" y="113">Target: 50-100+ demos</text>
  <text class="arch-sub" x="337" y="127">per task</text>

  <rect class="arch-box" x="625" y="45" width="200" height="110" rx="8" />
  <text class="arch-tag" x="637" y="65">Step 3 · Train</text>
  <text class="arch-title" x="637" y="87">Fine-tune GR00T</text>
  <text class="arch-sub" x="637" y="113">demonstrations +</text>
  <text class="arch-sub" x="637" y="127">robot camera observations</text>

  <rect class="arch-box is-key" x="925" y="45" width="200" height="110" rx="8" />
  <text class="arch-tag" x="937" y="65">Step 4 · Deploy</text>
  <text class="arch-title" x="937" y="87">Swag Factory Demo</text>
  <text class="arch-sub" x="937" y="113">learned policy</text>
  <text class="arch-sub" x="937" y="127">on Unitree G1</text>

  <line class="arch-arrow is-emphasis" x1="225" y1="100" x2="321" y2="100" marker-end="url(#d2-arrow)" />
  <text class="arch-flow-label" x="275" y="82">G1</text>
  <text class="arch-flow-label" x="275" y="94">demos</text>

  <line class="arch-arrow is-emphasis" x1="525" y1="100" x2="621" y2="100" marker-end="url(#d2-arrow)" />
  <text class="arch-flow-label" x="575" y="90">training data</text>

  <line class="arch-arrow is-emphasis" x1="825" y1="100" x2="921" y2="100" marker-end="url(#d2-arrow)" />
  <text class="arch-flow-label" x="875" y="82">fine-tuned</text>
  <text class="arch-flow-label" x="875" y="94">policy</text>
</svg>
</div>

Without a way to collect demonstrations at volume, you're stuck with whatever generic behavior the foundation model ships with. This pipeline is what lets the team actually customize it (different objects, different table setups, different people walking up to the booth).

## See it in action

The same five seconds of video, all the way through the pipeline — raw phone footage, pose estimation, the retargeted 3D motion, the SONIC policy tracking it in sim, and finally a physical Unitree G1 running it.

<div class="arch-diagram-wrap">
<div class="video-filmstrip">
  <div class="video-filmstrip-item">
    <span class="video-filmstrip-tag">1 · Raw video</span>
    <video src="{{ '/projects/01-raw-video.mov' | relative_url }}" controls muted playsinline preload="metadata"></video>
  </div>
  <span class="video-filmstrip-arrow">→</span>
  <div class="video-filmstrip-item">
    <span class="video-filmstrip-tag">2 · Skeleton overlay</span>
    <video src="{{ '/projects/02-skeleton-overlay.mp4' | relative_url }}" controls muted playsinline preload="metadata"></video>
  </div>
  <span class="video-filmstrip-arrow">→</span>
  <div class="video-filmstrip-item">
    <span class="video-filmstrip-tag">3 · 3D motion</span>
    <video src="{{ '/projects/03-3d-motion.mp4' | relative_url }}" controls muted playsinline preload="metadata"></video>
  </div>
  <span class="video-filmstrip-arrow">→</span>
  <div class="video-filmstrip-item">
    <span class="video-filmstrip-tag">4 · MuJoCo Simulation</span>
    <video src="{{ '/projects/04-sim2sim.mov' | relative_url }}" controls muted playsinline preload="metadata"></video>
  </div>
  <span class="video-filmstrip-arrow">→</span>
  <div class="video-filmstrip-item">
    <span class="video-filmstrip-tag">5 · G1 Unitree</span>
    <video src="{{ '/projects/05-real-robot.mov' | relative_url }}" controls muted playsinline preload="metadata"></video>
  </div>
</div>
</div>

## What changed, concretely

| | Before | After |
|---|---|---|
| Hardware | $500+ headset per station | any phone |
| Setup | scheduled lab session | record anywhere, anytime |
| Operator | technical staff required | anyone |
| Throughput | ~5–10 demos/day/setup | limited only by how many people own a phone |
| Software | unmaintained research code | NVIDIA's current, supported stack |

## So, what now?

 Right now, the pipeline gets you from a human video to a robot-executable motion. That’s useful, but the more interesting question is what the robot can actually learn from those demonstrations.

I'm working on training a simple imitation-learning policy on the generated trajectories and seeing how performance changes with just a few examples. Then I’d push toward just-in-time learning: the robot hits a task it hasn’t seen before, asks for a new demonstration, adapts from a small amount of data, and tries again. The part I’m most interested in is how little new data you can get away with before the robot becomes useful.

Beyond that: I'm curious to better understand when the robot should trust its current policy, when it should ask for another example, and how to keep that adaptation safe enough to run on a real system.

## The stack

MuJoCo, Isaac Lab, NVIDIA SONIC / GR00T WBC · GEM-X, SOMA, SOMA Retargeter, SAM3D · AWS EC2 (L40S), S3, CloudFormation, NICE DCV · Unitree G1 (29-DOF) · Python, Bash
