---
layout: project
title: "FurnishAI"
permalink: /projects/furnishai/
kicker: "Internship · Amazon"
subtitle: "An AI-powered interior design pipeline that turns a room photo into a photorealistic, shoppable furnished rendering."
description: "An end-to-end interior design pipeline built at Amazon: upload a room photo, pick an aesthetic, get a photorealistic furnished rendering with shoppable product cards. Winner of the People's Choice Award at the Global AI Solutions Expo (alongside 80 interns worldwide)."
meta:
  - "Amazon · Solutions Architecture"
  - "Generative AI"
  - "Computer Vision"
  - "Stable Diffusion"
  - "Infrastructure as Code"
  - "🏆 People's Choice Award"
---

<div class="callout">
<p><strong>TL;DR</strong> - I built FurnishAI, a pipeline that takes a photo of an empty room and a chosen aesthetic and returns a photorealistic furnished rendering with clickable, shoppable product cards. It combines vision models, generative image editing, and vector search over a real product catalog. It won the People's Choice Award at Amazon's Global AI Solutions Expo (alongside 80 interns worldwide), and pieces of it are being adopted into internal SA tooling.</p>
</div>

## The business problem

Interior design and furniture retail have a trust gap: customers can't tell if a piece of furniture will actually look right in their space until it's already in their living room. That uncertainty suppresses purchases, drives returns, and makes it hard for retailers to convert browsing into buying. In fact, furniture is one of the highest-return categories in e-commerce precisely because customers are guessing at scale, color match, and fit sight unseen.

That gap costs both sides of the transaction: customers either take the risk and return what doesn't fit, or don't buy at all; retailers absorb the cost of those returns and lose the sales that hesitation kills. Static product photos and generic room mockups don't close that gap; customers need to see the actual piece, in their actual room, before they commit.

So the problem centers on **consumers**: they need a fast, trustworthy way to visualize furniture in their own space before buying, not after. A reusable pattern for building that experience is also valuable to **retailers and the field SAs who advise them**, but the core problem this project solves is the consumer trust gap itself.

## What I built

FurnishAI has two flows built around a shared AI pipeline and product catalog:

- **Consumer flow:** upload a room photo, pick an aesthetic (ie. Mid-Century Modern, Scandinavian Minimal, Industrial Loft), and get back a furnished rendering with shoppable product cards (purchase links + prices).
- **Retailer flow:** upload a product image + metadata; it's validated and moderated, described visually via Claude Haiku, embedded with Titan, and indexed into an Aurora pgvector catalog, making it instantly available for consumer recommendations.

