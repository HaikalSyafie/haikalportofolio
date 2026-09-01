// ============================================================================
// PROJECT DATA STORE
// ============================================================================
// This is the single source of truth for all project data displayed on the
// portfolio. To add/replace a project, simply edit or add an object in the
// `projects` array below. The UI components will automatically pick it up.
// ============================================================================

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface KeyMetric {
  label: string;
  value: string;
  description?: string;
}

export interface DatasetInfo {
  name: string;
  source: string;
  size: string;
  description: string;
}

export interface ProjectImage {
  src: string; // Path to image or empty string for placeholder
  alt: string;
  caption: string;
}

export interface ModelComparisonEntry {
  model: string;
  metrics: KeyMetric[];
}

export interface ClassMetric {
  label: string; // class name
  precision: string;
  recall: string;
  f1: string;
}

export interface ArchitectureLayer {
  layer: string;
  purpose: string;
  details: string;
}

export interface DataSourceRow {
  system: string;
  file: string;
  description: string;
  rows: string;
}

export interface AnalysisScript {
  script: string;
  focus: string;
}

// --- "pipeline" layout: bespoke staged case study --------------------------

export interface PipelineStage {
  label: string; // e.g. "Stage 1"
  title: string; // e.g. "Global rule mining"
  detail: string; // one-line description of what the stage does
}

export interface CaseStudyTable {
  caption?: string;
  columns: string[]; // header cells; columns[0] labels the row-header column
  rows: string[][]; // each row: [rowLabel, ...cells]; cell count must match columns
  highlightRowIndex?: number; // optional row to visually emphasise
}

export interface CaseStudySection {
  kicker: string; // small label above the title
  title: string;
  body?: string; // prose (rendered as a paragraph)
  bullets?: string[]; // optional bullet list under the prose
  table?: CaseStudyTable; // optional data table
  image?: ProjectImage; // optional figure
}

export interface Project {
  // Routing & identity
  id: string; // Used as URL slug: /projects/[id]
  title: string;
  subtitle: string; // Short 1-2 line description for the card / hero
  category: string; // e.g. "Time-Series Forecasting"
  featured: boolean; // Show on homepage?
  hidden?: boolean; // Temporarily keep out of every listing and prev/next nav (detail page still resolves by URL)

  // "ml" (default) = full ML case-study breakdown (Problem/Data/Approach/Results/Insights).
  // "docs" = lean layout mirroring a project's own README (Architecture/Data Sources/
  // Star Schema/Analytics/Getting Started) — for non-ML projects like SQL pipelines.
  // "pipeline" = bespoke staged case study (pipelineStages + caseStudySections) — for
  // multi-stage analytical work that doesn't fit the linear ML template.
  layout?: "ml" | "docs" | "pipeline";

  // Visuals
  thumbnail: string; // Card thumbnail – empty string = placeholder
  coverImage: string; // Detail page hero – empty string = placeholder

  // Links (use "#" for placeholder)
  githubUrl: string;
  demoUrl: string;
  datasetUrl: string;

  // Tech
  techStack: string[];
  keyMetrics: KeyMetric[]; // keyMetrics[0] is treated as the headline result

  // Storytelling sections (detail page, "ml" layout) — Problem → Data → Approach → Model → Results → Insights
  overview: string; // What the project is, why it was created
  role?: string; // My role / contribution
  problem?: string; // The real-world problem and why it matters
  dataset?: DatasetInfo; // Data source
  dataPreprocessing?: string; // Cleaning / preprocessing steps
  eda?: string;
  featureEngineering?: string;
  modeling?: string; // Model/algorithm choice + training process
  evaluation?: string; // Evaluation methodology
  results?: string;
  modelComparison?: ModelComparisonEntry[]; // Optional — only when multiple models were benchmarked
  modelComparisonTitle?: string; // Optional — override the "Model Comparison" heading (e.g. for a rules/segment table instead of models)
  classMetrics?: ClassMetric[]; // Optional — per-class precision/recall/F1 breakdown
  insights?: string[]; // 2–4 findings, explaining what the results mean
  limitations?: string; // Optional — honest constraints of the current approach
  nextSteps?: string[]; // Optional — what you'd do with more time/data

  // Documentation sections (detail page, "docs" layout) — mirrors a README
  architectureLayers?: ArchitectureLayer[];
  dataSources?: DataSourceRow[];
  starSchema?: string;
  analysisScripts?: AnalysisScript[];
  gettingStarted?: string[];
  keyConcepts?: string[];

  // Bespoke staged case study (detail page, "pipeline" layout)
  pipelineStages?: PipelineStage[];
  caseStudySections?: CaseStudySection[];

  // Chart / visualization placeholders throughout the case study
  images: ProjectImage[];
}

// ---------------------------------------------------------------------------
// Project Data
// ---------------------------------------------------------------------------

