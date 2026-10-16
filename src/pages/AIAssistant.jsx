
import { useState } from "react";

import {
  ArrowDownToLine,
  ArrowRight,
  Bot,
  Check,
  ChevronDown,
  Clipboard,
  FileCheck2,
  FileText,
  FileType2,
  LoaderCircle,
  MessageSquareText,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Upload,
  X,
} from "lucide-react";

import "../App.css";

// =========================================
// TASK CONFIGURATION
// =========================================

const TASKS = [
  {
    id: "report",
    label: "Draft a report",
    description: "Create a structured report from your notes.",
    icon: FileText,
    placeholder:
      "Describe the report you need, its purpose, audience, and important sections...",
  },
  {
    id: "memo",
    label: "Draft a memo",
    description: "Prepare a formal memorandum.",
    icon: MessageSquareText,
    placeholder:
      "Describe the memo's purpose, recipient, subject, and key points...",
  },
  {
    id: "summarise",
    label: "Summarise a document",
    description: "Extract key points, decisions, and actions.",
    icon: FileCheck2,
    placeholder:
      "Summarise the main points, decisions, deadlines, and action items.",
  },
  {
    id: "reformat",
    label: "Reformat document",
    description: "Rewrite or structure content for another format.",
    icon: FileType2,
    placeholder:
      "Describe the desired format, such as a formal letter, structured report, or bullet-point brief...",
  },
];

const OUTPUT_FORMATS = [
  { value: "formal", label: "Formal document" },
  { value: "structured", label: "Structured report" },
  { value: "bullets", label: "Bullet points" },
  { value: "brief", label: "Executive brief" },
];

// =========================================
// FICTIONAL DEMONSTRATION DATA
// =========================================

const DEMO_SOURCE = `TRANSPORT PLANNING & COORDINATION
DEMONSTRATION RECORD — FICTIONAL DATA

Subject: Quarterly Transport Planning Coordination Review

Reference: DEMO/TPC/2026/001
Reporting period: July–September 2026

Background:
The department held coordination meetings with fictional transport
planning teams to review project documentation, reporting timelines,
and interdepartmental communication.

Key observations:
1. Some project reports were submitted after the agreed deadline.
2. Several records require clearer reference numbers and subject titles.
3. Officers requested a central register to make file tracking easier.
4. Teams recommended monthly progress reviews.

Proposed actions:
- Standardise file reference and subject naming.
- Maintain an updated register of incoming and outgoing records.
- Review outstanding reports at monthly coordination meetings.
- Assign responsible officers and target dates to pending actions.

Prepared for demonstration purposes only.
This sample contains no verified Ministry information.`;

const DEMO_EXAMPLES = {
  report: {
    instructions:
      "Draft a formal quarterly coordination report from the sample notes. Include an executive summary, background, key findings, recommendations, and conclusion.",
    sourceText: DEMO_SOURCE,
    outputFormat: "structured",
  },

  memo: {
    instructions:
      "Draft a formal internal memorandum to the Head of TPC proposing monthly file-tracking reviews. Include the subject, purpose, background, recommendations, and next steps.",
    sourceText: DEMO_SOURCE,
    outputFormat: "formal",
  },

  summarise: {
    instructions:
      "Summarise the sample document into its main findings, proposed actions, and key takeaways.",
    sourceText: DEMO_SOURCE,
    outputFormat: "bullets",
  },

  reformat: {
    instructions:
      "Reformat the sample notes into a professional action-point brief with headings, action items, responsible officers, and target dates.",
    sourceText: DEMO_SOURCE,
    outputFormat: "structured",
  },
};

// =========================================
// MOCK OUTPUT GENERATOR
// =========================================

