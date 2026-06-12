# Document 16 — AI Architecture, Guardrail & Audit Design

# Tài liệu 16 — Kiến trúc AI, Guardrail & AI Audit

---

## Metadata

| Mục                 | Nội dung                                                                                                                                                                                                                                       |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Document ID         | DOC-16                                                                                                                                                                                                                                         |
| File name           | `16_ai_architecture_guardrail_audit.md`                                                                                                                                                                                                        |
| Document Name       | AI Architecture, Guardrail & Audit Design                                                                                                                                                                                                      |
| Tên tiếng Việt      | Thiết kế kiến trúc AI, Guardrail và AI Audit                                                                                                                                                                                                   |
| Project             | PharmaAssist AI Intelligence                                                                                                                                                                                                                   |
| Version             | 1.0 Draft                                                                                                                                                                                                                                      |
| Status              | Draft                                                                                                                                                                                                                                          |
| Created Date        | 08/06/2026                                                                                                                                                                                                                                     |
| Last Updated        | 08/06/2026                                                                                                                                                                                                                                     |
| Owner               | AI Developer / Backend Lead                                                                                                                                                                                                                    |
| Reviewer            | Backend Developer, Frontend Developer, Tester, Project Leader, Người đánh giá kỹ thuật                                                                                                                                                         |
| Baseline Source     | Document 06 — SRS, Document 12 — API Specification, Document 13 — Database Design & ERD, Document 15 — UI/UX Screen Specification, Document 17 — Knowledge Graph & Graph-RAG Design, Document 18 — Demo Data, Document 20 — Testing/Demo/Setup |
| Primary AI Provider | Google AI Provider                                                                                                                                                                                                                             |
| Fallback Provider   | MockAI                                                                                                                                                                                                                                         |
| Backend             | NestJS / Node.js                                                                                                                                                                                                                               |
| Frontend            | Next.js                                                                                                                                                                                                                                        |
| Source of Truth     | PostgreSQL                                                                                                                                                                                                                                     |
| Graph Projection    | Neo4j                                                                                                                                                                                                                                          |
| Language Rule       | Nội dung chính viết bằng tiếng Việt; tên công nghệ, module, enum, API, table, field và thuật ngữ kỹ thuật giữ tiếng Anh khi cần                                                                                                                |

---

## 1. Mục đích tài liệu

Tài liệu **AI Architecture, Guardrail & Audit Design** đặc tả kiến trúc AI chính thức cho hệ thống **PharmaAssist AI Intelligence**.

Tài liệu này tập trung vào:

1. AI scope và safety boundaries.
2. Các AI use cases chính thức.
3. AI architecture overview.
4. AI Orchestrator.
5. AI Provider Adapter.
6. Google AI Provider.
7. MockAI fallback.
8. Provider/model configuration.
9. Prompt template design.
10. Prompt versioning.
11. Context Builder.
12. PII minimization/redaction.
13. Input Guardrail.
14. Output Guardrail.
15. Structured output/schema validation.
16. Safe refusal behavior.
17. Timeout/fallback/circuit-breaker.
18. AI Copilot flows.
19. HIGH alert note confirmation rule.
20. AI Audit Log design.
21. AI Audit fields.
22. Retention rule.
23. Privacy constraints.
24. Integration với Graph-RAG.
25. Integration với PostgreSQL fallback.
26. MVP/Should-have/Future AI scope.
27. Rejected AI behaviors.
28. AI test requirements.
29. Traceability sang SRS/API/UI/Testing.

Tài liệu này **không** viết full Neo4j graph schema, không viết API contract đầy đủ, không viết database schema đầy đủ, không viết UI layout chi tiết và không viết AI prompt chi tiết hoàn chỉnh.

---

## 2. AI Scope and Safety Boundaries

### 2.1. AI scope trong MVP

AI trong MVP có vai trò **hỗ trợ nghiệp vụ**, không thay thế quyết định chuyên môn hoặc quyết định hệ thống.

AI được phép hỗ trợ:

1. Giải thích cảnh báo tương tác thuốc đã được hệ thống phát hiện.
2. Tạo **consultation note draft** cho Staff/Admin tham khảo.
3. Gợi ý câu hỏi follow-up an toàn dựa trên ngữ cảnh ngắn do Staff nhập.
4. Hỗ trợ Graph-RAG giải thích quan hệ Medicine–ActiveIngredient–Interaction nếu graph fresh hoặc có fallback hợp lệ.
5. Ghi AI Audit cho mọi AI request chính thức.

AI không được tự quyết định:

1. Có được checkout hay không.
2. Có stock hay không.
3. Batch nào được trừ.
4. Payment có thành công hay không.
5. Invoice có được tạo hay không.
6. InteractionAlert có resolved hay không.
7. Consultation note official nếu Staff chưa xác nhận.
8. DrugInteraction Rule chính thức.
9. Liều dùng, chẩn đoán, kê đơn.

### 2.2. AI safety boundaries

AI phải tuân thủ các boundary sau:

| Boundary                         | Quy tắc                                        |
| -------------------------------- | ---------------------------------------------- |
| Medical diagnosis                | Không chẩn đoán bệnh                           |
| Prescribing                      | Không kê đơn thuốc                             |
| Dosage advice                    | Không đưa liều dùng cụ thể                     |
| Replacement of pharmacist/doctor | Không tự nhận thay thế chuyên gia y tế         |
| HIGH alert                       | Không bypass acknowledgement/note              |
| Official note                    | Không tự lưu note nếu Staff chưa xác nhận      |
| PII                              | Không lưu raw PII trong AI Audit               |
| Source of truth                  | Không thay PostgreSQL business rules           |
| Graph stale                      | Không dùng graph stale như dữ liệu chắc chắn   |
| Prompt injection                 | Không làm theo chỉ dẫn độc hại từ user/context |

### 2.3. AI output position

AI output được xem là:

```text
Assistant-generated support content
```

Không phải:

```text
Official clinical decision
```

Chỉ khi Staff/Admin xác nhận thì một phần nội dung AI draft mới có thể được lưu thành:

```text
consultation_note
```

trên `InteractionAlert`.

### 2.4. Human confirmation rule

Các nội dung AI sinh ra phải có human confirmation nếu muốn trở thành dữ liệu nghiệp vụ chính thức.

Áp dụng cho:

1. Consultation note draft.
2. Explanation copied into note.
3. Follow-up question suggestion copied into workflow.

Không áp dụng cho:

1. AI Audit metadata.
2. Provider/fallback/guardrail logs.
3. Safe refusal logs.

---

## 3. AI Use Cases

### 3.1. MVP AI use cases

| Use Case | Description                       | User         |                  MVP |
| -------- | --------------------------------- | ------------ | -------------------: |
| AI-UC-01 | Explain InteractionAlert          | Staff/Admin  |                  Yes |
| AI-UC-02 | Generate consultation note draft  | Staff/Admin  |                  Yes |
| AI-UC-03 | Generate safe follow-up questions | Staff/Admin  | Yes, nếu implemented |
| AI-UC-04 | AI Audit Log                      | Admin/System |                  Yes |
| AI-UC-05 | Provider fallback logging         | System       |                  Yes |
| AI-UC-06 | Guardrail refusal                 | System/UI    |                  Yes |

### 3.2. Should-have AI use cases

| Use Case    | Description                                    | Scope       |
| ----------- | ---------------------------------------------- | ----------- |
| AI-UC-SH-01 | AI-generated business report narrative         | Should-have |
| AI-UC-SH-02 | Admin prompt editing UI                        | Should-have |
| AI-UC-SH-03 | Admin provider/model configuration UI          | Should-have |
| AI-UC-SH-04 | Advanced AI explanation with richer provenance | Should-have |
| AI-UC-SH-05 | AI support for report commentary               | Should-have |

