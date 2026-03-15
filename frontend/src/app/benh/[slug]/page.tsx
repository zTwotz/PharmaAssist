'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCart } from '@/context/cart-context';
import { RETAIL_PRODUCT_MAP } from '@/app/page';
import { 
  ArrowLeft, 
  ChevronRight, 
  ShoppingCart, 
  Activity, 
  Shield, 
  Info, 
  FileText, 
  CheckCircle,
  Home,
  Plus,
  BookOpen,
  Users
} from 'lucide-react';

interface Disease {
  name: string;
  category: string;
  categorySlug: string;
  image: string;
  overview: string;
  causes: string[];
  symptoms: string[];
  prevention: string[];
  recommendedProducts: string[];
}

const CATEGORY_META = {
  "nam-gioi": {
    name: "Bệnh Nam Giới",
    description: "Tổng hợp kiến thức y khoa, các bệnh lý nam khoa thường gặp, nguyên nhân, triệu chứng và phương pháp phòng ngừa, điều trị hỗ trợ hiệu quả dành riêng cho nam giới.",
    icon: Users,
    image: "/benh_nam_gioi.png"
  },
  "nu-gioi": {
    name: "Bệnh Nữ Giới",
    description: "Cẩm nang sức khỏe phụ khoa, các vấn đề nội tiết tố nữ, chu kỳ kinh nguyệt và các bệnh lý sinh sản thường gặp ở phụ nữ mọi độ tuổi.",
    icon: Users,
    image: "/benh_nu_gioi.png"
  },
  "nguoi-gia": {
    name: "Bệnh Người Già",
    description: "Hướng dẫn chăm sóc sức khỏe người cao tuổi, các bệnh lý mãn tính, thoái hóa thần kinh và xương khớp thường xuất hiện ở tuổi xế chiều.",
    icon: Users,
    image: "/benh_nguoi_gia.png"
  },
  "tre-em": {
    name: "Bệnh Trẻ Em",
    description: "Tổng hợp các bệnh lý nhi khoa phổ biến, các rối loạn phát triển thần kinh, bệnh truyền nhiễm và chỉ dẫn chăm sóc sức khỏe sơ sinh.",
    icon: Users,
    image: "/benh_tre_em.png"
  }
};