function buildMockOutput(task, instructions, sourceText, outputFormat) {
  const date = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const templates = {
    report: `QUARTERLY TRANSPORT COORDINATION REPORT

Reporting period: July–September 2026
Reference: DEMO/TPC/2026/001
Prepared: ${date}

1. EXECUTIVE SUMMARY

This demonstration report outlines sample observations relating to transport planning coordination, departmental records, reporting timelines, and file tracking.

2. BACKGROUND

The sample notes describe coordination activities intended to improve the management of project documentation and communication between planning teams.

3. KEY FINDINGS

• Some project reports were submitted after agreed deadlines.
• File references and subject descriptions require greater consistency.
• Officers identified a need for improved visibility of file movements.
• Monthly progress reviews were proposed to monitor outstanding actions.

4. RECOMMENDATIONS

• Standardise file reference and subject naming conventions.
• Maintain an up-to-date register of records and file movements.
• Conduct monthly reviews of outstanding reports and requests.
• Assign responsible officers and target dates to action items.

5. CONCLUSION

Consistent recordkeeping and regular progress reviews may improve document retrieval, accountability, and coordination. The recommendations should be assessed by the responsible officers before implementation.

Prepared for demonstration purposes only. All details are fictional and require verification.`,

    memo: `INTERNAL MEMORANDUM

To: Head, Transport Planning & Coordination
From: TPC Records Management Demonstration Team
Date: ${date}
Reference: DEMO/TPC/MEMO/001

SUBJECT: PROPOSED MONTHLY FILE-TRACKING REVIEWS

1. PURPOSE

This memorandum presents a proposal for monthly reviews of file tracking and outstanding departmental actions.

2. BACKGROUND

Sample coordination notes identify opportunities to improve file reference consistency, report submission timelines, and visibility of outstanding records.

3. PROPOSAL

It is proposed that the department consider:

• Reviewing outstanding file requests and reports monthly.
• Maintaining consistent file references and subject titles.
• Recording responsible officers and target dates for pending actions.
• Documenting review outcomes for follow-up.

4. RECOMMENDED NEXT STEPS

Subject to approval, the relevant officers could develop a simple review schedule and assess the proposed process.

5. APPROVAL

Submitted for consideration and direction.

Demonstration draft only. Names, references, and circumstances must be verified before official use.`,

    summarise: `DOCUMENT SUMMARY

Subject: Quarterly Transport Planning Coordination Review
Reference: DEMO/TPC/2026/001

OVERVIEW

The sample document identifies possible improvements in departmental recordkeeping, report submission, and coordination.

KEY FINDINGS

• Some reports may be submitted late.
• File references and subject titles need consistency.
• Better visibility of file tracking is requested.
• Monthly coordination reviews are proposed.

PROPOSED ACTIONS

1. Standardise file naming and references.
2. Keep the file register up to date.
3. Review outstanding reports monthly.
4. Assign responsible officers and target dates.

KEY TAKEAWAY

Consistent recordkeeping and structured follow-up may improve document retrieval and accountability.

This summary is based on fictional demonstration material.`,

    reformat: `TRANSPORT COORDINATION ACTION BRIEF

REFERENCE
DEMO/TPC/2026/001

OBJECTIVE

Improve the consistency of departmental recordkeeping and the tracking of outstanding actions.

ISSUES IDENTIFIED

• Delayed submission of some reports.
• Inconsistent file references and subject titles.
• Limited visibility of outstanding actions.

ACTION PLAN

ACTION 1: Standardise record references
Expected outcome: More consistent file identification.
Responsible officer: To be assigned.
Target date: To be agreed.

ACTION 2: Update the file register
Expected outcome: Improved visibility of file movements.
Responsible officer: To be assigned.
Target date: To be agreed.

ACTION 3: Introduce monthly progress reviews
Expected outcome: More structured follow-up of outstanding reports.
Responsible officer: To be assigned.
Target date: To be agreed.

REVIEW NOTE

All responsible officers, deadlines, and proposed actions require confirmation.

Prepared as a fictional demonstration example.`,
  };

  const titleMap = {
    report: "Quarterly Transport Coordination Report",
    memo: "Internal Memorandum — File Tracking Reviews",
    summarise: "Document Summary — Coordination Review",
    reformat: "Transport Coordination Action Brief",
  };

  const template = templates[task] || templates.report;

  // Provide a short excerpt to make it clear which source
  // was supplied to this mock demonstration.
  const sourceExcerpt =
    sourceText.length > 700
      ? `${sourceText.slice(0, 700)}\n\n[Excerpt shortened for display.]`
      : sourceText;

  let formattedOutput = template;

  if (outputFormat === "bullets" && task !== "summarise") {
    formattedOutput = `${titleMap[task]}\n\nKEY POINTS\n\n${template}`;
  }

  if (outputFormat === "brief") {
    formattedOutput = `EXECUTIVE BRIEF

SUBJECT: ${titleMap[task]}

PURPOSE
Provide a concise overview of the supplied demonstration material.

KEY CONSIDERATIONS
${template}

RECOMMENDED NEXT STEP
Review the proposed actions and confirm responsibilities and timelines before implementation.`;
  }

  if (outputFormat === "formal" && task === "report") {
    formattedOutput = `FORMAL REPORT

TITLE: ${titleMap[task]}
DATE: ${date}
REFERENCE: DEMO/TPC/2026/001

${template}`;
  }

  return `${formattedOutput}

────────────────────────────────

DEMONSTRATION DETAILS

Task: ${titleMap[task]}
Output format: ${outputFormat}
Instructions received: ${instructions}

Source excerpt:
${sourceExcerpt}

DEMO NOTICE
This output was generated from a predefined template. It is not a response from a real AI model and has not been verified for official use.`;
}