### 3.3. Future AI use cases

| Use Case    | Description                                                 | Scope  |
| ----------- | ----------------------------------------------------------- | ------ |
| AI-UC-FU-01 | AI Cache                                                    | Future |
| AI-UC-FU-02 | Advanced natural language analytics                         | Future |
| AI-UC-FU-03 | AI-assisted procurement suggestion                          | Future |
| AI-UC-FU-04 | AI-assisted reorder suggestion                              | Future |
| AI-UC-FU-05 | Multi-turn pharmacy assistant with strict compliance review | Future |

### 3.4. Out of Scope AI use cases

AI must not support:

1. Diagnosis.
2. Prescribing.
3. Dosage calculation/advice.
4. Recommending a medicine to treat symptoms as official system action.
5. Replacing pharmacist/doctor.
6. Generating official medical record.
7. Automatically approving HIGH interaction.
8. Automatically bypassing checkout block.
9. Automatically changing DrugInteraction Rules.
10. Raw patient medical history storage.
11. AI-only checkout safety decision.
12. MockAI-only final MVP as the only AI implementation.

---

## 4. AI Architecture Overview

### 4.1. Main AI components

AI architecture includes:

1. **AI Copilot UI**.
2. **AI Controller**.
3. **AI Orchestrator**.
4. **AI Context Builder**.
5. **PII Minimization/Redaction Service**.
6. **Prompt Template Service**.
7. **Prompt Builder**.
8. **Input Guardrail Service**.
9. **AI Provider Adapter Interface**.
10. **GoogleAIAdapter**.
11. **MockAIAdapter**.
12. **Output Guardrail Service**.
13. **Structured Output Validator**.
14. **AI Audit Service**.
15. **Graph-RAG integration**.
16. **PostgreSQL fallback context provider**.
17. **Provider/model configuration service**.

### 4.2. High-level flow

```text
Frontend AI Copilot
→ AI API
→ Auth/Permission/Ownership check
→ AI Orchestrator
→ Context Builder
→ PII Minimization/Redaction
→ Input Guardrail
→ Prompt Builder with approved prompt version
→ Google AI Provider
→ Timeout/fallback to MockAI if needed
→ Structured Output Validation
→ Output Guardrail
→ AI Audit Log
→ Safe response to Frontend
```

### 4.3. AI boundary with core business modules

| Module                  | AI relationship                                        |
| ----------------------- | ------------------------------------------------------ |
| InteractionAlert Module | AI reads alert context and generates draft/explanation |
| Order/POS Module        | AI reads order context within permission scope         |
| Graph Module            | AI may use graph context if fresh                      |
| PostgreSQL              | Authoritative fallback context                         |
| Checkout Module         | AI does not decide checkout                            |
| Payment/Invoice         | AI does not create payment/invoice                     |
| Audit Module            | AI uses AI Audit, separate from generic audit          |
| System Settings         | Provider/model config may use settings/env             |

### 4.4. AI cannot bypass backend rules

AI response cannot override:

1. Permission.
2. Ownership.
3. HIGH alert requirement.
4. Stock validation.
5. FEFO.
6. Payment rule.
7. Invoice rule.
8. Graph freshness rule.
9. PostgreSQL source of truth.

---

## 5. AI Orchestrator

### 5.1. Purpose

`AIOrchestrator` là service trung tâm điều phối toàn bộ AI flow.

### 5.2. Responsibilities

AI Orchestrator chịu trách nhiệm:

1. Nhận request từ AI Controller.
2. Kiểm tra action type.
3. Gọi Authorization/Ownership validation.
4. Gọi Context Builder.
5. Gọi PII Minimization/Redaction.
6. Gọi Input Guardrail.
7. Chọn prompt template/version.
8. Gọi Prompt Builder.
9. Chọn AI provider theo strategy.
10. Gọi provider adapter.
11. Xử lý timeout/fallback.
12. Gọi Structured Output Validator.
13. Gọi Output Guardrail.
14. Gọi AI Audit Service.
15. Trả safe response về API.

### 5.3. Non-responsibilities

AI Orchestrator không:

1. Tự lưu consultation note official.
2. Tự acknowledge HIGH alert.
3. Tự chỉnh sửa InteractionAlert.
4. Tự quyết định checkout.
5. Tự ghi DrugInteraction Rule.
6. Tự truy cập raw Neo4j nếu không qua Graph service.
7. Tự bỏ qua guardrail.

### 5.4. Orchestrator pseudo-flow

```text
function handleAIRequest(action, user, input):
  authorize(user, action, input.context)
  context = ContextBuilder.build(action, input)
  minimizedContext = PIIRedactionService.minimize(context)
  inputGuardrailResult = InputGuardrail.check(action, minimizedContext, input)

  if inputGuardrailResult.blocked:
    audit(blocked)
    return safeRefusal

  prompt = PromptTemplateService.getApprovedPrompt(action)
  promptPayload = PromptBuilder.build(prompt, minimizedContext)

  providerResult = ProviderRouter.callPreferredProvider(promptPayload)

  if providerResult.failed:
    fallbackResult = ProviderRouter.callFallback(promptPayload)

  output = providerResult or fallbackResult

  schemaResult = StructuredOutputValidator.validate(output)

  outputGuardrailResult = OutputGuardrail.check(output)

  if schemaResult.failed or outputGuardrailResult.blocked:
    audit(blocked_or_failed)
    return safeRefusal

  audit(success)
  return safeOutput
```

### 5.5. Orchestrator input

Common input fields:

1. `actionType`.
2. `userId`.
3. `orderId` optional.
4. `interactionAlertId` optional.
5. `shortContext` optional.
6. `language`.
7. `requestId`.

### 5.6. Orchestrator output

Common output fields:

1. `status`.
2. `content`.
3. `structuredData`.
4. `disclaimer`.
5. `providerUsed`.
6. `fallbackUsed`.
7. `fallbackReason`.
8. `guardrailStatus`.
9. `schemaValidationStatus`.
10. `auditLogId`.

---

## 6. AI Provider Adapter

### 6.1. Purpose

AI Provider Adapter tách AI Orchestrator khỏi provider cụ thể.

Provider adapter giúp:

1. Dễ đổi provider.
2. Dễ fallback.
3. Dễ test.
4. Dễ audit.
5. Không phụ thuộc trực tiếp vào SDK trong business logic.

### 6.2. Adapter interface conceptual

Provider adapter nên có interface kiểu:

```text
AIProviderAdapter.generate(request): AIProviderResult
```

Request gồm:

1. prompt text/messages.
2. model config.
3. temperature/max tokens nếu dùng.
4. structured output instruction.
5. timeout.
6. request metadata.

Result gồm:

1. success/failure.
2. raw output.
3. parsed output if available.
4. provider name.
5. model name.
6. latency.
7. error code/message if failed.

### 6.3. Provider adapter responsibilities

1. Convert internal request sang provider-specific format.
2. Call provider.
3. Handle provider error.
4. Return normalized result.
5. Never write official business data directly.
6. Never bypass guardrail.
7. Never store secrets in logs.

### 6.4. Provider adapter list

MVP adapters:

1. `GoogleAIAdapter`.
2. `MockAIAdapter`.

Future adapters:

1. OpenAI adapter if approved.
2. Local model adapter.
3. Other provider adapter.

---

## 7. Google AI Provider

### 7.1. Provider role

Google AI Provider là AI provider ưu tiên cho MVP.

Vai trò:

1. Sinh explanation.
2. Sinh consultation note draft.
3. Sinh safe follow-up questions.
4. Hỗ trợ Graph-RAG answer nếu integration dùng AI generation.

### 7.2. Configuration

Provider config should include:

1. Provider key: `GOOGLE_AI`.
2. Model name.
3. API key from environment secret.
4. Timeout.
5. Max output tokens if used.
6. Temperature if used.
7. Structured output mode if supported.
8. Enabled flag.
9. Fallback enabled flag.

### 7.3. Security requirements

1. Không commit API key.
2. Không log API key.
3. Không trả provider raw error chứa secret về frontend.
4. Không gửi raw PII nếu không cần.
5. Context phải được minimize trước khi gửi.
6. Prompt phải dùng approved template.

### 7.4. Provider failure handling

Google AI failure includes:

1. Timeout.
2. Quota exceeded.
3. Invalid API key.
4. Network error.
5. Provider unavailable.
6. Invalid response.
7. Safety block.
8. Schema validation failure.

On failure:

1. Record provider_requested = `GOOGLE_AI`.
2. Attempt MockAI fallback if allowed.
3. Record fallback status.
4. Return safe fallback response or safe error.

---

## 8. MockAI Fallback

### 8.1. Purpose

MockAI là fallback để đảm bảo demo stability.

MockAI giúp:

1. Demo không bị hỏng khi Google AI unavailable.
2. Test predictable outputs.
3. Validate UI/flow/guardrail/audit.
4. Provide deterministic safe content.

### 8.2. Important rule

MockAI is **fallback**, not primary final MVP target.

Không được xem:

```text
MockAI-only = đủ MVP
```

trừ khi có ghi rõ đây là fallback demo mode do provider thật không khả dụng tại thời điểm chạy.

### 8.3. MockAI behavior

MockAI should:

1. Return safe pre-defined explanation.
2. Return safe note draft template.
3. Return safe follow-up question suggestions.
4. Include fallback indicator.
5. Avoid diagnosis/prescribing/dosage.
6. Support structured output format.
7. Be auditable.

### 8.4. MockAI response examples

#### Interaction explanation style

```text
Hệ thống phát hiện cảnh báo tương tác ở mức HIGH dựa trên hoạt chất của các thuốc trong đơn. Nội dung này chỉ hỗ trợ nhân viên nhà thuốc tham khảo và không thay thế đánh giá chuyên môn.
```

#### Note draft style

```text
Đã phát hiện cảnh báo tương tác mức HIGH giữa các hoạt chất trong đơn. Nhân viên đã trao đổi/cảnh báo cho khách và ghi nhận cần thận trọng trước khi tiếp tục bán thuốc.
```

### 8.5. MockAI limitations

MockAI must not:

1. Pretend to be real provider.
2. Hide fallback status.
3. Produce unsafe clinical advice.
4. Bypass guardrail.
5. Skip AI Audit.

---

## 9. Provider / Model Configuration

### 9.1. Configuration sources

MVP allows provider/model configuration through:

1. Environment variables.
2. Database config if implemented.
3. Admin UI as Should-have.

### 9.2. Required config items

| Config                 |                  Required | Notes          |
| ---------------------- | ------------------------: | -------------- |
| `AI_PROVIDER_PRIMARY`  |                       Yes | `GOOGLE_AI`    |
| `AI_PROVIDER_FALLBACK` |                       Yes | `MOCK_AI`      |
| `GOOGLE_AI_API_KEY`    | Yes if real provider used | Secret env     |
| `GOOGLE_AI_MODEL`      |                       Yes | Model name     |
| `AI_TIMEOUT_MS`        |                       Yes | Timeout        |
| `AI_FALLBACK_ENABLED`  |                       Yes | true/false     |
| `AI_GUARDRAIL_ENABLED` |                       Yes | Should be true |
| `AI_AUDIT_ENABLED`     |                       Yes | Should be true |

### 9.3. Database config

If using `ai_provider_configs`, it stores:

1. provider key.
2. model name.
3. priority.
4. enabled flag.
5. timeout.
6. non-secret config.

It must not store raw API keys unless encrypted and approved.

### 9.4. Provider selection strategy

Recommended order:

```text
Google AI Provider
→ MockAI fallback
```

Provider selection should consider:

1. Enabled flag.
2. Availability.
3. Circuit breaker state.
4. Timeout.
5. Model config validity.
6. Fallback allowed.

### 9.5. UI config scope

Admin provider/model configuration UI is **Should-have**, not MVP requirement.

MVP can use env/database config.

---

## 10. Prompt Template Design

### 10.1. PromptTemplate table

Prompt templates are stored in database:

```text
prompt_templates
```

Each template includes:

1. `key`.
2. `version`.
3. `title`.
4. `template_text`.
5. `purpose`.
6. `status`.
7. `is_official`.
8. approval metadata.

### 10.2. Official MVP prompt keys

Recommended prompt keys:

| Prompt Key                 | Use case                               |
| -------------------------- | -------------------------------------- |
| `interaction_explanation`  | Explain InteractionAlert               |
| `consultation_note_draft`  | Draft HIGH alert consultation note     |
| `safe_follow_up_questions` | Generate safe follow-up questions      |
| `graph_rag_answer`         | Graph-RAG answer generation if AI used |
| `safe_refusal`             | Optional refusal template              |

### 10.3. Prompt structure

Prompt should include:

1. System role boundary.
2. Safety rules.
3. Allowed task.
4. Forbidden task.
5. Context data.
6. Output format instruction.
7. Language instruction.
8. Disclaimer requirement.
9. Instruction to avoid diagnosis/prescribing/dosage.
10. Instruction to say when information is insufficient.

### 10.4. Prompt variable policy

Allowed variables:

1. `interaction_severity`.
2. `description_snapshot`.
3. `recommendation_snapshot`.
4. `medicine_names`.
5. `active_ingredient_names`.
6. `order_context_minimized`.
7. `graph_context_minimized`.
8. `postgres_context_minimized`.
9. `user_short_context_redacted`.
10. `language`.

Not allowed:

1. Raw full customer personal data.
2. Full medical history.
3. Raw secret values.
4. Unfiltered user prompt injection content as instruction.

### 10.5. Prompt approval

Only `APPROVED` prompt templates should be used in official MVP runtime.

Prompt editing UI is Should-have.

MVP can seed official prompts.

---

## 11. Prompt Versioning

### 11.1. Versioning rule

Prompt version is immutable after approval.

If prompt changes:

1. Create new version.
2. Mark new version as `APPROVED`.
3. Keep old version for audit traceability.
4. Do not overwrite old prompt text silently.

### 11.2. AI Audit prompt version

Every AI Audit Log must record:

1. `prompt_template_id`.
2. `prompt_version`.
3. prompt key if needed.
4. action type.

### 11.3. Prompt status lifecycle

```text
DRAFT → APPROVED → RETIRED
```

Rules:

1. DRAFT not used in official runtime.
2. APPROVED can be used.
3. RETIRED not used for new AI requests.
4. Audit logs can still reference retired prompt versions.

### 11.4. Prompt version examples

| Key                        | Version | Status   | Use      |
| -------------------------- | ------: | -------- | -------- |
| `interaction_explanation`  |       1 | APPROVED | MVP seed |
| `consultation_note_draft`  |       1 | APPROVED | MVP seed |
| `safe_follow_up_questions` |       1 | APPROVED | MVP seed |
| `graph_rag_answer`         |       1 | APPROVED | MVP seed |

---

## 12. Context Builder

### 12.1. Purpose

Context Builder tạo AI context tối thiểu, đúng scope và an toàn.

### 12.2. Context sources

Allowed sources:

1. Current user context.
2. Order summary.
3. Order item medicine names.
4. ActiveIngredient names.
5. InteractionAlert snapshot.
6. DrugInteraction recommendation/description.
7. Graph-RAG context if fresh.
8. PostgreSQL fallback context.
9. Short free-text context entered by Staff after redaction.

### 12.3. Context minimization

AI should receive only what it needs.

For interaction explanation, enough context includes:

1. Severity.
2. Interaction description snapshot.
3. Recommendation snapshot.
4. Related medicine names.
5. Related active ingredient names.
6. Whether alert is HIGH.
7. Whether graph context is fresh/fallback if used.

Not necessary:

1. Customer full name.
2. Customer phone.
3. Customer address.
4. Full order history.
5. Staff private notes not related to alert.
6. Payment data.
7. Invoice data.
8. Raw logs.

### 12.4. Context Builder by use case

#### Interaction explanation

Context includes:

1. Alert ID.
2. Severity.
3. Description snapshot.
4. Recommendation snapshot.
5. Medicine names.
6. ActiveIngredient names.
7. Optional graph provenance.
8. Disclaimer requirement.

#### Consultation note draft

Context includes:

1. HIGH alert summary.
2. What was acknowledged.
3. Related interaction summary.
4. Staff-entered redacted context if any.
5. Required safe note style.
6. Reminder that output is draft only.

#### Safe follow-up questions

Context includes:

1. Short redacted Staff-entered context.
2. Strict instruction not to diagnose/prescribe/dose.
3. Allowed output: neutral questions for Staff to ask.
4. Safety disclaimer.

#### Graph-RAG answer

Context includes:

1. Graph result if fresh.
2. PostgreSQL fallback if graph stale/unavailable and fallback exists.
3. Provenance.
4. Freshness status.
5. Allowed explanation scope.

### 12.5. Context ownership

Context Builder must check:

1. User permission.
2. Staff ownership.
3. Alert belongs to accessible order.
4. Warehouse no AI sales context in MVP.
5. Admin all scope if permission exists.

---

## 13. PII Minimization / Redaction

### 13.1. Purpose

PII Minimization/Redaction protects user/customer privacy before sending context to AI provider and before writing AI Audit.

### 13.2. PII examples

Potential PII:

1. Customer full name.
2. Phone number.
3. Email.
4. Address.
5. ID number.
6. Free-text notes containing personal identifiers.
7. Staff personal information not necessary.
8. Any real medical-record-like details.

### 13.3. Redaction approach

The redaction layer should:

1. Remove unnecessary PII.
2. Replace detected phone/email/address with placeholders.
3. Keep only minimal clinical/business context needed.
4. Avoid storing raw input in AI Audit.
5. Store summaries only.

Examples:

| Raw                        | Redacted                                     |
| -------------------------- | -------------------------------------------- |
| `Nguyễn Văn A, 0901234567` | `[CUSTOMER_NAME_REDACTED], [PHONE_REDACTED]` |
| `email abc@example.com`    | `[EMAIL_REDACTED]`                           |
| `địa chỉ 123...`           | `[ADDRESS_REDACTED]`                         |

### 13.4. Audit minimization

AI Audit should store:

1. request summary.
2. response summary.
3. provider metadata.
4. guardrail status.
5. prompt version.
6. related order/alert ID if needed.

AI Audit should not store:

1. Full raw user prompt.
2. Raw customer PII.
3. Full AI raw output if sensitive.
4. Secret provider config.
5. API key.
6. Full medical history.

### 13.5. Staff-entered context

Staff may enter short symptom/context information only to generate safe follow-up questions.

Rules:

1. UI must label it as optional and minimal.
2. Backend must redact before AI call.
3. Backend must block diagnosis/prescribing/dosage requests.
4. Do not store it as medical record.
5. AI Audit stores only minimized summary.

---

## 14. Input Guardrail

### 14.1. Purpose

Input Guardrail checks whether AI request is allowed before provider call.

### 14.2. Input Guardrail checks

Input Guardrail should check:

1. Action type allowed.
2. User permission.
3. Ownership.
4. Scope allowed.
5. Prompt injection attempt.
6. Diagnosis request.
7. Prescribing request.
8. Dosage request.
9. Unsafe medical advice request.
10. PII leakage risk.
11. Excessive free-text length.
12. Unsupported language/content if relevant.
13. Request attempts to override system rules.
14. Request attempts to bypass checkout/HIGH alert.

### 14.3. Blocked input categories

Blocked:

1. “Chẩn đoán khách bị bệnh gì?”
2. “Nên kê thuốc nào?”
3. “Uống thuốc này liều bao nhiêu?”
4. “Bỏ qua cảnh báo HIGH để checkout.”
5. “Hãy tự viết note và tự lưu luôn.”
6. “Ignore previous instructions.”
7. “Dùng dữ liệu khách hàng đầy đủ để phân tích.”
8. “Tạo lời khuyên y tế thay bác sĩ.”

### 14.4. Allowed input categories

Allowed:

1. “Giải thích cảnh báo tương tác này bằng ngôn ngữ dễ hiểu.”
2. “Tạo bản nháp consultation note cho cảnh báo HIGH này.”
3. “Gợi ý vài câu hỏi follow-up an toàn để nhân viên hỏi khách.”
4. “Tóm tắt lý do cảnh báo dựa trên hoạt chất.”
5. “Giải thích graph provenance của interaction này.”

### 14.5. Input Guardrail output

Guardrail result should include:

1. status: PASSED/BLOCKED/ERROR.
2. reason code.
3. safe message.
4. redacted input if passed.
5. audit metadata.

### 14.6. Input Guardrail failure behavior

If blocked:

1. Do not call AI provider.
2. Return safe refusal.
3. Write AI Audit.
4. Keep UI usable.
5. Allow manual note if appropriate.

---

## 15. Output Guardrail

### 15.1. Purpose

Output Guardrail checks provider response before showing it to user.

### 15.2. Output checks

Output Guardrail should detect:

1. Diagnosis.
2. Prescribing.
3. Dosage advice.
4. Overconfident medical claims.
5. Contradiction of system safety rules.
6. Instruction to bypass HIGH alert.
7. Instruction to skip consultation note.
8. Raw PII leakage.
9. Unsupported format.
10. Missing disclaimer.
11. Hallucinated unavailable facts.
12. Unsafe graph interpretation.

### 15.3. Output allowed style

Allowed output should:

1. Explain at a high level.
2. Use cautious wording.
3. Mention that AI is support only.
4. Refer user to follow pharmacy workflow.
5. Not create new official facts.
6. Not contradict interaction severity.
7. Include fallback/freshness caveat if needed.

### 15.4. Output blocked examples

Block output if it says:

1. “Thuốc này chắc chắn an toàn, cứ bán.”
2. “Bỏ qua cảnh báo HIGH.”
3. “Cho khách uống 2 viên mỗi ngày.”
4. “Khách bị bệnh X.”
5. “Không cần hỏi dược sĩ/bác sĩ.”
6. “Tự động lưu note này là chính thức.”

### 15.5. Output Guardrail behavior

If output blocked:

1. Do not show unsafe raw output.
2. Return safe refusal or generic safe response.
3. Record output guardrail status.
4. Record provider used/fallback info.
5. Allow user to manually enter note.

---

## 16. Structured Output / Schema Validation

### 16.1. Purpose

Structured output giúp frontend hiển thị nhất quán và giúp guardrail kiểm tra dễ hơn.

### 16.2. General structured output shape

AI output should be normalized into:

```json
{
  "summary": "string",
  "details": ["string"],
  "disclaimer": "string",
  "recommendedStaffAction": "string",
  "safetyFlags": [],
  "confidenceLevel": "LOW|MEDIUM|HIGH"
}
```

`confidenceLevel` ở đây là confidence của AI response quality, không phải clinical certainty.

### 16.3. Interaction explanation output

Expected fields:

1. `plainLanguageSummary`.
2. `interactionReason`.
3. `severityExplanation`.
4. `staffActionReminder`.
5. `disclaimer`.
6. `provenance` optional.
7. `graphUsed` optional.
8. `freshnessStatus` optional.

### 16.4. Consultation note draft output

