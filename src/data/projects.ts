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

export interface Project {
  // Routing & identity
  id: string; // Used as URL slug: /projects/[id]
  title: string;
  subtitle: string; // Short 1-2 line description for the card / hero
  category: string; // e.g. "Time-Series Forecasting"
  featured: boolean; // Show on homepage?

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

  // Storytelling sections (detail page) — Problem → Data → Approach → Model → Results → Insights
  overview: string; // What the project is, why it was created
  role: string; // My role / contribution
  problem: string; // The real-world problem and why it matters
  dataset: DatasetInfo; // Data source
  dataPreprocessing: string; // Cleaning / preprocessing steps
  eda: string;
  featureEngineering: string;
  modeling: string; // Model/algorithm choice + training process
  evaluation: string; // Evaluation methodology
  results: string;
  modelComparison?: ModelComparisonEntry[]; // Optional — only when multiple models were benchmarked
  insights: string[]; // 2–4 findings, explaining what the results mean

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
  // PROJECT B — Placeholder
  // =========================================================================
  {
    id: "project-b",
    title: "[PLACEHOLDER] Project B Title",
    subtitle:
      "[PLACEHOLDER] Brief description of Project B — replace with your actual project summary.",
    category: "[PLACEHOLDER] Category",
    featured: true,

    thumbnail: "",
    coverImage: "",

    githubUrl: "#",
    demoUrl: "#",
    datasetUrl: "#",

    techStack: ["[PLACEHOLDER]", "[PLACEHOLDER]", "[PLACEHOLDER]"],

    keyMetrics: [
      { label: "[METRIC]", value: "[PLACEHOLDER]", description: "[PLACEHOLDER] description" },
      { label: "[METRIC]", value: "[PLACEHOLDER]", description: "[PLACEHOLDER] description" },
    ],

    overview: "[PLACEHOLDER] Brief explanation of the project and why it was created.",
    role: "[PLACEHOLDER] Your role and contribution on this project.",
    problem: "[PLACEHOLDER] Describe the real-world problem this project addresses and why it matters.",

    dataset: {
      name: "[PLACEHOLDER] Dataset Name",
      source: "[PLACEHOLDER] Data source URL or description",
      size: "[PLACEHOLDER] e.g., 50K rows, 25 features",
      description: "[PLACEHOLDER] Describe the raw dataset and its features.",
    },
    dataPreprocessing: "[PLACEHOLDER] Describe data cleaning and preprocessing steps.",

    eda: "[PLACEHOLDER] Summarize key findings from exploratory data analysis.",
    featureEngineering: "[PLACEHOLDER] Describe feature engineering steps and rationale.",
    modeling: "[PLACEHOLDER] Explain model/algorithm selection and the training process.",
    evaluation: "[PLACEHOLDER] Detail evaluation methodology, metrics used, and validation strategy.",
    results: "[PLACEHOLDER] Present key results with specific numbers and comparisons.",

    insights: [
      "[PLACEHOLDER] Key insight 1",
      "[PLACEHOLDER] Key insight 2",
      "[PLACEHOLDER] Key insight 3",
    ],

    images: [
      { src: "", alt: "EDA Visualization", caption: "[PLACEHOLDER] EDA chart description" },
      { src: "", alt: "Evaluation Chart", caption: "[PLACEHOLDER] Evaluation metrics visualization" },
      { src: "", alt: "Results Chart", caption: "[PLACEHOLDER] Key results visualization" },
    ],
  },