<div class="arch-diagram-wrap">
<svg class="arch-diagram" viewBox="0 0 1340 760" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Architecture diagram: a user hits the Retailer Portal or Consumer Frontend, both behind API Gateway inside a VPC. API Gateway triggers a Step Functions retailer pipeline (validate, process image, generate embedding, index product) or consumer pipeline (vision, reasoning, search, masking, Stable Diffusion, assemble). Both pipelines read and write Aurora Serverless PostgreSQL with pgvector, call out to Bedrock Titan Embeddings, Bedrock reasoning, Stable Diffusion Inpainting, SageMaker vision and mask-generation models, and Rekognition, and read/write S3 buckets for the catalog and processing data.">
  <defs>
    <marker id="fa-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0,0 L8,4 L0,8 Z" class="arch-arrowhead" />
    </marker>
    <marker id="fa-arrow-accent" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0,0 L8,4 L0,8 Z" class="arch-arrowhead is-emphasis" />
    </marker>
  </defs>

  <!-- outer AWS Cloud boundary -->
  <rect class="arch-zone" x="110" y="20" width="1200" height="700" rx="10" />
  <text class="arch-zone-label" x="122" y="12">AWS Cloud</text>

  <!-- User (external actor) -->
  <rect class="arch-box" x="20" y="100" width="70" height="55" rx="8" />
  <text class="arch-title" x="32" y="132">User</text>

  <!-- Tier 1: Web -->
  <rect class="arch-zone" x="140" y="70" width="230" height="250" rx="10" />
  <text class="arch-zone-label" x="150" y="60">Tier 1 — Web</text>

  <rect class="arch-box" x="155" y="100" width="95" height="55" rx="8" />
  <text class="arch-title" x="165" y="124">Retailer</text>
  <text class="arch-title" x="165" y="140">Portal</text>

  <rect class="arch-box" x="260" y="100" width="95" height="55" rx="8" />
  <text class="arch-title" x="270" y="124">Consumer</text>
  <text class="arch-title" x="270" y="140">Frontend</text>

  <rect class="arch-box is-key" x="155" y="175" width="200" height="55" rx="8" />
  <text class="arch-title" x="165" y="207">API Gateway</text>

  <!-- VPC -->
  <rect class="arch-zone" x="420" y="70" width="670" height="630" rx="10" />
  <text class="arch-zone-label" x="430" y="60">Virtual Private Cloud (VPC)</text>

  <!-- Tier 2: Application -->
  <rect class="arch-zone" x="430" y="105" width="650" height="380" rx="10" />
  <text class="arch-zone-label" x="430" y="97">Tier 2 — Application</text>

  <!-- Retailer Pipeline FSM -->
  <rect class="arch-zone" x="440" y="140" width="630" height="140" rx="8" />
  <text class="arch-zone-label" x="450" y="132">Retailer Pipeline (Step Functions)</text>

  <rect class="arch-box" x="455" y="178" width="120" height="85" rx="6" />
  <text class="arch-tag" x="467" y="196">Step 01</text>
  <text class="arch-title" x="467" y="216">validate-</text>
  <text class="arch-title" x="467" y="232">product</text>

  <rect class="arch-box" x="615" y="178" width="120" height="85" rx="6" />
  <text class="arch-tag" x="627" y="196">Step 02</text>
  <text class="arch-title" x="627" y="216">process-</text>
  <text class="arch-title" x="627" y="232">image</text>

  <rect class="arch-box" x="775" y="178" width="120" height="85" rx="6" />
  <text class="arch-tag" x="787" y="196">Step 03</text>
  <text class="arch-title" x="787" y="216">generate-</text>
  <text class="arch-title" x="787" y="232">embedding</text>

  <rect class="arch-box" x="935" y="178" width="120" height="85" rx="6" />
  <text class="arch-tag" x="947" y="196">Step 04</text>
  <text class="arch-title" x="947" y="216">index-</text>
  <text class="arch-title" x="947" y="232">product</text>

  <line class="arch-arrow" x1="577" y1="220" x2="613" y2="220" marker-end="url(#fa-arrow)" />
  <line class="arch-arrow" x1="737" y1="220" x2="773" y2="220" marker-end="url(#fa-arrow)" />
  <line class="arch-arrow" x1="897" y1="220" x2="933" y2="220" marker-end="url(#fa-arrow)" />

  <!-- Consumer Pipeline FSM -->
  <rect class="arch-zone" x="440" y="325" width="630" height="140" rx="8" />
  <text class="arch-zone-label" x="450" y="317">Consumer Pipeline (Step Functions)</text>

  <rect class="arch-box" x="455" y="363" width="80" height="85" rx="6" />
  <text class="arch-tag" x="465" y="381">Step 1</text>
  <text class="arch-title" x="465" y="403">vision</text>

  <rect class="arch-box" x="559" y="363" width="80" height="85" rx="6" />
  <text class="arch-tag" x="569" y="381">Step 2</text>
  <text class="arch-title" x="569" y="403">reasoning</text>

  <rect class="arch-box" x="663" y="363" width="80" height="85" rx="6" />
  <text class="arch-tag" x="673" y="381">Step 3</text>
  <text class="arch-title" x="673" y="403">search</text>

  <rect class="arch-box" x="767" y="363" width="80" height="85" rx="6" />
  <text class="arch-tag" x="777" y="381">Step 4</text>
  <text class="arch-title" x="777" y="403">masking</text>

  <rect class="arch-box" x="871" y="363" width="80" height="85" rx="6" />
  <text class="arch-tag" x="881" y="381">Step 5</text>
  <text class="arch-title" x="881" y="403">stable-</text>
  <text class="arch-title" x="881" y="419">diffusion</text>

  <rect class="arch-box" x="975" y="363" width="80" height="85" rx="6" />
  <text class="arch-tag" x="985" y="381">Step 6</text>
  <text class="arch-title" x="985" y="403">assemble</text>

  <line class="arch-arrow" x1="537" y1="405" x2="557" y2="405" marker-end="url(#fa-arrow)" />
  <line class="arch-arrow" x1="641" y1="405" x2="661" y2="405" marker-end="url(#fa-arrow)" />
  <line class="arch-arrow" x1="745" y1="405" x2="765" y2="405" marker-end="url(#fa-arrow)" />
  <line class="arch-arrow" x1="849" y1="405" x2="869" y2="405" marker-end="url(#fa-arrow)" />
  <line class="arch-arrow" x1="953" y1="405" x2="973" y2="405" marker-end="url(#fa-arrow)" />

  <!-- Tier 3: Data -->
  <rect class="arch-zone" x="430" y="530" width="650" height="100" rx="10" />
  <text class="arch-zone-label" x="430" y="522">Tier 3 — Data</text>

  <rect class="arch-store" x="440" y="562" width="630" height="50" rx="8" />
  <text class="arch-title" x="452" y="592">Aurora Serverless v2 + pgvector</text>

  <!-- AI/ML -->
  <rect class="arch-zone" x="1110" y="105" width="190" height="380" rx="10" />
  <text class="arch-zone-label" x="1120" y="97">AI/ML</text>

  <rect class="arch-box" x="1120" y="140" width="170" height="48" rx="6" />
  <text class="arch-title" x="1130" y="160">Bedrock Titan</text>
  <text class="arch-title" x="1130" y="176">Embeddings</text>

  <rect class="arch-box" x="1120" y="198" width="170" height="48" rx="6" />
  <text class="arch-title" x="1130" y="218">Bedrock</text>
  <text class="arch-title" x="1130" y="234">Reasoning (Sonnet)</text>

  <rect class="arch-box" x="1120" y="256" width="170" height="48" rx="6" />
  <text class="arch-title" x="1130" y="276">Stable Diffusion</text>
  <text class="arch-title" x="1130" y="292">Inpainting</text>

  <rect class="arch-box" x="1120" y="314" width="170" height="48" rx="6" />
  <text class="arch-title" x="1130" y="334">SageMaker</text>
  <text class="arch-title" x="1130" y="350">Vision Models</text>

  <rect class="arch-box" x="1120" y="372" width="170" height="48" rx="6" />
  <text class="arch-title" x="1130" y="392">SageMaker Mask</text>
  <text class="arch-title" x="1130" y="408">Generation</text>

  <rect class="arch-box" x="1120" y="430" width="170" height="48" rx="6" />
  <text class="arch-title" x="1130" y="450">Rekognition</text>
  <text class="arch-title" x="1130" y="466">Content moderation</text>

  <!-- Storage -->
  <rect class="arch-zone" x="1110" y="520" width="190" height="130" rx="10" />
  <text class="arch-zone-label" x="1120" y="512">Storage</text>

  <rect class="arch-store" x="1120" y="550" width="170" height="42" rx="6" />
  <text class="arch-title" x="1130" y="576">S3 furnishai-catalog</text>

  <rect class="arch-store" x="1120" y="600" width="170" height="42" rx="6" />
  <text class="arch-title" x="1130" y="626">S3 furnishai-data</text>

  <!-- flows -->
  <line class="arch-arrow" x1="90" y1="127" x2="153" y2="127" marker-end="url(#fa-arrow)" />
  <line class="arch-arrow" x1="202" y1="155" x2="202" y2="173" marker-end="url(#fa-arrow)" />
  <line class="arch-arrow" x1="307" y1="155" x2="307" y2="173" marker-end="url(#fa-arrow)" />

  <line class="arch-arrow is-emphasis" x1="357" y1="195" x2="453" y2="212" marker-end="url(#fa-arrow-accent)" />
  <line class="arch-arrow is-emphasis" x1="357" y1="215" x2="453" y2="401" marker-end="url(#fa-arrow-accent)" />
