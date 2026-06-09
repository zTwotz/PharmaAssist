# 4C_Task_Description_MVP_AI_Graph_Report_Demo_291_435.md

# Mẫu Description cho 145 Task phần 4C

Tài liệu này mô tả chi tiết từng Task trong file:

```text
4C_Task_List_MVP_AI_Graph_Report_Demo_291_435.md
```

Phạm vi Task:

```text
PAC-TASK-291 → PAC-TASK-435
```

Nhóm chức năng:

1. AI Copilot.
2. Google AI Provider.
3. MockAI fallback.
4. AI Guardrail.
5. AI Audit Log.
6. Prompt template versioning.
7. Graph Sync Outbox.
8. Neo4j Projection.
9. Graph freshness detection.
10. Graph-RAG.
11. PostgreSQL fallback.
12. Reports.
13. System Settings.
14. Demo Data.
15. Demo Reset.

Baseline bắt buộc:

* Google AI là AI provider chính.
* MockAI chỉ là fallback để demo ổn định.
* AI Guardrail và AI Audit là bắt buộc.
* AI không được chẩn đoán bệnh, kê đơn thuốc hoặc đưa liều dùng cụ thể.
* AI draft không được tự động lưu thành official consultation note nếu Staff chưa confirm.
* AI Audit không được lưu raw PII.
* Prompt template phải có version.
* PostgreSQL là source of truth.
* Neo4j chỉ là graph projection.
* Graph Sync dùng outbox/worker/retry/failure logging.
* Graph-RAG phải có provenance, freshness metadata và PostgreSQL fallback.
* Stale graph không được dùng âm thầm.
* Graph không quyết định checkout.
* Reports MVP là deterministic, không phụ thuộc AI.
* Demo reset chỉ được chạy local.

---

# Sprint 7 — AI Copilot, Google AI, MockAI, Guardrail, Audit

## PAC-TASK-291 - Define AI provider abstraction

Nhóm cần định nghĩa abstraction cho AI provider để backend có thể gọi Google AI làm provider chính và MockAI làm fallback.

### Nội dung công việc

* Tạo interface chung cho AI provider.
* Định nghĩa input/output chung cho AI explanation, AI draft note và follow-up questions.
* Tách provider logic khỏi business service.
* Chuẩn bị metadata provider_requested và provider_used.
* Đảm bảo có thể thay provider bằng config backend.

### Kết quả mong đợi

* Backend không bị phụ thuộc cứng vào một provider cụ thể.
* Google AI và MockAI dùng chung contract.
* AI service dễ test và dễ fallback.
* AI Audit có thể ghi provider chính xác.

### AI Agent Notes

* Không hard-code provider trực tiếp trong controller.
* Không xem MockAI là provider chính của MVP.

---

## PAC-TASK-292 - Configure backend AI provider/model settings loader

Nhóm cần xây dựng cơ chế load cấu hình AI provider/model từ backend.

### Nội dung công việc

* Đọc cấu hình provider/model từ environment hoặc database config.
* Xác định Google AI là provider chính.
* Cấu hình MockAI fallback nếu Google AI lỗi hoặc không khả dụng.
* Validate thiếu cấu hình quan trọng.
* Không expose API key ra frontend.

### Kết quả mong đợi

* Backend chọn provider/model đúng.
* Secret không lộ ra client.
* Cấu hình có thể thay đổi mà không sửa nhiều code.
* AI call có nền tảng cấu hình an toàn.

---

## PAC-TASK-293 - Implement Google AI provider adapter

Nhóm cần triển khai adapter gọi Google AI từ backend.

### Nội dung công việc

* Tạo Google AI provider class theo abstraction đã định nghĩa.
* Gửi prompt và context đến Google AI.
* Nhận response và map về format nội bộ.
* Xử lý lỗi cơ bản từ provider.
* Ghi provider_used là Google AI khi gọi thành công.

### Kết quả mong đợi

* Backend gọi được Google AI.
* Response được chuẩn hóa trước khi trả cho service.
* Không gọi Google AI từ frontend.
* Có thể audit provider/model đã dùng.

---

## PAC-TASK-294 - Add Google AI timeout and retry-safe error handling

Nhóm cần thêm xử lý timeout và lỗi khi gọi Google AI.

### Nội dung công việc

* Cấu hình timeout cho request AI.
* Bắt lỗi network, quota, timeout và provider error.
* Không retry vô hạn.
* Trả safe error hoặc chuyển sang MockAI fallback nếu phù hợp.
* Log lỗi kỹ thuật ở mức vừa đủ.

### Kết quả mong đợi

* AI provider lỗi không làm crash hệ thống.
* User nhận message an toàn.
* MockAI fallback có thể được kích hoạt.
* AI Audit ghi nhận trạng thái lỗi/fallback.

---

## PAC-TASK-295 - Implement MockAI fallback adapter

Nhóm cần triển khai MockAI adapter để demo ổn định khi Google AI lỗi.

### Nội dung công việc

* Tạo MockAI provider theo cùng interface.
* Trả response mẫu an toàn cho explanation/note draft.
* Không tạo nội dung chẩn đoán/kê đơn/liều dùng.
* Ghi metadata provider_used là MockAI.
* Đảm bảo response vẫn đi qua output guardrail nếu cần.

### Kết quả mong đợi

* Demo không bị gãy khi Google AI lỗi.
* MockAI chỉ đóng vai trò fallback.
* Output MockAI an toàn và nhất quán.
* AI Audit ghi rõ fallback được dùng.

---

## PAC-TASK-296 - Implement fallback provider selection logic

Nhóm cần xây dựng logic chọn fallback provider khi provider chính không khả dụng.

### Nội dung công việc

* Gọi Google AI trước theo config.
* Nếu Google AI timeout/lỗi/quota, chuyển sang MockAI nếu được bật.
* Ghi fallback reason.
* Không fallback nếu guardrail input đã chặn request.
* Trả degraded/fallback indicator cho response nếu cần.

### Kết quả mong đợi

* Provider fallback hoạt động ổn định.
* Hệ thống không nhầm MockAI là primary.
* Audit ghi rõ provider_requested, provider_used và fallback.
* User biết khi nội dung được tạo ở chế độ fallback nếu UI hiển thị.

---

## PAC-TASK-297 - Add provider_requested and provider_used tracking

Nhóm cần theo dõi provider được yêu cầu và provider thực tế đã dùng.

### Nội dung công việc

* Thêm metadata `provider_requested`.
* Thêm metadata `provider_used`.
* Ghi trường hợp Google AI thành công.
* Ghi trường hợp fallback sang MockAI.
* Truyền metadata sang AI Audit Log.

### Kết quả mong đợi

* AI Audit minh bạch provider.
* Dễ kiểm tra khi fallback xảy ra.
* Demo thể hiện được provider governance.
* Không mất thông tin trong luồng AI.

---

## PAC-TASK-298 - Implement AI interaction explanation API

Nhóm cần tạo API để AI giải thích InteractionAlert.

### Nội dung công việc

* Tạo endpoint yêu cầu AI explanation cho một InteractionAlert.
* Kiểm tra permission Staff/Admin.
* Lấy context alert, medicines, active ingredients và rule.
* Gọi AI service sau khi input guardrail pass.
* Trả explanation an toàn kèm disclaimer.

### Kết quả mong đợi

* Staff nhận được giải thích cảnh báo tương tác thuốc.
* AI không tự đưa chẩn đoán/kê đơn/liều dùng.
* Request được audit.
* Response có thể hiển thị trong POS alert panel.

---

## PAC-TASK-299 - Build AI explanation panel in InteractionAlert UI

Nhóm cần xây dựng panel hiển thị nội dung AI explanation trong giao diện InteractionAlert.

### Nội dung công việc

* Thêm nút hoặc tab “AI explanation”.
* Gọi AI explanation API.
* Hiển thị explanation, disclaimer và trạng thái provider/fallback nếu có.
* Xử lý loading/error.
* Không tự lưu explanation thành consultation note.

### Kết quả mong đợi

* Staff xem được explanation dễ hiểu.
* UI không nhầm explanation với ghi chú chính thức.
* Lỗi AI không làm hỏng POS.
* Có disclaimer an toàn.

---

## PAC-TASK-300 - Add AI disclaimer to explanation panel

Nhóm cần thêm disclaimer cho mọi nội dung AI hiển thị cho Staff.

### Nội dung công việc

* Thêm disclaimer trong panel AI.
* Nội dung nêu rõ AI chỉ hỗ trợ tham khảo.
* Không thay thế dược sĩ/bác sĩ/chuyên gia y tế.
* Hiển thị nhất quán trong AI explanation và note draft.
* Không cho user hiểu AI là quyết định cuối cùng.

### Kết quả mong đợi

* AI content có cảnh báo an toàn rõ.
* Demo thể hiện trách nhiệm khi dùng AI.
* User không hiểu nhầm output AI là chỉ định y tế.
* Phù hợp baseline AI safety.

---

## PAC-TASK-301 - Build AI explanation loading, error and fallback states

Nhóm cần xử lý các trạng thái UI khi gọi AI explanation.

### Nội dung công việc

* Hiển thị loading khi đang gọi AI.
* Hiển thị lỗi an toàn khi provider fail.
* Hiển thị fallback indicator nếu dùng MockAI.
* Cho phép thử lại nếu phù hợp.
* Không làm mất InteractionAlert đang hiển thị.

### Kết quả mong đợi

* UX AI ổn định.
* Provider lỗi không làm crash UI.
* Staff biết khi hệ thống đang fallback.
* POS vẫn dùng được nếu AI không khả dụng.

---

## PAC-TASK-302 - Implement AI consultation note draft API

Nhóm cần tạo API để AI sinh consultation note dạng nháp.

### Nội dung công việc

* Tạo endpoint generate note draft cho HIGH InteractionAlert.
* Lấy context alert và order liên quan.
* Chạy input guardrail trước khi gọi AI.
* Trả draft note cho Staff chỉnh sửa.
* Không lưu draft thành official note tự động.

### Kết quả mong đợi

* AI hỗ trợ Staff viết note nhanh hơn.
* Draft chỉ là gợi ý.
* Staff phải confirm trước khi lưu chính thức.
* AI Audit ghi request và metadata.

---

## PAC-TASK-303 - Build AI consultation note draft panel

Nhóm cần xây dựng UI hiển thị AI-generated consultation note draft.

### Nội dung công việc

* Thêm panel hoặc section AI draft trong HIGH alert.
* Gọi API generate draft.
* Hiển thị draft trong textarea editable.
* Hiển thị disclaimer.
* Có trạng thái loading/error/fallback.

### Kết quả mong đợi

* Staff xem và chỉnh sửa AI draft.
* Draft không tự động trở thành consultation note.
* UI hỗ trợ confirmation rõ ràng.
* Lỗi AI không chặn xử lý thủ công.

---

## PAC-TASK-304 - Build Staff edit AI draft before confirm UI

Nhóm cần cho Staff chỉnh sửa AI draft trước khi xác nhận.

### Nội dung công việc

* Cho phép edit nội dung draft trong textarea.
* Validate nội dung không rỗng.
* Thêm nút confirm/save.
* Hiển thị cảnh báo Staff chịu trách nhiệm xác nhận note.
* Không tự động submit khi AI trả response.

