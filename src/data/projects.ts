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

export interface Project {
  // Routing & identity
  id: string; // Used as URL slug: /projects/[id]
  title: string;
  subtitle: string; // Short 1-2 line description for the card / hero
  category: string; // e.g. "Time-Series Forecasting"
  featured: boolean; // Show on homepage?

  // "ml" (default) = full ML case-study breakdown (Problem/Data/Approach/Results/Insights).
  // "docs" = lean layout mirroring a project's own README (Architecture/Data Sources/
  // Star Schema/Analytics/Getting Started) — for non-ML projects like SQL pipelines.
  layout?: "ml" | "docs";

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
      "Multi-output time-series forecasting to predict future daily High and Low prices of SPY using 1-minute OHLCV data with 1/3/5/7-day prediction horizons.",
    category: "Time-Series Forecasting",
    featured: true,

    thumbnail: "",
    coverImage: "",

    githubUrl: "#", // [PLACEHOLDER] Replace with your GitHub repo URL
    demoUrl: "#", // [PLACEHOLDER] Replace with your live demo URL
    datasetUrl: "#", // [PLACEHOLDER] Replace with your dataset source URL

    techStack: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "XGBoost",
      "Matplotlib",
      "Seaborn",
    ],

    keyMetrics: [
      {
        label: "RMSE",
        value: "[PLACEHOLDER]",
        description: "Root Mean Squared Error on test set",
      },
      {
        label: "MAE",
        value: "[PLACEHOLDER]",
        description: "Mean Absolute Error on test set",
      },
      {
        label: "R²",
        value: "[PLACEHOLDER]",
        description: "Coefficient of determination",
      },
      {
        label: "Horizons",
        value: "1/3/5/7 days",
        description: "Multi-step forecast horizons",
      },
    ],

    overview:
      "This project explores whether high-frequency intraday data can sharpen short-term price-range forecasts beyond what daily-only data supports — a question motivated by how often systematic trading strategies rely on daily bars alone. The goal was to build a multi-output time-series forecasting model that predicts the daily High and Low prices of SPY at 1, 3, 5, and 7-day horizons: ingesting 1-minute OHLCV data, aggregating it to daily features, and producing simultaneous High/Low forecasts that define a predicted trading range for each horizon.",

    role: "[PLACEHOLDER] — Describe your role and contribution on this project (e.g., solo project, end-to-end from data collection to deployment).",

    problem:
      "Intraday and short-term price movements of SPY (S&P 500 ETF) are notoriously difficult to predict due to market noise, volatility clustering, and regime changes. Traders and portfolio managers need reliable forecasts of daily High and Low prices to define expected trading ranges, set stop-loss levels, and manage risk. Traditional technical analysis indicators often lag behind, and simple moving averages fail to capture the complex non-linear dynamics of minute-level price data.",

    dataset: {
      name: "SPY 1-Minute OHLCV",
      source: "[PLACEHOLDER] — Replace with actual data source (e.g., Polygon.io, Alpha Vantage, Yahoo Finance)",
      size: "[PLACEHOLDER] — e.g., ~2 years of 1-min bars, ~200K+ rows",
      description:
        "High-frequency 1-minute Open, High, Low, Close, Volume (OHLCV) data for the SPY ETF, spanning regular market hours across the sample period.",
    },

    dataPreprocessing:
      "Raw 1-minute bars are aggregated to daily bars, computing daily High, Low, Open, Close, and volume-weighted metrics — a step that reduces noise while preserving the intraday volatility information critical for range prediction. Missing sessions from market holidays are handled through forward-fill interpolation after verification against the exchange calendar.",

    eda: "Exploratory analysis revealed strong autocorrelation in daily High/Low values, with volatility clustering visible in rolling standard deviation plots. The distribution of daily ranges (High - Low) was right-skewed, indicating occasional large-range days. Correlation analysis showed that lagged OHLCV features and volume metrics had moderate predictive power. Seasonal decomposition revealed weekly and monthly patterns in volatility.",

    featureEngineering:
      "Features were engineered in three categories: (1) Lagged features — rolling windows of daily High, Low, Close, and Volume at 5, 10, 20, and 50-day lookbacks; (2) Technical indicators — RSI, Bollinger Bands, ATR (Average True Range), MACD, and VWAP derived from the 1-minute data before aggregation; (3) Volatility features — rolling standard deviation, Garman-Klass volatility estimator, and high-low range ratios. All features were carefully constructed to avoid look-ahead bias, using only information available at prediction time.",

    modeling:
      "A multi-output regression approach was used, with separate models trained for each horizon (1, 3, 5, 7 days) predicting both High and Low simultaneously. XGBoost was selected as the primary model after benchmarking against Linear Regression, Random Forest, and LightGBM. Hyperparameter tuning was performed via TimeSeriesSplit cross-validation (5 folds) with Bayesian optimization. The walk-forward validation scheme ensured no future data leakage during training.",

    evaluation:
      "Models were evaluated using RMSE, MAE, and R² on a held-out test set comprising the most recent 20% of the data. The evaluation followed a strict temporal split — no shuffling — to simulate real-world deployment. Residual analysis confirmed that errors were approximately normally distributed with no significant autocorrelation, validating the model's predictions. Performance was compared across all four horizons, showing expected degradation at longer horizons.",

    results:
      "The model achieved [PLACEHOLDER] RMSE and [PLACEHOLDER] R² on the 1-day horizon for both High and Low predictions. The predicted trading range (Predicted High − Predicted Low) closely tracked the actual range, with the 1-day model capturing [PLACEHOLDER]% of daily ranges within the predicted bounds. Actual vs Predicted plots showed strong alignment for the 1-day and 3-day horizons, with increasing uncertainty bands at 5-day and 7-day horizons as expected.",

    modelComparison: [
      {
        model: "Linear Regression",
        metrics: [
          { label: "RMSE", value: "[PLACEHOLDER]" },
          { label: "R²", value: "[PLACEHOLDER]" },
        ],
      },
      {
        model: "Random Forest",
        metrics: [
          { label: "RMSE", value: "[PLACEHOLDER]" },
          { label: "R²", value: "[PLACEHOLDER]" },
        ],
      },
      {
        model: "LightGBM",
        metrics: [
          { label: "RMSE", value: "[PLACEHOLDER]" },
          { label: "R²", value: "[PLACEHOLDER]" },
        ],
      },
      {
        model: "XGBoost (selected)",
        metrics: [
          { label: "RMSE", value: "[PLACEHOLDER]" },
          { label: "R²", value: "[PLACEHOLDER]" },
        ],
      },
    ],

    insights: [
      "ATR (Average True Range) and rolling volatility features were the most important predictors across all horizons, confirming that volatility-based features carry the most signal for range prediction.",
      "1-minute volume aggregation features (e.g., volume spikes, VWAP deviation) provided meaningful lift over daily-only features, justifying the use of high-frequency data.",
      "Model performance degraded gracefully with longer horizons — the 1-day model was significantly more accurate than the 7-day model, consistent with the efficient market hypothesis.",
      "The predicted trading range can be directly used for setting stop-loss and take-profit levels in systematic trading strategies.",
    ],

    images: [
      {
        src: "",
        alt: "EDA Visualization",
        caption:
          "Distribution of daily High-Low ranges and autocorrelation plots",
      },
      {
        src: "",
        alt: "Evaluation Metrics",
        caption:
          "RMSE and R² comparison across 1/3/5/7-day horizons for High and Low predictions",
      },
      {
        src: "",
        alt: "Actual vs Predicted",
        caption:
          "Actual vs Predicted High/Low prices with predicted trading range overlay",
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

    thumbnail: "/projects/eco-craft/thumbnail.png",
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
      "EcoCraft is an image classifier that recognizes 12 common types of household waste — from plastic bottles and cans to cloth and cardboard — so that a recycling or upcycling app can automatically suggest what an item is before a user decides how to reuse or dispose of it. The goal was to see how far a lightweight, transfer-learning approach could go on a modest, self-collected image dataset organized by category.",

    role: "Solo project — dataset organization and labeling, preprocessing pipeline, model architecture and training, and evaluation.",

    problem:
      "People routinely aren't sure which category a piece of waste belongs to, and a wrong guess can send a whole batch to landfill instead of getting recycled or upcycled. That's the exact friction an eco-craft/recycling app hits — it needs to auto-suggest a category the moment someone points a camera at an item, rather than making them guess from a list.",

    dataset: {
      name: "EcoCraft Waste Image Dataset",
      source: "Self-collected and curated images, organized into per-category folders",
      size: "2,880 images across 12 categories (176–293 per class)",
      description:
        "Photos of 12 household waste/reusable-item categories — Bohlam (lightbulb), Botol Plastik (plastic bottle), Garpu (fork), Gelas Plastik (plastic cup), Hanger, Kain (cloth), Kaleng (can), Kardus (cardboard), Kertas (paper), Kotak susu (milk carton), Sendok (spoon), and Tutup Botol (bottle cap).",
    },

    dataPreprocessing:
      "Images were organized into per-category folders and split into train/validation/test sets (80/10/10) with a fixed random seed. All images were resized to 224×224 and rescaled to [0, 1]. Training images were augmented on the fly (rotation, width/height shift, shear, zoom, horizontal flip) via Keras' ImageDataGenerator to compensate for the modest dataset size.",

    eda: "Class counts were mildly imbalanced (176–293 images per class, about a 1.7× spread) — noticeable, but not severe enough to need resampling. The bigger issue surfaced when actually looking through the images rather than just counting them: the set is a mix of styles — some categories are clean, isolated product photos on white backgrounds (e.g. cutlery, bottle caps), others are candid real-world shots with cluttered backgrounds (cloth, cardboard), and a few images are closer to stock/illustration quality than an actual photograph of trash. That inconsistency in framing, lighting, and 'realism' across classes is arguably a bigger risk to generalization than the class-count imbalance.",

    featureEngineering:
      "Rather than hand-crafted features, this project relied on transfer learning: NASNetMobile (pretrained on ImageNet) was used as a frozen convolutional feature extractor, with a custom head — an extra Conv2D layer, global average pooling, and two dense layers with dropout — added on top to adapt the generic ImageNet features to the 12 waste categories.",

    modeling:
      "NASNetMobile was chosen specifically because it's a mobile-oriented architecture — small enough to eventually run on-device in a recycling app, unlike heavier backbones (ResNet, EfficientNet-L) that would be overkill for a 12-class problem on under 3,000 images. Freezing the pretrained base and training only a lightweight head (Conv2D(64) → GlobalAveragePooling2D → Dense(512) → Dropout(0.25) → Dense(256) → Dense(12, softmax)) kept the trainable parameter count low, which matters when the dataset is this small — a full fine-tune would have overfit fast. Training used Adam (lr=1e-4) with categorical cross-entropy, a custom exponential LR decay after epoch 10, and ReduceLROnPlateau/EarlyStopping/ModelCheckpoint to stop at the best epoch rather than a fixed budget.",

    evaluation:
      "The final model was evaluated on a held-out test set of 294 images never seen during training. Beyond accuracy and loss, per-class precision/recall/F1 and a normalized confusion matrix were computed to see exactly which categories were being confused with which, since overall accuracy alone can hide weak spots in individual classes.",

    results:
      "The model reached 93.9% test accuracy (0.181 test loss), with a samples-averaged precision/recall/F1 of 0.83 at a 0.91 decision threshold and a Hamming loss of 0.015. Training and validation accuracy both climbed past 90% within the first 10–15 epochs and stayed there, with validation loss flattening out around 0.2–0.3 — a healthy curve, not a sign of overfitting. Per-class performance ranged from perfect (Bohlam, Kaleng at 1.00 F1) down to Kertas (paper) at 0.53 recall — the confusion matrix shows Kertas, Kotak susu, and Sendok were the three weakest classes, and in every case the wrong guess was disproportionately 'Bohlam'. That's not a plausible visual mix-up (a spoon doesn't look like a lightbulb) — it points to Bohlam's training photos (plain, high-contrast object on a flat white background) matching some generic 'isolated object' pattern the model leans on when it's unsure, rather than a genuine feature confusion.",

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
      "A frozen, pretrained NASNetMobile backbone with a small custom head reached over 93% accuracy on a dataset of under 3,000 images — transfer learning made a from-scratch CNN unnecessary at this scale.",
      "Per-class evaluation mattered more than the headline accuracy: Kertas, Sendok, and Kotak susu had noticeably lower recall despite strong overall metrics, pointing to specific categories that need more/varied training images.",
      "Confusion was concentrated, not spread out — most misclassified images across categories were predicted as 'Bohlam', suggesting the model falls back on a generic 'plain object on white background' pattern when unsure, rather than confusing genuinely similar-looking items.",
      "Precision stayed high (many classes at 1.00) even where recall dropped, meaning the model rarely mislabels other items as a given category — it's conservative rather than trigger-happy.",
    ],

    limitations:
      "This is a small, largely self-collected dataset (under 3,000 images), and — as the EDA turned up — a meaningful chunk of it is clean product photography rather than photos of actual, dirty, real-world trash. A model trained on tidy product shots may not hold up against a real user's blurry, poorly-lit phone photo of a crushed can. The 93.9% test accuracy should be read as 'strong on this dataset's distribution,' not a guarantee in production.",

    nextSteps: [
      "Collect (or crowd-source) real phone-camera photos of actual used waste items, especially for Kertas, Sendok, and Kotak susu, to close the recall gap and reduce the studio-photo bias.",
      "Investigate the 'Bohlam' misclassification bucket directly — visualize which specific images get routed there to confirm the background/lighting-artifact hypothesis.",
      "Fine-tune the last few NASNetMobile layers (instead of keeping the whole base frozen) now that a working baseline exists, and compare against a from-scratch lightweight CNN as a sanity check.",
      "Package the model for on-device inference (TFLite) to validate the original mobile-deployment motivation for choosing NASNetMobile.",
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
  // PROJECT C — Duplicate Question Detection (Siamese BiLSTM)
  // =========================================================================
  {
    id: "siamese-bilstm-question-similarity",
    title: "Duplicate Question Detection (Siamese BiLSTM)",
    subtitle:
      "A Siamese BiLSTM network with attention and multi-distance fusion that flags duplicate question pairs, benchmarked against 7 other RNN architectures on 336K Quora question pairs.",
    category: "NLP",
    featured: true,

    thumbnail: "/projects/siamese-bilstm/model-comparison.png",
    coverImage: "/projects/siamese-bilstm/model-comparison.png",

    githubUrl: "#", // [PLACEHOLDER] Replace with your GitHub repo URL
    demoUrl: "#",
    datasetUrl: "https://www.kaggle.com/c/quora-question-pairs",

    techStack: ["Python", "TensorFlow", "Keras", "NLTK", "Pandas", "NumPy", "Scikit-learn"],

    keyMetrics: [
      { label: "Best F1-Score", value: "0.83", description: "Siamese BiLSTM + Attention + Multi-Fusion (proposed)" },
      { label: "Best ROC-AUC", value: "0.923", description: "Same proposed model" },
      { label: "Architectures Benchmarked", value: "8", description: "Attention + distance-fusion variants vs. plain RNN baselines" },
      { label: "Dataset", value: "336K pairs", description: "Quora Question Pairs, class-balanced via undersampling" },
    ],

    overview:
      "A duplicate-question detector for the Quora Question Pairs dataset: given two questions, predict whether they're semantically the same question asked differently. Built as a Siamese network (shared-weight twin encoders) so both questions are embedded into the same space and compared directly, then benchmarked across 8 different RNN encoder architectures to isolate what actually helps — attention, multi-distance fusion, or just a bigger recurrent layer.",

    role: "Solo project — data cleaning, Siamese architecture design (attention + multi-distance fusion), training/benchmarking 8 model variants, and evaluation.",

    problem:
      "Detecting whether two questions are duplicates matters wherever users can ask free-text questions — a Q&A platform, search, or support system — so that answers/threads can be merged instead of fragmenting the same question across dozens of near-identical duplicates. This is harder than plain text classification because it's a pairwise comparison: the model has to judge semantic equivalence between two independently-worded sentences, not classify one sentence in isolation.",

    dataset: {
      name: "Quora Question Pairs (QQP)",
      source: "Quora Question Pairs dataset (questions.csv)",
      size: "335,938 question pairs after class-balancing, split 268,750 / 33,594 / 33,594 for train/validation/test",
      description:
        "Pairs of questions from Quora labeled is_duplicate (1) or not (0). The majority (non-duplicate) class was undersampled to an ~80% ratio against the minority (duplicate) class before splitting, keeping a realistic-but-manageable imbalance rather than forcing an artificial 50/50 split.",
    },

    dataPreprocessing:
      "Each question was lowercased, stripped of URLs and punctuation, and tokenized (NLTK word_tokenize). The non-duplicate majority class was undersampled — to 186,632 non-duplicate against 149,306 duplicate pairs, an ~0.8 ratio — rather than oversampling the minority, to avoid training on synthetic/duplicated text pairs. Both questions were tokenized against a shared vocabulary (max 200K words) and padded/truncated to 70 tokens, since a Siamese encoder needs both branches operating in the same input space.",

    eda: "The core exploratory step was checking class balance: the raw dataset skewed toward non-duplicate pairs, so before modeling the majority class was deliberately undersampled to an ~80% ratio (149,306 duplicate vs. 186,632 non-duplicate) — a middle ground between a fully balanced 50/50 set (which would over-represent rare duplicate patterns) and the raw distribution (which risks a model that just predicts 'not duplicate').",

    featureEngineering:
      "The key representational choice was word embeddings rather than hand-built features: each question was mapped through a shared, frozen 300-dimensional Paragram embedding layer (a GloVe-style embedding trained specifically for paraphrase/similarity tasks). On top of the encoded question vectors, several fusion features were engineered explicitly — cosine distance, log-scaled Manhattan distance, and log-scaled Euclidean distance between the two question representations — rather than relying on the network to learn a notion of distance implicitly from concatenation alone.",

    modeling:
      "Eight architectures were benchmarked, all as Siamese networks (identical, weight-shared encoder branches for question 1 and question 2): four 'proposed' variants — BiLSTM+Attention+Multi-Fusion, GRU+Attention+Multi-Fusion, BiLSTM+Attention, and BiGRU+Attention — compared against four plain baselines (BiLSTM, LSTM, BiGRU, GRU) with no attention or distance-fusion features. All used the same frozen Paragram embeddings, a 256-unit recurrent layer, and the same dense classification head, isolating attention and multi-distance fusion as the variables under test rather than confounding them with other architecture changes. Training used Adam (lr=1e-4), early stopping (patience 3) and ReduceLROnPlateau on validation loss, capped at 100 epochs, across a 2-GPU distributed setup.",

    evaluation:
      "All 8 models were evaluated on the same held-out 33,594-pair test set using Accuracy, Precision, Recall, F1-Score, and ROC-AUC, with training/validation loss curves, confusion matrices, and ROC curves compared side by side across every architecture to see not just which model won, but where each one's errors concentrated.",

    results:
      "The proposed BiLSTM + Attention + Multi-Fusion model was the top performer (84.65% accuracy, 0.83 F1, 0.923 ROC-AUC), narrowly ahead of its GRU counterpart (84.33% accuracy, 0.829 F1, 0.923 ROC-AUC) — the two attention+fusion models were effectively tied and clearly ahead of the rest. Both attention-only variants (BiLSTM/BiGRU+Attention, no fusion) landed 2-3 F1 points below their fused counterparts, isolating multi-distance fusion — not just attention — as a real contributor. All four attention/fusion variants beat all four plain baselines, and among the baselines, bidirectional encoders (BiLSTM, BiGRU) beat their unidirectional counterparts (LSTM, GRU) — GRU alone was the weakest model overall (77.15% accuracy, 0.74 F1, 0.853 AUC).",

    modelComparison: [
      {
        model: "BiLSTM+Attn+Fusion (proposed)",
        metrics: [
          { label: "Accuracy", value: "0.85" },
          { label: "Precision", value: "0.81" },
          { label: "Recall", value: "0.86" },
          { label: "F1", value: "0.83" },
          { label: "ROC-AUC", value: "0.92" },
        ],
      },
      {
        model: "GRU+Attn+Fusion (proposed)",
        metrics: [
          { label: "Accuracy", value: "0.84" },
          { label: "Precision", value: "0.80" },
          { label: "Recall", value: "0.87" },
          { label: "F1", value: "0.83" },
          { label: "ROC-AUC", value: "0.92" },
        ],
      },
      {
        model: "BiGRU+Attention",
        metrics: [
          { label: "Accuracy", value: "0.82" },
          { label: "Precision", value: "0.78" },
          { label: "Recall", value: "0.84" },
          { label: "F1", value: "0.81" },
          { label: "ROC-AUC", value: "0.90" },
        ],
      },
      {
        model: "BiLSTM+Attention",
        metrics: [
          { label: "Accuracy", value: "0.81" },
          { label: "Precision", value: "0.76" },
          { label: "Recall", value: "0.84" },
          { label: "F1", value: "0.80" },
          { label: "ROC-AUC", value: "0.90" },
        ],
      },
      {
        model: "BiLSTM (plain)",
        metrics: [
          { label: "Accuracy", value: "0.82" },
          { label: "Precision", value: "0.78" },
          { label: "Recall", value: "0.82" },
          { label: "F1", value: "0.80" },
          { label: "ROC-AUC", value: "0.90" },
        ],
      },
      {
        model: "BiGRU (plain)",
        metrics: [
          { label: "Accuracy", value: "0.82" },
          { label: "Precision", value: "0.78" },
          { label: "Recall", value: "0.81" },
          { label: "F1", value: "0.80" },
          { label: "ROC-AUC", value: "0.90" },
        ],
      },
      {
        model: "LSTM (plain)",
        metrics: [
          { label: "Accuracy", value: "0.79" },
          { label: "Precision", value: "0.75" },
          { label: "Recall", value: "0.78" },
          { label: "F1", value: "0.77" },
          { label: "ROC-AUC", value: "0.87" },
        ],
      },
      {
        model: "GRU (plain)",
        metrics: [
          { label: "Accuracy", value: "0.77" },
          { label: "Precision", value: "0.74" },
          { label: "Recall", value: "0.74" },
          { label: "F1", value: "0.74" },
          { label: "ROC-AUC", value: "0.85" },
        ],
      },
    ],

    insights: [
      "Multi-distance fusion (cosine + Manhattan + Euclidean between the two question embeddings) mattered as much as attention itself — attention-only models (BiLSTM/BiGRU+Attention) trailed their fused counterparts by 2-3 F1 points despite sharing the same encoder and attention mechanism.",
      "Bidirectionality alone was a bigger lever than switching cell type: plain BiLSTM/BiGRU (no attention) both beat unidirectional LSTM/GRU by 3-5 accuracy points, roughly the same-sized gap that attention added on top.",
      "The GRU-based proposed model nearly matched the BiLSTM version (0.829 vs 0.831 F1) despite GRU's simpler gating — suggesting the attention+fusion design, not the specific recurrent cell, is what's actually doing the work.",
      "Every model's F1 sat notably below its accuracy, a reminder that even a deliberately 'only mildly imbalanced' ~55/45 split still makes accuracy a slightly optimistic headline number for a duplicate-detection use case.",
    ],

    limitations:
      "The dataset was rebalanced via undersampling rather than left at Quora's original distribution, so these numbers describe performance on an easier, more balanced problem than a production system would face with truly imbalanced live traffic. All embeddings were frozen (not fine-tuned), and no transformer-based encoder (e.g. BERT) was benchmarked, which would very likely outperform every RNN variant here on a semantic-matching task like this.",

    nextSteps: [
      "Benchmark a fine-tuned transformer encoder (e.g. a BERT/DistilBERT-based Siamese or cross-encoder) as a modern baseline against the best RNN result here.",
      "Evaluate on the original, unbalanced class distribution to get an honest read on production-realistic performance, not just the undersampled benchmark set.",
      "Unfreeze and fine-tune the embedding layer for the top model to see how much headroom is left versus static Paragram vectors.",
      "Add per-pair error analysis (which duplicate pairs get missed) rather than only aggregate metrics, to understand what kind of paraphrasing the model still struggles with.",
    ],

    images: [
      {
        src: "/projects/siamese-bilstm/model-comparison.png",
        alt: "Model Performance Comparison",
        caption: "Accuracy, Precision, Recall, and F1 across all 8 Siamese RNN architectures",
      },
      {
        src: "/projects/siamese-bilstm/roc-curves.png",
        alt: "ROC Curves",
        caption: "ROC curves and AUC for all 8 models — the proposed BiLSTM+Attention+Fusion model leads at AUC=0.923",
      },
      {
        src: "/projects/siamese-bilstm/confusion-matrices.png",
        alt: "Confusion Matrices",
        caption: "Confusion matrices on the 33,594-pair held-out test set for all 8 models",
      },
    ],
  },

  // =========================================================================
  // PROJECT D — Bank Customer Churn Prediction
  // =========================================================================
  {
    id: "bank-churn-prediction",
    title: "Bank Customer Churn Prediction",
    subtitle:
      "A binary classification model that flags credit-card customers likely to churn, benchmarking 7 algorithms on 10K+ customer records to help a bank prioritize retention outreach.",
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
      "A churn-prediction model for a bank's credit-card customers: given demographic, account, and transaction-behavior features, predict which customers are likely to close their account (attrite) so retention teams can act before it happens. Seven classifiers were benchmarked head-to-head rather than committing to one algorithm upfront.",

    role: "Solo project — EDA, preprocessing pipeline, benchmarking 7 classification models, and evaluation.",

    problem:
      "Losing a credit-card customer is expensive — acquiring a replacement costs a bank far more than retaining an existing one — but by the time a customer actually closes their account, it's too late to intervene. A model that flags at-risk customers in advance lets a retention team prioritize outreach (calls, offers) at the customers most likely to leave, instead of reacting after the fact.",

    dataset: {
      name: "BankChurners (Credit Card Customers)",
      source: "Bank credit-card customer dataset (BankChurners.csv)",
      size: "10,127 customers, 20 features after dropping ID and two auxiliary columns",
      description:
        "Demographic (age, gender, education, income, marital status), account (card category, months on book, relationship count), and behavioral/transactional features (credit limit, revolving balance, transaction amount/count, utilization ratio) for a bank's credit-card customers, labeled Existing vs. Attrited Customer.",
    },

    dataPreprocessing:
      "The target (Attrition_Flag) was mapped to a binary 0/1 label. Categorical features were encoded two different ways depending on their nature: nominal columns (Gender, Marital_Status) via one-hot encoding, and ordinal columns (Education_Level, Income_Category, Card_Category) via explicit ordered integer mappings — e.g. Uneducated < High School < ... < Doctorate — rather than one-hot, to preserve their natural ordering. Numerical features were standardized (StandardScaler) after an 80/20 stratified train/test split, fit only on the training set to avoid leakage.",

    eda: "Only about 16% of the 10,127 customers churned (1,627 'Attrited'), an imbalanced target that makes plain accuracy a misleading headline metric — a model that always predicts 'stays' would already score ~84%. Numerical distributions were checked with histograms/KDE and boxplots (including split by churn label), categorical features were profiled against churn rate, and a correlation heatmap flagged strong multicollinearity — Credit_Limit and Avg_Open_To_Buy are correlated at r=1.00 (one is almost algebraically derived from the other), and Total_Trans_Amt/Total_Trans_Ct at r=0.81.",

    featureEngineering:
      "Beyond the ordinal-vs-nominal encoding split, no additional derived features were engineered — the focus was on correctly representing existing categorical structure rather than creating new variables, then letting tree-based models (which handle correlated/redundant features gracefully) absorb the multicollinearity flagged in EDA.",

    modeling:
      "Seven classifiers were benchmarked on identical train/test splits: KNN, Decision Tree, Random Forest, SVM, Logistic Regression, XGBoost, and CatBoost — several using class_weight='balanced' or the boosting libraries' native imbalance handling to counter the ~5:1 class imbalance. Benchmarking broadly first (rather than committing to one algorithm upfront) was deliberate, since tree ensembles, distance-based, and linear models tend to respond very differently to imbalanced, mixed-type tabular data.",

    evaluation:
      "All 7 models were evaluated on the same held-out 20% stratified test set (2,026 customers) using Accuracy, Precision, Recall, F1-Score, and ROC-AUC — with F1 and ROC-AUC weighted more heavily than accuracy given the class imbalance. Confusion matrices and precision-recall curves (more informative than ROC curves under imbalance) were compared side by side across all 7 models.",

    results:
      "XGBoost and CatBoost were the clear top performers, both reaching ~98% accuracy and ~0.92-0.93 F1 on the attrited-customer class, with ROC-AUC ≈ 1.00 and Average Precision of 0.976 and 0.979 respectively on the precision-recall curve. XGBoost's confusion matrix on the 2,026-customer test set: 1,681 correctly-kept customers, 298 correctly-flagged churners, only 20 false alarms and 27 missed churners. Random Forest was a strong third (96% accuracy, 0.86 F1). Logistic Regression and Decision Tree were the weakest, both around 0.66–0.82 F1.",

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
      "Tree-based boosting (XGBoost, CatBoost) dominated across every metric, not just accuracy — both held F1 ≈ 0.92–0.93 and Average Precision ≈ 0.98 on the minority churn class, comfortably ahead of Random Forest in third.",
      "Accuracy alone would have been misleading: Decision Tree (94% accuracy) looked competitive with Random Forest (96%) on accuracy but had far worse F1 (0.82 vs 0.86) and Average Precision (0.696 vs 0.944) on the class that actually matters for a retention use case.",
      "Logistic Regression's precision/recall split (0.53 precision, 0.88 recall) shows a linear model can still catch most churners, but at the cost of flagging nearly as many false alarms as true ones — likely too noisy to act on directly.",
      "Credit_Limit and Avg_Open_To_Buy were found to be almost perfectly correlated (r=1.00) during EDA; tree-based models handled this redundancy natively, but it's a candidate for removal if a simpler/linear model were deployed instead.",
    ],

    limitations:
      "The dataset is a static historical snapshot with no time-series history of behavior leading up to churn, so a real deployment would need periodic retraining as customer behavior shifts. No hyperparameter tuning was performed on the top models — XGBoost and CatBoost ran near-default — and there's no per-prediction explanation (e.g. SHAP), which a retention team would need to know *why* a customer was flagged, not just that they were.",

    nextSteps: [
      "Hyperparameter-tune XGBoost/CatBoost (e.g. via Optuna) to see how much headroom remains above these near-default results.",
      "Add SHAP or feature-importance explanations per prediction, since a retention team needs a reason to act on a flagged customer, not just a probability.",
      "Tune the decision threshold on the precision-recall curve instead of the default 0.5 cutoff, since the business cost of a missed churner vs. a false alarm are unlikely to be equal.",
      "Validate against a more recent slice of customers, since a static historical snapshot doesn't capture behavior drift.",
    ],

    images: [
      {
        src: "/projects/bank-churn/eda-correlation.png",
        alt: "Correlation Matrix",
        caption: "Correlation heatmap of numerical features — flags near-perfect multicollinearity between Credit_Limit and Avg_Open_To_Buy",
      },
      {
        src: "/projects/bank-churn/model-comparison.png",
        alt: "Model Performance Comparison",
        caption: "Accuracy, Precision, Recall, F1, and ROC-AUC across all 7 benchmarked models",
      },
      {
        src: "/projects/bank-churn/confusion-matrices.png",
        alt: "Confusion Matrix Comparison",
        caption: "Confusion matrices for all 7 models on the 2,026-customer held-out test set",
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
      "A supervised classification model predicting diabetes risk from routine health measurements, benchmarking 7 algorithms with hyperparameter tuning and cross-validation on the Pima Indians Diabetes dataset.",
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
      "A diabetes-risk classifier built on the Pima Indians Diabetes dataset: given routine health measurements (glucose, BMI, blood pressure, age, etc.), predict whether a patient is likely diabetic. Seven classifiers were tuned via GridSearchCV and evaluated with both cross-validation and a held-out test set, deliberately comparing the two rather than reporting only the more flattering number.",

    role: "Solo project — EDA, data cleaning, class-imbalance handling (SMOTETomek), hyperparameter tuning, cross-validation, and evaluation across 7 classifiers.",

    problem:
      "Diabetes often goes undiagnosed until complications appear, and screening every patient with the same intensity isn't practical. A model that flags at-risk patients from measurements already taken during routine checkups — glucose, BMI, blood pressure, age — could help prioritize who gets follow-up testing first, rather than treating every patient as equal risk.",

    dataset: {
      name: "Pima Indians Diabetes Database",
      source: "Kaggle (uciml/pima-indians-diabetes-database)",
      size: "768 patients, 8 health features + binary Outcome; reduced to 392 after removing biologically-invalid zero values",
      description:
        "Health measurements for female patients of Pima Indian heritage — Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, BMI, DiabetesPedigreeFunction, and Age — labeled with a binary diabetes Outcome.",
    },

    dataPreprocessing:
      "Several features (Glucose, BloodPressure, SkinThickness, Insulin, BMI) used 0 as a placeholder for missing measurements rather than an actual physiological zero — Insulin alone had 374 zero entries (nearly half the dataset) and SkinThickness had 227. Rather than imputing these, rows containing them were dropped outright, shrinking the dataset from 768 to 392 patients — a real trade-off between data cleanliness and sample size. The cleaned data was split 80/20 (stratified), scaled with RobustScaler (chosen over StandardScaler for its robustness to the outliers still present after cleaning), and class-balanced on the training set only via SMOTETomek (combined SMOTE oversampling + Tomek-link undersampling), to avoid leaking synthetic samples into the test set.",

    eda: "The raw data was imbalanced (500 non-diabetic vs. 268 diabetic before cleaning; 262 vs. 130 after) and several features had outliers — Insulin in particular was heavily right-skewed. A correlation matrix (post-cleaning) showed Glucose as the strongest single predictor of Outcome (r=0.52), followed by Age (0.35), BMI (0.27), and Pregnancies (0.26); BloodPressure and SkinThickness correlated most weakly with the target.",

    featureEngineering:
      "No new features were derived; the main decisions were what to do with the invalid zeros (drop vs. impute), how to scale (RobustScaler, given the outliers found in EDA), and how to rebalance (SMOTETomek on the training fold only).",

    modeling:
      "Seven classifiers were trained — KNN, Naive Bayes, Decision Tree, Random Forest, XGBoost, SVM, and Logistic Regression — each hyperparameter-tuned via GridSearchCV, chosen specifically because the small, post-cleaning dataset made an exhaustive grid search cheap enough to be practical. Each was then evaluated with 5-fold stratified cross-validation before a final check on the untouched test set.",

    evaluation:
      "Every model was scored on Accuracy, Precision, Recall, and F1 two ways: 5-fold stratified cross-validation (on the SMOTETomek-balanced training data) and a final run on the untouched, imbalanced test set — deliberately comparing both so the gap between them could be examined rather than only reporting the more flattering CV numbers.",

    results:
      "On the held-out test set, XGBoost was the strongest model (82.3% accuracy, 0.68 precision, 0.88 recall, 0.77 F1), with Logistic Regression (81.0% accuracy, 0.75 F1) and Naive Bayes (79.8% accuracy, 0.73 F1) close behind. Decision Tree was the weakest (67.1% accuracy, 0.57 F1). Notably, every model scored lower on the test set than in cross-validation (e.g. XGBoost: 84.5% CV accuracy vs. 82.3% test) — a gap attributed to some combination of mild overfitting to the training fold, the small test set (79 patients) making metrics more variable, and GridSearchCV's tuning being scoped only to the training data.",

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
      "XGBoost led on the test set (82.3% accuracy, 0.77 F1), but Naive Bayes and Logistic Regression — much simpler models — landed within a few points of it, suggesting this dataset's signal is largely simple rather than needing a complex ensemble.",
      "Every single model scored lower on the test set than in cross-validation (e.g. XGBoost dropped from 84.5% CV to 82.3% test) — a consistent gap across all 7 models, worth treating as a sign these numbers are somewhat optimistic rather than model-specific noise.",
      "Removing biologically-impossible zero values (0 blood pressure, 0 BMI, etc.) cut the dataset nearly in half (768 → 392) — a real cost of prioritizing data quality over data quantity that likely contributes to the CV/test gap given how few patients are left in each split.",
      "Glucose was by far the strongest single correlate of diabetes outcome (r=0.52) — well ahead of Age, BMI, and Pregnancies — consistent with it being the most direct physiological marker among the available features.",
    ],

    limitations:
      "The ~392-patient dataset (after cleaning) is small, and the 79-patient test set makes evaluation metrics fairly sensitive to which patients happen to land in the split — every model scored lower on the test set than in cross-validation, likely from some combination of mild overfitting to the training fold, limited data at both tuning and test time, and GridSearchCV's tuning being scoped to the training data only. The dataset is also specific to female patients of Pima Indian heritage, so it wouldn't generalize as-is to a broader population.",

    nextSteps: [
      "Repeat evaluation with nested cross-validation (rather than a single train/test split) for a less split-sensitive estimate of true generalization performance.",
      "Try imputing the invalid zero values (e.g. median-by-outcome-group) instead of dropping rows outright, to see whether keeping the extra ~376 patients outweighs the noise they'd introduce.",
      "Add model-explanation tooling (SHAP or permutation importance) so a clinician-facing tool could show which factors drove an individual risk prediction, not just the prediction itself.",
      "Validate against a more diverse population sample, since the source dataset is limited to one specific demographic group.",
    ],

    images: [
      {
        src: "/projects/diabetes-prediction/correlation.png",
        alt: "Correlation Matrix",
        caption: "Correlation matrix of health features and Outcome after cleaning — Glucose is the strongest single predictor (r=0.52)",
      },
      {
        src: "/projects/diabetes-prediction/cv-results.png",
        alt: "Cross-Validation Results",
        caption: "5-fold stratified cross-validation results across all 7 models",
      },
      {
        src: "/projects/diabetes-prediction/test-results.png",
        alt: "Test Set Results",
        caption: "Final held-out test-set results — XGBoost leads at 82.3% accuracy / 0.77 F1",
      },
    ],
  },

  // =========================================================================
  // PROJECT F — Superstore Market Basket & Customer Segmentation
  // =========================================================================
  {
    id: "superstore-market-basket-analysis",
    title: "Superstore Market Basket & Customer Segmentation",
    subtitle:
      "Association rule mining (Apriori & FP-Growth) uncovering product cross-sell patterns, paired with clustering-based customer and discount-sensitivity segmentation, on 9,994 Superstore transactions.",
    category: "Association Rule Mining",
    featured: true,

    thumbnail: "/projects/superstore-market-basket/discount-clusters.png",
    coverImage: "/projects/superstore-market-basket/discount-clusters.png",

    githubUrl: "#", // [PLACEHOLDER] Replace with your GitHub repo URL
    demoUrl: "#",
    datasetUrl: "https://www.kaggle.com/datasets/vivek468/superstore-dataset-final",

    techStack: ["Python", "Pandas", "Scikit-learn", "Mlxtend", "NumPy", "Matplotlib", "Seaborn"],

    keyMetrics: [
      { label: "Top Rule Confidence", value: "80%", description: "Chairs + Copiers → Paper" },
      { label: "Top Rule Lift", value: "4.31×", description: "Appliances + Tables + Furnishings → Phones" },
      { label: "Best Clustering Fit", value: "0.508 silhouette", description: "5-cluster discount-sensitivity segmentation" },
      { label: "Transactions Mined", value: "5,007 orders", description: "9,994 line items, 17 product sub-categories" },
    ],

    overview:
      "A two-pronged data-mining pass over a retail Superstore's transaction history: association rule mining (Apriori and FP-Growth) to find which product sub-categories get bought together, and clustering (DBSCAN and KMeans) to segment customers and orders by behavior — specifically, by how sensitive their profit is to discounting.",

    role: "Solo project — EDA, customer/order-level feature aggregation, clustering (DBSCAN/KMeans), and association rule mining (Apriori/FP-Growth).",

    problem:
      "A retailer with thousands of SKUs can't manually spot which products tend to sell together, or which customers/orders are quietly unprofitable. Two concrete decisions this data should inform: what to bundle or cross-recommend at checkout (association rules), and which customers or discount patterns are actually costing the business money rather than earning it (segmentation) — since not all 'high-discount' sales are equally bad, and not all 'high-sales' customers are equally profitable.",

    dataset: {
      name: "Superstore Dataset (Kaggle)",
      source: "Kaggle (vivek468/superstore-dataset-final)",
      size: "9,994 order line items across 5,007 unique orders, 793 customers, 1,862 products, 17 sub-categories",
      description:
        "US retail transactions (2014–2017) with order/ship dates, customer and geographic info, product category/sub-category, sales, quantity, discount, and profit per line item.",
    },

    dataPreprocessing:
      "Duplicate rows were checked (8 orders had more than one line for the same Order ID + Product ID + Order Date, kept as legitimate repeat purchases rather than true duplicates), the Row ID column was dropped, and Order Date was converted to a proper datetime type. For clustering, line items were aggregated up to two different grains: per-customer (summed Sales/Quantity/Profit, mean Discount, count of orders) for behavior segmentation, and per-order (summed Sales/Quantity/Profit, mean Discount) for discount-sensitivity segmentation — then standardized (StandardScaler) before clustering. For association rule mining, line items were grouped by Order ID into a list of unique Sub-Categories per order (a 'shopping basket'), then one-hot encoded into a transaction matrix.",

    eda: "A correlation matrix showed Sales positively correlated with Profit (r=0.48, unsurprising — bigger orders tend to earn more) but Discount negatively correlated with Profit (r=-0.22): the more a line item was discounted, the less profitable it tended to be. That single correlation is what motivated segmenting orders specifically by discount sensitivity rather than only by raw sales volume.",

    featureEngineering:
      "For clustering, no features were engineered beyond the two aggregation levels described above (customer-level vs. order-level) — the goal was choosing the right grain of analysis, not deriving new variables. For association rule mining, the key transformation was reframing tabular line-item data as market-basket transactions: each order became a 'basket' of unique Sub-Categories, one-hot encoded into the binary transaction matrix that Apriori/FP-Growth require.",

    modeling:
      "Two clustering passes were run — customer-behavior (KMeans, k=4, chosen via inspection) and discount-sensitivity (KMeans, k=5) — each also checked against DBSCAN as a density-based alternative that doesn't require pre-specifying a cluster count. For market-basket analysis, both Apriori and FP-Growth were run on the same Sub-Category transaction matrix (min_support=0.001), with rules filtered to confidence ≥ 0.7 — running both algorithms side by side as a sanity check, since they're guaranteed to surface the same valid rules from the same data, just via different search strategies.",

    evaluation:
      "Clustering quality was checked via silhouette score for both KMeans runs. Association rules were evaluated on support (how common the pattern is), confidence (how reliable the 'then' follows from the 'if'), and lift (how much more likely the consequent is given the antecedent, versus chance) — with confidence ≥ 0.7 as the inclusion bar and lift used to separate genuinely interesting associations from merely frequent ones.",

    results:
      "Customer-behavior clustering (silhouette 0.272) split customers into 4 groups, from a large low-spend segment (~$1,868 avg sales, ~$336 avg profit) up to a small high-value segment (~$9,294 avg sales, ~$2,158 avg profit). Discount-sensitivity clustering (silhouette 0.508 — a much cleaner separation) was more revealing: one cluster of large, lightly-discounted orders (~3% avg discount) averaged ~$3,574 profit, while a cluster of small orders with the heaviest average discount (58%) had negative average profit (-$173) — the clearest possible confirmation that heavy discounting, not order size, is what erodes profit. Apriori and FP-Growth converged on the identical 11 rules, topped by {Chairs, Copiers} → {Paper} (confidence 80%, lift 3.37) and, by lift, {Appliances, Tables, Furnishings} → {Phones} (confidence 70%, lift 4.31) — the strongest non-random association in the dataset despite a lower confidence score.",

    modelComparisonTitle: "Top Association Rules",
    modelComparison: [
      {
        model: "Chairs, Copiers → Paper",
        metrics: [
          { label: "Support", value: "0.16%" },
          { label: "Confidence", value: "80%" },
          { label: "Lift", value: "3.37" },
        ],
      },
      {
        model: "Accessories, Furnishings, Tables → Paper",
        metrics: [
          { label: "Support", value: "0.14%" },
          { label: "Confidence", value: "77.8%" },
          { label: "Lift", value: "3.28" },
        ],
      },
      {
        model: "Accessories, Appliances, Chairs → Binders",
        metrics: [
          { label: "Support", value: "0.12%" },
          { label: "Confidence", value: "75%" },
          { label: "Lift", value: "2.86" },
        ],
      },
      {
        model: "Appliances, Tables, Furnishings → Phones",
        metrics: [
          { label: "Support", value: "0.14%" },
          { label: "Confidence", value: "70%" },
          { label: "Lift", value: "4.31" },
        ],
      },
      {
        model: "Appliances, Phones, Tables → Furnishings",
        metrics: [
          { label: "Support", value: "0.14%" },
          { label: "Confidence", value: "70%" },
          { label: "Lift", value: "4.00" },
        ],
      },
    ],

    insights: [
      "Discount sensitivity, not order size, drives unprofitability: the discount-sensitivity clustering (silhouette 0.508) cleanly isolated one segment averaging 58% discount with negative mean profit — no other cluster came close to losing money, regardless of sales volume.",
      "Apriori and FP-Growth returned exactly the same 11 rules from the same data, as they should — useful as a built-in correctness check on the mining pipeline rather than two independent 'opinions'.",
      "Basic office supplies (Paper, Binders) showed up as the consequent in nearly every high-confidence rule — they're the 'goes with everything' staple items, which matters more for checkout cross-sell prompts than for deep product-affinity insight.",
      "The highest-lift rule (Appliances+Tables+Furnishings → Phones, lift 4.31) had lower confidence (70%) than the top-confidence rule (80%) — a reminder that confidence and lift answer different questions, and ranking by confidence alone would have missed the most statistically surprising association.",
    ],

    limitations:
      "Sub-Category (17 values) was used as the itemset instead of individual products (1,862 SKUs) specifically to keep support counts meaningful — this means the rules describe cross-category patterns ('Chairs+Copiers buyers also buy Paper') rather than specific product-level recommendations. Cluster counts (k=4, k=5) were chosen by inspection rather than a systematic method (e.g. elbow/silhouette sweep across a range of k), and DBSCAN's eps/min_samples were left at defaults rather than tuned per dataset.",

    nextSteps: [
      "Sweep k systematically (elbow method + silhouette across a range) instead of fixing k=4/k=5 by inspection, and tune DBSCAN's eps/min_samples per clustering task.",
      "Re-run association rule mining at the Product Name level within high-volume sub-categories, now that Sub-Category-level patterns show which categories are worth that finer-grained look.",
      "Turn the discount-sensitivity segments into an actual discounting policy recommendation (e.g. a max-discount guardrail for the loss-making cluster's order profile) rather than a descriptive segmentation alone.",
      "Validate whether the discovered rules and segments hold up on more recent transactions, since the dataset spans 2014–2017.",
    ],

    images: [
      {
        src: "/projects/superstore-market-basket/correlation.png",
        alt: "Correlation Matrix",
        caption: "Correlation matrix of Sales, Quantity, Discount, and Profit — Discount correlates negatively with Profit (r=-0.22)",
      },
      {
        src: "/projects/superstore-market-basket/customer-clusters.png",
        alt: "Customer Behavior Clusters",
        caption: "KMeans customer-behavior clusters (k=4) with cluster centers, Sales vs. Profit",
      },
      {
        src: "/projects/superstore-market-basket/discount-clusters.png",
        alt: "Discount Sensitivity Clusters",
        caption: "KMeans discount-sensitivity clusters (k=5, silhouette 0.508) — profit collapses as discount rises",
      },
    ],
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

];

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.id);
}

/** Previous/next project relative to `id`, wrapping around at the ends. */
export function getAdjacentProjects(id: string): {
  prev: Project | null;
  next: Project | null;
} {
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return { prev: null, next: null };

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return { prev, next };
}