// =========================================
// MAIN COMPONENT
// =========================================

export default function AIAssistant() {
  const [task, setTask] = useState("report");
  const [instructions, setInstructions] = useState("");
  const [sourceText, setSourceText] = useState("");
  const [outputFormat, setOutputFormat] = useState("formal");
  const [output, setOutput] = useState("");
  const [outputTitle, setOutputTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState("");

  const selectedTask = TASKS.find((item) => item.id === task);

  // =========================================
  // TASK SELECTION
  // =========================================

  function handleTaskChange(nextTask) {
    setTask(nextTask);
    setError("");
    setOutput("");
    setOutputTitle("");
    setCopied(false);
  }

  // =========================================
  // LOAD DEMO
  // =========================================

  function handleLoadDemo() {
    const example = DEMO_EXAMPLES[task];

    setInstructions(example.instructions);
    setSourceText(example.sourceText);
    setOutputFormat(example.outputFormat);
    setFileName("TPC_Coordination_Demo.txt");
    setOutput("");
    setOutputTitle("");
    setError("");
    setCopied(false);
  }

  // =========================================
  // FILE UPLOAD
  // =========================================

  async function handleFileUpload(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    const extensionAllowed = /\.(txt|md|csv)$/i.test(file.name);

    if (!extensionAllowed) {
      setError(
        "For this demo, upload a TXT, Markdown, or CSV file. PDF and DOCX extraction are not implemented."
      );

      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("The file must be smaller than 2 MB.");
      event.target.value = "";
      return;
    }

    try {
      const text = await file.text();

      setSourceText(text);
      setFileName(file.name);
      setError("");
      setOutput("");
      setOutputTitle("");
    } catch {
      setError("Could not read this file. Please try another file.");
    }

    event.target.value = "";
  }

  // =========================================
  // GENERATE MOCK DRAFT
  // =========================================

  async function handleGenerate() {
    if (loading) return;

    if (!instructions.trim()) {
      setError("Enter instructions or click Load demo first.");
      return;
    }

    if (
      ["summarise", "reformat"].includes(task) &&
      !sourceText.trim()
    ) {
      setError("Provide source text or click Load demo first.");
      return;
    }

    setLoading(true);
    setError("");
    setCopied(false);
    setOutput("");
    setOutputTitle("");

    try {
      // Simulate processing for the demonstration UI.
      await new Promise((resolve) => window.setTimeout(resolve, 900));

      const generatedText = buildMockOutput(
        task,
        instructions.trim(),
        sourceText.trim() || DEMO_SOURCE,
        outputFormat
      );

      setOutput(generatedText);
      setOutputTitle(
        `${selectedTask?.label || "Document"} — Demo Draft`
      );
    } catch {
      setError("Could not prepare the demo draft. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // =========================================
  // COPY OUTPUT
  // =========================================

  async function handleCopy() {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setError(
        "Copy was blocked by the browser. Select the output text and copy it manually."
      );
    }
  }

  // =========================================
  // DOWNLOAD OUTPUT
  // =========================================

  function handleDownload() {
    if (!output) return;

    const blob = new Blob([output], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    const safeTask = task.replace(/[^a-z0-9-]/gi, "-");

    anchor.href = url;
    anchor.download = `${safeTask}-demo-draft.txt`;

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(url);
  }

  // =========================================
  // RESET WORKSPACE
  // =========================================

  function handleReset() {
    setInstructions("");
    setSourceText("");
    setOutput("");
    setOutputTitle("");
    setFileName("");
    setError("");
    setCopied(false);
    setOutputFormat("formal");
    setTask("report");
  }

  // =========================================
  // RENDER
  // =========================================

  return (
    <main className="ai-page">
      {/* PAGE HEADER */}

      <header className="ai-page-header">
        <div>
          <div className="ai-breadcrumb">
            <span>Workspace</span>
            <span>/</span>
            <span>AI Assistant</span>
          </div>

          <div className="ai-heading-row">
            <div className="ai-heading-icon">
              <Sparkles size={24} />
            </div>

            <div>
              <h1>AI Document Assistant</h1>
              <p>
                Draft, summarise and organise documents with
                AI-assisted tools.
              </p>
            </div>
          </div>
        </div>

        <div className="ai-status">
          <span className="ai-status-dot" />
          Interactive Demo Mode
        </div>
      </header>

      {/* WELCOME BANNER */}

      <section className="ai-welcome">
        <div className="ai-welcome-icon">
          <Bot size={29} />
        </div>

        <div>
          <h2>Your document workspace</h2>
          <p>
            Select a task, provide your instructions and review
            the generated demonstration draft before using it.
          </p>
        </div>

        <div className="ai-welcome-decoration">
          <Sparkles size={68} />
        </div>
      </section>

      {/* TASK SELECTOR */}

      <section className="ai-task-section">
        <div className="ai-section-heading">
          <div>
            <h2>What would you like to do?</h2>
            <p>Select a document task to get started.</p>
          </div>
        </div>

        <div className="ai-task-grid">
          {TASKS.map((item) => {
            const Icon = item.icon;
            const active = task === item.id;

            return (
              <button
                type="button"
                key={item.id}
                className={`ai-task-card ${
                  active ? "is-active" : ""
                }`}
                onClick={() => handleTaskChange(item.id)}
                aria-pressed={active}
              >
                <div className="ai-task-card-top">
                  <div className="ai-task-icon">
                    <Icon size={21} />
                  </div>

                  <span className="ai-task-check">
                    {active && <Check size={15} />}
                  </span>
                </div>

                <h3>{item.label}</h3>
                <p>{item.description}</p>

                <span className="ai-task-link">
                  Select task <ArrowRight size={15} />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* WORKSPACE */}

      <section className="ai-workspace">
        {/* INPUT COLUMN */}

        <div className="ai-editor-column">
          <div className="ai-panel ai-input-panel">
            <div className="ai-panel-heading">
              <div>
                <span className="ai-step-label">STEP 01</span>
                <h2>Provide your instructions</h2>
              </div>

              <button
                type="button"
                className="ai-secondary-button"
                onClick={handleLoadDemo}
                disabled={loading}
              >
                <Sparkles size={16} />
                Load demo
              </button>
            </div>

            <label
              className="ai-label"
              htmlFor="ai-instructions"
            >
              Instructions <span>*</span>
            </label>

            <textarea
              id="ai-instructions"
              className="ai-textarea ai-instructions"
              value={instructions}
              onChange={(event) =>
                setInstructions(event.target.value)
              }
              placeholder={selectedTask?.placeholder}
              maxLength={10000}
            />

            <div className="ai-field-footer">
              <span>Be clear about your desired outcome.</span>
              <span>{instructions.length}/10,000</span>
            </div>

            <div className="ai-divider" />

            {/* SOURCE TEXT */}

            <div className="ai-source-heading">
              <div>
                <h3>Source document or notes</h3>
                <p>
                  Provide the text the assistant should work with.
                </p>
              </div>

              <label className="ai-upload-button">
                <Upload size={16} />
                Upload text file

                <input
                  type="file"
                  accept=".txt,.md,.csv,text/plain,text/markdown,text/csv"
                  onChange={handleFileUpload}
                  hidden
                />
              </label>
            </div>

            {fileName && (
              <div className="ai-file-chip">
                <FileText size={15} />

                <span>{fileName}</span>

                <button
                  type="button"
                  onClick={() => {
                    setFileName("");
                    setSourceText("");
                    setError("");
                  }}
                  aria-label="Remove source file"
                >
                  <X size={15} />
                </button>
              </div>
            )}

            <textarea
              className="ai-textarea ai-source-text"
              value={sourceText}
              onChange={(event) => setSourceText(event.target.value)}
              placeholder="Paste the document text or notes here..."
              maxLength={50000}
              aria-label="Source document text"
            />

            <div className="ai-field-footer">
              <span>
                Use fictional or authorised demonstration information.
              </span>

              <span>{sourceText.length}/50,000</span>
            </div>

            {/* OUTPUT FORMAT */}

            <div className="ai-format-field">
              <label className="ai-label" htmlFor="ai-format">
                Output format
              </label>

              <div className="ai-select-wrap">
                <select
                  id="ai-format"
                  value={outputFormat}
                  onChange={(event) =>
                    setOutputFormat(event.target.value)
                  }
                >
                  {OUTPUT_FORMATS.map((format) => (
                    <option
                      value={format.value}
                      key={format.value}
                    >
                      {format.label}
                    </option>
                  ))}
                </select>

                <ChevronDown size={17} />
              </div>
            </div>

            {/* ERROR MESSAGE */}

            {error && (
              <div className="ai-error" role="alert">
                <X size={17} />
                <span>{error}</span>
              </div>
            )}

            {/* GENERATE BUTTON */}

            <button
              type="button"
              className="ai-generate-button"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoaderCircle className="ai-spin" size={18} />
                  Processing demo...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate draft
                  <ArrowRight size={17} />
                </>
              )}
            </button>

            <p className="ai-processing-note">
              <ShieldCheck size={15} />
              Mock generation only. Review all content before use.
            </p>
          </div>
        </div>

        {/* OUTPUT COLUMN */}

        <div className="ai-output-column">
          <div className="ai-panel ai-output-panel">
            <div className="ai-panel-heading">
              <div>
                <span className="ai-step-label">STEP 02</span>
                <h2>Generated output</h2>
              </div>

              <span className="ai-panel-icon">
                <FileCheck2 size={19} />
              </span>
            </div>

            <div className="ai-output-toolbar">
              <div className="ai-output-status">
                <span
                  className={`ai-output-dot ${
                    output ? "is-ready" : ""
                  }`}
                />

                {loading
                  ? "Generating demo..."
                  : output
                    ? "Draft ready for review"
                    : "Waiting for input"}
              </div>

              {output && (
                <button
                  type="button"
                  className="ai-icon-button"
                  onClick={handleReset}
                  title="Start a new draft"
                  aria-label="Start a new draft"
                >
                  <RefreshCw size={16} />
                </button>
              )}
            </div>

            <div className="ai-output-content">
              {loading ? (
                <div className="ai-loading-state">
                  <div className="ai-loading-icon">
                    <LoaderCircle
                      className="ai-spin"
                      size={28}
                    />
                  </div>

                  <h3>Preparing your draft</h3>

                  <p>
                    Simulating document generation for this demo.
                  </p>
                </div>
              ) : output ? (
                <div className="ai-generated-document">
                  <div className="ai-document-label">
                    <FileText size={17} />
                    <span>{outputTitle || "Generated draft"}</span>
                  </div>

                  <pre>{output}</pre>
                </div>
              ) : (
                <div className="ai-empty-state">
                  <div className="ai-empty-illustration">
                    <div className="ai-empty-sheet">
                      <span />
                      <span />
                      <span />
                      <span />
                      <Sparkles size={21} />
                    </div>
                  </div>

                  <h3>Your draft will appear here</h3>

                  <p>
                    Select a task, load the sample information,
                    and generate a draft to review.
                  </p>

                  <div className="ai-empty-tips">
                    <div>
                      <Check size={15} />
                      Structured document drafts
                    </div>

                    <div>
                      <Check size={15} />
                      Sample summaries and key points
                    </div>

                    <div>
                      <Check size={15} />
                      Copyable, downloadable text
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* OUTPUT ACTIONS */}

            <div className="ai-output-actions">
              <button
                type="button"
                className="ai-secondary-button"
                onClick={handleCopy}
                disabled={!output || loading}
              >
                {copied ? (
                  <Check size={16} />
                ) : (
                  <Clipboard size={16} />
                )}

                {copied ? "Copied" : "Copy text"}
              </button>

              <button
                type="button"
                className="ai-secondary-button ai-download-button"
                onClick={handleDownload}
                disabled={!output || loading}
              >
                <ArrowDownToLine size={16} />
                Download .txt
              </button>
            </div>
          </div>

          {/* REVIEW NOTE */}

          <div className="ai-review-note">
            <ShieldCheck size={20} />

            <div>
              <strong>Review before use</strong>

              <p>
                Verify names, dates, references, and factual claims.
                This demonstration uses predefined templates rather
                than a real AI model. Nothing generated here is
                automatically approved as an official record.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