### Kết quả mong đợi

* Staff kiểm soát nội dung official note.
* AI chỉ hỗ trợ nháp.
* Note sau khi lưu là quyết định của Staff.
* Rule human confirmation được đảm bảo.

---

## PAC-TASK-305 - Implement Staff confirm AI draft as official consultation note

Nhóm cần triển khai API hoặc service để Staff xác nhận AI draft thành official consultation note.

### Nội dung công việc

* Nhận nội dung đã được Staff xác nhận.
* Validate alert là HIGH và thuộc order hợp lệ.
* Lưu note vào đúng InteractionAlert.
* Ghi actor và thời gian xác nhận.
* Không lưu nếu Staff không bấm confirm.

### Kết quả mong đợi

* Official consultation note chỉ được tạo sau khi Staff confirm.
* Checkout có thể kiểm tra note chính thức.
* Audit rõ ai xác nhận note.
* AI draft không vượt quyền con người.

---

## PAC-TASK-306 - Prevent unconfirmed AI draft from saving official note

Nhóm cần chặn mọi trường hợp AI draft chưa confirm nhưng bị lưu thành official note.

### Nội dung công việc

* Không auto-save AI draft vào InteractionAlert.
* Tách rõ draft response và official note.
* Backend chỉ lưu note qua action confirm.
* Test case generate draft nhưng không confirm.
* Kiểm tra checkout vẫn block nếu chưa có official note.

### Kết quả mong đợi

* AI không tự tạo official medical/pharmacy note.
* Staff confirmation là bắt buộc.
* HIGH alert safety đúng baseline.
* Không có dữ liệu official note sai nguồn.

---

## PAC-TASK-307 - Link confirmed AI note to correct HIGH InteractionAlert

Nhóm cần đảm bảo note sau khi Staff confirm được gắn đúng HIGH InteractionAlert.

### Nội dung công việc

* Validate `interaction_alert_id`.
* Kiểm tra alert thuộc order đang xử lý.
* Kiểm tra severity HIGH.
* Lưu note vào đúng record InteractionAlert.
* Tránh note bị gắn nhầm alert khác trong cùng order.

### Kết quả mong đợi

* Mỗi HIGH alert có note riêng.
* Checkout blocker đọc đúng note.
* Alert history hiển thị chính xác.
* Không có note chung mơ hồ cho toàn order.

---

## PAC-TASK-308 - Implement safe follow-up question API

Nhóm cần tạo API để AI gợi ý câu hỏi follow-up an toàn khi Staff nhập ngữ cảnh ngắn.

### Nội dung công việc

* Tạo endpoint generate safe follow-up questions.
* Chạy input guardrail.
* Chỉ cho phép câu hỏi hỗ trợ tư vấn an toàn.
* Không chẩn đoán, kê đơn hoặc đưa liều dùng.
* Không lưu dữ liệu như medical record.

### Kết quả mong đợi

* Staff có câu hỏi follow-up an toàn.
* Hệ thống không vượt scope y tế.
* Input được kiểm soát bởi guardrail.
* AI Audit ghi metadata request.

---

## PAC-TASK-309 - Build safe follow-up question UI field

Nhóm cần tạo UI nhập ngữ cảnh ngắn và hiển thị câu hỏi follow-up an toàn.

### Nội dung công việc

* Thêm field nhập context ngắn.
* Thêm nút generate follow-up questions.
* Hiển thị danh sách câu hỏi gợi ý.
* Hiển thị lỗi nếu input bị guardrail chặn.
* Không lưu context như hồ sơ y tế.

### Kết quả mong đợi

* Staff dùng được follow-up feature.
* UI rõ ràng về giới hạn của AI.
* Không biến hệ thống thành diagnosis tool.
* Dữ liệu nhạy cảm được hạn chế.

---

## PAC-TASK-310 - Block medical-record style storage for symptom/context input

Nhóm cần chặn việc lưu symptom/context input như medical record thật.

### Nội dung công việc

* Không tạo entity medical record trong MVP.
* Không persist raw symptom/context trừ metadata tối thiểu nếu cần audit.
* Nếu audit cần ghi, chỉ lưu minimized summary.
* Redact PII trước khi AI call.
* Ghi guardrail trong code và docs.

### Kết quả mong đợi

* Hệ thống không lưu hồ sơ y tế thật.
* Privacy risk giảm.
* AI Audit không chứa raw PII.
* Feature follow-up đúng phạm vi demo.

---

## PAC-TASK-311 - Add AI Copilot permission checks

Nhóm cần thêm permission guard cho các API AI Copilot.

### Nội dung công việc

* Gắn permission cho AI explanation API.
* Gắn permission cho AI note draft API.
* Gắn permission cho safe follow-up API.
* Chặn user không có quyền.
* Test Warehouse hoặc role không phù hợp bị 403.

### Kết quả mong đợi

* Chỉ user có quyền mới dùng AI Copilot.
* Warehouse không truy cập AI liên quan InteractionAlert nếu không có quyền.
* Backend enforce quyền.
* AI usage được kiểm soát.

---

## PAC-TASK-312 - Add AI Copilot frontend route and action guards

Nhóm cần kiểm soát UI AI Copilot theo permission.

### Nội dung công việc

* Ẩn nút AI explanation nếu user không có quyền.
* Ẩn AI draft action nếu user không được xử lý alert.
* Không hiển thị AI actions cho Warehouse.
* Nếu truy cập route trực tiếp, chuyển Forbidden.
* Đồng bộ với backend permission.

### Kết quả mong đợi

* UI AI Copilot đúng phân quyền.
* Người không có quyền không thấy action.
* Backend vẫn là nơi enforce chính.
* Demo phân quyền rõ ràng.

---

## PAC-TASK-313 - Add AI provider unit tests

Nhóm cần viết unit test cho provider abstraction và Google AI adapter.

### Nội dung công việc

* Test provider interface.
* Mock Google AI success response.
* Test mapping response về format nội bộ.
* Test provider error.
* Test metadata provider_used.

### Kết quả mong đợi

* Provider layer có test.
* Google AI adapter ít rủi ro hơn.
* Dễ phát hiện lỗi khi thay provider.
* AI service ổn định hơn.

---

## PAC-TASK-314 - Add MockAI fallback tests

Nhóm cần viết test cho MockAI fallback.

### Nội dung công việc

* Test Google AI fail thì fallback MockAI.
* Test fallback disabled thì trả safe error.
* Test provider_used là MockAI.
* Test fallback reason được ghi.
* Test output vẫn an toàn.

### Kết quả mong đợi

* MockAI fallback đáng tin.
* Demo không bị gãy khi provider lỗi.
* Audit ghi fallback đúng.
* Không coi MockAI là primary.

---

## PAC-TASK-315 - Add AI Copilot integration smoke checklist

Nhóm cần viết checklist smoke test cho AI Copilot.

### Nội dung công việc

* Test AI explanation.
* Test AI draft note.
* Test Staff confirm draft.
* Test fallback MockAI.
* Test blocked unsafe request.
* Test AI Audit có metadata.

### Kết quả mong đợi

* Tester kiểm tra AI Copilot nhanh.
* Demo AI ít rủi ro.
* Guardrail và audit được kiểm tra.
* Checklist trace được với Story AI.

---

## PAC-TASK-316 - Define unsafe AI request categories

Nhóm cần định nghĩa các nhóm request AI không an toàn.

### Nội dung công việc

* Liệt kê diagnosis request.
* Liệt kê prescribing request.
* Liệt kê dosage advice request.
* Liệt kê request chứa PII quá mức.
* Liệt kê request ngoài phạm vi pharmacy-support demo.

### Kết quả mong đợi

* Guardrail có rule rõ.
* Developer biết input nào bị chặn.
* Test case dễ viết.
* AI không vượt scope y tế.

---

## PAC-TASK-317 - Implement AI input guardrail service

Nhóm cần triển khai service kiểm tra input trước khi gọi AI provider.

### Nội dung công việc

* Nhận input và context AI.
* Kiểm tra unsafe categories.
* Trả status pass/blocked.
* Không gọi provider nếu input blocked.
* Ghi guardrail result cho audit.

### Kết quả mong đợi

* Input unsafe bị chặn sớm.
* AI provider không nhận nội dung không phù hợp.
* Safe response được trả về.
* Audit ghi input guardrail status.

---

## PAC-TASK-318 - Block diagnosis requests

Nhóm cần chặn request yêu cầu AI chẩn đoán bệnh.

### Nội dung công việc

* Nhận diện câu hỏi yêu cầu chẩn đoán.
* Trả safe response.
* Không gọi AI provider nếu bị chặn.
* Ghi input guardrail status.
* Viết test case diagnosis.

### Kết quả mong đợi

* AI không chẩn đoán bệnh.
* Hệ thống giữ đúng phạm vi đồ án.
* User nhận hướng dẫn an toàn.
* Guardrail rule có test.

---

## PAC-TASK-319 - Block prescribing requests

Nhóm cần chặn request yêu cầu AI kê đơn thuốc.

### Nội dung công việc

* Nhận diện request yêu cầu kê đơn.
* Chặn trước khi gọi provider.
* Trả safe response khuyến nghị hỏi chuyên gia y tế.
* Ghi audit metadata.
* Viết test prescribing request.

### Kết quả mong đợi

* AI không kê đơn thuốc.
* Hệ thống không vượt phạm vi pháp lý/y tế.
* Guardrail rõ ràng.
* Staff không nhận output nguy hiểm.

---

## PAC-TASK-320 - Block dosage advice requests

Nhóm cần chặn request yêu cầu liều dùng cụ thể.

### Nội dung công việc

* Nhận diện yêu cầu dosage cụ thể.
* Không gửi request đến AI provider.
* Trả safe message.
* Ghi guardrail status.
* Test nhiều cách hỏi liều dùng.

### Kết quả mong đợi

* AI không đưa liều dùng cụ thể.
* Nội dung AI an toàn hơn.
* Guardrail đúng baseline.
* Demo không bị rủi ro y tế.

---

## PAC-TASK-321 - Add safe response templates for blocked AI input

Nhóm cần tạo các mẫu phản hồi an toàn khi input bị guardrail chặn.

### Nội dung công việc

* Tạo template cho diagnosis blocked.
* Tạo template cho prescribing blocked.
* Tạo template cho dosage blocked.
* Tạo template cho PII/excessive context.
* Dùng ngôn ngữ thân thiện, rõ ràng.

### Kết quả mong đợi

* User nhận phản hồi nhất quán.
* Không trả lỗi kỹ thuật khó hiểu.
* Guardrail UX tốt hơn.
* Nội dung blocked vẫn an toàn.

---

## PAC-TASK-322 - Add PII minimization before AI provider call

Nhóm cần giảm thiểu PII trước khi gọi AI provider.

### Nội dung công việc

* Xác định dữ liệu tối thiểu cần gửi.
* Không gửi customer info không cần thiết.
* Redact số điện thoại/email nếu không cần.
* Chỉ gửi context interaction cần thiết.
* Ghi metadata minimization nếu cần.

### Kết quả mong đợi

* AI call không chứa PII thừa.
* Privacy risk giảm.
* AI Audit không lưu raw PII.
* Hệ thống phù hợp baseline safety.

