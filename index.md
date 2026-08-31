---
layout: home
title: Home
---

<section id="work" class="wide-section">
  <div class="section-inner">
  <h2>Work</h2>

  <div class="work-layout">

    <!-- Timeline (left) --> 
    <div class="timeline">
      <button type="button" class="timeline-item is-active" data-role="aws" aria-controls="aws"
  aria-selected="true">
        <span class="timeline-date">May 2026 - Aug. 2026</span>
        <span class="timeline-company">Amazon Web Services</span>
      </button>

      <button type="button" class="timeline-item" data-role="zuckerman" aria-controls="zuckerman">
        <span class="timeline-date">Sep 2025 – Present</span>
        <span class="timeline-company">Zuckerman Institute</span>
      </button>

      <button type="button" class="timeline-item" data-role="mcmaster"
  aria-selected="true">
        <span class="timeline-date"> Aug. 2024 – Aug. 2025</span>
        <span class="timeline-company">McMaster-Carr</span>
      </button>

      <button type="button" class="timeline-item" data-role="apple-2023">
        <span class="timeline-date">May 2023 - Aug. 2023</span>
        <span class="timeline-company">Apple</span>
      </button>

      <button class="timeline-item" data-role="apple-2022">
        <span class="timeline-date">May 2022 - Aug. 2022</span>
        <span class="timeline-company">Apple</span>
      </button>
    </div>

    <!-- Details (right) -->
    <div class="work-details">

        <div class="work-detail is-visible" id="aws">
            <h3>Solutions Architect Intern - Amazon Web Services</h3>

            <p class="work-meta">
                May 2026 – Aug. 2026 · Arlington, VA
            </p>

            <p class="work-skills">
                Generative AI · Computer Vision · Stable Diffusion · Physical AI · Sim2Real
            </p>

            <ul>
                <li>
                Built an end-to-end multimodal vision pipeline combining SAM, Depth Anything V2, Claude, vector retrieval, and diffusion-based inpainting for spatially aware interior design visualization; deployed on AWS and selected as a People's Top Choice winner alongside 80 interns worldwide at the Global AI Solutions Expo.
                </li>
                <li>
                Developed and validated a video-to-humanoid motion pipeline converting monocular phone video into executable Unitree G1 trajectories via 3D pose estimation, inverse kinematics retargeting, MuJoCo simulation, and NVIDIA SONIC whole-body control, enabling scalable demonstration collection for downstream VLA fine-tuning.
                </li>
            </ul>
        </div>

        <div class="work-detail" id="zuckerman">
            <h3>Graduate Research Assistant - Zuckerman Institute</h3>

            <p class="work-meta">
                Sep 2025 – Present · New York, NY
            </p>

            <p class="work-skills">
                Pandas · Electrophysiology · Feature Extraction · Signal Processing
            </p>

            <ul>
                <li>
                Designed an automated electrophysiology analysis pipeline extracting 43+ signal-level features per cell from injected current and voltage recordings across hundreds of mouse and human cells, each with millions of samples.
                </li>
                <li>
                Applied signal processing techniques, including peak detection, input resistance estimation, and Savitzky–Golay filtering, to transform noisy biological time-series data into structured, quantitative features.
                </li>
                <li>
                Replaced hours of manual, cell-by-cell analysis with reproducible code, enabling analysis of dozens of cells in minutes and producing ML-ready feature matrices for downstream tasks such as cell classification and maturity indexing.
                </li>
            </ul>
        </div>

      <div class="work-detail" id="mcmaster">
        <h3>Systems Engineer - McMaster-Carr</h3>
        <p class="work-meta">Aug. 2024 - Aug. 2025 · Chicago, IL</p>

        <p class="work-skills">
          Disaster Recovery · Server Architecture · Networking · Cybersecurity
        </p>

        <ul>
          <li>Deployed 5 Dell PowerEdge servers into production, supporting company-wide backup and disaster recovery infrastructure and managing ~90% of organizational backups.</li>
          <li>Led migration of hundreds of PCI-compliant backup jobs spanning multi-terabyte volumes of critical data to a new Commvault environment, executing a zero-data-loss cutover.</li>
          <li>Reduced backup cutover downtime from ~8 hours to 1 hour by introducing Commvault LiveSync, and authored detailed documentation that became the standard template for future backup migrations and upgrades</li>
        </ul>
      </div>

      <div class="work-detail" id="apple-2023">
        <h3>Software Engineering Intern — Apple</h3>
        <p class="work-meta">May 2023 - Aug. 2023 · Sunnyvale, CA</p>

        <p class="work-skills">
          visionOS · SwiftUI · UX
        </p>

        <ul>
          <li>Built a focus-oriented mindfulness experience for Apple Vision Pro, developing and testing features directly on-device using SwiftUI.</li>
          <li>Led the implementation of an attention-aware mindfulness flow that responds to user focus state, gently guiding users back to concentration through adaptive audio cues.</li>
          <li>Drove user testing and feedback sessions to evaluate engagement and perceived focus, iterating on the experience based on qualitative insights</li>
        </ul>
      </div>

      <div class="work-detail" id="apple-2022">
        <h3>Software Engineering Intern - Apple</h3>
        <p class="work-meta">May 2022 - Aug. 2022 · Sunnyvale, CA</p>

        <p class="work-skills">
            iOS · macOS · visionOS · SwiftUI
        </p>

        <ul>
            <li>Designed and built an internal 3D asset library to streamline how designers, developers, and testers access and integrate 3D content into applications.</li>
            <li>Reduced friction in the asset-integration workflow by replacing a previously manual, time-consuming process with a centralized asset management system.</li>
            <li>Expanded the library across iOS, macOS, and visionOS, increasing adoption and improving productivity for teams focused on content creation.</li>
        </ul>
      </div>

    </div>
  </div>
  </div>