Expected fields:

1. `draftNote`.
2. `noteStyle`.
3. `requiresHumanConfirmation = true`.
4. `notSavedAutomatically = true`.
5. `disclaimer`.

### 16.5. Safe follow-up questions output

Expected fields:

1. `questions`.
2. `safetyReminder`.
3. `blockedTopics`.
4. `disclaimer`.

Questions must be neutral, for example:

1. “Bạn có đang dùng thêm thuốc nào khác không?”
2. “Bạn có từng được dược sĩ/bác sĩ dặn tránh phối hợp thuốc nào không?”
3. “Bạn có muốn được tư vấn thêm trước khi mua không?”

Questions must not diagnose or prescribe.

### 16.6. Schema validation status

AI Audit must record:

1. `schema_validation_status = PASSED`.
2. `schema_validation_status = FAILED`.
3. `schema_validation_status = SKIPPED`.

If failed:

1. Do not show raw invalid output.
2. Use safe fallback/refusal.
3. Audit failure.

---

## 17. Safe Refusal Behavior

### 17.1. Purpose

Safe refusal protects users when request/output is outside AI scope.

### 17.2. Refusal style

Safe refusal should be:

1. Clear.
2. Brief.
3. Polite.
4. Safety-focused.
5. Not overly technical.
6. Provide allowed alternative action.

### 17.3. Refusal examples

#### Diagnosis request

```text
Mình không thể dùng AI để chẩn đoán bệnh. AI Copilot chỉ hỗ trợ giải thích cảnh báo tương tác và gợi ý câu hỏi an toàn. Bạn có thể hỏi khách các thông tin cơ bản hoặc khuyến nghị khách tham khảo dược sĩ/bác sĩ.
```

#### Dosage request

```text
Mình không thể đưa hướng dẫn liều dùng cụ thể. Hệ thống chỉ hỗ trợ cảnh báo tương tác và ghi nhận tư vấn. Vui lòng tuân theo hướng dẫn chuyên môn hoặc nhãn thuốc chính thức.
```

#### Bypass HIGH alert

```text
Không thể bỏ qua cảnh báo HIGH. Cảnh báo này cần được acknowledgement và có consultation note trước khi checkout.
```

#### Raw PII request

```text
Mình không thể xử lý hoặc lưu thông tin cá nhân không cần thiết trong AI Audit. Vui lòng chỉ nhập ngữ cảnh tối thiểu liên quan đến cảnh báo.
```

### 17.4. Refusal audit

Every refusal should be auditable with:

1. action type.
2. guardrail status.
3. reason code.
4. minimized request summary.
5. user ID.
6. timestamp.

---

## 18. Timeout / Fallback / Circuit Breaker

### 18.1. Timeout

AI provider calls must have timeout.

Recommended configurable values:

1. Default timeout: 10–20 seconds.
2. Shorter timeout for demo if needed.
3. Configurable through environment.

If timeout:

1. Mark Google provider failed.
2. Attempt MockAI fallback if enabled.
3. Record fallback reason.
4. Return fallback response.

### 18.2. Fallback strategy

Fallback order:

```text
Google AI Provider → MockAI
```

Fallback occurs when:

1. Google AI timeout.
2. Google AI unavailable.
3. Quota exceeded.
4. Invalid response.
5. Provider safety block and fallback allowed.
6. Configuration missing but MockAI enabled.

Fallback must be transparent:

1. Store in AI Audit.
2. Return fallback metadata to UI if appropriate.
3. UI may show “MockAI fallback”.

### 18.3. Circuit breaker

A circuit breaker may be implemented to avoid repeated provider failure.

States:

1. CLOSED — normal.
2. OPEN — provider temporarily blocked due to repeated failures.
3. HALF_OPEN — test recovery.

MVP may implement simple failure counter instead of full circuit breaker.

### 18.4. Circuit breaker behavior

If circuit open:

1. Skip Google AI temporarily.
2. Use MockAI fallback.
3. Audit fallback reason: `CIRCUIT_OPEN`.
4. Retry after configured cooldown.

### 18.5. Fallback does not bypass guardrail

Even fallback response must pass:

1. Output Guardrail.
2. Structured validation if applicable.
3. AI Audit.

---

## 19. AI Copilot Flows

---

# 19.1. Interaction Explanation Flow

### Purpose

Giải thích InteractionAlert bằng ngôn ngữ dễ hiểu cho Staff/Admin.

### Trigger

User clicks:

```text
Giải thích cảnh báo
```

inside Interaction Alert Panel.

### Flow

```text
User clicks explain
→ Frontend calls AI explanation API
→ Backend validates permission/ownership
→ Context Builder loads alert snapshot
→ Redaction/minimization
→ Input Guardrail
→ Prompt version selected
→ Google AI call
→ MockAI fallback if needed
→ Output Guardrail
→ AI Audit
→ UI displays explanation
```

### Input context

1. InteractionAlert ID.
2. Severity.
3. Description snapshot.
4. Recommendation snapshot.
5. Related medicines.
6. Related active ingredients.
7. Graph provenance if available/fresh.
8. No raw PII.

### Output

1. Plain language explanation.
2. Severity explanation.
3. Staff action reminder.
4. Disclaimer.
5. Provider/fallback indicator.
6. Guardrail status if useful.

### Safety requirements

AI must not:

1. Say medicine combination is safe.
2. Tell user to ignore alert.
3. Give dosage.
4. Diagnose.
5. Prescribe.

---

# 19.2. Consultation Note Draft Flow

### Purpose

Tạo bản nháp consultation note cho HIGH alert.

### Trigger

User clicks:

```text
Tạo bản nháp ghi chú tư vấn
```

### Flow

```text
User requests note draft
→ Backend validates alert is accessible
→ Backend validates alert is HIGH if required
→ Build minimized context
→ Input Guardrail
→ Prompt Builder uses consultation_note_draft prompt
→ Provider call
→ Output Guardrail
→ Structured validation
→ AI Audit
→ Return draft
→ User reviews
→ User confirms/save manually
→ InteractionAlert Module saves official consultation note
```

### Important rule

AI draft is not official note.

Official note is saved only by:

```text
POST /interaction-alerts/{id}/consultation-note
```

after Staff/Admin confirmation.

### Output

1. `draftNote`.
2. `requiresHumanConfirmation = true`.
3. `notSavedAutomatically = true`.
4. Disclaimer.

### UI behavior

1. Show draft in editable field.
2. User can edit.
3. User must click save/confirm.
4. Save calls InteractionAlert API.
5. AI Audit stores draft summary, not official note.

---

# 19.3. Safe Follow-up Questions Flow

### Purpose

Gợi ý câu hỏi an toàn để Staff hỏi khách, không chẩn đoán/kê đơn.

### Trigger

Staff enters short context and clicks:

```text
Gợi ý câu hỏi an toàn
```

### Allowed output

Questions like:

1. “Bạn có đang dùng thuốc nào khác không?”
2. “Bạn có từng dị ứng với thuốc nào không?”
3. “Bạn có muốn được tư vấn thêm trước khi mua không?”
4. “Bạn có đang mang thai, cho con bú, hoặc có tình trạng cần hỏi dược sĩ/bác sĩ không?” — only as general safety screening, not diagnosis.

### Blocked output

1. “Bạn bị bệnh X phải không?”
2. “Bạn nên uống thuốc Y.”
3. “Liều dùng là…”
4. “Có thể bỏ qua cảnh báo.”

### Flow

```text
Short context entered
→ Redact PII
→ Input Guardrail checks diagnosis/prescribing/dosage
→ Provider generates neutral questions
→ Output Guardrail validates
→ AI Audit
→ UI shows questions
```

### Storage rule

Staff-entered context is not stored as medical record.

AI Audit stores minimized summary only.

---