---

## PAC-TASK-323 - Redact customer/order unnecessary personal data before AI call

Nhóm cần redact dữ liệu khách hàng/order không cần thiết trước khi gửi AI.

### Nội dung công việc

* Loại bỏ tên khách nếu không cần.
* Loại bỏ phone/email/address nếu có.
* Chỉ giữ medicine/active ingredient/interaction context.
* Kiểm tra payload trước provider call.
* Test redaction.

### Kết quả mong đợi

* Payload AI tối thiểu.
* Không lộ dữ liệu cá nhân không cần thiết.
* AI vẫn đủ context để giải thích alert.
* Compliance tốt hơn.

---

## PAC-TASK-324 - Implement AI output guardrail service

Nhóm cần triển khai service kiểm tra output của AI trước khi hiển thị.

### Nội dung công việc

* Nhận raw AI response.
* Kiểm tra nội dung chẩn đoán/kê đơn/liều dùng.
* Kiểm tra format response.
* Chặn output unsafe.
* Trả safe fallback nếu output bị chặn.

### Kết quả mong đợi

* AI output unsafe không hiển thị.
* Người dùng chỉ thấy nội dung đã kiểm tra.
* Output guardrail status được audit.
* Hệ thống an toàn hơn.

---

## PAC-TASK-325 - Block unsafe AI output before rendering

Nhóm cần đảm bảo frontend không render output AI nếu backend đánh dấu unsafe.

### Nội dung công việc

* Backend trả safe error khi output unsafe.
* Frontend hiển thị safe message.
* Không render raw unsafe content.
* Ghi audit output blocked.
* Test output unsafe.

### Kết quả mong đợi

* Nội dung nguy hiểm không tới Staff.
* UI xử lý lỗi an toàn.
* Guardrail có hiệu lực thực tế.
* Audit minh bạch.

---

## PAC-TASK-326 - Implement structured output schema validation

Nhóm cần validate AI response theo schema có cấu trúc.

### Nội dung công việc

* Định nghĩa schema cho AI explanation.
* Định nghĩa schema cho note draft.
* Validate response trước khi dùng.
* Nếu sai schema, retry/fallback/safe error.
* Không render malformed response.

### Kết quả mong đợi

* AI output có format ổn định.
* Frontend dễ render.
* Lỗi schema được xử lý.
* Giảm rủi ro output không kiểm soát.

---

## PAC-TASK-327 - Add output schema retry or safe fallback handling

Nhóm cần xử lý trường hợp AI output sai schema.

### Nội dung công việc

* Nếu output sai schema, thử retry nếu phù hợp.
* Nếu retry fail, dùng safe fallback.
* Không retry vô hạn.
* Ghi schema validation failure vào audit.
* Trả message thân thiện cho UI.

### Kết quả mong đợi

* Output malformed không làm crash UI.
* Hệ thống có fallback an toàn.
* Audit ghi lỗi schema.
* UX ổn định hơn.

---

## PAC-TASK-328 - Add guardrail status object to AI response

Nhóm cần trả guardrail status trong AI response.

### Nội dung công việc

* Thêm inputGuardrailStatus.
* Thêm outputGuardrailStatus.
* Thêm blockedReason nếu có.
* Thêm fallback/degraded indicator nếu cần.
* Trả metadata cho UI/audit.

### Kết quả mong đợi

* UI biết trạng thái safety.
* Audit có metadata đầy đủ.
* Debug dễ hơn.
* Guardrail minh bạch.

---

## PAC-TASK-329 - Create ai_audit_logs Prisma model

Nhóm cần tạo model AI Audit Log trong database.

### Nội dung công việc

* Tạo model `AIAuditLog`.
* Lưu user id, use case, provider, model, prompt version.
* Lưu guardrail statuses.
* Lưu latency, request id, fallback metadata.
* Không lưu raw PII.

### Kết quả mong đợi

* Mọi AI request có thể audit.
* Admin có dữ liệu xem lại.
* Metadata đủ để demo AI governance.
* Privacy rule được bảo vệ.

---

## PAC-TASK-330 - Implement AI audit log write service

Nhóm cần tạo service ghi AI audit log.

### Nội dung công việc

* Tạo service write audit.
* Gọi service ở các AI flows.
* Ghi cả success, blocked, provider error và fallback.
* Không làm AI API fail nếu audit logging có lỗi nhẹ, tùy thiết kế.
* Chuẩn hóa metadata.

### Kết quả mong đợi

* AI usage được ghi đầy đủ.
* Audit logic tái sử dụng.
* Dễ mở rộng cho AI flows khác.
* Không lưu dữ liệu nhạy cảm thừa.

---

## PAC-TASK-331 - Persist AI provider, model and prompt metadata

Nhóm cần lưu metadata provider, model và prompt cho mỗi AI request.

### Nội dung công việc

* Lưu provider_requested.
* Lưu provider_used.
* Lưu model name/version nếu có.
* Lưu prompt template id/version.
* Lưu use case của AI request.

### Kết quả mong đợi

* AI Audit có provenance kỹ thuật.
* Biết request dùng provider/model nào.
* Biết prompt version nào tạo output.
* Dễ giải thích khi demo.

---

## PAC-TASK-332 - Persist input and output guardrail statuses

Nhóm cần lưu trạng thái input/output guardrail trong AI Audit.

### Nội dung công việc

* Lưu inputGuardrailStatus.
* Lưu outputGuardrailStatus.
* Lưu blockedReason nếu có.
* Lưu safe fallback status nếu có.
* Không lưu raw unsafe content.

### Kết quả mong đợi

* Audit biết request bị chặn hay pass.
* Admin có thể kiểm tra guardrail hoạt động.
* Safety trace rõ ràng.
* Không lộ nội dung nhạy cảm.

---

## PAC-TASK-333 - Persist AI latency, request id and fallback metadata

Nhóm cần lưu metadata vận hành của AI request.

### Nội dung công việc

* Ghi latency ms.
* Ghi request id/correlation id.
* Ghi fallbackUsed true/false.
* Ghi fallbackReason nếu có.
* Ghi provider error code tóm tắt nếu phù hợp.

### Kết quả mong đợi

* AI Audit hỗ trợ debug.
* Demo có dữ liệu minh bạch.
* Fallback được trace.
* Không cần log raw prompt/response chứa PII.

---

## PAC-TASK-334 - Ensure AI Audit does not store raw PII

Nhóm cần đảm bảo AI Audit không lưu raw PII.

### Nội dung công việc

* Rà soát fields của ai_audit_logs.
* Không lưu raw customer input chứa PII.
* Chỉ lưu minimized summary/metadata.
* Redact nếu cần.
* Viết test hoặc checklist privacy.

### Kết quả mong đợi

* AI Audit an toàn hơn.
* Không lộ thông tin khách hàng.
* Tuân thủ baseline privacy.
* Dữ liệu audit vẫn đủ dùng cho demo.

---

## PAC-TASK-335 - Build Admin AI Audit Log list API

Nhóm cần tạo API cho Admin xem danh sách AI Audit Logs.

### Nội dung công việc

* Tạo endpoint list AI audit logs.
* Gắn permission Admin.
* Hỗ trợ pagination.
* Trả metadata chính, không trả raw PII.
* Filter cơ bản nếu cần.

### Kết quả mong đợi

* Admin xem được lịch sử AI usage.
* API không lộ dữ liệu nhạy cảm.
* UI audit có dữ liệu.
* Staff không xem toàn bộ audit nếu không có quyền.

---

## PAC-TASK-336 - Build Admin AI Audit Log UI

Nhóm cần xây dựng UI xem AI Audit Log cho Admin.

### Nội dung công việc

* Hiển thị danh sách AI audit.
* Hiển thị provider/model/use case/status.
* Hiển thị fallback và guardrail statuses.
* Không hiển thị raw PII.
* Xử lý loading/empty/error.

### Kết quả mong đợi

* Admin kiểm tra được AI governance.
* Demo thể hiện AI Audit bắt buộc.
* UI rõ ràng.
* Dữ liệu nhạy cảm được bảo vệ.

---

## PAC-TASK-337 - Add AI Audit filters by provider, status and date

Nhóm cần thêm filter cơ bản cho AI Audit Log.

### Nội dung công việc

* Filter theo provider_used.
* Filter theo guardrail status.
* Filter theo date range.
* Validate query params.
* UI cập nhật bảng theo filter.

### Kết quả mong đợi

* Admin tìm audit dễ hơn.
* Filter không làm lộ dữ liệu.
* UI hữu ích hơn.
* Không biến thành analytics nâng cao ngoài scope.

---

## PAC-TASK-338 - Create prompt_templates Prisma model

Nhóm cần tạo model lưu prompt template có version.

### Nội dung công việc

* Tạo model `PromptTemplate`.
* Lưu code, version, content, status.
* Đánh dấu prompt approved/active nếu cần.
* Tạo unique constraint code + version.
* Tạo migration.

### Kết quả mong đợi

* Prompt có version rõ ràng.
* AI service load prompt từ backend.
* Audit ghi prompt version được.
* Prompt management UI không bắt buộc MVP.

---

## PAC-TASK-339 - Seed official AI prompt templates with versions

Nhóm cần seed prompt chính thức cho AI MVP.

### Nội dung công việc

* Seed prompt AI explanation.
* Seed prompt consultation note draft.
* Seed prompt safe follow-up questions.
* Gán version rõ ràng.
* Seeder idempotent.

### Kết quả mong đợi

* Hệ thống có prompt official ngay sau setup.
* AI Audit ghi được prompt version.
* Không dùng prompt rời không trace được.
* Demo ổn định hơn.

---

## PAC-TASK-340 - Load approved prompt template by use case

Nhóm cần load prompt template theo use case AI.

### Nội dung công việc

* Xác định use case AI.
* Query prompt template active/approved.
* Nếu thiếu prompt, trả safe config error.
* Không hard-code prompt dài trong service nếu có thể.
* Ghi prompt version vào request metadata.

### Kết quả mong đợi

* AI dùng prompt đúng version.
* Prompt governance rõ ràng.
* Thiếu prompt không gây output không kiểm soát.
* Audit đầy đủ hơn.

---

## PAC-TASK-341 - Record prompt version in AI audit

Nhóm cần ghi prompt version vào AI Audit Log.

### Nội dung công việc

* Lấy prompt template id/version khi gọi AI.
* Truyền metadata vào audit service.
* Lưu prompt code và version.
* Test audit có prompt version.
* Không bỏ trống nếu request dùng prompt seeded.

### Kết quả mong đợi

* Mỗi AI output trace được prompt version.
* Admin biết output sinh từ prompt nào.
* Demo AI governance thuyết phục hơn.
* Prompt thay đổi sau này không làm mất trace.

---

## PAC-TASK-342 - Add backend AI provider/model config validation

Nhóm cần validate cấu hình provider/model AI ở backend.

### Nội dung công việc

* Kiểm tra provider chính có hợp lệ.
* Kiểm tra model name có cấu hình.
* Kiểm tra API key tồn tại khi dùng Google AI.
* Kiểm tra fallback config.
* Trả lỗi cấu hình rõ ràng.

### Kết quả mong đợi