</svg>
</div>
<p class="diagram-caption">Three-tier VPC architecture on AWS: API Gateway fronts two Step Functions state machines (retailer ingestion, consumer generation), both backed by Aurora Serverless v2 + pgvector, Bedrock/SageMaker AI models, and S3.</p>

### How the consumer pipeline works

1. User uploads a room photo + selects an aesthetic
2. Vision models (SAM, Depth Anything) + Claude Vision analyze the room (zones, dimensions, existing objects)
3. Claude Sonnet designs the layout, furniture selection + placement
4. Vector search finds matching products from the catalog (Aurora pgvector)
5. Depth-aware masks are generated for each placement zone
6. Stable Image Inpaint renders furniture into the scene, one piece at a time for better composition
7. Frontend displays before/after plus clickable product cards with purchase links

<div class="arch-diagram-wrap">
  <video class="video-wide" src="{{ '/projects/intern_customer.mp4' | relative_url }}" controls muted autoplay loop playsinline preload="metadata"></video>
</div>

### How the retailer pipeline works

1. Retailer uploads a product image + metadata (name, category, price, purchase link) through the retailer portal
2. Rekognition validates and moderates the image
3. Claude Haiku generates a visual description of the product from the image
4. Titan embeds that description into a vector
5. The product, its embedding, and its metadata are indexed into the Aurora pgvector catalog
6. The product is now instantly available for the consumer pipeline's vector search step