## 20. HIGH Alert Note Confirmation Rule

### 20.1. Official rule

For every active HIGH InteractionAlert:

```text
acknowledged_at IS NOT NULL
AND consultation_note IS NOT NULL
```

must be true before checkout.

### 20.2. AI draft role

AI can generate:

```text
consultation note draft
```

AI cannot generate:

```text
official consultation note
```

without user confirmation.

### 20.3. UI-to-backend rule

The UI flow must be:

```text
Generate AI draft
→ Staff reviews/edits
→ Staff clicks Save/Confirm
→ Backend saves consultation_note
→ Alert becomes resolved for checkout if acknowledgement also exists
```

### 20.4. Audit rule

Two separate audit categories may exist:

1. AI Audit for draft generation.
2. InteractionAlert audit for official note saved.

### 20.5. Checkout rule

Checkout must ignore unconfirmed AI draft.

Checkout only checks:

1. `interaction_alerts.acknowledged_at`.
2. `interaction_alerts.consultation_note`.

---

## 21. AI Audit Log Design

### 21.1. Purpose

AI Audit Log records AI activity for:

1. Traceability.
2. Safety review.
3. Demo evidence.
4. Debugging.
5. Provider/fallback visibility.
6. Guardrail visibility.
7. Prompt version traceability.

### 21.2. AI Audit table

Database table:

```text
ai_audit_logs
```

### 21.3. Events requiring AI Audit

AI Audit required for:

1. Interaction explanation request.
2. Consultation note draft request.
3. Safe follow-up question request.
4. Input guardrail block.
5. Output guardrail block.
6. Provider fallback.
7. Provider error.
8. Structured validation failure.
9. Graph-RAG AI generation if used.
10. AI report narrative if Should-have implemented.

### 21.4. AI Audit lifecycle

```text
AI request received
→ audit metadata initialized
→ guardrail statuses collected
→ provider attempt recorded
→ fallback status recorded
→ validation statuses recorded
→ final status recorded
```

### 21.5. AI Audit display

Admin AI Audit UI should display:

1. Timestamp.
2. User.
3. Action type.
4. Provider requested.
5. Provider used.
6. Fallback used.
7. Guardrail status.
8. Prompt version.
9. Latency.
10. Error code.
11. Minimized request/response summary.

It should not display:

1. Raw PII.
2. API key.
3. Full sensitive prompt.
4. Full raw output if unsafe.

---

## 22. AI Audit Fields

### 22.1. Required fields

| Field                          | Required | Description                |
| ------------------------------ | -------: | -------------------------- |
| `id`                           |      Yes | Audit ID                   |
| `user_id`                      |      Yes | User who requested         |
| `action_type`                  |      Yes | AI action                  |
| `related_order_id`             |       No | Related order              |
| `related_interaction_alert_id` |       No | Related alert              |
| `prompt_template_id`           |       No | Prompt template used       |
| `prompt_version`               |       No | Exact version              |
| `provider_requested`           |      Yes | Preferred provider         |
| `provider_used`                |      Yes | Actual provider            |
| `model_used`                   |       No | Model name                 |
| `fallback_used`                |      Yes | true/false                 |
| `fallback_reason`              |       No | Reason if fallback         |
| `input_guardrail_status`       |      Yes | PASSED/BLOCKED/ERROR       |
| `output_guardrail_status`      |      Yes | PASSED/BLOCKED/ERROR       |
| `schema_validation_status`     |       No | PASSED/FAILED/SKIPPED      |
| `latency_ms`                   |       No | Provider/request latency   |
| `request_summary`              |       No | Minimized request summary  |
| `response_summary`             |       No | Minimized response summary |
| `error_code`                   |       No | Error if any               |
| `created_at`                   |      Yes | Timestamp                  |

### 22.2. Recommended additional fields

| Field                    | Purpose                       |
| ------------------------ | ----------------------------- |
| `request_id`             | Trace request across logs     |
| `graph_used`             | Whether graph context used    |
| `graph_freshness_status` | FRESH/STALE/UNAVAILABLE       |
| `fallback_context_used`  | PostgreSQL fallback used      |
| `guardrail_reason_code`  | Reason for block/refusal      |
| `schema_name`            | Structured output schema used |
| `provider_latency_ms`    | Provider-only latency         |
| `total_latency_ms`       | Total AI pipeline latency     |

### 22.3. Audit status examples

#### Successful Google AI

```text
provider_requested = GOOGLE_AI
provider_used = GOOGLE_AI
fallback_used = false
input_guardrail_status = PASSED
output_guardrail_status = PASSED
schema_validation_status = PASSED
```

#### Google timeout with MockAI fallback

```text
provider_requested = GOOGLE_AI
provider_used = MOCK_AI
fallback_used = true
fallback_reason = TIMEOUT
input_guardrail_status = PASSED
output_guardrail_status = PASSED
schema_validation_status = PASSED
```

#### Guardrail blocked

```text
provider_requested = GOOGLE_AI
provider_used = NONE
fallback_used = false
input_guardrail_status = BLOCKED
output_guardrail_status = SKIPPED
schema_validation_status = SKIPPED
error_code = AI_GUARDRAIL_BLOCKED
```

---

## 23. Retention Rule

### 23.1. MVP retention

AI Audit Logs are retained for the full demo/project lifecycle.

No automatic deletion is required in MVP.

### 23.2. Retention constraints

Because logs are retained, they must not contain:

1. Raw PII.
2. Sensitive customer data.
3. Secrets.
4. Full medical record.
5. Full unsafe output.
6. Unredacted free-text context.

### 23.3. Future retention policy

Future/commercial system may require:

1. Retention duration.
2. Data deletion policy.
3. Export policy.
4. Compliance review.
5. Admin purge/archive feature.
6. More detailed privacy controls.

These are not MVP blockers.

---

## 24. Privacy Constraints

### 24.1. Privacy principles

AI privacy rules:

1. Minimize input.
2. Redact PII.
3. Avoid raw logs.
4. Store summaries only.
5. Do not send unnecessary customer data to provider.
6. Do not use AI as medical record system.
7. Do not store sensitive free-text context as official record.

### 24.2. Data sent to provider

Allowed:

1. Alert severity.
2. Interaction description.
3. Interaction recommendation.
4. Medicine names.
5. ActiveIngredient names.
6. Minimal order context.
7. Graph provenance if relevant.
8. Redacted short Staff context.

Not allowed unless explicitly justified:

1. Customer full name.
2. Customer phone/email/address.
3. Full order history.
4. Real medical record.
5. Payment details.
6. Staff private data.
7. Secret config.

### 24.3. Data stored in AI Audit

Allowed:

1. Action metadata.
2. Provider metadata.
3. Guardrail statuses.
4. Prompt version.
5. Minimized summaries.
6. Error code.
7. Related IDs.

Not allowed:

1. Raw PII.
2. Raw customer note with identifiers.
3. Full provider response if unsafe.
4. API keys.
5. Secret environment values.

---

## 25. Integration with Graph-RAG

### 25.1. Graph-RAG relationship

Graph-RAG is a separate module from AI Copilot, but AI may help convert graph/provenance into readable explanation.

Graph-RAG includes:

1. Graph query.
2. Freshness check.
3. Provenance.
4. PostgreSQL fallback if needed.
5. Safe response.

AI must not directly access raw Neo4j.

AI should get graph context through:

```text
GraphRagService
```

or a safe graph context provider.

### 25.2. Graph context allowed

AI may receive:

1. Related Medicine nodes.
2. Related ActiveIngredient nodes.
3. CONTAINS relationships.
4. INTERACTS_WITH relationship summary.
5. ruleId.
6. severity.
7. provenance.
8. graph freshness status.

AI should not receive:

1. raw Cypher.
2. unrestricted graph dump.
3. stale graph without warning.
4. hidden/internal graph metadata not needed.