* Hệ thống phát hiện cấu hình AI sai sớm.
* Không crash mơ hồ khi gọi AI.
* Secret không lộ ra frontend.
* Setup demo đáng tin hơn.

---

## PAC-TASK-343 - Add environment/database config fallback order for AI settings

Nhóm cần xác định thứ tự lấy config AI từ environment/database.

### Nội dung công việc

* Định nghĩa ưu tiên config.
* Nếu database setting không có, dùng environment.
* Nếu thiếu cả hai, trả safe config error.
* Ghi rõ logic trong docs.
* Test fallback config.

### Kết quả mong đợi

* Config AI rõ ràng.
* Không mâu thuẫn giữa env và database.
* Dễ setup local/demo.
* Không cần Admin provider UI trong MVP.

---

## PAC-TASK-344 - Add timeout, circuit breaker and rate-limit guard for AI calls

Nhóm cần thêm các guard vận hành cho AI calls.

### Nội dung công việc

* Thêm timeout mặc định.
* Thêm cơ chế hạn chế retry.
* Thêm rate-limit hoặc request guard nếu cần.
* Trả safe error khi quá tải.
* Ghi audit metadata.

### Kết quả mong đợi

* AI call không treo hệ thống.
* Provider lỗi không làm backend quá tải.
* Demo ổn định hơn.
* AI service an toàn hơn.

---

## PAC-TASK-345 - Add AI safe error response helper

Nhóm cần tạo helper trả lỗi an toàn cho AI flows.

### Nội dung công việc

* Tạo message lỗi chung cho provider unavailable.
* Tạo message lỗi cho unsafe input/output.
* Tạo message lỗi cho config thiếu.
* Không expose stack trace.
* Dùng chung cho AI APIs.

### Kết quả mong đợi

* Error response AI nhất quán.
* UI dễ hiển thị.
* Không lộ thông tin kỹ thuật nhạy cảm.
* UX tốt hơn khi AI fail.

---

## PAC-TASK-346 - Add AI input guardrail unit tests

Nhóm cần viết test cho input guardrail service.

### Nội dung công việc

* Test input an toàn pass.
* Test input unsafe blocked.
* Test guardrail status.
* Test provider không được gọi khi blocked.
* Test safe response.

### Kết quả mong đợi

* Input guardrail có test.
* Rule safety được bảo vệ.
* CI phát hiện regression.
* AI không nhận input nguy hiểm.

---

## PAC-TASK-347 - Add diagnosis block tests

Nhóm cần viết test riêng cho chặn yêu cầu chẩn đoán.

### Nội dung công việc

* Test nhiều mẫu câu chẩn đoán.
* Test câu hỏi an toàn không bị chặn nhầm quá mức.
* Kiểm tra safe response.
* Kiểm tra audit blocked reason.
* Kiểm tra provider không được gọi.

### Kết quả mong đợi

* Diagnosis block đáng tin.
* Không phát sinh output chẩn đoán.
* Guardrail có bằng chứng test.
* Demo an toàn hơn.

---

## PAC-TASK-348 - Add prescribing block tests

Nhóm cần viết test cho chặn yêu cầu kê đơn.

### Nội dung công việc

* Test câu yêu cầu AI kê thuốc.
* Test câu yêu cầu thay thuốc.
* Test provider không được gọi.
* Test blocked reason.
* Test safe response.

### Kết quả mong đợi

* AI không kê đơn.
* Guardrail bắt được request nguy hiểm.
* Audit ghi đúng.
* Safety rule có test.

---

## PAC-TASK-349 - Add dosage advice block tests

Nhóm cần viết test cho chặn yêu cầu liều dùng cụ thể.

### Nội dung công việc

* Test câu hỏi “uống bao nhiêu mg”.
* Test câu hỏi “ngày uống mấy lần”.
* Test request dosage theo tuổi/cân nặng.
* Kiểm tra safe response.
* Kiểm tra provider không gọi.

### Kết quả mong đợi

* AI không đưa liều cụ thể.
* Guardrail đúng baseline.
* Test bảo vệ rule y tế.
* Output an toàn hơn.

---

## PAC-TASK-350 - Add AI output guardrail tests

Nhóm cần viết test cho output guardrail.

### Nội dung công việc

* Mock output an toàn.
* Mock output chứa diagnosis/prescribing/dosage.
* Kiểm tra unsafe output bị chặn.
* Kiểm tra safe fallback response.
* Kiểm tra audit output status.

### Kết quả mong đợi

* Output unsafe không render.
* Guardrail hai chiều hoạt động.
* AI response được kiểm soát.
* CI bắt lỗi output safety.

---

## PAC-TASK-351 - Add structured output validation tests

Nhóm cần viết test cho schema validation của AI output.

### Nội dung công việc

* Test output đúng schema.
* Test output thiếu field bắt buộc.
* Test output sai kiểu dữ liệu.
* Test retry/fallback khi schema invalid.
* Test UI không render malformed output.

### Kết quả mong đợi

* AI output format ổn định.
* Schema validation có test.
* Lỗi provider không làm crash UI.
* Data contract rõ ràng.

---

## PAC-TASK-352 - Add PII minimization tests

Nhóm cần viết test đảm bảo PII không bị gửi/lưu thừa.

### Nội dung công việc

* Test input có phone/email.
* Kiểm tra payload gửi provider đã redact.
* Kiểm tra AI Audit không chứa raw PII.
* Test chỉ giữ metadata cần thiết.
* Ghi expected behavior.

### Kết quả mong đợi

* Privacy guard có test.
* AI payload tối thiểu.
* Audit an toàn hơn.
* Dữ liệu cá nhân không bị lộ không cần thiết.

---

## PAC-TASK-353 - Add AI audit integration tests

Nhóm cần viết integration test cho AI Audit Log.

### Nội dung công việc

* Test AI success ghi audit.
* Test guardrail blocked ghi audit.
* Test fallback ghi audit.
* Test provider error ghi audit.
* Kiểm tra không có raw PII.

### Kết quả mong đợi

* AI Audit bắt buộc được kiểm tra.
* Metadata đầy đủ.
* Privacy rule được bảo vệ.
* Demo có dữ liệu audit đáng tin.

---

## PAC-TASK-354 - Add prompt versioning tests

Nhóm cần viết test cho prompt template versioning.

### Nội dung công việc

* Test load prompt active.
* Test thiếu prompt trả lỗi an toàn.
* Test prompt version ghi vào audit.
* Test nhiều version không nhầm.
* Test seed idempotent.

### Kết quả mong đợi

* Prompt governance có test.
* AI output trace được prompt.
* Không dùng prompt không version.
* CI bảo vệ prompt flow.

---

## PAC-TASK-355 - Add AI safety traceability notes

Nhóm cần ghi chú traceability cho AI safety.

### Nội dung công việc

* Link Task AI với Story/Requirement/Test.
* Ghi guardrail diagnosis/prescribing/dosage.
* Ghi AI Audit metadata.
* Ghi MockAI fallback scope.
* Ghi rule Staff confirmation.

### Kết quả mong đợi

* Tài liệu AI rõ ràng.
* Tester biết case cần kiểm tra.
* AI agent không code sai baseline.
* Demo dễ giải thích hơn.

---

# Sprint 8 — Graph Sync, Neo4j Projection, Freshness

## PAC-TASK-356 - Create graph_sync_outbox Prisma model

Nhóm cần tạo model outbox để đồng bộ PostgreSQL sang Neo4j.

### Nội dung công việc

* Tạo model `GraphSyncOutbox`.
* Lưu entity type, entity id, event type, source version.
* Lưu status, retry count, error message.
* Thêm timestamps.
* Tạo migration.

### Kết quả mong đợi

* PostgreSQL có hàng chờ sync graph.
* Worker có nguồn job để xử lý.
* Graph Sync có thể retry/audit.
* PostgreSQL vẫn là source of truth.

---

## PAC-TASK-357 - Add graph sync job status enum

Nhóm cần định nghĩa enum trạng thái job Graph Sync.

### Nội dung công việc

* Định nghĩa PENDING.
* Định nghĩa PROCESSING.
* Định nghĩa SUCCESS.
* Định nghĩa FAILED.
* Áp dụng enum cho graph_sync_outbox.

### Kết quả mong đợi

* Job lifecycle rõ ràng.
* Worker xử lý trạng thái nhất quán.
* Freshness detection đọc được pending/failed.
* Debug dễ hơn.

---

## PAC-TASK-358 - Emit outbox event from Medicine changes

Nhóm cần tạo outbox event khi Medicine thay đổi.

### Nội dung công việc

* Khi create/update/deactivate Medicine, tạo outbox job.
* Ghi entity type Medicine.
* Ghi source id và event type.
* Ghi source version nếu có.
* Không gọi Neo4j trực tiếp từ Medicine API.

### Kết quả mong đợi

* Medicine được sync sang Neo4j qua worker.
* Projection không bỏ sót thay đổi.
* Source of truth vẫn là PostgreSQL.
* Graph Sync đúng kiến trúc.

---

## PAC-TASK-359 - Emit outbox event from ActiveIngredient changes

Nhóm cần tạo outbox event khi ActiveIngredient thay đổi.

### Nội dung công việc

* Tạo job khi ActiveIngredient create/update/deactivate.
* Ghi entity type ActiveIngredient.
* Ghi action và source version.
* Đảm bảo event tạo trong transaction nếu cần.
* Không sync trực tiếp từ controller.

### Kết quả mong đợi

* ActiveIngredient projection được cập nhật.
* Neo4j có dữ liệu hoạt chất đúng.
* Graph freshness kiểm tra được.
* Worker xử lý thống nhất.

---

## PAC-TASK-360 - Emit outbox event from Medicine-Ingredient mapping changes

Nhóm cần tạo outbox event khi mapping Medicine–ActiveIngredient thay đổi.

### Nội dung công việc

* Tạo event khi thêm/xóa/cập nhật mapping.
* Ghi entity type MedicineIngredientMapping hoặc Medicine.
* Đảm bảo mapping và event nhất quán.
* Chuẩn bị cho CONTAINS projection.
* Không bỏ sót thay đổi quan hệ.

### Kết quả mong đợi

* CONTAINS relationship được sync.
* Graph-RAG có context medicine-ingredient đúng.
* Freshness detection biết mapping pending.
* Projection đáng tin hơn.

---

## PAC-TASK-361 - Emit outbox event from DrugInteractionRule changes

Nhóm cần tạo outbox event khi rule tương tác thay đổi.

### Nội dung công việc

* Tạo job khi create/update/deactivate DrugInteractionRule.
* Ghi entity type InteractionRule.
* Ghi rule id, event type, source version.
* Đảm bảo edge INTERACTS_WITH được update sau.
* Không tạo Medicine–Medicine edge authoritative.

### Kết quả mong đợi

* Neo4j interaction projection cập nhật đúng.
* Rule inactive được sync isActive=false.
* Graph-RAG có dữ liệu mới.
* PostgreSQL vẫn là nguồn chính.

---

## PAC-TASK-362 - Implement Graph Sync worker loop

Nhóm cần triển khai worker xử lý graph_sync_outbox jobs.

### Nội dung công việc