<div class="arch-diagram-wrap">
  <video class="video-wide" src="{{ '/projects/intern_retailer.mp4' | relative_url }}" controls muted autoplay loop playsinline preload="metadata"></video>
</div>

### Key design decisions

- **Claude Opus for room vision**: multimodal room analysis (zones, dimensions, existing objects) in a single call; its spatial reasoning outperformed smaller models on complex layouts.
- **Step Functions over a monolith Lambda**: each step is independently deployable and testable, failures are isolated, and retries are built into the state machine.
- **S3 as the inter-step data bus**: steps communicate via S3 keys rather than inline payloads, keeping state machine payloads small and making any step's output debuggable after the fact.
- **Aurora pgvector over OpenSearch**: hybrid search (vector + SQL filters) in one query, and it scales to near $0 when idle.
- **Sequential inpainting**: one furniture piece at a time (sofa → chair → table → lamp) for cleaner composition than rendering everything at once.

## Business impact

- 🏆 **People's Choice Award** at the Global AI Solutions Expo, alongside 80 interns worldwide.
- **Adopted into the GenAI/ECRT Toolkit**: an internal library which field SAs in energy/construction/real estate use directly for customer conversations
- **Being prepared for AWS Samples**: This is Amazon's public GitHub org for reference implementations, and it allows the project to be discovered by customers searching AWS + interior design/generative AI patterns

## What changed, concretely

| | Before | After |
|---|---|---|
| Visualizing furniture in-space | imagine it, or return it | photorealistic rendering in your own room |
| Retailer catalog onboarding | manual tagging | automated moderation + visual description + embedding |
| Search over the catalog | keyword/category only | hybrid vector + SQL filter search |

## Where this could go next

- **User-guided refinement**: drag-and-drop furniture placement, or iterate via chat ("move the sofa left," "swap the lamp for something taller") instead of re-running the full pipeline.
- **Multi-view input**: accept photos from multiple angles for a more complete spatial understanding of the room.
- **3D scene reconstruction**: reconstruct the room as a point cloud or mesh and place furniture as 3D assets, enabling walkthroughs and alternate camera angles.
- **ADA compliance**: factor accessibility requirements (wheelchair clearance, reachable surfaces, doorway widths) into placement recommendations for any production deployment targeting real homes.

## The stack

Bedrock Claude Opus (vision) · Bedrock Claude Sonnet (reasoning) · Bedrock Titan (embeddings) · Bedrock Stable Image Inpaint · SageMaker Depth Anything V2 · SageMaker SAM · Aurora Serverless v2 + pgvector · Step Functions · API Gateway + Lambda (Python 3.11) · S3 · CDK v2 (TypeScript) · React 18 + TypeScript + Vite + Tailwind, on Amplify