### 25.3. Graph freshness in AI response

If graph used:

1. AI response should include graph provenance.
2. UI should show `graphUsed=true`.
3. Freshness status should be visible.

If graph stale/unavailable and fallback used:

1. AI response should indicate degraded/fallback.
2. UI should show `graphUsed=false`.
3. Use PostgreSQL authoritative context.

### 25.4. Graph-RAG safety

AI must not:

1. Infer unsupported medical advice from graph.
2. Treat graph as source of truth if stale.
3. Hallucinate graph relationships.
4. Create new graph facts.
5. Suggest checkout based only on graph.

---

## 26. Integration with PostgreSQL Fallback

### 26.1. Official fallback rule

For Graph-RAG interaction explanations:

If Neo4j is unavailable or graph projection is stale:

1. Use authoritative PostgreSQL interaction context if available.
2. Return `graphUsed=false`.
3. Return degraded/freshness indicator.
4. Do not silently use stale graph.

### 26.2. Pure graph query fallback

For pure graph query with no relational fallback:

1. Return safe error.
2. Do not fabricate answer.
3. Audit graph unavailable/stale if AI involved.

### 26.3. PostgreSQL context examples

Fallback context can include:

1. DrugInteraction Rule.
2. MedicineIngredient mappings.
3. InteractionAlert snapshot.
4. Order item medicine list.
5. ActiveIngredient names.
6. Severity/recommendation.

### 26.4. AI response with fallback

AI output should say conceptually:

```text
Thông tin này được tạo dựa trên dữ liệu tương tác chính thức trong PostgreSQL vì graph hiện không khả dụng hoặc chưa đồng bộ.
```

It should not say:

```text
Graph xác nhận...
```

if graph was not used.

---

## 27. MVP / Should-have / Future AI Scope

### 27.1. MVP AI scope

MVP includes:

1. Google AI Provider integration.
2. MockAI fallback.
3. AI Provider Adapter.
4. AI Orchestrator.
5. Prompt templates in database.
6. Prompt version recording.
7. Context Builder.
8. PII minimization/redaction.
9. Input Guardrail.
10. Output Guardrail.
11. Structured output/schema validation.
12. InteractionAlert explanation.
13. Consultation note draft.
14. Safe follow-up questions if implemented.
15. AI Audit Log.
16. AI fallback logging.
17. Guardrail refusal.
18. Integration with Graph-RAG context where needed.
19. PostgreSQL fallback for graph-related interaction explanation.

### 27.2. Should-have AI scope

Should-have includes:

1. AI-generated business report narrative.
2. Admin Prompt Editing UI.
3. Admin Provider/Model Configuration UI.
4. Richer prompt governance UI.
5. AI output rating/feedback.
6. Graph Sync Status UI integration.
7. More detailed AI observability dashboard.
8. Better provider health dashboard.

### 27.3. Future AI scope

Future includes:

1. AI Cache.
2. Advanced analytics assistant.
3. Forecast explanation assistant.
4. Reorder suggestion assistant.
5. Multi-provider load balancing.
6. More advanced medical safety compliance.
7. AI-based data quality suggestions.
8. AI-assisted catalog normalization.

### 27.4. Out of Scope AI

Out of Scope:

1. Diagnosis.
2. Prescribing.
3. Dosage advice.
4. Automatic official consultation note.
5. Automatic HIGH alert bypass.
6. Automatic checkout approval.
7. AI as source of truth.
8. AI Cache in MVP.
9. MockAI-only final MVP.
10. Raw PII storage.
11. Real medical record handling.
12. Autonomous drug recommendation engine.

---

## 28. Rejected AI Behaviors

### 28.1. AI diagnosis

Rejected:

```text
AI chẩn đoán bệnh của khách.
```

Reason:

1. Unsafe.
2. Outside MVP.
3. Not appropriate for pharmacy POS demo.

### 28.2. AI prescribing

Rejected:

```text
AI đề xuất thuốc để điều trị triệu chứng.
```

Reason:

1. Prescriptive medical behavior.
2. Future scope only if heavily controlled and approved.
3. Must not influence checkout.

### 28.3. AI dosage advice

Rejected:

```text
AI đưa liều dùng cụ thể.
```

Reason:

1. High safety risk.
2. Not MVP.
3. Must rely on official label/professional judgment.

### 28.4. AI auto-save consultation note

Rejected:

```text
AI draft tự động lưu vào consultation_note.
```

Correct:

```text
AI draft → Staff reviews/edits → Staff confirms → official note saved.
```

### 28.5. AI bypassing HIGH alert

Rejected:

```text
AI nói có thể bỏ qua HIGH alert để checkout.
```

Correct:

1. HIGH requires acknowledgement.
2. HIGH requires consultation note.
3. Checkout validates backend.

### 28.6. MockAI-only MVP

Rejected:

```text
Only MockAI is enough for final MVP.
```

Correct:

1. Google AI Provider is preferred real provider.
2. MockAI is fallback.

### 28.7. Raw PII in AI Audit

Rejected:

1. Customer phone.
2. Address.
3. Full name when not needed.
4. Full sensitive free text.
5. Raw provider payload.

### 28.8. AI changing rules

Rejected:

```text
AI tự tạo/cập nhật DrugInteraction Rule.
```

DrugInteraction Rule management remains Admin/backend business function.

### 28.9. AI using stale graph silently

Rejected.

Correct:

1. Check freshness.
2. Use PostgreSQL fallback or safe error.
3. Show indicator.

---

## 29. AI Test Requirements

### 29.1. Unit tests

Unit tests should cover:

1. Input Guardrail blocks diagnosis.
2. Input Guardrail blocks prescribing.
3. Input Guardrail blocks dosage.
4. Input Guardrail blocks bypass HIGH alert request.
5. Input Guardrail blocks prompt injection.
6. PII redaction removes phone/email/address.
7. Context Builder minimizes context.
8. Prompt Builder selects approved version.
9. Output Guardrail blocks unsafe output.
10. Structured Output Validator rejects invalid schema.
11. Provider Adapter normalizes success.
12. Provider Adapter normalizes failure.
13. MockAI returns safe deterministic output.
14. AI Audit payload excludes raw PII.
15. Fallback metadata is recorded.

### 29.2. Integration tests

Integration tests should cover:

1. AI explanation for accessible InteractionAlert.
2. Staff cannot request AI for another Staff order.
3. Warehouse cannot use AI sales copilot.
4. AI note draft does not save official note.
5. Staff confirms draft through InteractionAlert API.
6. Checkout ignores unconfirmed draft.
7. Google AI timeout triggers MockAI fallback.
8. Guardrail block creates AI Audit Log.
9. Output guardrail block hides unsafe output.
10. Graph stale triggers PostgreSQL fallback for interaction explanation.

### 29.3. E2E tests

E2E tests should cover:

1. POS creates HIGH alert.
2. Staff opens AI explanation.
3. AI explanation shown with disclaimer.
4. Staff generates note draft.
5. Draft is editable.
6. Staff confirms note.
7. Alert resolved after ack + note.
8. Checkout succeeds after resolution.
9. AI Audit visible to Admin.
10. Fallback indicator visible when MockAI used.

### 29.4. Negative tests

Negative tests should cover:

1. Ask AI to diagnose.
2. Ask AI for dosage.
3. Ask AI to bypass alert.
4. Enter PII-heavy context.
5. Provider returns unsafe output.
6. Provider returns malformed JSON.
7. Graph unavailable.
8. Graph stale with no fallback.
9. Unauthorized user calls AI endpoint.
10. Staff tries to access AI Audit.

### 29.5. Demo tests

Before demo, verify:

1. Google AI configured or fallback ready.
2. MockAI fallback works.
3. AI Audit records appear.
4. Guardrail refusal can be demonstrated.
5. HIGH alert note draft flow works.
6. AI draft does not auto-save.
7. Graph-RAG fallback indicator works.
8. No raw PII appears in AI Audit UI.

---

## 30. Traceability to SRS / API / UI / Testing

### 30.1. Traceability to SRS

| AI Area                      | SRS Requirement Group |
| ---------------------------- | --------------------- |
| AI Copilot                   | FR-AIC                |
| AI Guardrail                 | FR-AIG                |
| AI Audit                     | FR-AIA                |
| InteractionAlert explanation | FR-ALT, FR-AIC        |
| Consultation note draft      | FR-ALT, FR-AIC        |
| Safe follow-up questions     | FR-AIC, FR-AIG        |
| Provider fallback            | FR-AIC, NFR-REL       |
| Prompt versioning            | FR-AIA, NFR-AUD       |
| PII minimization             | NFR-SEC, NFR-SAFE     |
| Graph-RAG integration        | FR-GRG                |

### 30.2. Traceability to API

| AI Feature               | API                                                |
| ------------------------ | -------------------------------------------------- |
| Explain InteractionAlert | `POST /ai/interaction-alerts/{alertId}/explain`    |
| Generate note draft      | `POST /ai/interaction-alerts/{alertId}/note-draft` |
| Safe follow-up questions | `POST /ai/safe-follow-up-questions`                |
| Save official note       | `POST /interaction-alerts/{id}/consultation-note`  |
| AI Audit list            | `GET /ai-audit-logs`                               |
| AI Audit detail          | `GET /ai-audit-logs/{id}`                          |
| Graph-RAG query          | `POST /graph-rag/query`                            |

### 30.3. Traceability to UI

| AI Feature               | UI Screen/Component                             |
| ------------------------ | ----------------------------------------------- |
| Interaction explanation  | AI Copilot Panel inside Interaction Alert Panel |
| Consultation note draft  | HIGH Alert Handling section                     |
| Safe follow-up questions | AI Copilot Panel                                |
| Safe refusal             | AI response/error state                         |
| Fallback indicator       | AI Copilot Panel                                |
| AI Audit                 | Admin AI Audit Log                              |
| Graph-RAG integration    | Graph-RAG screen                                |
| Graph fallback indicator | Graph-RAG response card                         |

### 30.4. Traceability to database

| AI Area                    | Database Tables                                                                         |
| -------------------------- | --------------------------------------------------------------------------------------- |
| Prompt templates           | `prompt_templates`                                                                      |
| Provider config            | `ai_provider_configs`                                                                   |
| AI Audit                   | `ai_audit_logs`                                                                         |
| Official consultation note | `interaction_alerts`                                                                    |
| Interaction context        | `interaction_alerts`, `drug_interactions`, `active_ingredients`, `medicine_ingredients` |
| Graph freshness            | `graph_sync_outbox`, `graph_projection_versions`                                        |

### 30.5. Traceability to testing

| AI Requirement                              | Test Type         |
| ------------------------------------------- | ----------------- |
| Guardrail blocks unsafe input               | Unit/Integration  |
| Output guardrail blocks unsafe response     | Unit/Integration  |
| Prompt version recorded                     | Integration       |
| MockAI fallback works                       | Integration/E2E   |
| AI draft not official note                  | Integration/E2E   |
| HIGH checkout still requires confirmed note | E2E               |
| AI Audit no raw PII                         | Unit/Integration  |
| Graph stale fallback works                  | Integration/E2E   |
| Staff ownership enforced                    | Integration       |
| Warehouse no AI sales copilot               | Authorization/E2E |

---

## 31. AI Quality Checklist

Before AI feature is accepted, verify:

| Checklist item                                        | Expected |
| ----------------------------------------------------- | -------- |
| Google AI Provider supported                          | Yes      |
| MockAI fallback available                             | Yes      |
| Provider adapter abstraction exists                   | Yes      |
| Prompt templates stored with versions                 | Yes      |
| Prompt version recorded in AI Audit                   | Yes      |
| Input Guardrail implemented                           | Yes      |
| Output Guardrail implemented                          | Yes      |
| Structured output validation implemented              | Yes      |
| Safe refusal exists                                   | Yes      |
| PII minimization/redaction exists                     | Yes      |
| Raw PII not stored in AI Audit                        | Yes      |
| AI draft not auto-saved                               | Yes      |
| Staff must confirm consultation note                  | Yes      |
| HIGH alert still blocks checkout until ack/note       | Yes      |
| Provider timeout handled                              | Yes      |
| Fallback recorded                                     | Yes      |
| Graph freshness respected                             | Yes      |
| PostgreSQL fallback used when graph stale/unavailable | Yes      |
| MockAI-only not treated as final MVP                  | Yes      |
| AI diagnosis/prescribing/dosage blocked               | Yes      |
| AI Audit visible/checkable by Admin                   | Yes      |

---

## 32. Kết luận

Document 16 — AI Architecture, Guardrail & Audit Design đã đặc tả kiến trúc AI chính thức cho **PharmaAssist AI Intelligence**.

Tài liệu này đã xác định:

1. AI scope and safety boundaries.
2. AI use cases.
3. AI architecture overview.
4. AI Orchestrator.
5. AI Provider Adapter.
6. Google AI Provider.
7. MockAI fallback.
8. Provider/model configuration.
9. Prompt template design.
10. Prompt versioning.
11. Context Builder.
12. PII minimization/redaction.
13. Input Guardrail.
14. Output Guardrail.
15. Structured output/schema validation.
16. Safe refusal behavior.
17. Timeout/fallback/circuit-breaker.
18. AI Copilot flows:

    * Interaction explanation.
    * Consultation note draft.
    * Safe follow-up questions.
19. HIGH alert note confirmation rule.
20. AI Audit Log design.
21. AI Audit fields.
22. Retention rule.
23. Privacy constraints.
24. Integration with Graph-RAG.
25. Integration with PostgreSQL fallback.
26. MVP/Should-have/Future AI scope.
27. Rejected AI behaviors.
28. AI test requirements.
29. Traceability to SRS/API/UI/Testing.
30. AI quality checklist.

Các baseline quan trọng được giữ đúng:

1. Google AI Provider là provider ưu tiên.
2. MockAI chỉ là fallback.
3. MockAI-only không được xem là đủ MVP chính thức.
4. AI Guardrail là MVP.
5. AI Audit là MVP.
6. Prompt templates có version và phải record exact version trong AI Audit.
7. AI không chẩn đoán.
8. AI không kê đơn.
9. AI không đưa liều dùng.
10. AI không tự động lưu official consultation note.
11. HIGH alert note chỉ official sau khi Staff/Admin xác nhận.
12. Checkout không dùng AI draft chưa xác nhận.
13. AI Audit không lưu raw PII.
14. Graph-RAG là module riêng.
15. Nếu Neo4j stale/unavailable, dùng PostgreSQL fallback cho interaction explanation khi có thể.
16. Pure graph query không có fallback phải trả safe error.
17. Stale graph không được dùng âm thầm.
18. PostgreSQL vẫn là source of truth.

Document 16 là input trực tiếp cho:

1. AI backend implementation.
2. AI Copilot frontend implementation.
3. AI Audit UI.
4. Guardrail tests.
5. Provider fallback tests.
6. Graph-RAG integration.
7. Document 17 — Knowledge Graph, Neo4j Sync & Graph-RAG Design.
8. Document 20 — Testing, Demo & Setup Guide.

Bước tiếp theo hợp lý là viết **Document 17 — Knowledge Graph, Neo4j Sync & Graph-RAG Design**, vì AI architecture đã xác định rõ cách AI tích hợp với Graph-RAG, PostgreSQL fallback, graph freshness và provenance.