* Poll pending jobs.
* Claim job an toàn.
* Gọi handler theo entity type.
* Cập nhật status success/failed.
* Ghi retry count và error nếu fail.

### Kết quả mong đợi

* Graph Sync chạy tự động.
* Job được xử lý có trạng thái rõ.
* Lỗi không làm mất job.
* Neo4j projection được cập nhật.

---

## PAC-TASK-363 - Configure Neo4j connection service

Nhóm cần cấu hình service kết nối Neo4j.

### Nội dung công việc

* Đọc URI, username, password từ env/config.
* Tạo Neo4j driver/service.
* Không hard-code credentials.
* Đóng connection đúng lifecycle.
* Xử lý lỗi kết nối.

### Kết quả mong đợi

* Backend kết nối Neo4j được.
* Secret không lộ trong code.
* Worker dùng chung connection service.
* Graph features có nền tảng ổn định.

---

## PAC-TASK-364 - Add Neo4j health check

Nhóm cần thêm health check cho Neo4j.

### Nội dung công việc

* Tạo health check query đơn giản.
* Trả trạng thái available/unavailable.
* Không expose credentials.
* Dùng cho debug/demo.
* Có thể dùng trong Graph-RAG fallback decision.

### Kết quả mong đợi

* Biết Neo4j đang hoạt động hay không.
* Lỗi graph dễ phát hiện.
* Graph-RAG có thể fallback khi unavailable.
* Demo an toàn hơn.

---

## PAC-TASK-365 - Implement idempotent graph job claiming

Nhóm cần xử lý claiming job graph sync an toàn.

### Nội dung công việc

* Worker claim job pending.
* Tránh nhiều worker xử lý cùng một job.
* Cập nhật status PROCESSING.
* Nếu job lặp, upsert idempotent.
* Không tạo duplicate graph data.

### Kết quả mong đợi

* Graph job xử lý ổn định.
* Không duplicate node/edge.
* Worker có thể chạy lại an toàn.
* Projection nhất quán.

---

## PAC-TASK-366 - Upsert Medicine node to Neo4j

Nhóm cần sync Medicine node sang Neo4j.

### Nội dung công việc

* Lấy Medicine từ PostgreSQL.
* Upsert node Medicine bằng relational id.
* Lưu name/code/isActive/sourceVersion.
* Lưu syncedAt.
* Không tạo dữ liệu không có source.

### Kết quả mong đợi

* Neo4j có Medicine node.
* Node trace được về PostgreSQL.
* Update/deactivate sync đúng.
* Graph-RAG có medicine context.

---

## PAC-TASK-367 - Upsert ActiveIngredient node to Neo4j

Nhóm cần sync ActiveIngredient node sang Neo4j.

### Nội dung công việc

* Lấy ActiveIngredient từ PostgreSQL.
* Upsert node ActiveIngredient.
* Lưu relational id, name, normalized name, isActive.
* Lưu sourceVersion/syncedAt.
* Không tạo node từ raw scraped string.

### Kết quả mong đợi

* Neo4j có ActiveIngredient nodes chuẩn.
* Graph interaction dựa trên hoạt chất.
* Projection trace được.
* Dữ liệu graph sạch.

---

## PAC-TASK-368 - Upsert CONTAINS relationship

Nhóm cần sync quan hệ Medicine chứa ActiveIngredient.

### Nội dung công việc

* Lấy mapping Medicine–ActiveIngredient.
* Upsert relationship Medicine-[:CONTAINS]->ActiveIngredient.
* Lưu metadata nếu cần.
* Xử lý mapping bị xóa/deactivate.
* Chỉ query active data trong normal flow.

### Kết quả mong đợi

* Graph thể hiện thuốc chứa hoạt chất.
* Graph-RAG có đường context đúng.
* Không tạo relationship trùng.
* Mapping thay đổi được phản ánh.

---

## PAC-TASK-369 - Upsert INTERACTS_WITH relationship

Nhóm cần sync rule tương tác sang Neo4j dưới dạng edge giữa ActiveIngredient.

### Nội dung công việc

* Lấy DrugInteractionRule từ PostgreSQL.
* Upsert relationship ActiveIngredient-[:INTERACTS_WITH]->ActiveIngredient.
* Lưu ruleId, severity, description, recommendation.
* Lưu isActive, sourceVersion, syncedAt.
* Không tạo Medicine–Medicine authoritative edge.

### Kết quả mong đợi

* Graph có interaction edge đúng baseline.
* Graph-RAG lấy được interaction context.
* Edge trace được về rule PostgreSQL.
* Rule inactive vẫn có thể lưu isActive=false.

---

## PAC-TASK-370 - Implement canonical directed interaction edge logic

Nhóm cần thống nhất hướng lưu INTERACTS_WITH edge.

### Nội dung công việc

* Xác định canonical direction theo id hoặc normalized key.
* Khi query, xử lý semantically symmetric.
* Không tạo duplicate hai chiều không kiểm soát.
* Test cặp ingredient đảo chiều.
* Ghi rõ logic trong code.

### Kết quả mong đợi

* Graph không bị duplicate edges.
* Query interaction vẫn đúng theo ý nghĩa symmetric.
* Projection ổn định.
* Dễ debug và demo.

---

## PAC-TASK-371 - Store rule properties on INTERACTS_WITH relationship

Nhóm cần lưu các property quan trọng của rule lên edge INTERACTS_WITH.

### Nội dung công việc

* Lưu ruleId.
* Lưu severity.
* Lưu description.
* Lưu recommendation.
* Lưu isActive/sourceVersion/syncedAt.

### Kết quả mong đợi

* Graph edge có đủ context.
* Graph-RAG không phải đoán thông tin.
* Provenance rõ.
* Không cần Interaction node trong MVP.

---

## PAC-TASK-372 - Store sourceVersion, sourceUpdatedAt and syncedAt metadata

Nhóm cần lưu metadata phục vụ freshness detection.

### Nội dung công việc

* Lưu sourceVersion trên node/edge.
* Lưu sourceUpdatedAt từ PostgreSQL.
* Lưu syncedAt khi projection thành công.
* Cập nhật metadata khi sync lại.
* Dùng metadata cho freshness service.

### Kết quả mong đợi

* Biết graph đang sync tới version nào.
* Stale graph có thể phát hiện.
* Graph-RAG có freshness metadata.
* Projection đáng tin hơn.

---

## PAC-TASK-373 - Mark deactivated Medicine and ActiveIngredient as isActive=false

Nhóm cần xử lý deactivation trong Neo4j bằng isActive=false.

### Nội dung công việc

* Khi Medicine inactive, update node isActive=false.
* Khi ActiveIngredient inactive, update node isActive=false.
* Không xóa cứng node nếu cần trace.
* Normal query chỉ lấy active data.
* Test deactivate sync.

### Kết quả mong đợi

* Graph giữ lịch sử projection.
* Query bình thường không dùng inactive data.
* Deactivation đúng baseline.
* Graph không mất provenance.

---

## PAC-TASK-374 - Mark deactivated interaction rule edge as isActive=false

Nhóm cần xử lý deactivate rule trên edge INTERACTS_WITH.

### Nội dung công việc

* Khi rule inactive, update edge isActive=false.
* Không xóa cứng edge nếu cần trace.
* Normal query lọc isActive=true.
* Lưu syncedAt mới.
* Test rule deactivation.

### Kết quả mong đợi

* Inactive rule không dùng trong Graph-RAG normal context.
* Dữ liệu vẫn trace được.
* PostgreSQL source và graph projection nhất quán.
* Không hiển thị rule đã deactivate như active.

---

## PAC-TASK-375 - Filter normal Neo4j queries to active data only

Nhóm cần đảm bảo query graph bình thường chỉ lấy dữ liệu active.

### Nội dung công việc

* Thêm filter isActive=true cho Medicine/ActiveIngredient.
* Thêm filter isActive=true cho INTERACTS_WITH edge.
* Áp dụng trong Graph-RAG templates.
* Test inactive data không xuất hiện.
* Không ảnh hưởng admin/debug nếu sau này có scope riêng.

### Kết quả mong đợi

* Graph-RAG không dùng dữ liệu inactive.
* Alert explanation không dựa trên rule cũ.
* Query nhất quán với PostgreSQL active data.
* Safety tốt hơn.

---

## PAC-TASK-376 - Implement retry logic for failed graph sync jobs

Nhóm cần triển khai retry cho graph sync job lỗi.

### Nội dung công việc

* Khi job fail, tăng retry count.
* Đặt lại status pending nếu còn retry.
* Lưu error message tóm tắt.
* Không retry vô hạn.
* Worker xử lý job retry.

### Kết quả mong đợi

* Lỗi tạm thời có thể tự phục hồi.
* Graph Sync đáng tin hơn.
* Failed job không bị mất.
* Freshness detection biết job pending/failed.

---

## PAC-TASK-377 - Add max retry and failed status handling

Nhóm cần giới hạn số lần retry graph sync.

### Nội dung công việc

* Định nghĩa max retry.
* Khi vượt max retry, set status FAILED.
* Ghi last error.
* Không tiếp tục retry vô hạn.
* Log hoặc audit failure.

### Kết quả mong đợi

* Worker không kẹt vì job lỗi.
* Failed jobs rõ ràng.
* Graph freshness detect được failed relevant job.
* Dễ debug và demo degraded state.

---

## PAC-TASK-378 - Log graph sync failure details

Nhóm cần log chi tiết lỗi graph sync ở mức an toàn.

### Nội dung công việc

* Log job id, entity type, entity id.
* Log error message tóm tắt.
* Không log secret Neo4j.
* Ghi retry count.
* Hỗ trợ debug worker.

### Kết quả mong đợi

* Lỗi Graph Sync dễ tìm.
* Không lộ credentials.
* Team biết job nào fail.
* Freshness/fallback flow dễ kiểm tra.

---

## PAC-TASK-379 - Write audit log for graph sync failures

Nhóm cần ghi audit log khi graph sync job fail nghiêm trọng.

### Nội dung công việc

* Ghi event graph_sync_failed.
* Ghi job/entity liên quan.
* Ghi thời gian và error summary.
* Không lưu secret.
* Dùng cho Admin/debug nếu có UI sau này.

### Kết quả mong đợi

* Failure có dấu vết rõ.
* Backend audit logging đầy đủ hơn.
* Demo có thể giải thích fallback/degraded.
* Không phụ thuộc UI Graph Sync Status trong MVP.

---

## PAC-TASK-380 - Implement graph projection source version tracking

Nhóm cần theo dõi source version đã được projection sang Neo4j.

### Nội dung công việc

* Lưu source version trên node/edge.
* Cập nhật khi sync thành công.
* So sánh với PostgreSQL source version.
* Dùng cho freshness detection.
* Test version mismatch.

### Kết quả mong đợi

* Biết graph đã sync đến version nào.
* Freshness không chỉ dựa vào thời gian.
* Graph-RAG tránh dùng stale graph âm thầm.
* Projection đáng tin.

---

## PAC-TASK-381 - Implement graph freshness detection service

Nhóm cần tạo service xác định graph fresh hay stale cho query liên quan.

### Nội dung công việc

* Nhận entity/rule context cần kiểm tra.
* Kiểm tra source version projection.
* Kiểm tra outbox pending/failed liên quan.
* Trả freshness status.
* Trả reason nếu stale.