const DISEASE_DATA: Record<string, Disease> = {
  // --- BỆNH NAM GIỚI ---
  "loang-xuong-o-nam": {
    name: "Loãng xương ở nam",
    category: "Bệnh Nam Giới",
    categorySlug: "nam-gioi",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80",
    overview: "Loãng xương ở nam giới là tình trạng suy giảm mật độ xương khiến xương trở nên giòn, yếu và dễ gãy. Bệnh thường tiến triển âm thầm và chỉ được phát hiện sau khi xảy ra chấn thương hoặc gãy xương (thường là xương hông, cột sống hoặc cổ tay). Tỷ lệ tử vong sau gãy xương ở nam giới lớn tuổi cao gấp 2 lần so với nữ giới, do đó việc phòng ngừa và phát hiện sớm là cực kỳ quan trọng.",
    causes: [
      "Lão hóa tự nhiên làm giảm khả năng hấp thu canxi và suy yếu hệ khung xương.",
      "Suy giảm nồng độ testosterone (mãn dục nam) làm tăng tốc độ hủy xương.",
      "Chế độ ăn thiếu hụt Canxi và Vitamin D kéo dài.",
      "Lối sống ít vận động, thường xuyên uống rượu bia, hút thuốc lá.",
      "Tác dụng phụ của thuốc chứa Corticosteroid hoặc các bệnh mãn tính như suy thận, cường giáp."
    ],
    symptoms: [
      "Đau nhức xương khớp âm ỉ kéo dài, đặc biệt ở vùng thắt lưng, hông.",
      "Giảm chiều cao dần theo thời gian (do xẹp đốt sống cổ hoặc lưng).",
      "Dáng đi gù lưng, lom khom, khó đứng thẳng lưng.",
      "Dễ bị chấn thương, nứt gãy xương ngay cả khi va chạm nhẹ."
    ],
    prevention: [
      "Bổ sung đầy đủ Canxi (1000 - 1200mg/ngày) và Vitamin D3 qua dinh dưỡng hoặc sữa.",
      "Tăng cường vận động thể thao, đặc biệt là các bài tập chịu lực (đi bộ, chạy bộ nhẹ).",
      "Hạn chế sử dụng rượu bia, chất kích thích và nói không với thuốc lá.",
      "Thực hiện đo mật độ xương định kỳ sau tuổi 60."
    ],
    recommendedProducts: ["ensure-gold-800g", "kudos-daily"]
  },
  "di-tinh-mong-tinh": {
    name: "Di tinh, mộng tinh",
    category: "Bệnh Nam Giới",
    categorySlug: "nam-gioi",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80",
    overview: "Di tinh và mộng tinh là hiện tượng xuất tinh không chủ động ở nam giới. Mộng tinh xảy ra khi đang ngủ và thường kèm theo giấc mơ tình dục. Di tinh xảy ra khi cơ thể hoàn toàn tỉnh táo mà không có kích thích tình dục lớn. Các hiện tượng này là sinh lý bình thường ở tuổi dậy thì, tuy nhiên nếu xuất hiện với tần suất dày đặc (> 3 lần/tuần) ở người trưởng thành thì có thể là dấu hiệu suy nhược cơ thể hoặc bệnh lý nam khoa.",
    causes: [
      "Suy nhược thần kinh hoặc mất cân bằng nồng độ hormone sinh dục.",
      "Căng thẳng, lo âu kéo dài, suy nghĩ quá mức về tình dục.",
      "Thói quen xem phim ảnh, sách báo kích thích trước khi đi ngủ.",
      "Cơ vùng chậu yếu, cơ thể mệt mỏi, suy nhược toàn thân."
    ],
    symptoms: [
      "Xuất tinh không kiểm soát khi ngủ (mộng tinh) với tần suất liên tục.",
      "Rò rỉ tinh dịch khi đi tiểu hoặc khi hoạt động nhẹ (di tinh).",
      "Cơ thể mệt mỏi, uể oải, mất tập trung, đau thắt lưng, mỏi gối.",
      "Lo lắng, tự ti, giảm ham muốn hoặc rối loạn cương dương."
    ],
    prevention: [
      "Duy trì lối sống lành mạnh, tránh tiếp xúc các ấn phẩm kích thích trước khi ngủ.",
      "Tăng cường rèn luyện thể chất, đặc biệt là các bài tập cơ sàn chậu (Kegel).",
      "Bổ sung thực phẩm bảo vệ sức khỏe, vitamin tổng hợp để tăng sức đề kháng.",
      "Giữ tinh thần thoải mái, tránh làm việc quá sức và ngủ đủ giấc."
    ],
    recommendedProducts: ["nmn-pqq-kenko", "kudos-daily"]
  },
  "hep-bao-quy-dau": {
    name: "Hẹp bao quy đầu",
    category: "Bệnh Nam Giới",
    categorySlug: "nam-gioi",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=400&q=80",
    overview: "Hẹp bao quy đầu (Phimosis) là tình trạng bao quy đầu không thể kéo tuột xuống được để lộ đầu dương vật. Tình trạng này rất phổ biến ở trẻ sơ sinh và thường tự khỏi khi lớn lên. Tuy nhiên, nếu hẹp bao quy đầu kéo dài đến tuổi trưởng thành, nó sẽ gây khó khăn cho việc vệ sinh, gây đau đớn khi quan hệ tình dục và tăng nguy cơ viêm nhiễm nam khoa.",
    causes: [
      "Bẩm sinh: Chiếm đa số các trường hợp hẹp bao quy đầu từ nhỏ.",
      "Viêm nhiễm tái phát: Các đợt viêm bao quy đầu để lại sẹo xơ gây hẹp.",
      "Chấn thương: Tổn thương vật lý ở vùng quy đầu tạo sẹo co rút bao da."
    ],
    symptoms: [
      "Bao quy đầu thắt chặt, không thể kéo tuột xuống dù dương vật ở trạng thái bình thường hay cương cứng.",
      "Đau đớn khi dương vật cương cứng hoặc khi quan hệ tình dục.",
      "Khó tiểu, tia nước tiểu yếu, đôi khi bao quy đầu phồng lên khi tiểu.",
      "Quy đầu thường xuyên bị đỏ, ngứa, đọng cặn bẩn màu trắng (bựa sinh dục) gây mùi hôi."
    ],
    prevention: [
      "Vệ sinh bộ phận sinh dục sạch sẽ hàng ngày bằng nước ấm hoặc dung dịch dịu nhẹ.",
      "Tập nong bao quy đầu nhẹ nhàng dưới sự hướng dẫn của bác sĩ (cho trẻ nhỏ).",
      "Sử dụng các loại gel bôi kháng khuẩn, làm dịu da khi bị viêm nhẹ.",
      "Tiến hành tiểu phẫu cắt bao quy đầu nếu tình trạng xơ hẹp nặng kéo dài."
    ],
    recommendedProducts: ["aloclair-gel", "subac-gel"]
  },
  "yeu-sinh-ly": {
    name: "Yếu sinh lý",
    category: "Bệnh Nam Giới",
    categorySlug: "nam-gioi",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
    overview: "Yếu sinh lý là cụm từ chỉ sự suy giảm khả năng tình dục ở nam giới, bao gồm các tình trạng như rối loạn cương dương, xuất tinh sớm, giảm ham muốn hoặc không có cảm giác thỏa mãn sau quan hệ. Bệnh không đe dọa tính mạng nhưng ảnh hưởng nặng nề đến tâm lý nam giới và hạnh phúc gia đình.",
    causes: [
      "Suy giảm nồng độ nội tiết tố nam Testosterone do tuổi tác.",
      "Căng thẳng, stress công việc, trầm cảm hoặc tự ti tâm lý.",
      "Mắc các bệnh lý nền như tiểu đường, cao huyết áp, tim mạch, béo phì.",
      "Lạm dụng rượu bia, thuốc lá, chất kích thích và chế độ ăn thiếu chất dinh dưỡng."
    ],
    symptoms: [
      "Rối loạn cương dương: Dương vật không đủ cương cứng hoặc không giữ được độ cương lâu.",
      "Xuất tinh sớm hoặc gặp khó khăn trong việc xuất tinh.",
      "Giảm ham muốn tình dục rõ rệt, né tránh chuyện chăn gối.",
      "Cảm giác đau nhức dương vật khi cương cứng hoặc khi quan hệ."
    ],
    prevention: [
      "Bổ sung dinh dưỡng giàu kẽm, các vitamin và nhân sâm bồi bổ sức khỏe toàn diện.",
      "Duy trì chế độ sinh hoạt điều độ, ngủ đủ giấc, kiểm soát căng thẳng.",
      "Tích cực vận động thể thao (chạy bộ, bơi lội, tập tạ) để kích thích sản sinh testosterone.",
      "Hạn chế tối đa rượu bia, thuốc lá và các chất kích thích có hại."
    ],
    recommendedProducts: ["achimmadang-box", "nmn-pqq-kenko"]
  },
  "klinefelter": {
    name: "Hội chứng Klinefelter",
    category: "Bệnh Nam Giới",
    categorySlug: "nam-gioi",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&q=80",
    overview: "Hội chứng Klinefelter là một rối loạn di truyền ở nam giới, xảy ra khi một bé trai sinh ra có thêm một bản sao của nhiễm sắc thể X (cấu trúc nhiễm sắc thể là 47,XXY thay vì 46,XY). Đây là nguyên nhân di truyền hàng đầu gây ra tình trạng suy sinh dục nam và vô sinh, nhưng thường không được chẩn đoán cho tới tuổi dậy thì hoặc trưởng thành.",
    causes: [
      "Lỗi phân chia ngẫu nhiên trong quá trình hình thành trứng hoặc tinh trùng ở cha mẹ (không do di truyền từ thế hệ trước).",
      "Sự hiện diện của nhiễm sắc thể giới tính X dư thừa làm giảm nồng độ testosterone."
    ],
    symptoms: [
      "Tinh hoàn nhỏ và săn chắc, dương vật nhỏ.",
      "Tuyến vú phát triển to hơn bình thường (nữ hóa tuyến vú).",
      "Cơ bắp kém phát triển, ít lông mặt và lông cơ thể.",
      "Chiều cao vượt trội hơn so với các thành viên trong gia đình.",
      "Vô sinh hoặc số lượng tinh trùng cực thấp."
    ],
    prevention: [
      "Không có biện pháp phòng ngừa vì đây là lỗi di truyền ngẫu nhiên.",
      "Bổ sung dinh dưỡng bảo vệ sức đề kháng và hormone nội tiết sớm.",
      "Liệu pháp thay thế hormone Testosterone theo chỉ định chuyên khoa từ tuổi dậy thì.",
      "Bồi bổ sức khỏe bằng các sản phẩm sâm nước nâng cao sinh lực toàn diện."
    ],
    recommendedProducts: ["achimmadang-box", "kudos-daily"]
  },
  "voi-hoa-tinh-hoan": {
    name: "Vôi hóa tinh hoàn",
    category: "Bệnh Nam Giới",
    categorySlug: "nam-gioi",
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=400&q=80",
    overview: "Vôi hóa tinh hoàn (sỏi tinh hoàn) là tình trạng lắng đọng canxi bất thường bên trong nhu mô tinh hoàn. Tình trạng này đa phần là lành tính và được phát hiện tình cờ qua siêu âm. Tuy nhiên, trong một số ít trường hợp, vôi hóa diện rộng có thể liên quan đến các vấn đề viêm nhiễm mãn tính hoặc u tinh hoàn cần theo dõi sát sao.",
    causes: [
      "Tiền sử viêm tinh hoàn hoặc viêm mào tinh hoàn không được điều trị dứt điểm.",
      "Tổn thương vật lý do chấn thương tinh hoàn cũ hóa xơ vôi.",
      "Sự lắng đọng canxi tự nhiên ở nam giới lớn tuổi."
    ],
    symptoms: [
      "Đa số không có triệu chứng lâm sàng rõ rệt.",
      "Có thể có cảm giác tức nhẹ hoặc nặng ở vùng bìu khi vận động nhiều.",
      "Sờ thấy nốt cứng nhỏ không đau bên trong bìu khi tự kiểm tra."
    ],
    prevention: [
      "Sử dụng các loại vitamin tổng hợp nâng cao hệ miễn dịch tự nhiên chống viêm nhiễm.",
      "Vệ sinh sạch sẽ bộ phận sinh dục và bảo vệ bộ phận nhạy cảm khỏi chấn thương vật lý.",
      "Siêu âm tinh hoàn định kỳ mỗi 6 - 12 tháng theo khuyến nghị của bác sĩ nam khoa."
    ],
    recommendedProducts: ["kudos-daily", "nmn-pqq-kenko"]
  },
  "ung-thu-vu-da-o": {
    name: "Ung thư vú đa ổ ở nam giới",
    category: "Bệnh Nam Giới",
    categorySlug: "nam-gioi",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=400&q=80",
    overview: "Ung thư vú ở nam giới là bệnh lý rất hiếm gặp (chiếm khoảng 1% tổng số ca ung thư vú). Ung thư vú đa ổ xảy ra khi có từ hai khối u trở lên xuất hiện ở các vị trí khác nhau trong cùng một bên vú. Bệnh nguy hiểm do nam giới thường chủ quan và phát hiện muộn khi đã di căn.",
    causes: [
      "Đột biến gen di truyền (đặc biệt là gen BRCA2).",
      "Nồng độ Estrogen cao bất thường do béo phì, bệnh gan hoặc hội chứng Klinefelter.",
      "Tiền sử xạ trị vùng ngực."
    ],
    symptoms: [
      "Sờ thấy một hoặc nhiều cục u cứng, không đau dưới quầng vú hoặc vùng ngực.",
      "Da vùng vú bị lõm vào, nhăn nheo hoặc co rút núm vú.",
      "Núm vú chảy dịch hoặc máu bất thường.",
      "Sưng hạch bạch huyết ở vùng nách."
    ],
    prevention: [
      "Bổ sung các chất chống oxy hóa mạnh tế bào như Fucoidan để hạn chế gốc tự do.",
      "Duy trì cân nặng ổn định, hạn chế rượu bia.",
      "Tầm soát ung thư sớm nếu trong gia đình có tiền sử mắc ung thư vú."
    ],
    recommendedProducts: ["nano-fucoidan", "ensure-gold-800g"]
  },
  "sui-mao-ga-duong-vat": {
    name: "Sùi mào gà dương vật",
    category: "Bệnh Nam Giới",
    categorySlug: "nam-gioi",
    image: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=400&q=80",
    overview: "Sùi mào gà ở dương vật là bệnh lây truyền qua đường tình dục (STI) phổ biến gây ra bởi virus HPV (Human Papillomavirus), đặc biệt là các chủng HPV 6 và 11. Bệnh biểu hiện bằng các nốt sùi mềm như súp lơ hoặc mào gà ở thân dương vật, bìu hoặc bao quy đầu.",
    causes: [
      "Nhiễm virus HPV qua quan hệ tình dục không an toàn với người nhiễm bệnh.",
      "Hệ miễn dịch suy yếu làm virus dễ bùng phát."
    ],
    symptoms: [
      "Xuất hiện các nốt mụn sùi nhỏ li ti màu hồng hoặc xám nhạt đơn lẻ.",
      "Các nốt sùi phát triển liên kết lại thành mảng lớn hình mào gà, ẩm ướt, dễ chảy máu.",
      "Ngứa ngáy, khó chịu hoặc đau rát ở vùng sinh dục."
    ],
    prevention: [
      "Sử dụng các gel kháng khuẩn làm sạch dịu nhẹ vùng nhạy cảm ngoài da.",
      "Tiêm vắc-xin ngừa HPV đầy đủ cho nam giới trước tuổi quan hệ tình dục.",
      "Sử dụng bao cao su bảo vệ và chung thủy một vợ một chồng.",
      "Nâng cao đề kháng bằng vitamin C và thực phẩm chức năng chất lượng cao."
    ],
    recommendedProducts: ["subac-gel", "kudos-vitc"]
  },
  "viem-duong-nieu-dao-nam": {
    name: "Viêm đường niệu đạo ở nam giới",
    category: "Bệnh Nam Giới",
    categorySlug: "nam-gioi",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&q=80",
    overview: "Viêm niệu đạo ở nam giới là tình trạng viêm nhiễm ống dẫn nước tiểu từ bàng quang ra ngoài cơ thể. Bệnh gây ra cảm giác tiểu buốt, tiểu rắt và chảy dịch ở lỗ sáo, ảnh hưởng nặng nề đến sinh hoạt và có thể biến chứng viêm bàng quang, viêm tinh hoàn nếu không điều trị sớm.",
    causes: [
      "Nhiễm khuẩn do vi khuẩn lậu (Neisseria gonorrhoeae) hoặc vi khuẩn Chlamydia.",
      "Nhiễm trùng đường tiết niệu do E. coli xâm nhập ngược dòng.",
      "Kích ứng hóa chất từ xà phòng tắm, chất bôi trơn hoặc chấn thương nhẹ."
    ],
    symptoms: [
      "Cảm giác nóng rát, đau buốt dữ dội khi đi tiểu.",
      "Lỗ niệu đạo tiết dịch nhầy màu vàng, xanh hoặc có mủ (đặc biệt vào buổi sáng).",
      "Tiểu nhiều lần, tiểu rắt, cảm giác tiểu không hết bãi.",
      "Ngứa ngáy, sưng đỏ đầu dương vật."
    ],
    prevention: [
      "Uống nhiều nước hàng ngày để thải trừ vi khuẩn khỏi đường tiết niệu.",
      "Vệ sinh vùng kín sạch sẽ bằng các dung dịch kháng khuẩn lành tính.",
      "Dùng bao cao su bảo vệ và tránh quan hệ tình dục khi đang có triệu chứng viêm."
    ],
    recommendedProducts: ["subac-gel", "kudos-vitc"]
  },
  "nhiem-nam-candida-nam": {
    name: "Nhiễm nấm candida ở nam giới",
    category: "Bệnh Nam Giới",
    categorySlug: "nam-gioi",
    image: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&w=400&q=80",
    overview: "Nhiễm nấm Candida (viêm quy đầu do nấm) ở nam giới xảy ra khi nấm men Candida albicans phát triển quá mức ở vùng đầu dương vật. Bệnh thường gặp ở nam giới chưa cắt bao quy đầu hoặc người có hệ miễn dịch suy giảm, tiểu đường.",
    causes: [
      "Bao quy đầu dài/hẹp tạo môi trường nóng ẩm thuận lợi cho nấm phát triển.",
      "Lây nhiễm chéo từ bạn tình nữ bị viêm âm đạo do nấm.",
      "Suy giảm miễn dịch, sử dụng kháng sinh kéo dài hoặc bệnh tiểu đường kiểm soát kém."
    ],
    symptoms: [
      "Đầu dương vật ngứa rát dữ dội, nổi mẩn đỏ li ti.",
      "Đọng nhiều cặn bẩn màu trắng đục như bã đậu dưới bao quy đầu.",
      "Da quy đầu căng đỏ, có thể có vết nứt nhỏ gây đau đớn khi chạm vào."
    ],
    prevention: [
      "Giữ bộ phận sinh dục luôn khô ráo, sạch sẽ.",
      "Sử dụng các loại gel kháng khuẩn làm sạch ngoài da để kiểm soát nấm.",
      "Điều trị đồng thời cả bạn tình để tránh nhiễm nấm tái phát."
    ],
    recommendedProducts: ["subac-gel", "aloclair-gel"]
  },
  "hep-nieu-dao": {
    name: "Hẹp niệu đạo",
    category: "Bệnh Nam Giới",
    categorySlug: "nam-gioi",
    image: "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?auto=format&fit=crop&w=400&q=80",
    overview: "Hẹp niệu đạo là tình trạng sẹo xơ làm thu hẹp lòng niệu đạo, cản trở dòng chảy của nước tiểu từ bàng quang ra ngoài. Hẹp niệu đạo gây ứ đọng nước tiểu, tăng nguy cơ suy thận và viêm đường tiết niệu nếu không can thiệp nong hoặc phẫu thuật kịp thời.",
    causes: [
      "Chấn thương vùng xương chậu hoặc vùng bìu (do ngã xe, tai nạn lao động).",
      "Tiền sử can thiệp thủ thuật y khoa đường tiết niệu (đặt ống thông tiểu lâu ngày).",
      "Biến chứng của các đợt viêm niệu đạo do vi khuẩn lậu mãn tính."
    ],
    symptoms: [
      "Dòng nước tiểu yếu, nhỏ giọt, tia nước tiểu bị chẻ đôi.",
      "Thời gian đi tiểu kéo dài, phải rặn nhiều mới ra.",
      "Cảm giác bàng quang vẫn căng đầy sau khi tiểu.",
      "Nhiễm trùng tiểu tái phát nhiều lần, đau buốt dưới rốn."
    ],
    prevention: [
      "Bảo vệ vùng hạ vị tránh các chấn thương vật lý.",
      "Bổ sung vitamin nâng cao hệ miễn dịch phòng ngừa viêm nhiễm đường tiểu.",
      "Điều trị triệt để các đợt viêm đường tiết niệu ban đầu."
    ],
    recommendedProducts: ["kudos-daily", "kudos-vitc"]
  },
  "benh-peyronie": {
    name: "Bệnh Peyronie",
    category: "Bệnh Nam Giới",
    categorySlug: "nam-gioi",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80",
    overview: "Bệnh Peyronie (xơ cứng vật hang) là sự hình thành các mảng xơ cứng (mảng bám) dưới da dương vật, khiến dương vật bị cong vẹo bất thường khi cương cứng. Bệnh gây đau đớn và khó khăn cho hoạt động tình dục, ảnh hưởng nghiêm trọng đến tâm lý phái mạnh.",
    causes: [
      "Tổn thương cơ học nhỏ tích tụ ở dương vật do vận động mạnh hoặc chấn thương khi quan hệ.",
      "Rối loạn hệ thống tự miễn dịch kích thích quá trình tạo xơ sẹo."
    ],
    symptoms: [
      "Có mảng bám cứng sờ thấy được dưới da thân dương vật.",
      "Dương vật bị cong góc lớn (lên trên, xuống dưới hoặc sang bên) khi cương cứng.",
      "Đau nhức dương vật khi cương cứng hoặc khi giao hợp.",
      "Suy giảm chức năng cương dương (yếu sinh lý)."
    ],
    prevention: [
      "Bổ sung các chất chống lão hóa giúp bảo vệ độ đàn hồi của mô tế bào.",
      "Quan hệ tình dục an toàn, tránh các tư thế gây chấn thương dương vật.",
      "Bồi bổ sức lực bằng nhân sâm hỗ trợ lưu thông tuần hoàn vật hang."
    ],
    recommendedProducts: ["nmn-pqq-kenko", "achimmadang-box"]
  },
  "xuat-tinh-nguoc-dong": {
    name: "Xuất tinh ngược dòng",
    category: "Bệnh Nam Giới",
    categorySlug: "nam-gioi",
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=400&q=80",
    overview: "Xuất tinh ngược dòng là tình trạng tinh dịch đi ngược vào bàng quang thay vì phóng ra ngoài qua niệu đạo khi đạt cực khoái. Nam giới vẫn cảm nhận được cực khoái bình thường nhưng không thấy tinh dịch phóng ra (hoặc ra rất ít), đây là nguyên nhân gây vô sinh nam.",
    causes: [
      "Cơ vòng bàng quang bị suy yếu hoặc tổn thương không thể đóng chặt khi xuất tinh.",
      "Biến chứng của phẫu thuật vùng chậu (phẫu thuật tuyến tiền liệt).",
      "Tổn thương thần kinh do tiểu đường, đa xơ cứng hoặc tác dụng phụ của thuốc huyết áp."
    ],
    symptoms: [
      "Đạt cực khoái khô: Xuất tinh không thấy tinh dịch đi kèm.",
      "Nước tiểu sau khi quan hệ tình dục có màu đục (do chứa tinh dịch).",
      "Khó có con (vô sinh nam) dù sinh hoạt tình dục bình thường."
    ],
    prevention: [
      "Kiểm soát tốt lượng đường huyết để ngăn ngừa tổn thương dây thần kinh bàng quang ở bệnh nhân tiểu đường.",
      "Bổ sung sâm nước và các vitamin tăng cường sức dẻo dai cơ chậu thần kinh.",
      "Tham khảo ý kiến bác sĩ khi sử dụng các loại thuốc gây ảnh hưởng cơ vòng."
    ],
    recommendedProducts: ["achimmadang-box", "kudos-daily"]
  },
  "tac-ong-dan-tinh": {
    name: "Tắc ống dẫn tinh",
    category: "Bệnh Nam Giới",
    categorySlug: "nam-gioi",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&q=80",
    overview: "Tắc ống dẫn tinh là tình trạng đường dẫn tinh trùng từ tinh hoàn ra ngoài bị chặn lại ở một vị trí nào đó. Trẻ vẫn xuất tinh dịch bình thường nhưng trong dịch không chứa tinh trùng, dẫn đến vô sinh nam.",
    causes: [
      "Biến chứng viêm nhiễm nam khoa (viêm mào tinh, lao mào tinh hoàn) gây tắc nghẽn cơ học.",
      "Tổn thương vô ý sau phẫu thuật vùng bẹn, bìu (phẫu thuật thoát vị bẹn).",
      "Dị tật bẩm sinh thiếu một phần hoặc toàn bộ ống dẫn tinh."
    ],
    symptoms: [
      "Vô sinh nam (không có tinh trùng trong tinh dịch đồ - Azoospermia).",
      "Kích thước tinh hoàn bình thường, các chỉ số hormone sinh dục bình thường.",
      "Có thể sờ thấy mào tinh hoàn bị căng phồng khi thăm khám lâm sàng."
    ],
    prevention: [
      "Sử dụng các chất bổ trợ kháng viêm tự nhiên để phòng ngừa xơ hóa đường dẫn tinh.",
      "Bảo vệ bìu khỏi chấn thương vật lý.",
      "Khám và điều trị triệt để các đợt nhiễm trùng nam khoa sớm."
    ],
    recommendedProducts: ["nmn-pqq-kenko", "kudos-daily"]
  },
  "suy-giam-testosterone": {
    name: "Suy giảm Testosterone",
    category: "Bệnh Nam Giới",
    categorySlug: "nam-gioi",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80",
    overview: "Suy giảm Testosterone (mãn dục nam) là sự sụt giảm nồng độ nội tiết tố nam dưới mức bình thường (dưới 300 ng/dL). Tình trạng này thường bắt đầu sau tuổi 30 và tiến triển rõ rệt sau tuổi 50, ảnh hưởng sâu sắc đến cơ bắp, xương, tinh thần và chức năng tình dục.",
    causes: [
      "Quá trình lão hóa tự nhiên làm suy giảm tế bào Leydig ở tinh hoàn.",
      "Căng thẳng stress kéo dài, thiếu ngủ làm gián đoạn sản sinh testosterone.",
      "Các bệnh mãn tính như béo phì, tiểu đường tuýp 2, suy thận.",
      "Chế độ ăn thiếu dinh dưỡng (thiếu kẽm, chất béo có lợi)."
    ],
    symptoms: [
      "Giảm ham muốn tình dục, giảm tần suất cương dương vào sáng sớm.",
      "Mệt mỏi kéo dài, giảm khối lượng cơ bắp, tăng tích tụ mỡ thừa ở bụng.",
      "Tâm trạng thay đổi: Dễ nổi nóng, trầm cảm nhẹ, khó tập trung.",
      "Có xu hướng loãng xương, dễ gãy xương."
    ],
    prevention: [
      "Bổ sung nhân sâm bồi bổ cơ thể và tăng sinh lực phái mạnh.",
      "Bổ sung kẽm và các vitamin tổng hợp kích thích sản sinh hormone tự nhiên.",
      "Luyện tập thể dục thể thao đều đặn, ngủ đủ giấc.",
      "Hạn chế sử dụng rượu bia, chất kích thích gây ức chế nội tiết tố."
    ],
    recommendedProducts: ["achimmadang-box", "kudos-daily"]
  },
  "viem-tui-tinh": {
    name: "Viêm túi tinh",
    category: "Bệnh Nam Giới",
    categorySlug: "nam-gioi",
    image: "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?auto=format&fit=crop&w=400&q=80",
    overview: "Viêm túi tinh là tình trạng nhiễm trùng ở túi tinh - nơi dự trữ tinh dịch trước khi phóng tinh. Bệnh thường gây ra triệu chứng xuất tinh ra máu rất đặc trưng và gây đau đớn khi quan hệ tình dục.",
    causes: [
      "Nhiễm khuẩn ngược dòng từ niệu đạo, bàng quang hoặc tuyến tiền liệt.",
      "Biến chứng của bệnh lậu hoặc nhiễm khuẩn tiết niệu do E. coli.",
      "Hệ miễn dịch suy yếu."
    ],
    symptoms: [
      "Xuất tinh ra máu: Tinh dịch có màu hồng, đỏ tươi hoặc có sợi máu.",
      "Đau buốt vùng dưới rốn, đau sâu vùng tầng sinh môn khi phóng tinh.",
      "Tiểu buốt, tiểu rắt, đi tiểu nhiều lần.",
      "Có thể có sốt nhẹ hoặc ớn lạnh."
    ],
    prevention: [
      "Bổ sung vitamin C và dưỡng chất nâng cao miễn dịch cơ thể.",
      "Vệ sinh bộ phận sinh dục sạch sẽ hàng ngày bằng dung dịch kháng khuẩn.",
      "Quan hệ tình dục an toàn và uống đủ nước."
    ],
    recommendedProducts: ["kudos-vitc", "subac-gel"]
  },
  "viem-mao-tinh-hoan": {
    name: "Viêm mào tinh hoàn",
    category: "Bệnh Nam Giới",
    categorySlug: "nam-gioi",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&q=80",
    overview: "Viêm mào tinh hoàn là tình trạng viêm của ống cuộn (mào tinh hoàn) nằm ở phía sau tinh hoàn. Bệnh gây sưng đau bìu dữ dội và có thể dẫn đến vô sinh nếu chuyển sang giai đoạn mãn tính gây tắc ống mào tinh.",
    causes: [
      "Nhiễm trùng lây truyền qua đường tình dục (lậu, chlamydia) ở nam giới trẻ.",
      "Nhiễm trùng đường tiết niệu lan sang mào tinh ở nam giới lớn tuổi.",
      "Chấn thương vật lý vùng bìu."
    ],
    symptoms: [
      "Đau dữ dội ở một bên bìu, cơn đau lan lên vùng hố chậu.",
      "Bìu sưng to, đỏ, sờ vào thấy rất nóng và đau buốt.",
      "Có mủ chảy ra từ đầu dương vật.",
      "Sốt cao, ớn lạnh, đi tiểu buốt rát."
    ],
    prevention: [
      "Sử dụng các gel kháng khuẩn làm dịu ngoài da khi bìu có dấu hiệu viêm đỏ nhẹ.",
      "Luôn sử dụng biện pháp bảo vệ (bao cao su) khi quan hệ tình dục.",
      "Tránh ngồi lâu một chỗ hoặc mặc quần lót quá chật gây ép tinh hoàn."
    ],
    recommendedProducts: ["subac-gel", "kudos-vitc"]
  },
  "sa-tinh-hoan": {
    name: "Sa tinh hoàn",
    category: "Bệnh Nam Giới",
    categorySlug: "nam-gioi",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
    overview: "Sa tinh hoàn là tình trạng tinh hoàn bị chảy xệ xuống thấp hơn bình thường một cách rõ rệt. Đây có thể là biến đổi sinh lý do tuổi tác hoặc là dấu hiệu cảnh báo các bệnh lý thực thể nguy hiểm như giãn tĩnh mạch thừng tinh, tràn dịch màng tinh hoàn hoặc thoát vị bẹn.",
    causes: [
      "Sự suy yếu tự nhiên của các sợi cơ treo tinh hoàn do lão hóa.",
      "Giãn tĩnh mạch thừng tinh làm ứ máu vùng bìu gây trĩu bìu.",
      "Nhiệt độ bìu tăng cao lâu ngày (mặc quần chật, tắm nước quá nóng làm xệ tinh hoàn)."
    ],
    symptoms: [
      "Một hoặc cả hai bên tinh hoàn xệ xuống thấp rõ rệt khi đứng thẳng.",
      "Cảm giác căng tức, nặng nề ở bìu, đau tăng lên vào cuối ngày hoặc sau khi vận động mạnh.",
      "Sờ thấy các búi tĩnh mạch nổi ngoằn ngoèo như túi giun ở phía trên tinh hoàn (nếu do giãn tĩnh mạch)."
    ],
    prevention: [
      "Bổ sung các vitamin bảo vệ độ bền thành mạch máu.",
      "Tránh mặc quần lót quá chật, tránh tắm nước nóng quá lâu.",
      "Hạn chế mang vác đồ nặng làm tăng áp lực ổ bụng xuống vùng bìu."
    ],
    recommendedProducts: ["kudos-daily", "nmn-pqq-kenko"]
  },
  "vu-to-nam-gioi": {
    name: "Vú to ở nam giới",
    category: "Bệnh Nam Giới",
    categorySlug: "nam-gioi",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=400&q=80",
    overview: "Vú to ở nam giới (Gynecomastia) là tình trạng phát triển quá mức của mô tuyến vú ở nam giới. Rối loạn này xảy ra do sự mất cân bằng giữa lượng nội tiết tố Estrogen (nội tiết tố nữ) và Androgen (nội tiết tố nam) trong cơ thể.",
    causes: [
      "Sự sụt giảm testosterone tự nhiên hoặc tăng estrogen quá mức.",
      "Béo phì làm tăng men aromatase chuyển đổi androgen thành estrogen.",
      "Tác dụng phụ của một số loại thuốc huyết áp, thuốc dạ dày hoặc chất gây nghiện."
    ],
    symptoms: [
      "Mô vú sưng to dưới núm vú, sờ thấy cục nhân mềm dẹt.",
      "Có thể căng tức hoặc nhạy cảm đau nhẹ khi chạm vào vú.",
      "Tình trạng xuất hiện đồng đều ở cả hai bên ngực."
    ],
    prevention: [
      "Duy trì chế độ ăn lành mạnh, kiểm soát cân nặng ổn định.",
      "Bổ sung dinh dưỡng tăng cường sản sinh testosterone tự nhiên.",
      "Hạn chế tối đa việc lạm dụng rượu bia và chất kích thích gây rối loạn gan."
    ],
    recommendedProducts: ["achimmadang-box", "kudos-daily"]
  },
  "tang-tiet-mo-hoi": {
    name: "Tăng tiết mồ hôi",
    category: "Bệnh Nam Giới",
    categorySlug: "nam-gioi",
    image: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=400&q=80",
    overview: "Tăng tiết mồ hôi (Hyperhidrosis) là tình trạng cơ thể tiết mồ hôi quá mức cần thiết cho việc điều hòa thân nhiệt bình thường. Bệnh thường xuất hiện ở lòng bàn tay, lòng bàn chân, nách hoặc bẹn, gây cản trở lớn trong công việc và giao tiếp xã hội.",
    causes: [
      "Rối loạn hoạt động hệ thần kinh giao cảm kích thích quá mức tuyến mồ hôi.",
      "Yếu tố di truyền gia đình.",
      "Thứ phát do các bệnh lý như cường giáp, rối loạn hormone hoặc căng thẳng tâm lý kéo dài."
    ],
    symptoms: [
      "Mồ hôi ra liên tục ướt đẫm lòng bàn tay, bàn chân ngay cả khi thời tiết mát mẻ.",
      "Vùng nách áo thường xuyên ẩm ướt gây ố vàng và mùi cơ thể.",
      "Da vùng tăng tiết mồ hôi ẩm ướt, dễ bị bong tróc, nấm ngứa."
    ],
    prevention: [
      "Vệ sinh sạch sẽ cơ thể, sử dụng các sản phẩm kháng khuẩn ngoài da.",
      "Bổ sung nước và vitamin đầy đủ tránh mất điện giải.",
      "Hạn chế ăn thức ăn cay nóng, caffeine và uống rượu bia."
    ],
    recommendedProducts: ["subac-gel", "kudos-daily"]
  },

  // --- BỆNH NỮ GIỚI ---
  "viem-am-dao": {
    name: "Viêm âm đạo ở nữ giới",
    category: "Bệnh Nữ Giới",
    categorySlug: "nu-gioi",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
    overview: "Viêm âm đạo là tình trạng viêm nhiễm xảy ra ở âm đạo của phụ nữ, gây ngứa ngáy, đau rát và thay đổi khí hư dịch tiết. Đây là bệnh phụ khoa phổ biến nhất mà hầu hết phụ nữ đều mắc phải ít nhất một lần trong đời.",
    causes: [
      "Sự mất cân bằng vi khuẩn tự nhiên ở âm đạo (viêm âm đạo do vi khuẩn).",
      "Nhiễm nấm men Candida phát triển quá mức.",
      "Lây nhiễm trùng roi Trichomonas qua đường tình dục."
    ],
    symptoms: [
      "Khí hư thay đổi: Ra nhiều dịch trắng đục như bã đậu (do nấm) hoặc màu vàng xanh có mùi hôi (do vi khuẩn/trùng roi).",
      "Ngứa ngáy, nóng rát dữ dội ở vùng kín.",
      "Đau rát khi đi tiểu tiện hoặc đau khi quan hệ tình dục."
    ],
    prevention: [
      "Vệ sinh vùng kín sạch sẽ hàng ngày bằng nước sạch hoặc dung dịch dịu nhẹ.",
      "Sử dụng các loại gel bôi làm dịu da nhạy cảm khi bị viêm nhẹ.",
      "Mặc quần lót chất liệu cotton thoáng mát, tránh ẩm ướt."
    ],
    recommendedProducts: ["subac-gel", "aloclair-gel"]
  },
  "buong-trung-da-nang": {
    name: "Hội chứng buồng trứng đa nang",
    category: "Bệnh Nữ Giới",
    categorySlug: "nu-gioi",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80",
    overview: "Hội chứng buồng trứng đa nang (PCOS) là một rối loạn nội tiết phổ biến ở phụ nữ trong độ tuổi sinh sản. Bệnh đặc trưng bởi sự mất cân bằng hormone (tăng androgen), kinh nguyệt không đều và sự xuất hiện của nhiều nang nhỏ trên buồng trứng qua siêu âm, ảnh hưởng lớn đến khả năng làm mẹ.",
    causes: [
      "Đề kháng insulin làm cơ thể sản sinh quá nhiều nội tiết tố androgen.",
      "Yếu tố di truyền gia đình và chế độ dinh dưỡng không lành mạnh."
    ],
    symptoms: [
      "Kinh nguyệt không đều, thưa kinh hoặc mất kinh liên tục.",
      "Rậm lông ở mặt, ngực, bụng do tăng nồng độ androgen.",
      "Mụn trứng cá nặng, da dầu và rụng tóc nhiều.",
      "Tăng cân nhanh, béo bụng và khó giảm cân."
    ],
    prevention: [
      "Duy trì chế độ ăn ít tinh bột đường, nhiều chất xơ để cải thiện đề kháng insulin.",
      "Luyện tập thể dục thường xuyên giúp giảm cân và điều hòa kinh nguyệt.",
      "Bổ sung vitamin tổng hợp nâng cao sức khỏe nội tiết."
    ],
    recommendedProducts: ["kudos-daily", "nmn-pqq-kenko"]
  },
  "lac-noi-mac-tu-cung": {
    name: "Lạc nội mạc tử cung",
    category: "Bệnh Nữ Giới",
    categorySlug: "nu-gioi",
    image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=400&q=80",
    overview: "Lạc nội mạc tử cung là tình trạng các mô tương tự như lớp lót bên trong tử cung (nội mạc tử cung) phát triển ở bên ngoài tử cung (như trên buồng trứng, ống dẫn trứng hoặc vùng chậu). Các mô này vẫn hoạt động bình thường trong chu kỳ kinh nguyệt, gây chảy máu và đau đớn dữ dội.",
    causes: [
      "Kinh nguyệt ngược dòng: Máu kinh chứa tế bào nội mạc chảy ngược qua ống dẫn trứng vào khoang chậu.",
      "Sự chuyển đổi tế bào phúc mạc hoặc tế bào phôi thai thành mô nội mạc dưới tác động của hormone."
    ],
    symptoms: [
      "Đau bụng kinh dữ dội, đau tăng dần theo thời gian.",
      "Đau vùng chậu mãn tính, đặc biệt đau khi quan hệ tình dục hoặc khi đi tiểu.",
      "Lượng máu kinh ra quá nhiều hoặc xuất huyết âm đạo giữa chu kỳ."
    ],
    prevention: [
      "Bổ sung các vitamin tổng hợp và vitamin C nâng cao sức khỏe hệ thống.",
      "Sử dụng các chất kháng viêm tự nhiên để hỗ trợ giảm cơn đau khớp cơ.",
      "Khám phụ khoa ngay khi gặp tình trạng đau bụng kinh bất thường kéo dài."
    ],
    recommendedProducts: ["kudos-daily", "kudos-vitc"]
  },
  "ung-thu-co-tuyen-tu-cung": {
    name: "Ung thư cổ tử cung",
    category: "Bệnh Nữ Giới",
    categorySlug: "nu-gioi",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=400&q=80",
    overview: "Ung thư cổ tử cung là loại ung thư ác tính phát triển từ các tế bào lót ở cổ tử cung. Gần 99% các ca bệnh có liên quan mật thiết đến việc nhiễm virus HPV (Human Papillomavirus) chủng nguy cơ cao kéo dài.",
    causes: [
      "Nhiễm virus HPV chủng 16 và 18 lây qua đường tình dục.",
      "Hệ miễn dịch suy yếu, hút thuốc lá hoặc sinh con nhiều lần."
    ],
    symptoms: [
      "Giai đoạn đầu thường không có triệu chứng rõ ràng.",
      "Chảy máu âm đạo bất thường (sau khi quan hệ, giữa kỳ kinh hoặc sau mãn kinh).",
      "Khí hư ra nhiều, có lẫn máu và mùi hôi khó chịu.",
      "Đau vùng chậu âm ỉ kéo dài."
    ],
    prevention: [
      "Tiêm vắc-xin phòng ngừa virus HPV đầy đủ trước tuổi 26.",
      "Thực hiện xét nghiệm Pap smear hoặc xét nghiệm HPV định kỳ để tầm soát sớm.",
      "Bổ sung các thực phẩm chống oxy hóa mạnh (Fucoidan) bảo vệ tế bào cơ thể."
    ],
    recommendedProducts: ["nano-fucoidan", "nmn-pqq-kenko"]
  },

  // --- BỆNH NGƯỜI GIÀ ---
  "tang-huyet-ap": {
    name: "Tăng huyết áp ở người cao tuổi",
    category: "Bệnh Người Già",
    categorySlug: "nguoi-gia",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80",
    overview: "Tăng huyết áp (cao huyết áp) ở người cao tuổi là tình trạng áp lực máu lên thành động mạch tăng cao liên tục (huyết áp tâm thu >= 140 mmHg và/hoặc huyết áp tâm trương >= 90 mmHg). Bệnh được ví như 'kẻ giết người thầm lặng' vì có thể âm thầm gây ra đột quỵ hoặc suy tim.",
    causes: [
      "Sự xơ cứng và giảm độ đàn hồi của các mạch máu lớn do lão hóa.",
      "Chế độ ăn nhiều muối, lạm dụng rượu bia và lối sống ít vận động.",
      "Biến chứng của các bệnh lý mãn tính như suy thận, tiểu đường."
    ],
    symptoms: [
      "Đa số không có dấu hiệu rõ rệt.",
      "Đau đầu âm ỉ vùng chẩm (sau gáy), chóng mặt, hoa mắt.",
      "Cảm giác trống ngực đập nhanh, khó thở khi gắng sức."
    ],
    prevention: [
      "Duy trì chế độ ăn giảm muối (dưới 5g muối/ngày), hạn chế chất béo động vật.",
      "Bồi bổ sức khỏe thành mạch máu bằng nhân sâm và vitamin tổng hợp.",
      "Đo huyết áp hàng ngày tại nhà để theo dõi sức khỏe chủ động."
    ],
    recommendedProducts: ["achimmadang-box", "kudos-daily"]
  },
  "tai-bien-mach-mau-nao": {
    name: "Tai biến mạch máu não",
    category: "Bệnh Người Già",
    categorySlug: "nguoi-gia",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=400&q=80",
    overview: "Tai biến mạch máu não (đột quỵ não) xảy ra khi nguồn máu cung cấp cho một phần não bộ bị gián đoạn (nhồi máu não) hoặc mạch máu não bị vỡ (xuất huyết não), dẫn đến thiếu oxy và chết tế bào não cực kỳ nhanh chóng. Đây là cấp cứu khẩn cấp nguy hiểm hàng đầu.",
    causes: [
      "Tắc nghẽn mạch máu do cục máu đông hình thành từ mảng xơ vữa động mạch.",
      "Vỡ mạch máu não do huyết áp cao kiểm soát kém."
    ],
    symptoms: [
      "Quy tắc F.A.S.T: Face (méo miệng lệch mặt), Arm (yếu liệt tay chân), Speech (nói ngọng, khó nói), Time (gọi cấp cứu ngay lập tức).",
      "Đau đầu dữ dội đột ngột không rõ nguyên nhân, hoa mắt chóng mặt dữ dội."
    ],
    prevention: [
      "Bổ sung các chất dinh dưỡng chống lão hóa tế bào thần kinh mạch máu.",
      "Kiểm soát huyết áp, đường huyết và mỡ máu ở mức an toàn.",
      "Tránh thay đổi nhiệt độ đột ngột (tránh tắm đêm)."
    ],
    recommendedProducts: ["nmn-pqq-kenko", "achimmadang-box"]
  },
  "thoai-hoa-khop": {
    name: "Thoái hóa khớp",
    category: "Bệnh Người Già",
    categorySlug: "nguoi-gia",
    image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=400&q=80",
    overview: "Thoái hóa khớp là tình trạng mài mòn và hư tổn sụn khớp khớp (lớp đệm đầu xương) tiến triển theo thời gian. Bệnh gây đau đớn, biến dạng khớp và hạn chế vận động trầm trọng ở người cao tuổi.",
    causes: [
      "Lão hóa tự nhiên làm giảm sản sinh collagen và chất nhầy bôi trơn khớp.",
      "Tổn thương cơ học tích tụ do vận động nặng, thừa cân béo phì tạo áp lực lên khớp khớp."
    ],
    symptoms: [
      "Đau khớp: Đau tăng lên khi vận động và giảm đi khi nghỉ ngơi.",
      "Cứng khớp vào buổi sáng sau khi ngủ dậy, kéo dài dưới 30 phút.",
      "Có tiếng lạo xạo, lục cục phát ra từ khớp khi di chuyển.",
      "Sưng nhẹ quanh khớp, hạn chế khả năng đi lại, lên xuống cầu thang."
    ],
    prevention: [
      "Bổ sung dinh dưỡng sụn khớp khớp, canxi và vitamin hàng ngày.",
      "Kiểm soát tốt cân nặng ổn định để giảm tải cho khớp khớp gối, khớp hông.",
      "Duy trì tập luyện nhẹ nhàng như đi bộ, bơi lội."
    ],
    recommendedProducts: ["ensure-gold-800g", "kudos-daily"]
  },
  "tieu-duong-tuyp-2": {
    name: "Đái tháo đường tuýp 2",
    category: "Bệnh Người Già",
    categorySlug: "nguoi-gia",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80",
    overview: "Đái tháo đường tuýp 2 là bệnh rối loạn chuyển hóa mãn tính đặc trưng bởi tình trạng đường huyết tăng cao do cơ thể đề kháng với insulin. Bệnh dễ dẫn đến các biến chứng nguy hiểm ở tim, thận, mắt và thần kinh nếu không được kiểm soát tốt.",
    causes: [
      "Tình trạng đề kháng insulin của tế bào cơ thể.",
      "Thừa cân béo phì, lối sống ít vận động, chế độ ăn nhiều tinh bột tinh luyện và đường."
    ],
    symptoms: [
      "Tiểu nhiều (đặc biệt về đêm), hay khát nước, uống nhiều nước.",
      "Cảm giác nhanh đói, ăn nhiều nhưng vẫn sụt cân nhanh.",
      "Mệt mỏi cơ thể thường xuyên, nhìn mờ.",
      "Vết thương, vết trầy xước rất lâu lành."
    ],
    prevention: [
      "Duy trì chế độ ăn giảm đường tinh luyện, ăn nhiều rau xanh, chất xơ.",
      "Bổ sung các thực phẩm dinh dưỡng chuyên biệt dành cho người tiểu đường để ổn định đường huyết.",
      "Tập thể dục ít nhất 30 phút mỗi ngày."
    ],
    recommendedProducts: ["kudos-daily", "ensure-gold-800g"]
  },

  // --- BỆNH TRẺ EM ---
  "sot-xuat-huyet": {
    name: "Sốt xuất huyết ở trẻ em",
    category: "Bệnh Trẻ Em",
    categorySlug: "tre-em",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80",
    overview: "Sốt xuất huyết Dengue là bệnh truyền nhiễm cấp tính do virus Dengue lây truyền qua vết cắn của muỗi vằn Aedes aegypti. Trẻ em là đối tượng dễ gặp biến chứng nặng như sốc giảm thể tích, xuất huyết nội tạng đe dọa tính mạng.",
    causes: [
      "Virus Dengue truyền sang trẻ qua vết đốt của muỗi vằn mang mầm bệnh.",
      "Bùng phát mạnh vào mùa mưa tại những nơi nước đọng."
    ],
    symptoms: [
      "Sốt cao đột ngột, liên tục từ 2 - 7 ngày, rất khó hạ sốt bằng thuốc thông thường.",
      "Đau đầu, đau hốc mắt, đau mỏi cơ khớp khớp.",
      "Xuất hiện các chấm xuất huyết dưới da, chảy máu cam hoặc chảy máu chân răng.",
      "Trẻ quấy khóc, chán ăn, nôn trớ, đau bụng."
    ],
    prevention: [
      "Bổ sung nước bù điện giải Kamizol nhanh chóng khi trẻ sốt cao để tránh mất nước.",
      "Sử dụng nhiệt kế hồng ngoại đo trán Microlife NC200 để theo dõi sát thân nhiệt cho trẻ mà không gây khó chịu.",
      "Diệt muỗi, lăng quăng, phát quang bụi rậm và cho trẻ ngủ mùng kể cả ban ngày."
    ],
    recommendedProducts: ["kudos-vitc", "kudos-daily"]
  },
  "tay-chan-mieng": {
    name: "Bệnh tay chân miệng",
    category: "Bệnh Trẻ Em",
    categorySlug: "tre-em",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
    overview: "Tay chân miệng là bệnh truyền nhiễm thường gặp ở trẻ sơ sinh và trẻ nhỏ dưới 5 tuổi. Bệnh đặc trưng bởi tình trạng sốt, nổi phỏng nước ở lòng bàn tay, bàn chân và loét đau đớn trong khoang miệng.",
    causes: [
      "Nhiễm virus đường ruột, phổ biến nhất là Coxsackievirus A16 và Enterovirus 71 (EV71) dễ gây biến chứng não."
    ],
    symptoms: [
      "Sốt nhẹ đến sốt cao kèm đau họng, chảy nước bọt nhiều do loét miệng.",
      "Các vết loét đỏ đường kính 2 - 3 mm ở niêm mạc miệng, lợi, lưỡi gây đau khi ăn bú.",
      "Phỏng nước ở lòng bàn tay, lòng bàn chân, mông, đầu gối."
    ],
    prevention: [
      "Sử dụng gel bôi miệng làm dịu vết loét để giúp trẻ bớt đau đớn và ăn bú được.",
      "Sử dụng gel sát khuẩn ngoài da làm sạch các nốt phỏng nước rỉ dịch.",
      "Rửa tay sạch sẽ bằng xà phòng trước khi chăm sóc trẻ và ăn uống sạch."
    ],
    recommendedProducts: ["aloclair-gel", "subac-gel"]
  },
  "suy-dinh-duong": {
    name: "Suy dinh dưỡng trẻ em",
    category: "Bệnh Trẻ Em",
    categorySlug: "tre-em",
    image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=400&q=80",
    overview: "Suy dinh dưỡng là tình trạng cơ thể trẻ thiếu hụt năng lượng và các chất dinh dưỡng cần thiết, ảnh hưởng đến sự phát triển bình thường về thể chất và trí tuệ của trẻ.",
    causes: [
      "Chế độ ăn nghèo nàn dưỡng chất, cai sữa mẹ quá sớm hoặc ăn dặm không đúng cách.",
      "Trẻ biếng ăn hoặc mắc các bệnh nhiễm trùng đường hô hấp, tiêu hóa tái phát nhiều lần."
    ],
    symptoms: [
      "Cân nặng và chiều cao đứng yên hoặc sụt giảm dưới chuẩn sinh trưởng.",
      "Trẻ chậm chạp, mệt mỏi, kém linh hoạt, cơ bắp nhão.",
      "Da xanh xao, tóc thưa dễ rụng, hay quấy khóc ban đêm."
    ],
    prevention: [
      "Bổ sung sữa bột dinh dưỡng nhạt mát đầy đủ dưỡng chất để bé hấp thu tối đa.",
      "Bổ sung **DHA tinh khiết** giúp não bộ phát triển toàn diện bắt kịp đà tăng trưởng.",
      "Tạo chế độ ăn dặm đa dạng phong phú, kích thích cảm giác ăn ngon ở trẻ."
    ],
    recommendedProducts: ["icreo-glico-800g", "brauer-dha"]
  },
  "viem-phe-quan-pho-co": {
    name: "Viêm phế quan phổi",
    category: "Bệnh Trẻ Em",
    categorySlug: "tre-em",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80",
    overview: "Viêm phế quản phổi là tổn thương viêm nhiễm cấp tính ở các phế nang, phế quản phế nang và tổ chức liên kết quanh phế quản phổi của trẻ. Đây là nguyên nhân hàng đầu gây tử vong ở trẻ em dưới 5 tuổi.",
    causes: [
      "Nhiễm vi khuẩn (phế cầu, liên cầu) hoặc các virus hô hấp (RSV, cúm) lan xuống phổi."
    ],
    symptoms: [
      "Sốt cao, ho khạc đờm đặc đục.",
      "Thở nhanh bất thường, thở rút lõm lồng ngực (dấu hiệu nguy hiểm).",
      "Khó thở, tím tái môi quanh miệng, bú kém hoặc bỏ bú."
    ],
    prevention: [
      "Sử dụng nhiệt kế đo trán theo dõi thân nhiệt chuẩn xác liên tục.",
      "Vệ sinh mắt mũi hàng ngày bằng nước muối sinh lý đẳng trương.",
      "Tiêm phòng vắc-xin phế cầu và vắc-xin cúm đầy đủ hàng năm."
    ],
    recommendedProducts: ["kudos-daily", "fysoline-iso-box"]
  }
};