</section>


<section id="projects" class="wide-section">
  <div class="section-inner">
  <h2>A Few Things I've Built</h2>

  <!-- Category tabs -->
  <div class="project-filters" role="tablist">
    <button class="filter-btn is-active" data-filter="all" role="tab">All</button>
    <button class="filter-btn" data-filter="professional" role="tab">Professional</button>
    <button class="filter-btn" data-filter="projects" role="tab">Projects</button>
    <button class="filter-btn" data-filter="research" role="tab">Research</button>
  </div>

  <!-- Project grid -->
  <div class="project-grid">

    <!-- Professional -->
    <article class="project-card" data-category="professional">
      <div class="project-card-top">
        <span class="project-category-badge">Professional</span>
      </div>
      <h3>Scalable Human-to-Robot Demonstration Pipeline</h3>
      <p class="project-desc">
        Built an end-to-end pipeline at Amazon that turns ordinary phone video into executable humanoid motion - validated on a physical Unitree G1 and now feeding a live robot demo at AWS re:Invent 2026.
      </p>
      <div class="project-tags">
        <span>NVIDIA GEM-X</span>
        <span>SOMA Retargeter</span>
        <span>MuJoCo</span>
        <span>Isaac Lab</span>
        <span>AWS</span>
      </div>
      <a href="{{ '/projects/video-to-robot-pipeline/' | relative_url }}">
        Read the full story →
      </a>
    </article>

    <article class="project-card" data-category="professional">
      <div class="project-card-top">
        <span class="project-category-badge">Professional</span>
      </div>
      <h3>FurnishAI</h3>
      <span class="project-award">
          🏆 People's Choice Award - Global AI Solutions Expo
      </span>
      <p class="project-desc">
        AI-powered interior design pipeline built at Amazon: Upload a room photo, pick an aesthetic, get a photorealistic furnished rendering with shoppable product cards.
      </p>
      <div class="project-tags">
        <span>AWS</span>
        <span>Bedrock Stable Image Inpaint</span>
        <span>SageMaker SAM</span>
        <span>Bedrock Titan Embeddings</span>
        <span>SageMaker Depth Anything</span>
        <span>Aurora Serverless DB</span>
      </div>
      <a href="{{ '/projects/furnishai/' | relative_url }}">
        Read the full story →
      </a>
    </article>

    <!-- Projects (ML-flavored) -->
    <article class="project-card" data-category="projects">
      <div class="project-card-top">
        <span class="project-category-badge">Project</span>
      </div>
      <h3>HERA: Digital Safety, Grounded.</h3>
      <p class="project-desc">
        Ever tried confronting a teen about their screen time, only for it to instantly backfire? HERA is an AI-powered empathy assistant built to turn those tense digital-habit talks into actual, productive conversations, zero spying required.
      </p>
      <div class="project-tags">
        <span>Python</span>
        <span>Anthropic (Claude) API</span>
        <span>White Circle API</span>
      </div>
      <a
          href="https://github.com/cosecE/hera"
          target="_blank"
          rel="noopener"
      >
          View Project →
      </a>
    </article>

    <article class="project-card" data-category="projects">
      <div class="project-card-top">
        <span class="project-category-badge">Project</span>
      </div>
      <h3>Vibe Check: Speech Emotion Recognition</h3>
      <p class="project-desc">
        A classic use case for fine-tuning. We put AI through emotional intelligence boot camp so it can accurately decode your actual mood. Test it live with your own microphone below.
      </p>
      <div class="project-tags">
        <span>Wav2Vec2</span>
        <span>PyTorch</span>
        <span>Hugging Face</span>
        <span>Transformers</span>
      </div>
      <a
          href="https://github.com/cosecE/VibeCheck"
          target="_blank"
          rel="noopener"
      >
          View Project →
      </a>
    </article>

    <article class="project-card" data-category="projects">
      <div class="project-card-top">
        <span class="project-category-badge">Project</span>
      </div>
      <h3>HouseLLM: Constrained Decoding for Clinical Information Extraction</h3>
      <p class="project-desc">
        If you've watched House, you get it. Here, we put doctor-patient conversations under the microscope to test what happens when you strictly force an LLM to output valid medical JSON.
      </p>
      <div class="project-tags">
        <span>PyTorch</span>
        <span>OpenAI API</span>
        <span>LLaMA 3.2 (3B-Instruct)</span>
        <span>pandas</span>
        <span>numpy</span>
        <span>scipy</span>
        <span>matplotlib</span>
        <span>Transformers</span>
        <span>Hugging Face</span>
      </div>
      <a
          href="https://github.com/cosecE/houseLLM-constrained-decoding"
          target="_blank"
          rel="noopener"
      >
          View Project →
      </a>
    </article>

    <article class="project-card" data-category="projects">
      <div class="project-card-top">
        <span class="project-category-badge">Project</span>
      </div>
      <h3>Mindflow: An agentic layer to your task management system</h3>
      <p class="project-desc">
        Built at the AWS x AGI House SLM Hackathon. Extract action items from voice, text, and notes, organizing them into prioritized tasks and follow-ups.
      </p>
      <div class="project-tags">
        <span>Hackathon</span>
        <span>AWS Trainium</span>
        <span>TinyLlama</span>
      </div>
      <a
          href="https://github.com/sneha-jaikumar/mindflow"
          target="_blank"
          rel="noopener"
      >
          View Project →
      </a>
    </article>

    <article class="project-card" data-category="projects">
      <div class="project-card-top">
        <span class="project-category-badge">Project</span>
      </div>
      <h3>Wellness Shopping Assistant</h3>
      <p class="project-desc">
        Built at the Columbia Engineering x Amazon Bedrock Innovation Challenge. AI wellness assistant that recommends personalized health products through natural conversation.
      </p>
      <div class="project-tags">
        <span>Hackathon</span>
        <span>AWS Bedrock</span>
        <span>RAG</span>
      </div>
      <a
          href="https://docs.google.com/presentation/d/1Aqdil7_rKtnkpk8Mz7OFRoSWLmv7ukNE/edit?usp=sharing&ouid=101253989768134728861&rtpof=true&sd=true"
          target="_blank"
          rel="noopener"
      >
          View Slides →
      </a>
    </article>

    <!-- Research -->
    <article class="project-card" data-category="research">
      <div class="project-card-top">
        <span class="project-category-badge">Research</span>
      </div>
      <h3>Undergraduate Honors Thesis: Modeling the Impact of Early Life Stress on Microglial Aging</h3>
      <p class="project-desc">
        Combined bulk and single-cell RNA sequencing data to identify microglial gene expression signatures linking early life stress to accelerated immune aging.
      </p>
      <div class="project-tags">
        <span>Python</span>
        <span>scikit-learn</span>
        <span>Elastic Net</span>
        <span>Random Forest</span>
        <span>Single Cell RNA Sequencing</span>
      </div>
      <a
    href="https://cdr.lib.unc.edu/concern/honors_theses/c821gw754"
    target="_blank"
    rel="noopener"
    class="paper-link">
    Read paper →
    </a>
    </article>

    <article class="project-card" data-category="research">
        <div class="project-card-top">
          <span class="project-category-badge">Research</span>
        </div>
        <h3>Scaled-Down Text-Conditional Diffusion Model (GLIDE-Inspired)</h3>

        <p class="project-desc">
            Built a simplified text-to-image diffusion model that translates written prompts into images.
        </p>

        <div class="project-tags">
            <span>U-Net Architecture</span>
            <span>PyTorch</span>
            <span>Cross-Attention</span>
            <span>Text Encoding</span>
        </div>

        <a
            href="https://docs.google.com/document/d/16de9RqK3y0rQ6_g4TJtvDnsirfZYEEIxP0sifBG_BLg/edit?usp=sharing"
            target="_blank"
            rel="noopener"
            class="paper-link"
        >
            Read paper →
        </a>
    </article>

    <!-- Projects (web) -->
    <article class="project-card" data-category="projects">
        <div class="project-card-top">
          <span class="project-category-badge">Project</span>
        </div>
        <h3>Quantifying Gendered Cost Burdens in Everyday Spending and Healthcare</h3>

        <p class="project-desc">
            Applied R-based data visualization and analysis to U.S. consumer expenditure data, revealing systemic disparities in everyday and healthcare spending beyond the pink tax
        </p>

        <div class="project-tags">
            <span>R</span>
            <span>Tidyverse</span>
            <span>Quarto</span>
        </div>

        <a
            href="https://snehajaikumar23.github.io/genderedCostBurdenAnalysis/"
            target="_blank"
            rel="noopener"
            class="paper-link"
        >
            Read paper →
        </a>
    </article>

    <article class="project-card" data-category="projects">
        <div class="project-card-top">
          <span class="project-category-badge">Project</span>
        </div>
        <h3>Trackio: Making Personal Finance Accessible to All</h3>

        <span class="project-award">
            🏆 Best DE&I Submission - Hack to the Future 4
        </span>

        <p class="project-desc">
            A voice-first budgeting app that enables accessible, hands-free financial tracking using speech recognition and text-to-speech.
        </p>

        <div class="project-tags">
            <span>Hackathon</span>
            <span>ReactJS </span>
            <span>CSS</span>
            <span> React Speech-to-Text API</span>
        </div>

        <a
            href="https://devpost.com/software/trackio-1938fr"
            target="_blank"
            rel="noopener"
        >
            View Project →
        </a>
    </article>

    <article class="project-card" data-category="projects">
        <div class="project-card-top">
          <span class="project-category-badge">Project</span>
        </div>
        <h3>Track My Leader</h3>

        <span class="project-award">
            🏆 Most Creative Use of Twilio - HackNC 2022
        </span>

        <p class="project-desc">
            Educational web dashboard that visualizes public government data to make voting information and elected officials’ policy progress more accessible. 
        </p>

        <div class="project-tags">
            <span>Hackathon</span>
            <span>HTML</span>
            <span>CSS</span>
            <span>Python</span>
            <span>Flask</span>
            <span>Twilio API</span>
        </div>

        <a
            href="https://devpost.com/software/track-my-leader"
            target="_blank"
            rel="noopener"
        >
            View Project →
        </a>
    </article>

  </div>
  </div>
</section>