### Kết quả mong đợi

* Graph-RAG biết graph có fresh không.
* Stale graph không được dùng âm thầm.
* PostgreSQL fallback có điều kiện rõ.
* Demo thể hiện kỹ thuật Graph Sync tốt hơn.

---

## PAC-TASK-382 - Detect stale graph from pending outbox job

Nhóm cần đánh dấu graph stale nếu có outbox job pending liên quan.

### Nội dung công việc

* Query graph_sync_outbox theo entity/rule liên quan.
* Nếu có pending job chưa sync, đánh dấu stale.
* Trả reason pending_job.
* Không dùng graph làm context chính.
* Test pending job case.

### Kết quả mong đợi

* Graph freshness chính xác hơn.
* Không dùng graph khi có dữ liệu chưa sync.
* Graph-RAG fallback đúng.
* Safety của explanation tốt hơn.

---

## PAC-TASK-383 - Detect stale graph from failed relevant outbox job

Nhóm cần đánh dấu stale khi có job sync failed liên quan.

### Nội dung công việc

* Kiểm tra failed outbox jobs liên quan query.
* Nếu failed, trả stale status.
* Trả reason failed_job.
* Kích hoạt fallback PostgreSQL nếu có.
* Test failed job case.

### Kết quả mong đợi

* Graph không được dùng khi sync lỗi.
* Failure không bị che giấu.
* Graph-RAG trả degraded/freshness indicator.
* Debug dễ hơn.

---

## PAC-TASK-384 - Detect stale graph from missing sourceVersion projection

Nhóm cần phát hiện graph stale nếu projection thiếu sourceVersion mới nhất.

### Nội dung công việc

* Lấy source version từ PostgreSQL.
* Lấy projected version từ Neo4j.
* So sánh version.
* Nếu thiếu hoặc thấp hơn, đánh dấu stale.
* Test missing projection.

### Kết quả mong đợi

* Freshness không phụ thuộc chỉ vào outbox.
* Graph thiếu dữ liệu được phát hiện.
* Graph-RAG fallback chính xác.
* Stale graph không dùng âm thầm.

---

## PAC-TASK-385 - Add Graph Sync worker unit tests

Nhóm cần viết unit test cho Graph Sync worker.

### Nội dung công việc

* Test claim pending job.
* Test xử lý success.
* Test xử lý failure.
* Test retry count.
* Test không xử lý duplicate job sai.

### Kết quả mong đợi

* Worker logic có test.
* Retry/failure flow ổn định.
* CI phát hiện lỗi worker.
* Graph Sync đáng tin hơn.

---

## PAC-TASK-386 - Add Neo4j projection integration tests

Nhóm cần viết integration test cho Neo4j projection.

### Nội dung công việc

* Test sync Medicine node.
* Test sync ActiveIngredient node.
* Test sync CONTAINS relationship.
* Test metadata sourceVersion/syncedAt.
* Test deactivate isActive=false.

### Kết quả mong đợi

* Projection sang Neo4j có bằng chứng test.
* Graph data đúng với PostgreSQL.
* Không tạo duplicate node/edge.
* Graph-RAG có nền dữ liệu đúng.

---

## PAC-TASK-387 - Add INTERACTS_WITH projection tests

Nhóm cần viết test riêng cho projection INTERACTS_WITH.

### Nội dung công việc

* Test active rule tạo edge.
* Test update rule cập nhật edge.
* Test deactivate rule set isActive=false.
* Test canonical direction.
* Test properties ruleId/severity.

### Kết quả mong đợi

* Interaction graph đúng baseline.
* Không tạo Medicine–Medicine authoritative edge.
* Rule projection trace được.
* Neo4j context đáng tin hơn.

---

## PAC-TASK-388 - Add graph freshness detection tests

Nhóm cần viết test cho graph freshness service.

### Nội dung công việc

* Test graph fresh.
* Test pending outbox stale.
* Test failed job stale.
* Test missing sourceVersion stale.
* Test reason trả về đúng.

### Kết quả mong đợi

* Freshness logic có test.
* Graph-RAG fallback có nền tảng.
* Stale graph không dùng âm thầm.
* CI bảo vệ Graph Sync safety.

---

## PAC-TASK-389 - Add graph sync retry and failure tests

Nhóm cần viết test cho retry/failure logic của Graph Sync.

### Nội dung công việc

* Test job fail tăng retry.
* Test retry dưới max.
* Test vượt max set FAILED.
* Test error message được lưu.
* Test failed job ảnh hưởng freshness.

### Kết quả mong đợi

* Retry logic đáng tin.
* Worker không retry vô hạn.
* Failure được ghi nhận.
* Graph freshness hoạt động đúng.

---

## PAC-TASK-390 - Add Graph Sync traceability notes

Nhóm cần ghi chú traceability cho Graph Sync.

### Nội dung công việc

* Link Task Graph Sync với Story/Requirement/Test.
* Ghi source of truth là PostgreSQL.
* Ghi Neo4j là projection.
* Ghi outbox/retry/failure/freshness.
* Ghi guardrail không dùng raw Cypher seed làm official sync.

### Kết quả mong đợi

* Tài liệu Graph Sync rõ ràng.
* AI agent không code sai kiến trúc.
* Tester biết case cần kiểm tra.
* Demo giải thích được Graph Sync.

---

# Sprint 9 — Graph-RAG, Reports, Settings

## PAC-TASK-391 - Implement Graph-RAG interaction explanation service

Nhóm cần triển khai service Graph-RAG hỗ trợ giải thích interaction.

### Nội dung công việc

* Nhận InteractionAlert hoặc order context.
* Kiểm tra graph freshness.
* Lấy graph context nếu fresh.
* Chuẩn bị context cho AI Copilot.
* Trả metadata graphUsed/freshness/provenance.

### Kết quả mong đợi

* Graph-RAG hỗ trợ AI explanation.
* Không dùng graph nếu stale/unavailable.
* Response có metadata rõ.
* Graph không quyết định checkout.

---

## PAC-TASK-392 - Build allowlisted graph query templates

Nhóm cần xây dựng query templates an toàn cho Neo4j.

### Nội dung công việc

* Định nghĩa template lấy Medicine-CONTAINS-ActiveIngredient.
* Định nghĩa template lấy INTERACTS_WITH.
* Không cho raw Cypher input từ Staff.
* Parameterize query.
* Giới hạn result/depth nếu cần.

### Kết quả mong đợi

* Query graph an toàn hơn.
* Không expose raw Cypher.
* Staff không thể chạy query tùy ý.
* Graph-RAG ổn định và bảo mật.

---

## PAC-TASK-393 - Query Medicine-CONTAINS-ActiveIngredient context

Nhóm cần lấy context thuốc và hoạt chất từ graph.

### Nội dung công việc

* Query Medicine node.
* Query ActiveIngredient nodes qua CONTAINS.
* Chỉ lấy active data.
* Trả relational ids/provenance.
* Giới hạn dữ liệu cần thiết.

### Kết quả mong đợi

* Graph-RAG biết thuốc chứa hoạt chất nào.
* Context đủ cho AI explanation.
* Dữ liệu trace được về PostgreSQL.
* Không dùng raw catalog text.

---

## PAC-TASK-394 - Query ActiveIngredient INTERACTS_WITH context

Nhóm cần lấy context tương tác giữa hoạt chất từ Neo4j.

### Nội dung công việc

* Query INTERACTS_WITH edge.
* Lấy severity, description, recommendation, ruleId.
* Chỉ lấy edge active.
* Xử lý interaction như symmetric.
* Trả provenance metadata.

### Kết quả mong đợi

* Graph-RAG có context interaction đúng.
* AI explanation có nguồn dữ liệu rõ.
* Inactive rule không xuất hiện.
* Query không phụ thuộc Medicine–Medicine edge.

---

## PAC-TASK-395 - Add Graph-RAG context builder for AI Copilot

Nhóm cần tạo context builder kết hợp graph context cho AI Copilot.

### Nội dung công việc

* Nhận graph query result.
* Chuẩn hóa thành context ngắn gọn.
* Gắn provenance và freshness.
* Loại dữ liệu thừa/PII.
* Truyền context vào AI prompt.

### Kết quả mong đợi

* AI explanation có context rõ.
* Prompt không quá dài hoặc chứa PII.
* Graph provenance giữ được.
* Guardrail vẫn chạy đầy đủ.

---

## PAC-TASK-396 - Return Graph-RAG provenance metadata

Nhóm cần trả provenance metadata trong Graph-RAG response.

### Nội dung công việc

* Trả ruleId.
* Trả source entity ids.
* Trả context source là graph hoặc PostgreSQL.
* Trả sourceVersion nếu có.
* Hiển thị được ở UI nếu cần.

### Kết quả mong đợi

* AI explanation có nguồn rõ.
* Admin/Staff biết context đến từ đâu.
* Không có output không trace được.
* Demo Graph-RAG thuyết phục hơn.

---

## PAC-TASK-397 - Return graphUsed flag in Graph-RAG response

Nhóm cần thêm `graphUsed` flag trong response.

### Nội dung công việc

* Set graphUsed=true khi Neo4j context được dùng.
* Set graphUsed=false khi fallback PostgreSQL.
* Trả reason nếu graph không dùng.
* Truyền flag tới AI Audit nếu cần.
* UI có thể hiển thị trạng thái.

### Kết quả mong đợi

* Response minh bạch về việc dùng graph.
* Fallback không bị che giấu.
* Debug dễ hơn.
* Stale/unavailable graph được xử lý rõ.

---

## PAC-TASK-398 - Return Graph-RAG freshness metadata

Nhóm cần trả freshness metadata trong response.

### Nội dung công việc

* Trả freshness status.
* Trả stale reason nếu có.
* Trả checkedAt nếu cần.
* Trả sourceVersion details ở mức an toàn.
* Gắn metadata vào AI context/audit.

### Kết quả mong đợi

* User/Admin biết graph fresh hay stale.
* Stale graph không dùng âm thầm.
* PostgreSQL fallback có lý do rõ.
* Graph-RAG đáng tin hơn.

---

## PAC-TASK-399 - Add freshness warning to Graph-RAG response

Nhóm cần thêm warning khi graph stale hoặc fallback.

### Nội dung công việc

* Nếu graph stale, trả warning.
* Nếu fallback PostgreSQL, trả degraded indicator.
* UI hiển thị warning ngắn.
* Không làm Staff hiểu sai context.
* Audit metadata lưu trạng thái.

### Kết quả mong đợi

* Degraded state rõ ràng.
* Không dùng stale graph trong im lặng.
* Demo thể hiện safety/freshness.
* Staff vẫn nhận được explanation từ fallback nếu phù hợp.

---

## PAC-TASK-400 - Implement PostgreSQL fallback when Neo4j unavailable

Nhóm cần fallback sang PostgreSQL khi Neo4j unavailable.

### Nội dung công việc

* Detect lỗi Neo4j connection/query.
* Nếu request là interaction explanation, lấy context từ PostgreSQL.
* Set graphUsed=false.
* Trả degraded indicator.
* Ghi log/audit.

### Kết quả mong đợi