function DiseaseImage({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-3 text-center select-none">
        <span className="text-[20px] mb-1">🩺</span>
        <span className="text-[9px] font-extrabold text-[#024ad8]/80 uppercase tracking-wider line-clamp-2 px-1">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
      onError={() => setHasError(true)}
    />
  );
}

export default function DiseaseDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<'overview' | 'causes' | 'symptoms' | 'prevention'>('overview');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Check if slug is a category or a disease
  const isCategory = useMemo(() => {
    return slug === 'nam-gioi' || slug === 'nu-gioi' || slug === 'nguoi-gia' || slug === 'tre-em';
  }, [slug]);

  // Get diseases in this category for Category Listing page
  const categoryDiseases = useMemo(() => {
    if (!isCategory) return [];
    return Object.entries(DISEASE_DATA)
      .filter(([_, d]) => d.categorySlug === slug)
      .map(([s, d]) => ({
        slug: s,
        ...d
      }));
  }, [isCategory, slug]);

  const disease = useMemo(() => {
    if (isCategory) return null;
    return DISEASE_DATA[slug];
  }, [isCategory, slug]);

  // Map product recommendations
  const products = useMemo(() => {
    if (!disease) return [];
    return disease.recommendedProducts.map(id => {
      const productInfo = RETAIL_PRODUCT_MAP[id];
      if (!productInfo) return null;
      
      let productSlug = "san-pham";
      if (id === "ensure-gold-800g") {
        productSlug = "sua-tang-cuong-suc-khoe-khoi-co-tang-mien-dich-ensure-gold-strengthpro-huong-vani-800g";
      } else if (id === "kudos-daily") {
        productSlug = "vien-sui-giup-bo-sung-cac-vitamin-cho-co-the-kudos-daily-vitamins-tuyp-20-vien";
      } else if (id === "nmn-pqq-kenko") {
        productSlug = "vien-uong-ho-tro-chong-lao-hoa-cai-thien-lan-da-va-tang-de-khang-nmn-pqq-kenko-hop-60-vien";
      } else if (id === "aloclair-gel") {
        productSlug = "gel-boi-mieng-aloclair-plus-alliance-8ml";
      } else if (id === "subac-gel") {
        productSlug = "gel-boi-su-bac-khang-khuan-lam-sach-da-25g";
      } else if (id === "achimmadang-box") {
        productSlug = "nuoc-sam-nguyen-cu-achimmadang-inbosam-biok-korea-root-drink-hop-10-chai-x-120ml";
      } else if (id === "kudos-vitc") {
        productSlug = "vien-sui-giup-bo-sung-vitamin-c-cho-co-the-kudos-vitamin-c-1000mg-huong-chanh-20-vien";
      } else if (id === "brauer-dha") {
        productSlug = "vien-ho-tro-phat-trien-nao-bo-suc-khoe-cho-mat-brauer-baby-kids-ultra-pure-dha-hop-60-vien";
      } else if (id === "icreo-glico-800g") {
        productSlug = "sua-ho-tro-he-mien-dich-va-tieu-hoa-khoe-manh-cho-tre-tu-0-thang-tuoi-icreo-balance-milk-glico-800g";
      } else if (id === "fysoline-iso-box") {
        productSlug = "nuoc-muoi-sinh-ly-fysoline-isotonique-dang-truong-40-ong-x-5ml-giup-ve-sinh-mat-mui-hang-ngay";
      }

      return {
        ...productInfo,
        slug: productSlug
      };
    }).filter((item): item is Exclude<typeof item, null> => item !== null);
  }, [disease]);

  // Get related diseases (in the same category, excluding current disease)
  const relatedDiseases = useMemo(() => {
    if (isCategory || !disease) return [];
    return Object.entries(DISEASE_DATA)
      .filter(([s, d]) => d.categorySlug === disease.categorySlug && s !== slug)
      .map(([s, d]) => ({
        slug: s,
        ...d
      }))
      .slice(0, 16); // Show max 16 related articles like screenshot
  }, [isCategory, disease, slug]);

  // CATEGORY LISTING VIEW
  if (isCategory) {
    const meta = CATEGORY_META[slug as keyof typeof CATEGORY_META];
    if (!meta) return null;

    return (
      <div className="flex-1 bg-[#f8fafc] py-6 min-h-screen">
        <div className="max-w-[1200px] mx-auto px-4">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold mb-6 flex-wrap">
            <Link href="/" className="hover:text-[#024ad8] flex items-center gap-1 transition-colors">
              <Home size={13} className="translate-y-[-1px]" /> Trang chủ
            </Link>
            <ChevronRight size={12} className="text-gray-400" />
            <span className="text-gray-400">Góc sức khỏe</span>
            <ChevronRight size={12} className="text-gray-400" />
            <span className="text-ink font-bold">{meta.name}</span>
          </div>

          {/* Hero Header */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-3xl p-6 md:p-8 shadow-lg relative overflow-hidden mb-8">
            <div className="absolute top-0 right-0 w-[260px] h-[260px] bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 max-w-3xl text-left">
              <span className="inline-block bg-blue-600 text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase mb-3.5 shadow-sm">
                CHUYÊN MỤC SỨC KHỎE
              </span>
              <h1 className="text-2xl md:text-3xl font-black mb-3 leading-tight tracking-tight uppercase">
                {meta.name}
              </h1>
              <p className="text-blue-100 font-semibold leading-relaxed text-xs md:text-sm">
                {meta.description}
              </p>
            </div>
          </div>

          {/* Grid Layout Title */}
          <div className="flex items-center gap-2 mb-6 border-b border-fog/60 pb-3">
            <BookOpen className="text-[#024ad8] w-5 h-5" />
            <h2 className="text-md font-black text-ink uppercase tracking-wide">Các bài viết liên quan</h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 animate-in fade-in zoom-in-95 duration-300">
            {categoryDiseases.map((d, i) => (
              <div 
                key={i} 
                className="bg-white rounded-2xl p-4 shadow-sm border border-fog hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <Link href={`/benh/${d.slug}`} className="block cursor-pointer flex-1 flex flex-col justify-between">
                  <div>
                    <div className="aspect-video w-full rounded-xl overflow-hidden mb-3 bg-cloud relative border border-fog/50">
                      <DiseaseImage src={d.image} alt={d.name} />
                    </div>
                    <h3 className="font-bold text-[14px] text-[#1e293b] group-hover:text-[#024ad8] transition-colors leading-snug text-left mb-2 line-clamp-2">
                      {d.name}
                    </h3>
                    <p className="text-[11px] text-gray-400 font-medium leading-relaxed line-clamp-3 text-left">
                      {d.overview}
                    </p>
                  </div>
                  <div className="text-[#024ad8] font-bold text-xs flex items-center gap-0.5 mt-3 pt-3 border-t border-fog/40 hover:underline shrink-0">
                    Chi tiết bài viết <ChevronRight size={13} />
                  </div>
                </Link>
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  }

  // DISEASE DETAIL VIEW
  if (!disease) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center max-w-md">
          <Activity className="w-16 h-16 text-[#024ad8]/40 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-ink mb-2">Không tìm thấy thông tin bệnh</h2>
          <p className="text-gray-500 mb-6 font-medium">Bệnh lý bạn đang tìm kiếm chưa được cập nhật hoặc đường dẫn không chính xác.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-[#024ad8] hover:bg-[#01359c] text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-sm">
            <ArrowLeft size={16} /> Quay lại trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#f8fafc] py-6 relative min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold mb-6 flex-wrap">
          <Link href="/" className="hover:text-[#024ad8] flex items-center gap-1 transition-colors">
            <Home size={13} className="translate-y-[-1px]" /> Trang chủ
          </Link>
          <ChevronRight size={12} className="text-gray-400" />
          <span className="text-gray-400">Góc sức khỏe</span>
          <ChevronRight size={12} className="text-gray-400" />
          <Link href={`/benh/${disease.categorySlug}`} className="hover:text-[#024ad8] transition-colors">
            {disease.category}
          </Link>
          <ChevronRight size={12} className="text-gray-400" />
          <span className="text-ink font-bold">{disease.name}</span>
        </div>

        {/* Hero Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-3xl p-6 md:p-8 shadow-lg relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-[-50px] left-[-50px] w-[200px] h-[200px] bg-blue-900/40 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl text-left">
            <Link href={`/benh/${disease.categorySlug}`} className="inline-block bg-blue-600 hover:bg-blue-500 text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase mb-4 shadow-sm transition-colors">
              {disease.category}
            </Link>
            <h1 className="text-2xl md:text-3xl font-black mb-3 leading-tight tracking-tight">
              {disease.name}
            </h1>
            <p className="text-blue-100 font-semibold leading-relaxed text-xs md:text-sm">
              {disease.overview}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Health Info */}
          <div className="lg:col-span-2 flex flex-col">
            
            {/* Tabs */}
            <div className="bg-white p-1.5 rounded-2xl border border-fog/60 shadow-sm flex overflow-x-auto gap-1 mb-6 scrollbar-none shrink-0">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs whitespace-nowrap transition-all duration-300 ${activeTab === 'overview' ? 'bg-[#024ad8] text-white shadow-sm' : 'text-graphite hover:text-ink hover:bg-cloud/50'}`}
              >
                <Info size={14} /> Tổng quan
              </button>
              <button 
                onClick={() => setActiveTab('causes')}
                className={`flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs whitespace-nowrap transition-all duration-300 ${activeTab === 'causes' ? 'bg-[#024ad8] text-white shadow-sm' : 'text-graphite hover:text-ink hover:bg-cloud/50'}`}
              >
                <Activity size={14} /> Nguyên nhân
              </button>
              <button 
                onClick={() => setActiveTab('symptoms')}
                className={`flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs whitespace-nowrap transition-all duration-300 ${activeTab === 'symptoms' ? 'bg-[#024ad8] text-white shadow-sm' : 'text-graphite hover:text-ink hover:bg-cloud/50'}`}
              >
                <FileText size={14} /> Triệu chứng
              </button>
              <button 
                onClick={() => setActiveTab('prevention')}
                className={`flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs whitespace-nowrap transition-all duration-300 ${activeTab === 'prevention' ? 'bg-[#024ad8] text-white shadow-sm' : 'text-graphite hover:text-ink hover:bg-cloud/50'}`}
              >
                <Shield size={14} /> Phòng ngừa & Hỗ trợ
              </button>
            </div>

            {/* Tab Contents */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-fog/60 shadow-sm flex-1 text-left">
              
              {activeTab === 'overview' && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-base font-black text-ink mb-4 flex items-center gap-2 border-b border-fog/60 pb-3">
                    <Info className="text-[#024ad8] w-5 h-5" /> Giới thiệu chung về bệnh lý
                  </h2>
                  <div className="text-gray-600 font-semibold text-xs leading-relaxed space-y-4">
                    <p>{disease.overview}</p>
                    <p className="p-4 bg-blue-50/50 text-blue-800 rounded-2xl border border-blue-100/60 font-bold text-[11px] leading-relaxed flex gap-2">
                      <span className="text-base">💡</span>
                      <span>Lưu ý: Bệnh lý học có thể diễn biến phức tạp tùy thuộc vào cơ địa và tuổi tác của từng người. Bạn nên nắm vững nguyên nhân và triệu chứng để có biện pháp can thiệp sớm nhất.</span>
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'causes' && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-base font-black text-ink mb-4 flex items-center gap-2 border-b border-fog/60 pb-3">
                    <Activity className="text-[#024ad8] w-5 h-5" /> Nguyên nhân gây bệnh lý
                  </h2>
                  <p className="text-gray-500 font-bold text-xs mb-4">Các tác nhân chính gây ra và thúc đẩy sự phát triển của bệnh bao gồm:</p>
                  <ul className="space-y-3">
                    {disease.causes.map((cause, idx) => (
                      <li key={idx} className="flex gap-3 text-xs font-semibold text-gray-600 leading-relaxed items-start">
                        <span className="w-5 h-5 rounded-full bg-red-50 text-red-500 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'symptoms' && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-base font-black text-ink mb-4 flex items-center gap-2 border-b border-fog/60 pb-3">
                    <FileText className="text-[#024ad8] w-5 h-5" /> Triệu chứng lâm sàng
                  </h2>
                  <p className="text-gray-500 font-bold text-xs mb-4">Hãy chú ý đề phòng các dấu hiệu cảnh báo dưới đây để đi khám kịp thời:</p>
                  <ul className="space-y-3">
                    {disease.symptoms.map((symptom, idx) => (
                      <li key={idx} className="flex gap-3 text-xs font-semibold text-gray-600 leading-relaxed items-start">
                        <span className="w-5 h-5 rounded-full bg-amber-50 text-amber-500 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                          ⚠️
                        </span>
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'prevention' && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-base font-black text-ink mb-4 flex items-center gap-2 border-b border-fog/60 pb-3">
                    <Shield className="text-[#024ad8] w-5 h-5" /> Biện pháp phòng ngừa và hỗ trợ điều trị
                  </h2>
                  <p className="text-gray-500 font-bold text-xs mb-4">Để bảo vệ bản thân và gia đình trước các biến chứng, hãy áp dụng tốt các khuyến nghị sau:</p>
                  <ul className="space-y-3">
                    {disease.prevention.map((prev, idx) => (
                      <li key={idx} className="flex gap-3 text-xs font-semibold text-gray-600 leading-relaxed items-start">
                        <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span>{prev}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </div>

          {/* Right Column: Recommended Products */}
          <div className="flex flex-col">
            <div className="bg-white rounded-3xl p-6 border border-fog/60 shadow-sm flex-1 flex flex-col text-left">
              <h3 className="font-black text-[15px] text-ink uppercase tracking-wide mb-4 flex items-center gap-2 pb-3 border-b border-fog/60">
                <ShoppingCart className="text-[#024ad8] w-5 h-5" /> Dược phẩm hỗ trợ
              </h3>
              <p className="text-xs text-gray-500 font-bold leading-normal mb-5">
                Các sản phẩm dinh dưỡng, thực phẩm bảo vệ sức khỏe chuyên biệt bổ sung dinh dưỡng phù hợp cho bệnh lý này:
              </p>
              
              <div className="flex-1 flex flex-col gap-4">
                {products.length > 0 ? (
                  products.map((p, idx) => {
                    if (!p) return null;
                    
                    return (
                      <div 
                        key={idx} 
                        className="border border-fog rounded-2xl p-4 flex flex-col justify-between hover:shadow-md hover:border-blue-100 transition-all duration-300 group bg-[#fafcfd]/50"
                      >
                        <div className="flex gap-3 items-start mb-3">
                          <Link href={`/san-pham/${p.slug}`} className="w-20 h-20 bg-cloud rounded-xl overflow-hidden flex items-center justify-center shrink-0 border border-fog/45 cursor-pointer">
                            <img src={p.imageUrl} alt={p.name} className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform" />
                          </Link>
                          
                          <div className="flex-1 text-left">
                            <Link href={`/san-pham/${p.slug}`} className="text-[12px] font-extrabold text-ink leading-snug line-clamp-2 hover:text-[#024ad8] transition-colors cursor-pointer mb-1">
                              {p.name}
                            </Link>
                            <span className="inline-block bg-cloud text-gray-400 border border-fog/45 text-[8px] font-black px-1.5 py-0.5 rounded uppercase mt-0.5">
                              {p.activeIngredient ? p.activeIngredient.split(',')[0].slice(0, 22) : 'Dinh dưỡng'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-3 border-t border-fog/60">
                          <div className="text-left">
                            <strong className="text-[13px] font-black text-[#024ad8]">
                              {p.price.toLocaleString('vi-VN')}đ
                            </strong>
                            <span className="text-[9px] text-graphite font-semibold"> / {p.unit}</span>
                          </div>

                          <button 
                            onClick={() => {
                              addToCart({
                                id: p.id,
                                dbId: p.dbId,
                                name: p.name,
                                price: p.price,
                                unit: p.unit,
                                imageUrl: p.imageUrl,
                                activeIngredient: p.activeIngredient,
                                isAvailable: p.isAvailable
                              });
                              triggerToast(`Đã thêm ${p.name.slice(0, 20)}... vào giỏ hàng.`);
                            }}
                            className="bg-[#024ad8] hover:bg-[#01359c] text-white p-2 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1 text-[11px] font-extrabold px-3.5"
                          >
                            <Plus size={13} strokeWidth={3} /> Chọn mua
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                    <Activity className="w-10 h-10 mb-2 opacity-35" />
                    <span className="text-xs font-semibold">Đang cập nhật sản phẩm hỗ trợ</span>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

        {/* Related Articles Section */}
        {relatedDiseases.length > 0 && (
          <div className="mt-12 pt-8 border-t border-fog/60 text-left">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="text-[#024ad8] w-5 h-5" />
              <h2 className="text-[15px] font-black text-blue-900 tracking-wide">các bài viết liên quan</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {relatedDiseases.map((d, i) => (
                <Link 
                  key={i} 
                  href={`/benh/${d.slug}`}
                  className="bg-white rounded-2xl p-3 shadow-sm border border-fog hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer"
                >
                  <div className="aspect-video w-full rounded-xl overflow-hidden mb-2.5 bg-cloud relative border border-fog/40">
                    <DiseaseImage src={d.image} alt={d.name} />
                  </div>
                  <h3 className="font-bold text-[13px] text-[#1e293b] group-hover:text-[#024ad8] transition-colors leading-snug line-clamp-2">
                    {d.name}
                  </h3>
                </Link>
              ))}
            </div>

            {/* View More Link */}
            <div className="flex justify-center mt-8">
              <Link 
                href={`/benh/${disease.categorySlug}`} 
                className="inline-flex items-center gap-1.5 text-xs font-black text-[#024ad8] hover:text-white bg-blue-50 hover:bg-[#024ad8] px-6 py-3 rounded-full border border-blue-100/50 transition-all duration-300 shadow-sm"
              >
                Xem thêm các bài viết về {disease.category} <ChevronRight size={13} />
              </Link>
            </div>
          </div>
        )}

      </div>

      {/* Floating Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-[#1e293b] text-white px-5 py-3.5 rounded-2xl flex items-center gap-2.5 shadow-2xl border border-slate-700/60 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300 font-semibold text-xs max-w-sm">
          <CheckCircle size={16} className="text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