export const projects: Project[] = [
  // =========================================================================
  // PROJECT A — SPY Daily High & Low Forecasting (fully fleshed out)
  // =========================================================================
  {
    id: "spy-daily-forecasting",
    title: "SPY Daily High & Low Forecasting",
    subtitle:
      "An LSTM that forecasts tomorrow's SPY High and Low from 1-minute OHLCV data — rebuilt around a stationary target and walk-forward evaluation after an earlier version collapsed to flat-line predictions.",
    category: "Time-Series Forecasting",
    featured: true,
    hidden: true, // temporarily hidden from listings — keep the data

    thumbnail: "",
    coverImage: "",

    githubUrl: "#", // [PLACEHOLDER] Replace with your GitHub repo URL
    demoUrl: "#",
    datasetUrl: "#", // [PLACEHOLDER] Replace with your dataset source URL

    techStack: ["Python", "Pandas", "NumPy", "TensorFlow", "Keras", "Scikit-learn", "Matplotlib"],

    keyMetrics: [
      { label: "Target Design", value: "Stationary offset", description: "(High − yesterday's close) / yesterday's close, not a raw price level" },
      { label: "Evaluation", value: "Walk-forward", description: "One-step-ahead using real data each window, not recursive" },
      { label: "Baseline Check", value: "Naive (t-1)", description: "Model must beat 'tomorrow = today' to count as useful" },
      { label: "Horizon", value: "1 day ahead", description: "Next daily High/Low from a 5-day input window" },
    ],

    overview:
      "An LSTM that forecasts SPY's next daily High and Low from 1-minute OHLCV data. This is the second, corrected version of the project — the first version predicted raw price levels and its forecasts went flat the moment the test period moved into price territory the model had never seen during training. This version fixes that by rebuilding the target, the evaluation loop, and the baseline comparison from scratch.",

    role: "Solo project — diagnosed why the first version's forecasts went flat, then rebuilt the target design, evaluation loop, and baseline comparison to fix it.",

    problem:
      "Daily High and Low prices matter for setting stop-loss and take-profit levels, but SPY's price level itself trends upward over long timeframes — a model trained to predict a raw price like '$412' has no way to extrapolate once the test period moves above whatever ceiling it saw during training. The first version of this project hit exactly that failure mode: it produced a near-constant forecast for the entire test set. The real problem wasn't the model architecture — it was that the *target* itself wasn't stationary.",

    dataset: {
      name: "SPY 1-Minute OHLCV (2008–2021)",
      source: "Local 1-minute OHLCV dataset for SPY",
      size: "Multi-year 1-minute bars (2008–2021), resampled to one row per trading day",
      description:
        "1-minute Open/High/Low/Close/Volume/barCount bars for SPY, cleaned of zero-value rows and resampled to daily bars (first open, max high, min low, last close, summed volume/barCount) before modeling.",
    },

    dataPreprocessing:
      "Raw 1-minute bars with any zero-valued OHLCV field were dropped before resampling, since a zero print is a data error, not a real price. The cleaned minute bars were resampled to one row per calendar day (open = first, high = max, low = min, close = last, volume/barCount = sum), then rows with missing values — e.g. from the shift used to build the target — were dropped. The train/test split (80/20) was done in time order with no shuffling, and the StandardScaler used to scale the inputs was fit only on the training portion, since fitting it on the full dataset would leak test-set statistics into training.",

    eda: "The core finding driving this whole rewrite: raw High and Low price levels are non-stationary — they trend with the market across 2008–2021 — so a model trained on one price range has no way to extrapolate to a higher range it never saw. That single observation is what motivated redesigning the target rather than tuning the model further.",

    featureEngineering:
      "Instead of predicting High and Low as raw prices, both targets were re-expressed as an offset relative to the previous day's close: h_off = (High_t − Close_t-1) / Close_t-1, and the same for Low. This offset is stationary — it stays in a comparably small range whether SPY is trading at $150 or $450 — so the model can generalize to price levels it never saw in training. Predictions are converted back to actual High/Low prices at evaluation time by multiplying the predicted offset onto that day's real previous close, with a High ≥ Low constraint enforced afterward (swapping the two if the reconstruction ever inverts them).",

    modeling:
      "A single-layer LSTM (128 units, tanh activation) takes a 5-day window of the two stationary offset series and outputs the next day's [h_off, l_off] in one shot — the same architecture as the original, broken version; only the target changed. The bigger fix was in evaluation: the original version fed each prediction back into the input window recursively for the entire test set, so errors compounded and the forecast converged to a constant. This version instead does walk-forward (one-step-ahead) evaluation — every test-day prediction uses the actual previous days' data, not the model's own earlier predictions — which is both more realistic for daily trading and immune to that error-compounding failure mode.",

    evaluation:
      "Predictions are compared against a naive baseline (tomorrow's High/Low = today's High/Low) using RMSE, MAE, and MAPE, on the principle that the LSTM is only useful if it beats that baseline — an easy bar on paper, but one the first, broken version of this project would not have cleared. Two extra honesty checks were added: the correlation between the model's predictions and the naive baseline (a value near 1.0 would mean the model is just copying yesterday, not forecasting), and a separate RMSE on the predicted daily range (High − Low), which matters more directly for setting a trading range than High and Low scored independently.",

    results:
      "Numbers for this specific run aren't reported here since the underlying minute-level dataset lives outside this repo, so the evaluation hasn't been re-executed for this write-up — but the evaluation script prints the LSTM's RMSE/MAE/MAPE against the naive baseline for both High and Low, plus the naive-correlation and range-RMSE checks described above, so the comparison is fully reproducible against the source data. What is real: the fix itself. The first version of this model produced a flat line for the entire test period — a hard failure for any forecaster — and this version's stationary-target, walk-forward redesign is what makes an honest RMSE-vs-naive comparison possible at all.",

    insights: [
      "A model can look fine during training and fail completely on unseen data if the *target* isn't stationary — the first version's LSTM architecture was perfectly reasonable, but predicting raw price levels made it unable to extrapolate past the price range it trained on.",
      "Recursive multi-step evaluation compounds errors invisibly: feeding predictions back into the input window degraded the original version's forecasts until they converged to a flat line, and the failure only showed up in the output plot, not anywhere obvious earlier in the pipeline.",
      "A naive baseline ('tomorrow equals today') is a cheap, high-value sanity check for any forecasting task — it sets a genuine bar for usefulness, and a correlation-with-baseline check further guards against a model that's 'accurate' only because it learned to copy yesterday's value.",
    ],

    limitations:
      "This version fixes the target and evaluation design, but doesn't add any new predictive features beyond the two raw stationary offset series — no volume, volatility, or technical-indicator features are used yet, so there's real headroom left on the modeling side. Numeric results (RMSE/MAE vs. the naive baseline) depend on the original 1-minute SPY CSV, which isn't bundled with this write-up, so they aren't reported here — the evaluation code that produces them is fully described above and reproducible against the source data.",

    nextSteps: [
      "Add volatility and volume-derived features (rolling std, ATR-style ranges, volume z-scores) on top of the stationary offset target, now that the target itself is fixed.",
      "Extend to multi-day horizons (3/5/7-day ahead) using the same stationary-offset + walk-forward design, rather than the flawed recursive approach the first version used.",
      "Re-run against the full dataset to publish the actual RMSE/MAE-vs-naive numbers, and add a rolling backtest instead of a single train/test split.",
    ],

    images: [
      {
        src: "",
        alt: "Target Stationarity",
        caption: "Why raw High/Low price levels aren't a valid target — they trend with the market and can't be extrapolated past the training price range.",
      },
      {
        src: "",
        alt: "Walk-Forward vs Recursive Evaluation",
        caption: "One-step-ahead (walk-forward) evaluation using real data each window, replacing the original recursive approach that collapsed to a flat line.",
      },
      {
        src: "",
        alt: "Actual vs Predicted",
        caption: "Actual vs. predicted High/Low for the test period, plotted against the naive (t-1) baseline.",
      },
    ],
  },

  // =========================================================================
  // PROJECT B — EcoCraft Waste Image Classifier
  // =========================================================================
  {
    id: "ecocraft-waste-classifier",
    title: "EcoCraft Waste Image Classifier",
    subtitle:
      "A transfer-learning image classifier that sorts photos of household items into 12 waste categories, built to support automatic recycling and upcycling triage.",
    category: "Computer Vision",
    featured: true,

    thumbnail: "/projects/eco-craft/banner.png",
    coverImage: "/projects/eco-craft/thumbnail.png",

    githubUrl: "#", // [PLACEHOLDER] Replace with your GitHub repo URL
    demoUrl: "#", // [PLACEHOLDER] Replace with your live demo URL
    datasetUrl: "#", // [PLACEHOLDER] Replace with your dataset source URL

    techStack: [
      "Python",
      "TensorFlow",
      "Keras",
      "NASNetMobile",
      "OpenCV",
      "Scikit-learn",
      "NumPy",
      "Pandas",
    ],

    keyMetrics: [
      {
        label: "Test Accuracy",
        value: "93.9%",
        description: "On a held-out test set of 294 images",
      },
      {
        label: "Hamming Loss",
        value: "0.015",
        description: "Per-label error rate across all 12 classes",
      },
      {
        label: "Precision / Recall",
        value: "0.83 / 0.83",
        description: "Samples-averaged, at a 0.91 decision threshold",
      },
      {
        label: "Classes",
        value: "12",
        description: "Household waste categories",
      },
    ],

    overview:
      "EcoCraft is an image classifier for 12 common types of household waste, from plastic bottles and cans to cloth and cardboard. The idea is that a recycling or upcycling app could point a camera at an item and get a category suggestion before the user decides what to do with it. I wanted to see how far a lightweight transfer-learning model could get on a small dataset I collected and sorted by hand.",

    role: "Solo project. I collected and labelled the images, built the preprocessing pipeline, designed and trained the model, and ran the evaluation.",

    problem:
      "People often aren't sure which bin something belongs in, and one wrong guess can send a whole batch to landfill instead of recycling. An app that suggests the category from a photo takes out that guesswork, but it only helps if the suggestion is fast and reasonably accurate on an ordinary phone picture.",

    dataset: {
      name: "EcoCraft Waste Image Dataset",
      source: "Self-collected and curated images, organized into per-category folders",
      size: "2,880 images across 12 categories (176–293 per class)",
      description:
        "Photos of 12 household waste and reusable-item categories: Bohlam (lightbulb), Botol Plastik (plastic bottle), Garpu (fork), Gelas Plastik (plastic cup), Hanger, Kain (cloth), Kaleng (can), Kardus (cardboard), Kertas (paper), Kotak susu (milk carton), Sendok (spoon), and Tutup Botol (bottle cap).",
    },

    dataPreprocessing:
      "The images sit in one folder per category. I split them 80/10/10 into train, validation and test with a fixed seed, resized everything to 224×224, and scaled the pixels to a 0 to 1 range. Because the dataset is small, the training images are augmented on the fly with rotation, shifts, shear, zoom and horizontal flips.",

    eda: "The class counts are a little uneven, from 176 to 293 images per class, so roughly a 1.7x spread. That is noticeable but not enough to need resampling. Looking through the images raised a bigger concern than the counts. The styles are inconsistent: some categories are clean product shots on a white background, like the cutlery and bottle caps, while others are messy real-world photos with cluttered backgrounds, like cloth and cardboard, and a few look more like stock illustrations than a photo of actual rubbish. That mix of framing and lighting across classes is probably a larger risk to generalisation than the imbalance.",

    featureEngineering:
      "There are no hand-built features. The model uses NASNetMobile, pretrained on ImageNet, as a frozen feature extractor, with a small custom head on top: one extra Conv2D layer, global average pooling, and two dense layers with dropout to adapt the generic features to the 12 waste categories.",

    modeling:
      "NASNetMobile was the choice because it is a mobile-sized architecture that could plausibly run on a phone later, where something like ResNet or a large EfficientNet would be overkill for 12 classes and under 3,000 images. The base stays frozen and only the head trains: Conv2D(64), global average pooling, Dense(512), Dropout(0.25), Dense(256), then Dense(12) with softmax. That keeps the trainable parameter count low, and on a dataset this small a full fine-tune would overfit quickly. Training uses Adam at a learning rate of 1e-4 with categorical cross-entropy, an exponential learning-rate decay after epoch 10, and ReduceLROnPlateau, EarlyStopping and ModelCheckpoint so training stops at the best epoch rather than a fixed number.",

    evaluation:
      "The final model was tested on 294 images it never saw during training. Alongside accuracy and loss I computed per-class precision, recall and F1 and a normalised confusion matrix, since a single accuracy number can hide a class the model is quietly failing on.",

    results:
      "The model reached 93.9% test accuracy with a test loss of 0.181, a samples-averaged precision, recall and F1 of 0.83 at a 0.91 threshold, and a Hamming loss of 0.015. Training and validation accuracy both passed 90% in the first 10 to 15 epochs and stayed there, and validation loss settled around 0.2 to 0.3 without climbing back up. Per-class results ranged from 1.00 F1 on Bohlam and Kaleng down to 0.53 recall on Kertas. The weakest three classes were Kertas, Kotak susu and Sendok, and in every case the wrong prediction was usually Bohlam. A spoon does not look like a lightbulb, so this is probably not visual confusion. The Bohlam training photos are plain, high-contrast objects on a flat white background, and the model seems to fall back on that pattern when it is unsure.",

    classMetrics: [
      { label: "Bohlam", precision: "1.00", recall: "0.95", f1: "0.97" },
      { label: "Botol Plastik", precision: "1.00", recall: "0.82", f1: "0.90" },
      { label: "Garpu", precision: "1.00", recall: "0.83", f1: "0.91" },
      { label: "Gelas Plastik", precision: "1.00", recall: "0.93", f1: "0.96" },
      { label: "Hanger", precision: "1.00", recall: "0.96", f1: "0.98" },
      { label: "Kain", precision: "1.00", recall: "0.86", f1: "0.92" },
      { label: "Kaleng", precision: "0.96", recall: "1.00", f1: "0.98" },
      { label: "Kardus", precision: "0.95", recall: "0.81", f1: "0.88" },
      { label: "Kertas", precision: "0.94", recall: "0.53", f1: "0.68" },
      { label: "Kotak susu", precision: "1.00", recall: "0.70", f1: "0.82" },
      { label: "Sendok", precision: "1.00", recall: "0.68", f1: "0.81" },
      { label: "Tutup Botol", precision: "1.00", recall: "0.92", f1: "0.96" },
    ],

    insights: [
      "A frozen NASNetMobile with a small head reached over 93% accuracy on fewer than 3,000 images, so a CNN trained from scratch was not needed at this scale.",
      "The per-class numbers mattered more than the headline. Kertas, Sendok and Kotak susu had clearly lower recall despite strong averages, which points to specific categories that need more and more varied images.",
      "The errors were concentrated rather than spread out. Most misclassified images across all categories were predicted as Bohlam, which suggests the model leans on a generic 'plain object on white' pattern when unsure instead of confusing similar-looking items.",
      "Precision stayed high even where recall dropped, with many classes at 1.00, so the model rarely puts the wrong item into a category. It misses items more often than it mislabels them.",
    ],

    limitations:
      "The dataset is small and mostly collected by hand, and a good part of it is clean product photography rather than photos of real, used waste. A model trained on tidy studio shots may not hold up against a blurry, badly lit phone photo of a crushed can. The 93.9% should be read as strong on this dataset, not as a production guarantee.",

    nextSteps: [
      "Collect real phone-camera photos of actual used items, especially for Kertas, Sendok and Kotak susu, to close the recall gap and reduce the studio-photo bias.",
      "Look directly at the images that get routed to Bohlam to confirm the background and lighting explanation.",
      "Unfreeze the last few NASNetMobile layers now that there is a working baseline, and compare against a small CNN trained from scratch as a sanity check.",
      "Export the model to TFLite and test on-device inference, which was the original reason for choosing NASNetMobile.",
    ],

    images: [
      {
        src: "/projects/eco-craft/eda.png",
        alt: "Label Distribution",
        caption: "Class balance across the 12 waste categories (176–293 images each)",
      },
      {
        src: "/projects/eco-craft/evaluation.png",
        alt: "Training Accuracy and Loss",
        caption: "Training vs. validation accuracy and loss over 50 epochs",
      },
      {
        src: "/projects/eco-craft/results.png",
        alt: "Confusion Matrix",
        caption: "Normalized confusion matrix on the held-out test set",
      },
      {
        src: "/projects/eco-craft/prediction-example.png",
        alt: "Example Prediction",
        caption: "A correctly-classified test image (Tutup Botol) with its full per-class probability breakdown",
      },
    ],
  },

  // =========================================================================
  // PROJECT C — Semantic Similarity with a Siamese BiLSTM
  // =========================================================================
  {
    id: "siamese-bilstm-question-similarity",
    title: "Semantic Similarity with a Siamese BiLSTM",
    subtitle:
      "A Siamese BiLSTM with additive attention pooling and a three-distance fusion layer for sentence-pair similarity. Across eight trained variants, the fusion adds 3.3 F1 points for a cost of 192 parameters.",
    category: "NLP",
    featured: true,
    layout: "pipeline",

    thumbnail: "/projects/siamese-bilstm/architecture.png",
    coverImage: "/projects/siamese-bilstm/architecture.png",

    githubUrl: "https://github.com/HaikalSyafie/Semantic-Similarity-NLP",
    demoUrl: "#",
    datasetUrl: "#",

    techStack: ["Python", "TensorFlow", "Keras", "scikit-learn", "NumPy", "Pandas", "Matplotlib"],

    keyMetrics: [
      { label: "Best F1", value: "0.8305", description: "BiLSTM with attention and distance fusion, at accuracy 0.8465, top of all eight trained variants" },
      { label: "Cost of the fusion", value: "192 params", description: "The distance-fusion layer adds 0.0155% more trainable weights and gains 3.25 F1 points" },
      { label: "Efficiency vs bidirectionality", value: "~3,200×", description: "Parameters spent per F1 point gained, distance fusion against the usual bidirectional upgrade" },
      { label: "Trainable weights", value: "1.24M", description: "Against 22.8M for SBERT and 109.6M for BERT-base; the 300-dimensional embedding is frozen" },
    ],

    overview:
      "Two sentences can carry the same meaning while sharing almost no words, and a model that matches on word overlap will miss it. This project builds a Siamese network that encodes each sentence with a shared BiLSTM and additive attention pooling, then compares the two sentence vectors through three distance geometries at once, cosine, Manhattan and Euclidean. Eight variants are trained on the same data so that each component can be isolated, and the evidence points clearly at the distance fusion as the part doing the work, since it adds 3.3 F1 points for a cost of 192 trainable parameters.",

    role: "Solo project covering the architecture design, the eight-variant ablation ladder, training and evaluation, and the attention-weight visualisation.",

    problem:
      "Two sentences can mean the same thing while sharing almost no words. 'How do I reset my password' and 'I forgot my password, how can I change it' point at the same intent, but a system that matches on word overlap will call them different. The task is to judge meaning rather than surface form. Transformer encoders like BERT and SBERT do this well, but they train tens to over a hundred million parameters. This project asks how far a small recurrent model can get, and which cheap addition actually closes the gap, attention over the sequence or an explicit comparison of the two sentence vectors.",

    pipelineStages: [
      {
        label: "Stage 1",
        title: "Shared embedding",
        detail: "Both sentences pass through the same frozen 300-dimensional embedding over a vocabulary of 84,637 words, so no word vectors are learned or overfit.",
      },
      {
        label: "Stage 2",
        title: "Shared BiLSTM",
        detail: "One bidirectional LSTM, 256 units and 512 values per token, reads each sentence in both directions and returns a state for every token.",
      },
      {
        label: "Stage 3",
        title: "Attention pooling",
        detail: "A single learned query vector scores every token and collapses the sequence into one 512-dimensional sentence vector.",
      },
      {
        label: "Stage 4",
        title: "Distance fusion",
        detail: "Cosine, Manhattan and Euclidean distances between the two vectors join the vectors themselves and feed a small dense head that outputs a similarity probability.",
      },
    ],

    caseStudySections: [
      {
        kicker: "Process",
        title: "A Siamese design, and eight variants on a ladder",
        body:
          "The network is Siamese, which means both sentences pass through identical shared components, the embedding, the BiLSTM and the attention layer, so they land in one comparable space and the two paths only meet where the sentence vectors are compared. Eight models were trained under identical conditions, in two families built on LSTM and GRU, and each family is a ladder of four rungs: unidirectional, then bidirectional, then plus attention pooling, then plus distance fusion. Because each rung adds exactly one component, the change in results between two rungs can be pinned on that component alone.",
        image: {
          src: "/projects/siamese-bilstm/architecture.png",
          alt: "Proposed model architecture",
          caption: "Both branches share every weight, and a single fused vector carries forward to the prediction layer.",
        },
      },
      {
        kicker: "Process",
        title: "Attention that ranks tokens, and three ways to measure distance",
        body:
          "The BiLSTM produces one state per token, and a sentence-level decision needs a single vector. Mean pooling would treat a stopword like the head noun, so the model learns the weighting instead. Additive attention uses one learned query that asks every sentence the same question, which tokens carry the meaning, then returns a weighted sum. Unlike Transformer self-attention it gives one weight per token rather than a token-by-token matrix, so its output reads straight off as a highlighted sentence. The two pooled vectors are then compared through three distances at once. Cosine sees angular disagreement, Manhattan stays sensitive to many small per-dimension mismatches, and Euclidean lets a single large mismatch dominate. Each one goes through a log transform so that an L1 distance in the hundreds and a cosine distance under 2 reach the classifier on a comparable scale, and the three numbers are concatenated with the sentence vectors for a small dense head to weigh. The distance computations carry no weights of their own.",
        table: {
          caption: "The three fused distances",
          columns: ["Distance", "Sensitive to", "Trainable weights"],
          rows: [
            ["Cosine", "orientation only", "0"],
            ["Manhattan", "many small differences", "0"],
            ["Euclidean", "a few large differences", "0"],
          ],
        },
      },
      {
        kicker: "Results",
        title: "Where the accuracy comes from",
        body:
          "The two fusion models take the top two places on every metric. BiLSTM with attention and fusion leads at F1 0.8305 and accuracy 0.8465, about 2.4 F1 points clear of the best model without fusion, a wider gap than separates any other two rows. Reading each family as a ladder shows why. Bidirectionality is the biggest single structural change, worth 3.2 F1 points for LSTM and 5.6 for GRU. Attention pooling on its own does almost nothing, moving F1 by 0.05 and 1.07 points, because the bidirectional encoder has already gathered the useful information into its final states. Distance fusion is the second large gain, worth 3.25 and 2.26 F1 points, and it cuts validation loss by more than forty times what attention alone managed.",
        table: {
          caption: "Predictive performance across all eight trained variants",
          columns: ["Model", "Accuracy", "Precision", "Recall", "F1", "ROC-AUC"],
          rows: [
            ["BiLSTM + Attention + Fusion", "0.8465", "0.8055", "0.8571", "0.8305", "0.9233"],
            ["BiGRU + Attention + Fusion", "0.8433", "0.7950", "0.8659", "0.8289", "0.9227"],
            ["BiGRU + Attention", "0.8236", "0.7778", "0.8369", "0.8063", "0.9227"],
            ["BiGRU", "0.8182", "0.7845", "0.8070", "0.7956", "0.8979"],
            ["BiLSTM", "0.8178", "0.7780", "0.8181", "0.7975", "0.8965"],
            ["BiLSTM + Attention", "0.8145", "0.7638", "0.8355", "0.7980", "0.8971"],
            ["LSTM", "0.7907", "0.7521", "0.7797", "0.7657", "0.8705"],
            ["GRU", "0.7715", "0.7392", "0.7402", "0.7397", "0.8529"],
          ],
          highlightRowIndex: 0,
        },
      },
      {
        kicker: "Results",
        title: "192 parameters for 3.25 F1 points",
        body:
          "The most striking number is the price of the fusion. Going from BiLSTM with attention to BiLSTM with attention and fusion raises the trainable count from 1,241,346 to 1,241,538, a difference of exactly 192 weights, since the distance computations have none of their own and only the three extra features connect into the dense head. For that the model gains 3.25 F1 points. Adding bidirectionality buys a comparable 3.18 points but costs around 603,000 parameters, so measured as parameters per F1 point the fusion is roughly 3,200 times cheaper. The frozen 300-dimensional embedding is 25.4 million parameters, about 95 percent of the total, which is why trainable count rather than total is the fair basis for comparison. On that basis the model trains 1.24 million weights against 22.8 million for SBERT and 109.6 million for BERT-base.",
        table: {
          caption: "The cost of each upgrade",
          columns: ["Change", "Extra trainable params", "F1 gain"],
          rows: [
            ["LSTM to BiLSTM (bidirectionality)", "about 603,000", "+3.18 pt"],
            ["BiLSTM + attention, then + fusion", "192", "+3.25 pt"],
          ],
          highlightRowIndex: 1,
        },
      },
      {
        kicker: "Results",
        title: "Faster to train, and better calibrated",
        body:
          "The proposed BiLSTM costs more per epoch, 239 seconds against 205, because the distance work is added to every step, but it converges at epoch 7 instead of 11, so total training time drops from 2,870 seconds to 2,390. It is both more accurate and cheaper to train overall. Validation loss separates the models more sharply than accuracy does. Both fusion models land near 0.36 while every other configuration sits between 0.40 and 0.45, which means the fusion models are not only classifying more pairs correctly but are more confident and better calibrated when they do.",
        table: {
          caption: "Training efficiency and validation loss",
          columns: ["Model", "Best epoch", "Total epochs", "Time", "Val loss"],
          rows: [
            ["BiLSTM + Attention + Fusion", "7", "10", "2,390 s", "0.3631"],
            ["BiGRU + Attention + Fusion", "7", "10", "2,240 s", "0.3571"],
            ["BiLSTM + Attention", "7", "10", "2,190 s", "0.4069"],
            ["BiGRU + Attention", "8", "11", "2,310 s", "0.4044"],
            ["BiLSTM", "11", "14", "2,870 s", "0.4079"],
            ["BiGRU", "11", "14", "2,700 s", "0.4064"],
            ["LSTM", "17", "20", "2,730 s", "0.4501"],
            ["GRU", "14", "17", "2,193 s", "0.4145"],
          ],
          highlightRowIndex: 0,
        },
        image: {
          src: "/projects/siamese-bilstm/training-loss.png",
          alt: "Training and validation loss per model",
          caption: "Train and validation loss for every variant. For the fusion models the validation curve bottoms out near epoch 7 then begins to rise, and that turning point is what early stopping detects.",
        },
      },
      {
        kicker: "Results",
        title: "What the attention layer looks at",
        body:
          "The attention weights read directly as a shaded sentence. In this pair, both questions ask about resetting a Gmail password without account recovery access, and the layer puts its heaviest weight on the content words that carry that intent, gmail, password, reset and recovery, plus the negations without and knowing in the second question. Function words such as how, my and to get almost nothing. This also explains something the numbers alone do not. The attention layer is clearly learning something sensible, yet on its own it barely moves the score. Its real job is to shape a sentence vector clean enough for the distance layer to compare.",
        image: {
          src: "/projects/siamese-bilstm/attention.png",
          alt: "Attention weights over tokens",
          caption: "Learned token importances for one sentence pair. Each token is shaded by its attention weight, shown beneath it, and darker means more weight.",
        },
      },
      {
        kicker: "Results",
        title: "Ranking quality across the whole threshold range",
        body:
          "Every one of the eight models favours recall over precision, so they lean toward calling a pair similar and their mistakes are mostly false positives. The proposed BiLSTM reaches ROC-AUC 0.9233, with its GRU counterpart right behind at 0.9227, and both curves bow hard toward the top-left corner, so the models separate similar from dissimilar pairs well across the full range of thresholds rather than only at the default 0.5. The fusion models are clearly ahead of the rest on AUC just as they are on F1. For a use where a wrong match costs more than a missed one, the simplest improvement is to raise the threshold, and the ROC curve is the right tool for choosing where.",
        image: {
          src: "/projects/siamese-bilstm/roc.png",
          alt: "ROC curves for all eight models",
          caption: "ROC curve and AUC for each variant. The two fusion models reach AUC 0.923 and sit clearly above the middle group.",
        },
      },
    ],

    insights: [
      "Distance fusion is the main contributor. It adds 3.25 F1 points in the LSTM family and 2.26 in the GRU family, and it produces the largest single drop in validation loss of any component, around 0.045.",
      "That contribution costs 192 trainable parameters. Measured as parameters spent per F1 point gained, the fusion is roughly 3,200 times more efficient than bidirectionality, which is the central result of the study.",
      "Attention pooling contributes almost nothing on its own, moving F1 by 0.05 and 1.07 points, but it is necessary for fusion because it produces the sentence vector the distance layer compares.",
      "Bidirectionality is the strongest single structural change, worth between 3.2 and 5.6 F1 points, though it is also by far the most expensive at around 603,000 parameters.",
      "BiLSTM and BiGRU land within 0.2 F1 of each other once fusion is added, so the cell choice comes down to training cost, and every model favours recall over precision, which makes threshold tuning the easiest remaining gain.",
    ],

    limitations:
      "The results describe one labelled sentence-pair split, and the study has not yet been run on a standard public benchmark, so the F1 of 0.8305 is not directly comparable to numbers others report. SBERT and BERT-base are compared on trainable parameter count only, not on accuracy on this exact split, so the fair claim is that the model is far cheaper to train rather than that it beats them. The embedding is frozen throughout. Every model favours recall over precision at the default 0.5 threshold. And the fusion has only been tested as a single three-distance block, so which of cosine, Manhattan and Euclidean carries the signal is still open.",

    nextSteps: [
      "Run the distance ablation, sentence vectors only, the three distances only, and one distance at a time, to see which geometry carries the signal.",
      "Tune the decision threshold to correct the recall-over-precision imbalance.",
      "Evaluate SBERT and BERT-base on the same split to finish the accuracy comparison, and add a standard benchmark such as Quora Question Pairs, PAWS or STS-B.",
      "Unfreeze the embedding for the final epochs and measure the effect.",
    ],

    // Figures live inline within caseStudySections for the "pipeline" layout.
    images: [],
  },

  // =========================================================================
  // PROJECT D — Bank Customer Churn Prediction
  // =========================================================================
  {
    id: "bank-churn-prediction",
    title: "Bank Customer Churn Prediction",
    subtitle:
      "A binary classifier that flags credit-card customers likely to close their account, comparing 7 algorithms on 10,000+ records so a retention team can reach out before they leave.",
    category: "Classification",
    featured: true,

    thumbnail: "/projects/bank-churn/model-comparison.png",
    coverImage: "/projects/bank-churn/model-comparison.png",

    githubUrl: "#", // [PLACEHOLDER] Replace with your GitHub repo URL
    demoUrl: "#",
    datasetUrl: "#", // [PLACEHOLDER] Replace with your dataset source URL

    techStack: ["Python", "Scikit-learn", "XGBoost", "CatBoost", "Pandas", "NumPy", "Matplotlib", "Seaborn"],

    keyMetrics: [
      { label: "Accuracy", value: "98%", description: "XGBoost, on a 20% held-out test set" },
      { label: "F1-Score", value: "0.93", description: "XGBoost, attrited-customer class" },
      { label: "ROC-AUC", value: "0.99+", description: "XGBoost and CatBoost" },
      { label: "Models Benchmarked", value: "7", description: "KNN, Decision Tree, Random Forest, SVM, Logistic Regression, XGBoost, CatBoost" },
    ],

    overview:
      "This model predicts which of a bank's credit-card customers are likely to close their account, using demographic, account and spending features. The point is to give a retention team a list to work through before customers actually leave. I compared seven classifiers rather than picking one up front, since they behave quite differently on imbalanced tabular data.",

    role: "Solo project. I did the EDA, the preprocessing, the seven-model comparison and the evaluation.",

    problem:
      "Replacing a credit-card customer costs a bank far more than keeping one, and once someone has closed their account it is too late to do anything about it. If a model can flag customers who look likely to leave, the retention team can put its calls and offers where they matter instead of reacting after the fact.",

    dataset: {
      name: "BankChurners (Credit Card Customers)",
      source: "Bank credit-card customer dataset (BankChurners.csv)",
      size: "10,127 customers, 20 features after dropping ID and two auxiliary columns",
      description:
        "Demographic fields (age, gender, education, income, marital status), account fields (card category, months on book, relationship count) and spending fields (credit limit, revolving balance, transaction amount and count, utilization ratio) for a bank's credit-card customers, labelled Existing or Attrited Customer.",
    },

    dataPreprocessing:
      "The target flag was mapped to 0 and 1. Categorical columns were encoded by type: Gender and Marital_Status with one-hot encoding, and the ordered ones (Education_Level, Income_Category, Card_Category) with explicit integer mappings that keep their order, so Uneducated sits below High School and so on. Numeric columns were standardised after an 80/20 stratified split, with the scaler fit on the training set only.",

    eda: "About 16% of the 10,127 customers had churned, which is imbalanced enough that plain accuracy is misleading: a model that always says 'stays' already scores around 84%. I checked the numeric distributions with histograms and boxplots split by churn, profiled the categorical features against churn rate, and looked at a correlation heatmap. Two pairs stood out. Credit_Limit and Avg_Open_To_Buy are correlated at r = 1.00, since one is basically derived from the other, and Total_Trans_Amt and Total_Trans_Ct at r = 0.81.",

    featureEngineering:
      "I did not build any new features. The work here was encoding the existing categoricals correctly, ordinal versus nominal, and then leaving the multicollinearity from EDA for the tree-based models to absorb, since they handle correlated columns without trouble.",

    modeling:
      "Seven classifiers ran on the same splits: KNN, Decision Tree, Random Forest, SVM, Logistic Regression, XGBoost and CatBoost. Several used class_weight='balanced' or the boosting libraries' own imbalance handling to deal with the roughly 5-to-1 split. Comparing a broad set first was deliberate, because tree ensembles, distance-based models and linear models tend to react very differently to imbalanced, mixed-type data.",

    evaluation:
      "All seven were scored on the same 20% stratified test set of 2,026 customers, using accuracy, precision, recall, F1 and ROC-AUC, with F1 and ROC-AUC given more weight than accuracy because of the imbalance. I also compared confusion matrices and precision-recall curves, which are more informative than ROC curves when one class is rare.",

    results:
      "XGBoost and CatBoost were clearly ahead. Both reached about 98% accuracy and 0.92 to 0.93 F1 on the churn class, with ROC-AUC near 1.00 and average precision of 0.976 and 0.979 on the precision-recall curve. On the 2,026-customer test set, XGBoost kept 1,681 customers correctly, flagged 298 churners correctly, and made only 20 false alarms and 27 misses. Random Forest was a solid third at 96% accuracy and 0.86 F1. Logistic Regression and Decision Tree were the weakest, roughly 0.66 to 0.82 F1.",

    modelComparison: [
      {
        model: "XGBoost",
        metrics: [
          { label: "Accuracy", value: "0.98" },
          { label: "Precision", value: "0.94" },
          { label: "Recall", value: "0.92" },
          { label: "F1", value: "0.93" },
          { label: "ROC-AUC", value: "1.00" },
        ],
      },
      {
        model: "CatBoost",
        metrics: [
          { label: "Accuracy", value: "0.98" },
          { label: "Precision", value: "0.94" },
          { label: "Recall", value: "0.91" },
          { label: "F1", value: "0.92" },
          { label: "ROC-AUC", value: "1.00" },
        ],
      },
      {
        model: "Random Forest",
        metrics: [
          { label: "Accuracy", value: "0.96" },
          { label: "Precision", value: "0.93" },
          { label: "Recall", value: "0.81" },
          { label: "F1", value: "0.86" },
          { label: "ROC-AUC", value: "0.99" },
        ],
      },
      {
        model: "Decision Tree",
        metrics: [
          { label: "Accuracy", value: "0.94" },
          { label: "Precision", value: "0.82" },
          { label: "Recall", value: "0.81" },
          { label: "F1", value: "0.82" },
          { label: "ROC-AUC", value: "0.89" },
        ],
      },
      {
        model: "SVM",
        metrics: [
          { label: "Accuracy", value: "0.92" },
          { label: "Precision", value: "0.68" },
          { label: "Recall", value: "0.91" },
          { label: "F1", value: "0.78" },
          { label: "ROC-AUC", value: "0.97" },
        ],
      },
      {
        model: "KNN",
        metrics: [
          { label: "Accuracy", value: "0.92" },
          { label: "Precision", value: "0.81" },
          { label: "Recall", value: "0.62" },
          { label: "F1", value: "0.70" },
          { label: "ROC-AUC", value: "0.91" },
        ],
      },
      {
        model: "Logistic Regression",
        metrics: [
          { label: "Accuracy", value: "0.85" },
          { label: "Precision", value: "0.53" },
          { label: "Recall", value: "0.88" },
          { label: "F1", value: "0.66" },
          { label: "ROC-AUC", value: "0.93" },
        ],
      },
    ],

    insights: [
      "XGBoost and CatBoost led on every metric, not only accuracy. Both held F1 around 0.92 to 0.93 and average precision around 0.98 on the churn class, comfortably ahead of Random Forest.",
      "Accuracy on its own would have misled. Decision Tree at 94% accuracy looked close to Random Forest at 96%, but its F1 was 0.82 against 0.86 and its average precision 0.696 against 0.944 on the class that matters for retention.",
      "Logistic Regression caught most churners at 0.88 recall but only 0.53 precision, so it raised nearly as many false alarms as real ones. That is probably too noisy to act on directly.",
      "Credit_Limit and Avg_Open_To_Buy are almost the same column at r = 1.00. The tree models handled that fine, but it would be worth dropping one if a linear model were used instead.",
    ],

    limitations:
      "The data is a single historical snapshot with no record of how behaviour changed in the months before churn, so a real deployment would need retraining as customers shift. I did not tune the top models, so XGBoost and CatBoost ran near their defaults. There is also no per-customer explanation such as SHAP, and a retention team needs to know why someone was flagged, not just that they were.",

    nextSteps: [
      "Tune XGBoost and CatBoost, for example with Optuna, to see how much is left above these near-default numbers.",
      "Add SHAP or feature-importance output per prediction, so a flagged customer comes with a reason to act on.",
      "Move the decision threshold along the precision-recall curve instead of leaving it at 0.5, since a missed churner and a false alarm do not cost the same.",
      "Test on a more recent set of customers, since one historical snapshot will not capture drift.",
    ],

    images: [
      {
        src: "/projects/bank-churn/eda-correlation.png",
        alt: "Correlation Matrix",
        caption: "Correlation heatmap of the numeric features. Credit_Limit and Avg_Open_To_Buy are almost perfectly correlated.",
      },
      {
        src: "/projects/bank-churn/model-comparison.png",
        alt: "Model Performance Comparison",
        caption: "Accuracy, precision, recall, F1 and ROC-AUC for all seven models.",
      },
      {
        src: "/projects/bank-churn/confusion-matrices.png",
        alt: "Confusion Matrix Comparison",
        caption: "Confusion matrices for all seven models on the 2,026-customer test set.",
      },
    ],
  },

  // =========================================================================
  // PROJECT E — Diabetes Risk Prediction
  // =========================================================================
  {
    id: "diabetes-prediction",
    title: "Diabetes Risk Prediction",
    subtitle:
      "A classifier that estimates diabetes risk from routine health measurements, with 7 algorithms tuned by grid search and checked against both cross-validation and a held-out test set on the Pima Indians dataset.",
    category: "Classification",
    featured: true,

    thumbnail: "/projects/diabetes-prediction/test-results.png",
    coverImage: "/projects/diabetes-prediction/test-results.png",

    githubUrl: "#", // [PLACEHOLDER] Replace with your GitHub repo URL
    demoUrl: "#",
    datasetUrl: "https://www.kaggle.com/datasets/uciml/pima-indians-diabetes-database/data",

    techStack: ["Python", "Scikit-learn", "XGBoost", "Imbalanced-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],

    keyMetrics: [
      { label: "Best Test Accuracy", value: "82.3%", description: "XGBoost, on a 79-patient held-out test set" },
      { label: "Test F1-Score", value: "0.77", description: "XGBoost" },
      { label: "Models Benchmarked", value: "7", description: "GridSearchCV-tuned, 5-fold stratified CV" },
      { label: "Clean Dataset", value: "392 patients", description: "After removing biologically-invalid zero entries (from 768)" },
    ],

    overview:
      "This classifier estimates whether a patient is likely diabetic from routine measurements like glucose, BMI, blood pressure and age, using the Pima Indians Diabetes dataset. I tuned seven models with grid search and then scored each one two ways, cross-validation and a held-out test set, and reported both rather than only the better-looking number.",

    role: "Solo project. I handled the EDA, the data cleaning, the class-imbalance step with SMOTETomek, the grid-search tuning, the cross-validation and the final test-set evaluation across seven models.",

    problem:
      "Diabetes often goes unnoticed until complications show up, and it is not practical to screen every patient with the same intensity. A model that reads measurements already taken at a routine checkup could help decide who gets follow-up testing first, rather than treating everyone as the same risk.",

    dataset: {
      name: "Pima Indians Diabetes Database",
      source: "Kaggle (uciml/pima-indians-diabetes-database)",
      size: "768 patients, 8 health features + binary Outcome; reduced to 392 after removing biologically-invalid zero values",
      description:
        "Health measurements for female patients of Pima Indian heritage: Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, BMI, DiabetesPedigreeFunction and Age, labelled with a binary diabetes Outcome.",
    },

    dataPreprocessing:
      "Five columns (Glucose, BloodPressure, SkinThickness, Insulin, BMI) use 0 as a stand-in for a missing measurement rather than a real value. Insulin alone has 374 zeros, close to half the data, and SkinThickness has 227. Instead of imputing them I dropped every row that contained one, which took the dataset from 768 patients down to 392. That is a real trade of quantity for cleanliness. The remaining data was split 80/20 with stratification, scaled with RobustScaler because outliers were still present, and balanced on the training fold only with SMOTETomek so no synthetic samples reach the test set.",

    eda: "The raw data leans toward non-diabetic, 500 against 268, and 262 against 130 after cleaning. Several features have outliers, and Insulin in particular is heavily right-skewed. In the correlation matrix after cleaning, Glucose is the strongest single link to the outcome at r = 0.52, followed by Age at 0.35, BMI at 0.27 and Pregnancies at 0.26. BloodPressure and SkinThickness are the weakest.",

    featureEngineering:
      "No new features. The decisions that mattered were what to do with the invalid zeros (drop rather than impute), how to scale given the outliers (RobustScaler), and how to rebalance (SMOTETomek on the training fold only).",

    modeling:
      "Seven classifiers were trained: KNN, Naive Bayes, Decision Tree, Random Forest, XGBoost, SVM and Logistic Regression. Each was tuned with GridSearchCV, which was affordable here precisely because the cleaned dataset is small. Every model then went through 5-fold stratified cross-validation before a final run on the untouched test set.",

    evaluation:
      "Each model was scored on accuracy, precision, recall and F1 two ways: 5-fold stratified cross-validation on the SMOTETomek-balanced training data, and a single run on the untouched, imbalanced test set. I kept both so the gap between them could be looked at, rather than only reporting the more flattering cross-validation figure.",

    results:
      "On the test set XGBoost was strongest at 82.3% accuracy, 0.68 precision, 0.88 recall and 0.77 F1, with Logistic Regression (81.0% accuracy, 0.75 F1) and Naive Bayes (79.8% accuracy, 0.73 F1) close behind. Decision Tree was the weakest at 67.1% accuracy and 0.57 F1. Every model scored lower on the test set than in cross-validation, for example XGBoost at 84.5% in CV against 82.3% on the test set. That gap is likely a mix of mild overfitting to the training fold, a 79-patient test set that makes any metric noisy, and the tuning being done on the training data only.",

    modelComparison: [
      {
        model: "XGBoost",
        metrics: [
          { label: "Accuracy", value: "0.82" },
          { label: "Precision", value: "0.68" },
          { label: "Recall", value: "0.88" },
          { label: "F1", value: "0.77" },
        ],
      },
      {
        model: "Logistic Regression",
        metrics: [
          { label: "Accuracy", value: "0.81" },
          { label: "Precision", value: "0.67" },
          { label: "Recall", value: "0.85" },
          { label: "F1", value: "0.75" },
        ],
      },
      {
        model: "Naive Bayes",
        metrics: [
          { label: "Accuracy", value: "0.80" },
          { label: "Precision", value: "0.65" },
          { label: "Recall", value: "0.85" },
          { label: "F1", value: "0.73" },
        ],
      },
      {
        model: "Random Forest",
        metrics: [
          { label: "Accuracy", value: "0.78" },
          { label: "Precision", value: "0.65" },
          { label: "Recall", value: "0.77" },
          { label: "F1", value: "0.70" },
        ],
      },
      {
        model: "KNN",
        metrics: [
          { label: "Accuracy", value: "0.70" },
          { label: "Precision", value: "0.53" },
          { label: "Recall", value: "0.62" },
          { label: "F1", value: "0.57" },
        ],
      },
      {
        model: "SVM",
        metrics: [
          { label: "Accuracy", value: "0.70" },
          { label: "Precision", value: "0.53" },
          { label: "Recall", value: "0.62" },
          { label: "F1", value: "0.57" },
        ],
      },
      {
        model: "Decision Tree",
        metrics: [
          { label: "Accuracy", value: "0.67" },
          { label: "Precision", value: "0.50" },
          { label: "Recall", value: "0.65" },
          { label: "F1", value: "0.57" },
        ],
      },
    ],

    insights: [
      "XGBoost was top on the test set at 82.3% accuracy and 0.77 F1, but Naive Bayes and Logistic Regression, both much simpler, were within a few points. The signal in this data looks fairly simple rather than something that needs a heavy ensemble.",
      "Every model scored lower on the test set than in cross-validation, for example XGBoost dropping from 84.5% to 82.3%. Because the gap is consistent across all seven, it is better read as these numbers being a bit optimistic than as noise from one model.",
      "Dropping the biologically impossible zeros (0 blood pressure, 0 BMI and so on) cut the data almost in half, from 768 to 392. That is the price of choosing quality over quantity, and it probably feeds into the CV-versus-test gap given how few patients are left per split.",
      "Glucose was by far the strongest single correlate of the outcome at r = 0.52, well ahead of Age, BMI and Pregnancies, which fits it being the most direct marker among the features available.",
    ],

    limitations:
      "The cleaned dataset of about 392 patients is small, and a 79-patient test set means the metrics move noticeably depending on who lands in the split. Every model scored lower on the test set than in cross-validation, most likely from a mix of mild overfitting, limited data at both tuning and test time, and tuning done on the training data only. The data is also specific to female patients of Pima Indian heritage, so it would not carry over to a broader population without new data.",

    nextSteps: [
      "Repeat the evaluation with nested cross-validation rather than one train/test split, for a less split-sensitive read on how well it generalises.",
      "Try imputing the invalid zeros, for example with a median by outcome group, to see whether keeping the extra ~376 patients is worth the noise they add.",
      "Add SHAP or permutation importance so a clinician-facing version could show which factors drove an individual prediction.",
      "Test on a more diverse population, since the source data covers one demographic group only.",
    ],

    images: [
      {
        src: "/projects/diabetes-prediction/correlation.png",
        alt: "Correlation Matrix",
        caption: "Correlation matrix of the health features and Outcome after cleaning. Glucose is the strongest single predictor at r = 0.52.",
      },
      {
        src: "/projects/diabetes-prediction/cv-results.png",
        alt: "Cross-Validation Results",
        caption: "5-fold stratified cross-validation results for all seven models.",
      },
      {
        src: "/projects/diabetes-prediction/test-results.png",
        alt: "Test Set Results",
        caption: "Held-out test-set results. XGBoost leads at 82.3% accuracy and 0.77 F1.",
      },
    ],
  },

  // =========================================================================
  // PROJECT F — Segmented Market Basket Analysis (Superstore)
  // =========================================================================
  {
    id: "superstore-market-basket-analysis",
    title: "Segmented Market Basket Analysis",
    subtitle:
      "Mining product association rules across all customers, then again inside behavioural segments, showing that the cross-sell signal is concentrated in the 7% of customers a store-wide analysis averages away.",
    category: "Association Rule Mining",
    featured: true,
    layout: "pipeline",

    thumbnail: "/projects/superstore-market-basket/segment-comparison.png",
    coverImage: "/projects/superstore-market-basket/segment-comparison.png",

    githubUrl: "#", // [PLACEHOLDER] Replace with your GitHub repo URL
    demoUrl: "#",
    datasetUrl: "https://www.kaggle.com/datasets/vivek468/superstore-dataset-final",

    techStack: ["Python", "Pandas", "Scikit-learn", "Mlxtend", "NetworkX", "NumPy", "Matplotlib", "Seaborn"],

    keyMetrics: [
      { label: "Cross-sell concentration", value: "7% → 149 rules", description: "The 55-customer high-value segment produces more rules than the other three segments put together (6 + 4 + 27)" },
      { label: "Strongest segment rule", value: "19.97× lift", description: "Binders + Phones + Storage leads to Appliances + Paper, inside the high-value segment" },
      { label: "Mining engines", value: "3, identical output", description: "Apriori, FP-Growth, and a from-scratch ECLAT, verified rule for rule equal at 514 itemsets and 11 rules each" },
      { label: "Global rules", value: "11 / 5,007 orders", description: "Sub-category baskets, 17 items, support at least 0.001, confidence at least 0.7" },
    ],

    overview:
      "Market basket analysis usually treats a customer base as one population, and this project tests that assumption on four years of Superstore retail orders. It runs as a three stage pipeline where each stage decides the next. First it mines association rules across every customer. Then it segments the customers with KMeans. Finally it mines the rules again inside each segment using the same thresholds. The picture that comes back is lopsided in a way the store-wide view completely hides. Almost all of the cross-sell structure lives in the high-value segment, and a single global rule set averages it into invisibility.",

    role: "Solo project covering data cleaning, three-algorithm rule mining including a from-scratch ECLAT, customer segmentation with DBSCAN and KMeans, and the per-segment rule mining.",

    problem:
      "A retailer with thousands of SKUs cannot manually see which products sell together, and a single store-wide market basket analysis quietly assumes every customer shops the same way. The data really needs to answer two questions. Which product combinations are worth bundling or cross-recommending, and whether those combinations are the same for a high-value repeat buyer as for an occasional, heavily discounted one. If they are not, a global rule set is aimed at the average of two different behaviours and fits neither.",

    pipelineStages: [
      {
        label: "Stage 1",
        title: "Global rule mining",
        detail: "Apriori, FP-Growth, and a from-scratch ECLAT run on all 5,007 baskets. Their output is verified identical, so the algorithm choice later is free.",
      },
      {
        label: "Stage 2",
        title: "Customer segmentation",
        detail: "DBSCAN is tried and rejected, then KMeans at k=4 splits customers into four behavioural tiers, from an unprofitable low-value group up to a small high-value one.",
      },
      {
        label: "Stage 3",
        title: "Segmented rule mining",
        detail: "The rules are mined again inside each segment at the same thresholds, so the counts can be compared directly.",
      },
    ],

    caseStudySections: [
      {
        kicker: "Data",
        title: "Four years of orders, and why Sub-Category is the item",
        body:
          "The raw data is 9,994 US retail line items from 2014 to 2017. Sixteen rows are dropped straight away, because they are eight cases where the same product appears twice in one order with conflicting quantities, and since neither copy can be verified, both go. That leaves 9,978 rows, which group into 5,007 order baskets. The item is Sub-Category, which has 17 values, rather than Product Name, which has around 1,850, because at product level the support across 5,000 orders falls below any threshold worth using. The catalogue is also very skewed. Binders and Paper together account for nearly 2,900 lines while Copiers appears only 68 times, so a common item shows up as a consequent in almost every rule simply because it is common. That is why lift, which cancels out baseline popularity, is the metric used throughout.",
        table: {
          caption: "De-duplication",
          columns: ["Stage", "Rows"],
          rows: [
            ["Raw order lines", "9,994"],
            ["After de-duplication", "9,978"],
            ["Removed", "16 (0.16%)"],
          ],
        },
      },
      {
        kicker: "Stage 1",
        title: "Three algorithms, one answer",
        body:
          "All three miners run on the same 5,007 by 17 transaction matrix, with a support floor of 0.001 and confidence of at least 0.7. Apriori and FP-Growth come from mlxtend. ECLAT is written from scratch on the vertical tidset representation, where each item maps to the set of transaction IDs that contain it, support is the size of a tidset intersection, and candidates grow depth first without ever rescanning the data. A direct DataFrame equality check confirms all three return exactly the same 514 frequent itemsets and 11 rules. The runtime gap is a side effect of the parameters rather than a ranking. At a support floor this low, mlxtend builds an FP-tree holding almost the whole dataset, while Apriori stays cheap because there are only 17 items to combine, and on a wider item space the order would probably flip. Proving the three agree has a real payoff, because it turns the algorithm choice for the repeated segmented stage into a pure question of speed.",
        table: {
          caption: "Global rule mining: identical output from different search strategies",
          columns: ["Algorithm", "Frequent itemsets", "Rules", "Runtime"],
          rows: [
            ["Apriori", "514", "11", "0.045 s"],
            ["FP-Growth", "514", "11", "4.48 s"],
            ["ECLAT (from scratch)", "514", "11", "0.022 s"],
          ],
        },
        image: {
          src: "/projects/superstore-market-basket/algorithm-comparison.png",
          alt: "Algorithm comparison",
          caption: "Frequent itemset counts, which are identical, and runtime for the three algorithms.",
        },
      },
      {
        kicker: "Stage 1",
        title: "What the 11 global rules say",
        body:
          "The rules are led by Chairs and Copiers together pointing to Paper, at 80% confidence and lift 3.37, which reads sensibly, since someone furnishing an office with seating and a copier will very likely add paper to the same order. Ranked by lift instead, the top rule is Appliances, Furnishings and Tables pointing to Phones, at lift 4.31. Paper and Binders sit on the consequent side of 9 of the 11 rules, so they behave as the store's connective products. That is useful for a checkout prompt but thin as deep affinity insight. Every one of the global rules also rests on just 6 to 12 orders, so they are real patterns but better treated as hypotheses to test than conclusions to act on.",
        image: {
          src: "/projects/superstore-market-basket/rule-network.png",
          alt: "Global association rule network",
          caption: "Rules as a bipartite graph. Paper and Binders act as hubs that many separate antecedent groups feed into, with the rest of the catalogue loosely attached.",
        },
      },
      {
        kicker: "Stage 2",
        title: "Segmenting the customers: DBSCAN rejected, KMeans kept",
        body:
          "Each customer is reduced to one row holding total sales, quantity and profit, mean discount, and order count, then the features are standardized. DBSCAN, at eps 0.5 and min_samples 5, puts 775 of the 793 customers into a single large cluster plus a noise bucket. Customer spending is a continuum with a long tail rather than dense islands separated by empty space, so a density method has no gaps to cut along. That failed attempt is kept in the write-up because it is what justifies the next choice. KMeans at k=4 scores a silhouette of 0.27, which is modest, and the notebook says plainly that these are cuts through a continuum rather than natural groups. What matters for the next stage is that the four cluster profiles are stable and easy to read as business segments.",
        table: {
          caption: "KMeans customer segments at k=4",
          columns: ["Segment", "Customers", "Avg Sales", "Avg Discount", "Avg Profit"],
          rows: [
            ["S0 Low-value (unprofitable)", "186", "$1,544", "26%", "−$99"],
            ["S1 Mid-value", "308", "$1,883", "10%", "$340"],
            ["S2 Upper-mid", "244", "$3,686", "17%", "$311"],
            ["S3 High-value", "55", "$9,553", "12%", "$2,238"],
          ],
          highlightRowIndex: 3,
        },
      },
      {
        kicker: "Stage 3",
        title: "Re-mining rules inside each segment",
        body:
          "Every transaction is tagged with its customer's segment and FP-Growth is run again inside each one, using the same thresholds of support at least 0.005, confidence at least 0.4, and lift at least 1, so the rule counts can be compared directly rather than reflecting per-segment tuning. The result is heavily lopsided. S3, the smallest segment by both customers and orders, produces 149 rules with a maximum lift of 19.97, which is more than five times the other three segments put together. High-value customers buy across the catalogue in consistent, repeatable combinations, so their baskets have structure. S0's six rules, by contrast, average a lift of 1.69, barely above independence.",
        table: {
          caption: "Rules mined per segment at identical thresholds",
          columns: ["Segment", "Orders", "Rules", "Max lift", "Mean lift"],
          rows: [
            ["S0 Low-value", "893", "6", "2.38", "1.69"],
            ["S1 Mid-value", "1,609", "4", "4.02", "2.94"],
            ["S2 Upper-mid", "2,039", "27", "2.95", "1.78"],
            ["S3 High-value", "466", "149", "19.97", "3.22"],
          ],
          highlightRowIndex: 3,
        },
        image: {
          src: "/projects/superstore-market-basket/segment-comparison.png",
          alt: "Rules and max lift per segment",
          caption: "Rule count and maximum lift per customer segment. The 55-customer high-value segment (S3) dominates both.",
        },
      },
      {
        kicker: "Stage 3",
        title: "The segments produce different rules, not just more",
        body:
          "Placed side by side, the segments are not just producing more rules, they are producing different ones. S1's strongest pattern is Fasteners and Storage, bidirectional at a lift around 4, and it appears nowhere in the global rule set because the other three segments averaged it away. S2 brings Storage in as a recurring consequent next to Paper and Binders, which does not happen in any other segment. S3's five strongest rules are all rearrangements of one itemset, Appliances, Binders, Paper, Phones and Storage, with two-item consequents, so they describe a single large recurring basket rather than five separate patterns. A single store-wide analysis fits none of these three structures.",
        image: {
          src: "/projects/superstore-market-basket/top-rules-per-segment.png",
          alt: "Top rules per segment",
          caption: "Strongest five rules by lift within each segment. Each is a distinct shopping structure, not a scaled copy of the global rule set.",
        },
      },
    ],

    insights: [
      "Mining at the segment level surfaces what a global pass averages away. The data, the algorithm and the thresholds are all held constant, only the unit of analysis changes, and the rules come back materially different. S1's Fasteners and Storage pairing only exists once the mid-value customers are looked at on their own.",
      "The cross-sell signal is concentrated in about 7% of customers. The 55-customer high-value segment produces 149 rules against 6, 4 and 27 for the others, its baskets have repeatable structure, and it is where a bundling or recommendation effort should be pointed.",
      "The unprofitable segment has a pricing problem rather than a bundling one. Its average discount of 26%, double any other segment, explains the negative margin, and its six rules average a lift of 1.69, so there is nothing there to build recommendations on.",
      "Apriori, FP-Growth and ECLAT return identical rules, confirmed by an equality check, so choosing between them for the repeated segmented stage is a question of speed rather than accuracy. The runtime differences reflect the support threshold and the implementation, not the quality of the algorithm.",
      "Every rule, global and segmented, is honest about how thin it is. The global 11 rest on 6 to 12 orders each and S3's rest on around 3 baskets per rule. The direction of the finding is solid, but the individual rules are hypotheses rather than decisions.",
    ],

    limitations:
      "Support is very low throughout. The global rules rest on 6 to 12 orders each and S3's on roughly 3, so the extreme lift values partly reflect small denominators. S3's five strongest rules are rearrangements of a single itemset, so 149 rules represent far fewer than 149 distinct patterns. A silhouette of 0.27 means the segment boundaries are cuts through a continuum, so customers near a boundary carry that ambiguity into the mining. Everything comes from one run at a single seed. The global stage uses a support floor of 0.001 and the segmented stage uses 0.005, so the global and per-segment rule counts are not directly comparable, and only the segments compare cleanly to each other. There is also no temporal validation across the four year window.",

    nextSteps: [
      "Re-mine the global rules at a support floor of 0.005 so the global and segmented stages become a direct numerical comparison rather than an inference across two settings.",
      "Validate S3's rules on a holdout of its own orders, since the top lifts rest on very few baskets.",
      "Repeat the clustering across several seeds to see how stable the segment structure is, and try RFM features in place of raw totals.",
      "Sweep k from 2 to 10 with elbow and silhouette curves instead of fixing k=4, and tune DBSCAN's eps and min_samples.",
    ],

    // Figures live inline within caseStudySections for the "pipeline" layout.
    images: [],
  },

  // =========================================================================
  // PROJECT G — SQL Data Warehouse & Sales Analytics
  // =========================================================================
  {
    id: "sql-data-warehouse-analytics",
    title: "SQL Data Warehouse & Sales Analytics",
    subtitle:
      "End-to-end SQL Data Warehouse built on the Medallion Architecture (Bronze → Silver → Gold), covering ETL, data cleansing, dimensional modeling, exploratory data analysis, and advanced sales-performance analysis — all in T-SQL on Microsoft SQL Server.",
    category: "Data Engineering",
    featured: true,
    hidden: true, // temporarily hidden from listings — keep the data
    layout: "docs",

    thumbnail: "/projects/sql-data-warehouse/architecture.png",
    coverImage: "/projects/sql-data-warehouse/architecture.png",

    githubUrl: "https://github.com/HaikalSyafie/Data_Warehousing",
    demoUrl: "#",
    datasetUrl: "https://github.com/HaikalSyafie/Data_Warehousing/tree/main/Dataset",

    techStack: ["SQL", "Microsoft SQL Server", "T-SQL", "Git"],

    keyMetrics: [
      { label: "Source Systems", value: "2", description: "CRM + ERP" },
      { label: "Data Sources", value: "6 CSVs", description: "3 CRM + 3 ERP files" },
      { label: "Star Schema", value: "1 fact + 2 dims", description: "gold.sales, gold.customers, gold.products" },
      { label: "Analysis Scripts", value: "3", description: "EDA, over-time, and performance analysis" },
    ],

    overview:
      "Two source systems (CRM and ERP) are ingested from CSV, progressively cleaned and standardized, modeled into a star schema, and finally analyzed for sales trends, growth, and product/customer performance.",

    architectureLayers: [
      {
        layer: "🟤 Bronze",
        purpose: "Raw landing zone",
        details: "Ingest source CSVs as-is via BULK INSERT into staging tables — no transformations.",
      },
      {
        layer: "⚪ Silver",
        purpose: "Cleansed & standardized",
        details:
          "Trim text, normalize codes (gender, marital status), fix invalid dates and numbers, derive category IDs and prices, deduplicate, add audit columns.",
      },
      {
        layer: "🟡 Gold",
        purpose: "Business-ready",
        details:
          "Dimensional star schema exposed as SQL views with surrogate keys, joining CRM + ERP into analytics-friendly entities.",
      },
    ],

    dataSources: [
      { system: "CRM", file: "cust_info.csv", description: "Customer master (name, gender, marital status)", rows: "~18,000" },
      { system: "CRM", file: "prd_info.csv", description: "Product master (name, cost, line, dates)", rows: "~400" },
      { system: "CRM", file: "sales_details.csv", description: "Sales transactions (order, ship, due, qty, price)", rows: "~60,000" },
      { system: "ERP", file: "CUST_AZ12.csv", description: "Customer demographics (birthdate, gender)", rows: "~18,000" },
      { system: "ERP", file: "LOC_A101.csv", description: "Customer location / country", rows: "~18,000" },
      { system: "ERP", file: "PX_CAT_G1V2.csv", description: "Product category & subcategory lookup", rows: "36" },
    ],

    starSchema:
      "The Gold layer is a classic star schema: one fact table surrounded by conformed dimensions, all built as SQL views. gold.customers merges CRM customer info with ERP demographics and location (CRM gender is primary, ERP gender is the fallback). gold.products merges CRM product info with the ERP category lookup, keeping only current products (prd_end_dt IS NULL). gold.sales is the fact table linking each transaction to the customer and product dimensions via surrogate keys.",

    analysisScripts: [
      {
        script: "EDA/EDA.sql",
        focus:
          "Database/table exploration, customer, product, sales, and customer-sales EDA; revenue by category, subcategory, country; top customers/products.",
      },
      {
        script: "EDA/OverTimeAnalysis.sql",
        focus:
          "Time-series: yearly & monthly revenue trends, orders, quantity, active customers, average order value, revenue by category/country per year, and year-over-year revenue growth.",
      },
      {
        script: "EDA/PerformanceAnalysis.sql",
        focus:
          "Running total revenue & cumulative average price; product sales vs. historical average; YoY performance classification using window functions.",
      },
    ],

    gettingStarted: [
      "Create the database and schemas (bronze, silver, gold).",
      "Build & load Bronze — run Script/ddl_bronze.sql, then EXEC bronze.load_bronze; (update the CSV file paths inside load_bronze.sql to point at your local Dataset/ folder first).",
      "Build & load Silver — run Script/ddl_silver_table.sql, then EXEC silver.load_silver;",
      "Create Gold views — run Script/ddl_gold.sql.",
      "Explore & analyze — run the scripts in EDA/.",
    ],

    keyConcepts: [
      "Medallion (multi-hop) architecture with clear separation of concerns",
      "Idempotent ETL via TRUNCATE + reload stored procedures",
      "Data cleansing: trimming, code normalization, date/number repair, dedup",
      "Integrating two source systems (CRM + ERP) into conformed dimensions",
      "Star-schema modeling with surrogate keys",
      "Advanced analytics with SQL window functions (YoY, running totals, ranking)",
    ],

    images: [],
  },

  // =========================================================================
  // PROJECT H — Topic Modeling on UGM Menfess (BERTopic)
  // =========================================================================
  {
    id: "ugm-menfess-topic-modeling",
    title: "Topic Modeling on UGM Menfess",
    subtitle:
      "Recovering the hidden structure of 29,143 anonymous Indonesian campus posts with BERTopic, and picking the sentence-embedding backbone from a benchmark rather than from reputation.",
    category: "NLP / Text Mining",
    featured: true,
    layout: "pipeline",

    thumbnail: "/projects/ugm-menfess-topics/document-map.png",
    coverImage: "/projects/ugm-menfess-topics/document-map.png",

    githubUrl: "#", // [PLACEHOLDER] Replace with your GitHub repo URL
    demoUrl: "#",
    datasetUrl: "#", // Self-scraped from @UGM_FESS on X

    techStack: ["Python", "BERTopic", "Sentence-Transformers", "UMAP", "HDBSCAN", "Sastrawi", "scikit-learn", "Pandas"],

    keyMetrics: [
      { label: "Corpus", value: "29,143 posts", description: "Colloquial Indonesian posts scraped from @UGM_FESS on X, cleaned down from 29,241 with only 0.34% dropped" },
      { label: "Topics discovered", value: "84", description: "Interpretable and fully unsupervised, covering 16,772 posts, or 57.6% of the corpus" },
      { label: "Backbone chosen", value: "Multilingual MPNet", description: "Best on both quality axes at once, with the highest topic diversity at 0.827 and the lowest outlier rate at 42.4%" },
      { label: "Standout topic", value: "Dental-clinic recruitment", description: "Dentistry students finding real patients for clinical rotations, a community function no pre-designed keyword search would look for" },
    ],

    overview:
      "A menfess account is an anonymous confession feed where students submit messages and the account posts them on their behalf. @UGM_FESS is one of the largest at Universitas Gadjah Mada, and it accumulates thousands of short, informal Indonesian messages a month with no category labels. This project applies BERTopic to 29,143 of those messages to recover their structure automatically. Three multilingual sentence-embedding models are then benchmarked as the backbone, so the choice rests on measured quality rather than on which model has the best reputation.",

    role: "Solo project covering the scraping, a deliberately conservative preprocessing and stopword strategy, the BERTopic pipeline, a three-model embedding benchmark, and the interpretation of the resulting topics.",

    problem:
      "Nobody can read a feed that grows by thousands of posts a month, and there is no label to sort it by. A keyword search only finds the themes you already thought to look for, which makes unsupervised topic modelling the right tool. The catch is that its output quality depends almost entirely on the sentence-embedding model underneath, and reaching for the biggest available model is not an argument. The real work was building a pipeline that copes with messy code-mixed Indonesian, full of campus slang, English loanwords and chat abbreviations, and then choosing the embedding backbone on evidence.",

    pipelineStages: [
      {
        label: "Stage 1",
        title: "Sentence embedding",
        detail: "A multilingual transformer maps each post to 384 or 768 dimensions, so semantic meaning becomes geometry.",
      },
      {
        label: "Stage 2",
        title: "UMAP to 5D",
        detail: "Density-based clustering fails in high dimensions where all distances look alike, so the reduction is required rather than optional.",
      },
      {
        label: "Stage 3",
        title: "HDBSCAN",
        detail: "Cluster with a minimum size of 30. Weak or idiosyncratic posts are left unassigned rather than forced into a topic.",
      },
      {
        label: "Stage 4",
        title: "c-TF-IDF",
        detail: "Score each cluster's terms by how distinctive they are to it, which turns a numbered cluster into a readable label.",
      },
    ],

    caseStudySections: [
      {
        kicker: "Data",
        title: "29,143 anonymous campus posts",
        body:
          "A menfess account is an anonymous confession feed where students submit messages and the account posts them on their behalf. @UGM_FESS is one of the largest at Universitas Gadjah Mada, and it accumulates thousands of short, informal Indonesian messages a month with no category labels. 29,241 posts were scraped. After lowercasing, stripping platform artefacts, and applying a ten character minimum length filter, 29,143 remain. Only 0.34% were dropped, which says the corpus is dense with real content rather than padded with empty or symbol-only posts. The language is colloquial Indonesian mixed with campus slang, English loanwords and abbreviations, which is exactly the setting where a multilingual embedding model earns its cost over a bag of words approach.",
        table: {
          caption: "Cleaning and length filter",
          columns: ["Stage", "Documents"],
          rows: [
            ["Raw records loaded", "29,241"],
            ["After cleaning and length filter", "29,143"],
            ["Removed", "98 (0.34%)"],
          ],
        },
        image: {
          src: "/projects/ugm-menfess-topics/wordcloud.png",
          alt: "Corpus word cloud",
          caption: "Most frequent terms before any clustering. Campus logistics and account convention vocabulary dominate, which points to a utility board rather than the emotional confessions the menfess format is associated with.",
        },
      },
      {
        kicker: "Preprocessing",
        title: "Deliberately light cleaning, and a targeted stopword list",
        body:
          "Transformer embeddings benefit from intact word order and phrasing, so the cleaning only removes platform artefacts such as URLs, mentions and retweet markers. It strips the hash symbol while keeping the word, so that a tag like #infokos lands in the same topic as the plain phrase. Stopwords combine the Sastrawi Indonesian list with around sixty custom terms that Sastrawi cannot know about, namely chat abbreviations like yg, bgt and gak, discourse particles like nih, dong and deh, and account specific filler like yujiem, sender, ugm_fess and mimin. That last group matters most. Words like sender appear in a large share of posts by convention rather than meaning, so without filtering they become top keywords in many topics at once and make separate clusters look identical. The stopwords apply only at the c-TF-IDF keyword extraction stage through the vectorizer, and the embedding model still reads the full, unfiltered sentence.",
      },
      {
        kicker: "Method",
        title: "Two configuration choices that carry the pipeline",
        body:
          "BERTopic is a pipeline of four replaceable stages, shown above, and two of the settings are load bearing. UMAP reduces the embeddings to 5 components, which is a requirement rather than a convenience, because HDBSCAN's density estimates collapse in high dimensions where point to point distances become nearly uniform. The vectorizer allows trigrams, because fixed phrases like info part time and oper kos putri behave as inseparable units that unigrams would split apart. Quality is scored with topic diversity, the fraction of unique words across every topic's top ten keyword list, where a value near 1 means each topic is described in its own vocabulary.",
        table: {
          caption: "Key pipeline settings",
          columns: ["Stage", "Setting"],
          rows: [
            ["UMAP", "n_neighbors 15, n_components 5, min_dist 0.0, cosine, seed 42"],
            ["HDBSCAN", "min_cluster_size 30, prediction_data on"],
            ["CountVectorizer", "ngram_range (1, 3), min_df 3, max_df 0.95"],
          ],
        },
      },
      {
        kicker: "Benchmark",
        title: "Choosing the embedding backbone on evidence",
        body:
          "Three multilingual sentence transformers were run through the identical pipeline, changing nothing but the embedding stage. Each was scored on topic count, outlier rate, which is the share HDBSCAN leaves unassigned, topic diversity, and runtime. The four numbers are combined into a single score of diversity minus outlier rate over one hundred.",
        table: {
          caption: "Same pipeline, embedding swapped",
          columns: ["Model", "Topics", "Outlier %", "Diversity", "Score", "Time"],
          rows: [
            ["MiniLM (multilingual-MiniLM-L12-v2)", "95", "52.0", "0.820", "0.300", "816 s"],
            ["MPNet (multilingual-mpnet-base-v2)", "84", "42.4", "0.827", "0.403", "2,105 s"],
            ["E5 (multilingual-e5-base)", "62", "46.8", "0.824", "0.356", "3,145 s"],
          ],
          highlightRowIndex: 1,
        },
      },
      {
        kicker: "Benchmark",
        title: "Why MPNet wins is stronger than the score",
        body:
          "MPNet records both the highest diversity and the lowest outlier rate, so it is the best model on each axis taken separately. That means the combined score never has to arbitrate a trade-off, and the ranking would hold under any weighting of the two components. A composite metric that picks a winner only because of how its terms are balanced is fragile, and this one is not in that position. The cost is time, since MPNet is 2.6 times slower than MiniLM, which stays the sensible choice for rapid iteration. E5 is dominated, being the slowest, producing the fewest topics, and beating neither alternative on either quality measure. The topic counts tell a consistent story. MiniLM fragments into 95 topics while pushing 52% of posts into the outlier bin, the signature of an embedding space where clusters are not cleanly separated. E5 does the opposite and merges down to 62. MPNet sits between them at 84 while assigning the largest share of documents.",
      },
      {
        kicker: "Results",
        title: "84 topics, and five domains nobody imposed",
        body:
          "The selected model produces 84 topics covering 16,772 posts, which is 57.6% of the corpus. They group cleanly into five domains of student life, and that grouping was never imposed anywhere in the pipeline. It emerged from the clustering. Marketplace, housing, food and job topics comfortably outnumber relationship topics among the fifteen largest, which contradicts what the menfess format is usually assumed to be.",
        table: {
          caption: "The five emergent domains",
          columns: ["Domain", "What it covers"],
          rows: [
            ["Marketplace", "secondhand goods, concert tickets and books, an informal classifieds board"],
            ["Housing and daily needs", "finding a room, a gym, or a meal"],
            ["Academic", "credit requirements, graduation, survey recruitment"],
            ["Social", "mutual follows and relationship talk, the classic menfess use"],
            ["Career and services", "internship hunting, and dental-clinic patient recruitment"],
          ],
        },
        image: {
          src: "/projects/ugm-menfess-topics/document-map.png",
          alt: "Document map",
          caption: "All 29,143 posts in the reduced embedding space, coloured by assigned topic. Well separated colour regions confirm real structure, and the diffuse background is the visual form of the 42% outlier rate.",
        },
      },
      {
        kicker: "Results",
        title: "What the fifteen largest topics look like",
        body:
          "Each topic was validated against the real posts closest to its centroid, since keyword lists alone can mislead. For the boarding house topic, a detailed facility listing and a three word room request share almost no surface vocabulary beyond the word kos, yet they land together, which is exactly the behaviour that justifies an embedding based approach over term frequency.",
        table: {
          caption: "A selection of the 84 topics, with their top c-TF-IDF keywords",
          columns: ["#", "Theme", "Top keywords"],
          rows: [
            ["0", "Secondhand selling", "kulak, preloved, barang, baju, nego, jual"],
            ["2", "Boarding house", "kos, oper, putri, kamar, info kos, oper kos"],
            ["5", "Academic administration", "semester, wisuda, nilai, kuliah, cumlaude, sks"],
            ["6", "Survey recruitment", "responden, kuesioner, isi kuesioner, kriteria, penelitian"],
            ["7", "Dental clinic", "gigi, koas, keluhan, dirawat, akar, dicabut"],
            ["9", "Food", "makan, enak, ayam, goreng, nasi, rekomendasi"],
            ["10", "Ticket trading", "tiket, nonton, wts, konser, beli tiket, wtb"],
            ["13", "Jobs and internships", "part time, magang, kerja, freelance, parttime"],
          ],
        },
        image: {
          src: "/projects/ugm-menfess-topics/topic-hierarchy.png",
          alt: "Topic hierarchy",
          caption: "Hierarchical clustering of topics. Branches that join at very low height are effectively duplicates, and reading this figure is the reliable way to pick a target count for reduce_topics().",
        },
      },
      {
        kicker: "Results",
        title: "The topic no keyword search would have looked for",
        body:
          "Topic 7 is the striking one, a cluster about tooth extraction, root canals and clinical complaints, with keywords like gigi, koas, keluhan, dicabut and akar. It has nothing to do with confessions. It exists because dentistry students in their clinical year need real patients and use the account to find them. No keyword search designed in advance would have thought to look for it, and recovering that kind of unanticipated community function is the whole reason to run unsupervised topic modelling in the first place. The model does split some themes more finely than a human would, since relationships and mutual follows each occupy two topics, and reduce_topics() can merge them if a coarser view is wanted.",
        image: {
          src: "/projects/ugm-menfess-topics/intertopic-map.png",
          alt: "Intertopic distance map",
          caption: "Topics projected to two dimensions, with circle area proportional to size. Neighbourhoods match the five domains, overlapping circles are candidates for merging, and isolated circles far from the centre, like the dental-clinic topic, are the distinctive ones.",
        },
      },
    ],

    insights: [
      "The backbone choice is robust rather than a coin flip. MPNet is best on diversity and best on outlier rate at the same time, so the selection survives any reweighting of the composite score. A composite that only picks a winner because of how its terms are balanced is fragile, and this one is not in that position.",
      "Topic count and outlier rate together diagnose the embedding space. MiniLM fragments into 95 topics while dumping 52% of posts as outliers, a sign that clusters are not cleanly separated. E5 over-merges to 62. MPNet sits between at 84 while assigning the most documents.",
      "Unsupervised discovery earned its keep by finding the dental-clinic recruitment cluster, an unanticipated community function that no keyword list designed in advance would have thought to search for.",
      "The account is a utility board rather than a confession feed. Marketplace, housing, food and job topics outnumber relationship topics among the fifteen largest, which contradicts what the menfess format is usually assumed to be.",
      "Trigrams do real work. Multi word units like info part time, oper kos putri and isi kuesioner rank as top keywords across several topics, and would have been lost at unigram level.",
    ],

    limitations:
      "The 42.4% outlier rate leaves 12,371 posts unassigned. This is normal for short informal social text and a deliberate property of HDBSCAN, since forcing every document into a cluster produces incoherent topics, but it still caps downstream coverage. All results come from a single seed, and the diversity scores separating the three models sit within one percentage point, so some of the gap could be variance. Diversity measures vocabulary distinctness rather than coherence, so a topic can be perfectly distinct and still incoherent, and a C_v or NPMI coherence score would test that. The model also splits some themes more finely than a human would, with relationships and mutual follows each occupying two topics.",

    nextSteps: [
      "Reduce the outlier rate with reduce_outliers() and report coverage before and after, and add a coherence metric such as C_v or NPMI alongside diversity.",
      "Repeat the benchmark across several seeds to separate signal from variance, given how close the diversity scores are.",
      "Add dynamic topic modelling over the post timestamps, since housing topics should peak before each semester, graduation topics around ceremony dates, and survey recruitment near thesis deadlines.",
      "Merge the over-split relationship and mutual follow topics with reduce_topics(), and test an Indonesian-specific embedding model such as IndoBERT against the multilingual baselines.",
    ],

    // Figures live inline within caseStudySections for the "pipeline" layout.
    images: [],
  },

];

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

/** Projects that should appear in listings and navigation (excludes `hidden`). */
export const visibleProjects: Project[] = projects.filter((p) => !p.hidden);

export function getFeaturedProjects(): Project[] {
  return visibleProjects.filter((p) => p.featured);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.id);
}

/** Previous/next project relative to `id`, wrapping around at the ends. Hidden projects are skipped. */
export function getAdjacentProjects(id: string): {
  prev: Project | null;
  next: Project | null;
} {
  const index = visibleProjects.findIndex((p) => p.id === id);
  if (index === -1) return { prev: null, next: null };

  const prev = visibleProjects[(index - 1 + visibleProjects.length) % visibleProjects.length];
  const next = visibleProjects[(index + 1) % visibleProjects.length];
  return { prev, next };
}