* Neo4j lỗi không làm vỡ AI explanation.
* Context vẫn authoritative từ PostgreSQL.
* User thấy trạng thái degraded.
* Graph-RAG đúng baseline fallback.

---

## PAC-TASK-401 - Implement PostgreSQL fallback when graph stale

Nhóm cần fallback sang PostgreSQL khi graph stale.

### Nội dung công việc

* Gọi freshness detection trước khi dùng graph.
* Nếu stale, không dùng graph context chính.
* Query PostgreSQL interaction context.
* Set graphUsed=false và stale warning.
* Ghi audit metadata.

### Kết quả mong đợi

* Stale graph không được dùng âm thầm.
* Explanation vẫn có context authoritative.
* Freshness rule được enforce.
* Demo thể hiện safety tốt.

---

## PAC-TASK-402 - Implement safe error for graph-only query without fallback

Nhóm cần trả safe error nếu query chỉ có graph và không có PostgreSQL fallback.

### Nội dung công việc

* Xác định graph-only query.
* Nếu Neo4j unavailable/stale và không fallback được, trả safe error.
* Không fabricate dữ liệu.
* Không trả stack trace.
* UI hiển thị message dễ hiểu.

### Kết quả mong đợi

* Hệ thống không bịa context.
* Graph-only failure an toàn.
* User biết cần thử lại sau.
* Safety đúng baseline.

---

## PAC-TASK-403 - Ensure Staff cannot submit raw Cypher

Nhóm cần đảm bảo Staff không có chức năng gửi raw Cypher.

### Nội dung công việc

* Không tạo textarea/raw query input cho Staff.
* Không expose endpoint raw Cypher cho Staff.
* Chỉ dùng allowlisted templates.
* Rà soát Graph-RAG UI.
* Test permission.

### Kết quả mong đợi

* Staff không chạy được Cypher tùy ý.
* Graph query an toàn hơn.
* Không lộ dữ liệu graph ngoài scope.
* Baseline security được bảo vệ.

---

## PAC-TASK-404 - Add backend guard against raw Cypher APIs for Staff

Nhóm cần chặn backend raw Cypher nếu có endpoint nội bộ hoặc debug.

### Nội dung công việc

* Không public raw Cypher endpoint.
* Nếu có endpoint admin/debug, gắn permission nghiêm ngặt hoặc loại khỏi MVP.
* Staff/Warehouse bị 403.
* Log attempt nếu cần.
* Test unauthorized access.

### Kết quả mong đợi

* Backend không cho Staff chạy raw Cypher.
* Security không phụ thuộc frontend.
* Graph-RAG dùng template an toàn.
* Không lộ dữ liệu Neo4j.

---

## PAC-TASK-405 - Ensure Graph-RAG does not decide checkout

Nhóm cần đảm bảo Graph-RAG không được dùng để quyết định checkout.

### Nội dung công việc

* Checkout validation chỉ dùng PostgreSQL/rule-based data.
* Graph-RAG chỉ hỗ trợ explanation/context.
* Không gọi Graph-RAG trong checkout blocker.
* Ghi guardrail trong code/docs.
* Test graph unavailable không làm checkout sai logic.

### Kết quả mong đợi

* Checkout không phụ thuộc Neo4j.
* Graph chỉ phục vụ explain/RAG.
* Safety và transaction checkout ổn định.
* Baseline architecture đúng.

---

## PAC-TASK-406 - Build Graph-RAG explanation UI metadata display

Nhóm cần hiển thị metadata Graph-RAG trong UI explanation.

### Nội dung công việc

* Hiển thị graphUsed.
* Hiển thị freshness/degraded warning.
* Hiển thị provenance ngắn gọn nếu cần.
* Không làm UI quá rối.
* Không hiển thị raw Cypher.

### Kết quả mong đợi

* Staff/Admin biết explanation dùng nguồn nào.
* Degraded state rõ ràng.
* UI hỗ trợ demo Graph-RAG.
* Không lộ thông tin kỹ thuật nhạy cảm.

---

## PAC-TASK-407 - Add Graph-RAG PostgreSQL fallback tests

Nhóm cần viết test cho fallback PostgreSQL khi Neo4j unavailable.

### Nội dung công việc

* Mock Neo4j unavailable.
* Gọi Graph-RAG interaction explanation.
* Kiểm tra context lấy từ PostgreSQL.
* Kiểm tra graphUsed=false.
* Kiểm tra warning/degraded metadata.

### Kết quả mong đợi

* Fallback hoạt động đúng.
* Neo4j lỗi không làm vỡ flow.
* Response minh bạch.
* CI bảo vệ fallback.

---

## PAC-TASK-408 - Add stale graph fallback tests

Nhóm cần viết test cho fallback khi graph stale.

### Nội dung công việc

* Seed pending/failed outbox job hoặc version mismatch.
* Gọi Graph-RAG.
* Kiểm tra không dùng graph.
* Kiểm tra fallback PostgreSQL.
* Kiểm tra freshness warning.

### Kết quả mong đợi

* Stale graph không dùng âm thầm.
* Freshness metadata đúng.
* Fallback đáng tin.
* Safety test đầy đủ.

---

## PAC-TASK-409 - Add raw Cypher no-access tests

Nhóm cần viết test đảm bảo Staff không submit raw Cypher.

### Nội dung công việc

* Test Staff không thấy raw Cypher UI nếu có checklist.
* Test Staff gọi endpoint raw Cypher bị 403 hoặc endpoint không tồn tại.
* Test allowlisted query vẫn hoạt động qua service.
* Test Warehouse không có graph access nếu liên quan.
* Ghi expected result rõ.

### Kết quả mong đợi

* Raw Cypher bị chặn.
* Security có test.
* Không lộ graph data.
* Graph-RAG query an toàn.

---

## PAC-TASK-410 - Add graph-not-checkout guard tests

Nhóm cần viết test chứng minh graph không quyết định checkout.

### Nội dung công việc

* Test checkout thành công khi Neo4j unavailable nhưng PostgreSQL data hợp lệ.
* Test checkout vẫn block HIGH alert theo PostgreSQL.
* Test graph stale không làm checkout bypass.
* Test Graph-RAG không nằm trong checkout transaction.
* Ghi traceability.

### Kết quả mong đợi

* Checkout độc lập với Neo4j.
* Safety rule HIGH alert vẫn đúng.
* Graph không ảnh hưởng payment/invoice.
* Architecture được bảo vệ bằng test.

---

## PAC-TASK-411 - Implement Revenue Report API

Nhóm cần tạo API báo cáo doanh thu deterministic.

### Nội dung công việc

* Query PAID orders.
* Tính doanh thu theo date range.
* Không tính DRAFT/CANCELLED/failed payment.
* Trả tổng doanh thu và breakdown cơ bản.
* Gắn permission report view.

### Kết quả mong đợi

* Revenue report hoạt động không cần AI.
* Số liệu chính xác theo PAID orders.
* API dùng được cho UI.
* Báo cáo MVP đúng baseline.

---

## PAC-TASK-412 - Build Revenue Report UI

Nhóm cần xây dựng UI báo cáo doanh thu.

### Nội dung công việc

* Hiển thị tổng doanh thu.
* Hiển thị bảng hoặc card theo ngày/khoảng thời gian.
* Gọi Revenue Report API.
* Thêm loading/empty/error.
* Hiển thị filter nếu có.

### Kết quả mong đợi

* Admin xem được doanh thu.
* UI phù hợp demo.
* Không dùng AI để tính số liệu.
* Dữ liệu phản ánh PAID orders.

---

## PAC-TASK-413 - Add revenue report filters by date and status

Nhóm cần thêm filter cơ bản cho Revenue Report.

### Nội dung công việc

* Filter theo date range.
* Chỉ cho status hợp lệ nếu có.
* Mặc định chỉ tính PAID.
* Validate query params.
* UI gửi filter đúng.

### Kết quả mong đợi

* User lọc doanh thu theo ngày.
* Report không tính sai status.
* Filter không phá số liệu.
* UX báo cáo tốt hơn.

---

## PAC-TASK-414 - Implement Top Medicines Report API

Nhóm cần tạo API báo cáo thuốc bán chạy.

### Nội dung công việc

* Query PAID orders.
* Aggregate theo medicine_id.
* Tính tổng quantity sold.
* Sort theo số lượng bán.
* Không tính order DRAFT/CANCELLED.

### Kết quả mong đợi

* Báo cáo top medicines deterministic.
* Dữ liệu phục vụ dashboard/report.
* Không phụ thuộc AI/forecast.
* API có permission.

---

## PAC-TASK-415 - Build Top Medicines Report UI

Nhóm cần xây dựng UI báo cáo thuốc bán chạy.

### Nội dung công việc

* Hiển thị danh sách thuốc bán chạy.
* Hiển thị quantity sold.
* Có thể hiển thị revenue theo thuốc nếu API trả.
* Thêm filter date nếu có.
* Xử lý loading/empty/error.

### Kết quả mong đợi

* Admin xem được thuốc bán chạy.
* UI trực quan cho demo.
* Số liệu lấy từ PAID orders.
* Không có analytics nâng cao ngoài MVP.

---

## PAC-TASK-416 - Implement Inventory Report API from MedicineBatch

Nhóm cần tạo API báo cáo tồn kho từ MedicineBatch.

### Nội dung công việc

* Query MedicineBatch.
* Tính sellable quantity.
* Tính expired/near-expiry nếu cần.
* Không dùng aggregate inventory source.
* Gắn permission Admin/Warehouse.

### Kết quả mong đợi

* Inventory Report đúng source of truth.
* Batch hết hạn không tính sellable.
* Admin/Warehouse xem được tồn kho.
* Dữ liệu nhất quán với Inventory Summary.

---

## PAC-TASK-417 - Build Inventory Report UI

Nhóm cần xây dựng UI báo cáo tồn kho.

### Nội dung công việc

* Hiển thị medicine, batch, expiry, quantity.
* Hiển thị sellable/expired/near-expiry.
* Thêm filter cơ bản.
* Gọi Inventory Report API.
* Xử lý loading/empty/error.

### Kết quả mong đợi

* Admin/Warehouse xem report tồn kho.
* UI hỗ trợ demo inventory.
* Dữ liệu lấy từ MedicineBatch.
* Staff không thấy dashboard/report ngoài quyền.

---

## PAC-TASK-418 - Add report empty, loading and error states

Nhóm cần hoàn thiện trạng thái UI cho các report.

### Nội dung công việc

* Thêm loading state khi gọi API.
* Thêm empty state khi không có dữ liệu.
* Thêm error state khi API fail.
* Cho phép retry nếu phù hợp.
* Áp dụng cho Revenue, Top Medicines, Inventory Report.

### Kết quả mong đợi

* Report UI không bị màn hình trắng.
* Demo ổn định hơn.
* User hiểu trạng thái dữ liệu.
* UX chuyên nghiệp hơn.

---

## PAC-TASK-419 - Add report permission checks

Nhóm cần thêm permission guard cho report APIs và UI.

### Nội dung công việc

* Gắn permission view reports.
* Admin xem reports.
* Warehouse xem inventory report nếu được cho phép.
* Staff không xem operational reports nếu không có quyền.
* Test 403.

### Kết quả mong đợi