  // =========================================================================
  // PROJECT C — Placeholder
  // =========================================================================
  {
    id: "project-c",
    title: "[PLACEHOLDER] Project C Title",
    subtitle:
      "[PLACEHOLDER] Brief description of Project C — replace with your actual project summary.",
    category: "[PLACEHOLDER] Category",
    featured: true,

    thumbnail: "",
    coverImage: "",

    githubUrl: "#",
    demoUrl: "#",
    datasetUrl: "#",

    techStack: ["[PLACEHOLDER]", "[PLACEHOLDER]", "[PLACEHOLDER]"],

    keyMetrics: [
      { label: "[METRIC]", value: "[PLACEHOLDER]", description: "[PLACEHOLDER] description" },
      { label: "[METRIC]", value: "[PLACEHOLDER]", description: "[PLACEHOLDER] description" },
    ],

    overview: "[PLACEHOLDER] Brief explanation of the project and why it was created.",
    role: "[PLACEHOLDER] Your role and contribution on this project.",
    problem: "[PLACEHOLDER] Describe the real-world problem this project addresses and why it matters.",

    dataset: {
      name: "[PLACEHOLDER] Dataset Name",
      source: "[PLACEHOLDER] Data source URL or description",
      size: "[PLACEHOLDER] e.g., 100K rows, 40 features",
      description: "[PLACEHOLDER] Describe the raw dataset and its features.",
    },
    dataPreprocessing: "[PLACEHOLDER] Describe data cleaning and preprocessing steps.",

    eda: "[PLACEHOLDER] Summarize key findings from exploratory data analysis.",
    featureEngineering: "[PLACEHOLDER] Describe feature engineering steps and rationale.",
    modeling: "[PLACEHOLDER] Explain model/algorithm selection and the training process.",
    evaluation: "[PLACEHOLDER] Detail evaluation methodology, metrics used, and validation strategy.",
    results: "[PLACEHOLDER] Present key results with specific numbers and comparisons.",

    insights: [
      "[PLACEHOLDER] Key insight 1",
      "[PLACEHOLDER] Key insight 2",
      "[PLACEHOLDER] Key insight 3",
    ],

    images: [
      { src: "", alt: "EDA Visualization", caption: "[PLACEHOLDER] EDA chart description" },
      { src: "", alt: "Evaluation Chart", caption: "[PLACEHOLDER] Evaluation metrics visualization" },
      { src: "", alt: "Results Chart", caption: "[PLACEHOLDER] Key results visualization" },
    ],
  },

  // =========================================================================
  // PROJECT D — Placeholder
  // =========================================================================
  {
    id: "project-d",
    title: "[PLACEHOLDER] Project D Title",
    subtitle:
      "[PLACEHOLDER] Brief description of Project D — replace with your actual project summary.",
    category: "[PLACEHOLDER] Category",
    featured: true,

    thumbnail: "",
    coverImage: "",

    githubUrl: "#",
    demoUrl: "#",
    datasetUrl: "#",

    techStack: ["[PLACEHOLDER]", "[PLACEHOLDER]", "[PLACEHOLDER]"],

    keyMetrics: [
      { label: "[METRIC]", value: "[PLACEHOLDER]", description: "[PLACEHOLDER] description" },
      { label: "[METRIC]", value: "[PLACEHOLDER]", description: "[PLACEHOLDER] description" },
    ],

    overview: "[PLACEHOLDER] Brief explanation of the project and why it was created.",
    role: "[PLACEHOLDER] Your role and contribution on this project.",
    problem: "[PLACEHOLDER] Describe the real-world problem this project addresses and why it matters.",

    dataset: {
      name: "[PLACEHOLDER] Dataset Name",
      source: "[PLACEHOLDER] Data source URL or description",
      size: "[PLACEHOLDER] e.g., 75K rows, 30 features",
      description: "[PLACEHOLDER] Describe the raw dataset and its features.",
    },
    dataPreprocessing: "[PLACEHOLDER] Describe data cleaning and preprocessing steps.",

    eda: "[PLACEHOLDER] Summarize key findings from exploratory data analysis.",
    featureEngineering: "[PLACEHOLDER] Describe feature engineering steps and rationale.",
    modeling: "[PLACEHOLDER] Explain model/algorithm selection and the training process.",
    evaluation: "[PLACEHOLDER] Detail evaluation methodology, metrics used, and validation strategy.",
    results: "[PLACEHOLDER] Present key results with specific numbers and comparisons.",

    insights: [
      "[PLACEHOLDER] Key insight 1",
      "[PLACEHOLDER] Key insight 2",
      "[PLACEHOLDER] Key insight 3",
    ],

    images: [
      { src: "", alt: "EDA Visualization", caption: "[PLACEHOLDER] EDA chart description" },
      { src: "", alt: "Evaluation Chart", caption: "[PLACEHOLDER] Evaluation metrics visualization" },
      { src: "", alt: "Results Chart", caption: "[PLACEHOLDER] Key results visualization" },
    ],
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