* Report không lộ sai quyền.
* UI menu hiển thị đúng.
* Backend enforce authorization.
* Phân quyền đúng baseline.

---

## PAC-TASK-420 - Create system_settings Prisma model

Nhóm cần tạo model System Settings cho các cấu hình MVP.

### Nội dung công việc

* Tạo model `SystemSetting`.
* Lưu key, value, type, updated_by, updated_at.
* Dùng cho near-expiry threshold.
* Chuẩn bị mở rộng cấu hình backend nếu cần.
* Tạo migration.

### Kết quả mong đợi

* Hệ thống có nơi lưu settings.
* Near-expiry threshold cấu hình được.
* Audit cơ bản có thể trace.
* Không hard-code mọi setting trong code.

---

## PAC-TASK-421 - Seed default near-expiry threshold as 90 days

Nhóm cần seed default near-expiry threshold là 90 ngày.

### Nội dung công việc

* Tạo seed key near_expiry_threshold_days.
* Set value mặc định 90.
* Seeder idempotent.
* Dùng setting trong near-expiry calculation.
* Không dùng default 60 ngày.

### Kết quả mong đợi

* Threshold mặc định đúng baseline.
* Near-expiry calculation nhất quán.
* Admin có thể chỉnh qua UI.
* Demo không lệch rule đã chốt.

---

## PAC-TASK-422 - Implement near-expiry threshold settings API

Nhóm cần tạo API đọc/cập nhật near-expiry threshold.

### Nội dung công việc

* Tạo API get setting.
* Tạo API update threshold.
* Chỉ Admin được update.
* Validate value là số ngày hợp lệ.
* Ghi updated_by/updated_at.

### Kết quả mong đợi

* Admin cấu hình threshold.
* Inventory near-expiry dùng setting mới.
* API có authorization.
* Validation rõ ràng.

---

## PAC-TASK-423 - Build minimal System Settings UI for near-expiry threshold

Nhóm cần xây dựng UI System Settings tối thiểu cho MVP.

### Nội dung công việc

* Tạo màn hình System Settings.
* Hiển thị threshold hiện tại.
* Cho Admin cập nhật số ngày.
* Validate input.
* Hiển thị success/error.

### Kết quả mong đợi

* Admin chỉnh được threshold gần hết hạn.
* UI chỉ chứa setting MVP bắt buộc.
* Không đưa provider/prompt UI thành MVP blocker.
* Inventory cảnh báo theo setting.

---

## PAC-TASK-424 - Add system settings validation and tests

Nhóm cần viết test cho System Settings.

### Nội dung công việc

* Test lấy default threshold.
* Test update threshold hợp lệ.
* Test update threshold invalid.
* Test Staff/Warehouse không được update.
* Test near-expiry calculation dùng threshold mới.

### Kết quả mong đợi

* System Settings có test.
* Threshold không bị nhập sai.
* Permission được bảo vệ.
* Near-expiry đúng baseline.

---

# Sprint 10 — Demo Data, Demo Reset, Smoke Test

## PAC-TASK-425 - Create curated MVP seed dataset

Nhóm cần tạo bộ seed data MVP đã curated.

### Nội dung công việc

* Seed medicines.
* Seed active ingredients và mapping.
* Seed suppliers.
* Seed batches qua dữ liệu hợp lệ.
* Seed interaction rules và reports data cơ bản.

### Kết quả mong đợi

* Demo có dữ liệu đủ dùng.
* Không seed toàn bộ commercial 100-table dataset.
* Dữ liệu sạch và kiểm soát được.
* POS, inventory, interaction, AI, graph, reports đều có data.

---

## PAC-TASK-426 - Seed demo users by role

Nhóm cần seed/provision demo users theo role.

### Nội dung công việc

* Tạo hoặc hướng dẫn tạo Admin demo user.
* Tạo Staff demo user.
* Tạo Warehouse demo user.
* Gán roles/permissions đúng.
* Đảm bảo demo accounts chính không bị must_change_password nếu dùng demo nhanh.

### Kết quả mong đợi

* Demo có đủ tài khoản.
* Phân quyền có thể trình bày.
* Users liên kết Supabase Auth và user_profiles.
* Không lưu password trong PostgreSQL.

---

## PAC-TASK-427 - Seed first-login demo account

Nhóm cần tạo tài khoản demo riêng để trình bày first-login password change flow.

### Nội dung công việc

* Tạo user demo có must_change_password=true.
* Gán role phù hợp.
* Chuẩn bị credentials demo theo quy trình an toàn của nhóm.
* Đảm bảo account này không ảnh hưởng demo chính.
* Test redirect first-login.

### Kết quả mong đợi

* Có thể demo flow đổi mật khẩu lần đầu.
* Tài khoản chính vẫn vào demo nhanh.
* Supabase Auth vẫn quản lý password.
* First-login baseline được thể hiện.

---

## PAC-TASK-428 - Generate dynamic expiry dates for demo batches

Nhóm cần tạo expiry date động cho batch demo.

### Nội dung công việc

* Tính expired date relative to reset date.
* Tính near-expiry date relative to reset date.
* Tính normal expiry date.
* Không hard-code ngày làm demo bị lỗi theo thời gian.
* Seed script tạo dữ liệu ổn định.

### Kết quả mong đợi

* Demo chạy ở ngày khác vẫn đúng.
* Near-expiry/expired cases luôn tái lập được.
* FEFO scenario không bị hỏng.
* Smoke test ổn định.

---

## PAC-TASK-429 - Seed FEFO multi-batch demo scenario

Nhóm cần seed tình huống FEFO nhiều batch.

### Nội dung công việc

* Seed một thuốc có nhiều batch sellable.
* Batch có expiry khác nhau.
* Quantity được thiết kế để allocation qua nhiều batch.
* Có batch gần hết hạn nhưng chưa expired.
* Chuẩn bị order demo hoặc test data.

### Kết quả mong đợi

* Demo thể hiện FEFO rõ ràng.
* Checkout chọn batch expiry gần nhất trước.
* Multi-batch allocation hoạt động.
* Tester có dữ liệu kiểm tra.

---

## PAC-TASK-430 - Seed expired batch excluded from sellable stock

Nhóm cần seed batch hết hạn để chứng minh không tính sellable stock.

### Nội dung công việc

* Tạo batch expired.
* Tạo batch sellable cùng medicine nếu cần.
* Kiểm tra Inventory Summary.
* Kiểm tra POS không bán từ expired batch.
* Kiểm tra FEFO bỏ qua expired batch.

### Kết quả mong đợi

* Expired batch vẫn hiện trong quản lý kho.
* Expired batch không được bán.
* Sellable quantity chính xác.
* Demo inventory safety rõ.

---

## PAC-TASK-431 - Seed PAID order with handled HIGH alert

Nhóm cần seed một PAID order có HIGH alert đã xử lý đầy đủ.

### Nội dung công việc

* Tạo order PAID.
* Tạo InteractionAlert severity HIGH.
* Lưu acknowledged_by và acknowledged_at.
* Lưu consultation note.
* Tạo SUCCESS payment, invoice và batch allocations.

### Kết quả mong đợi

* Demo có lịch sử HIGH alert đầy đủ.
* Admin xem InteractionAlert History được.
* Payment/invoice/order allocation nhất quán.
* Rule HIGH alert được minh họa.

---

## PAC-TASK-432 - Seed report data with PAID, DRAFT, CANCELLED and failed-payment cases

Nhóm cần seed dữ liệu đủ cho reports và exclusion rules.

### Nội dung công việc

* Seed nhiều PAID orders across dates.
* Seed DRAFT orders.
* Seed CANCELLED orders.
* Seed failed payment attempts nếu scope có.
* Đảm bảo reports chỉ tính dữ liệu hợp lệ.

### Kết quả mong đợi

* Revenue Report có dữ liệu.
* Top Medicines Report có dữ liệu.
* DRAFT/CANCELLED không bị tính vào revenue.
* Demo report đáng tin.

---

## PAC-TASK-433 - Implement demo:reset local-only environment guard

Nhóm cần đảm bảo demo reset chỉ chạy ở local environment.

### Nội dung công việc

* Kiểm tra biến môi trường trước khi reset.
* Nếu env là demo/staging/production/unknown thì refuse.
* Thêm confirmation guard nếu cần.
* Log rõ reset chạy ở local.
* Không xóa dữ liệu ngoài local.

### Kết quả mong đợi

* Không reset nhầm database demo/staging/production.
* Reset local an toàn.
* Demo data có thể tái tạo.
* Baseline demo reset được bảo vệ.

---

## PAC-TASK-434 - Rebuild Neo4j projection during demo reset

Nhóm cần rebuild Neo4j projection sau khi reset dữ liệu demo.

### Nội dung công việc

* Sau seed PostgreSQL, clear/rebuild projection Neo4j local.
* Sync Medicine, ActiveIngredient, CONTAINS, INTERACTS_WITH.
* Kiểm tra graph freshness.
* Không dùng standalone Cypher seed làm official flow chính.
* Log kết quả rebuild.

### Kết quả mong đợi

* Neo4j graph khớp PostgreSQL demo data.
* Graph-RAG có context mới.
* Freshness status pass.
* Demo graph ổn định.

---

## PAC-TASK-435 - Run smoke tests after demo reset

Nhóm cần chạy smoke test sau demo reset.

### Nội dung công việc

* Test login demo accounts.
* Test inventory summary và MedicineBatch.
* Test POS Draft Order.
* Test InteractionAlert/HIGH handling.
* Test checkout FEFO/payment/invoice.
* Test Graph Sync/Graph-RAG.
* Test reports cơ bản.

### Kết quả mong đợi

* Demo reset xong hệ thống chạy được.
* Lỗi critical được phát hiện sớm.
* Luồng MVP có bằng chứng kiểm tra.
* Team tự tin trước buổi demo.

---

# Out-of-scope guard cho tài liệu 4C

Không tạo hoặc implement Task trong phần 4C cho các nội dung sau:

```text
MockAI-only MVP
Google AI bị xem là optional
AI không có guardrail
AI không có audit log
AI tự động lưu draft thành official consultation note khi Staff chưa confirm
AI chẩn đoán bệnh
AI kê đơn thuốc
AI đưa liều dùng cụ thể
Lưu raw PII trong AI Audit
Prompt không có version
Provider/model config hard-code toàn bộ trong frontend
Neo4j làm source of truth
Graph Sync thủ công bằng Cypher seed là flow chính thức
Graph không có outbox/retry/failure logging
Medicine–Medicine interaction edge làm authoritative rule trong Neo4j
DrugGroup tự suy từ MedicineCategory
riskScore ảnh hưởng checkout hoặc severity
Stale graph được dùng âm thầm
Graph-RAG không có provenance
Graph-RAG không có freshness metadata
Graph-RAG không fallback PostgreSQL khi Neo4j unavailable/stale
Staff submit raw Cypher
Graph quyết định checkout
AI tự tính doanh thu thay deterministic report
Demo reset chạy ở staging/production
Demo data dùng raw catalog data chưa curated làm operational seed
```

Thông tin cảnh báo tương tác thuốc và nội dung AI trong hệ thống chỉ mang tính hỗ trợ tham khảo cho đồ án, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.
