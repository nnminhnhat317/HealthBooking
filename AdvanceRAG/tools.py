# 1. Định nghĩa Schema cho Tool OpenAI
tools_schema = [
    {
        "type": "function",
        "function": {
            "name": "check_schedule_tool",
            "description": "Tra cứu lịch khám chi tiết của bác sĩ. Dùng khi user hỏi về thời gian, lịch trống. Nhưng nếu không có đủ 1 trong 2 tham số cho tool, hãy trả lời rằng bạn không thể tra cứu lịch.",
            "parameters": {
                "type": "object",
                "properties": {
                    "doctor_id": {
                        "type": "integer",
                        "description": "ID định danh của bác sĩ. Nếu không có trong ngữ cảnh, hãy trả lời rằng bạn hãy cung cấp tên bác sĩ mà bạn muốn đặt lịch."
                    },
                    "date_text": {
                        "type": "string",
                        "description": "NGUYÊN VĂN thời gian user nói (không suy luận, không đổi). Ngày muốn khám (VD: 'hôm nay', 'ngày mai', 'tuần này', '1/1/2026'). Nếu không có trong ngữ cảnh, hãy trả lời rằng hãy cung cấp ngày mà bạn muốn đặt lịch."
                    }
                },
                "required": ["doctor_id", "date_text"]
            }
        }
    }
]

import requests
from datetime import datetime, timedelta
import dateparser
import re
# Hàm phụ trợ: Chuyển đổi ngôn ngữ tự nhiên sang ngày YYYY-MM-DD
def parse_date_from_text(text: str) -> str:

    # xử lý case User hỏi ngày cụ thể như "ngày 16 tuần này", "mùng 5"
    text = text.lower().strip()
    now = datetime.now()
    # --- BƯỚC 1: Xử lý ưu tiên nếu user nói rõ con số ngày (VD: "16", "ngày 16") ---
    # Regex tìm: từ 'ngày' hoặc 'mùng' (có thể không có), theo sau là 1 hoặc 2 chữ số
    # Ví dụ match: "16", "ngày 16", "mùng 5", "16 tuần này"
    day_match = re.search(r'(ngày|mùng)?\s*(\d{1,2})\b', text)
    
    if day_match:
        try:
            day = int(day_match.group(2))
            
            # Kiểm tra ngày hợp lệ (1-31)
            if 1 <= day <= 31:
                # Giả định người dùng nói về tháng hiện tại
                # Tạo ngày mới giữ nguyên Năm/Tháng hiện tại, chỉ thay Ngày
                candidate_date = now.replace(day=day)
                
                # Logic nâng cao:
                # Nếu hôm nay là 20, user nói "ngày 2" -> Có thể họ ý là tháng sau?
                # Nhưng trong ngữ cảnh đặt lịch khám gần, ta cứ ưu tiên tháng này trước.
                # Hoặc nếu user nói "16 tuần này", ta chắc chắn lấy ngày 16 tháng này.
                return candidate_date.strftime("%Y-%m-%d")
        except ValueError:
            # Lỗi xảy ra nếu ngày không tồn tại (VD: ngày 30 tháng 2)
            pass
    # xử lý case User hỏi ngày cụ thể như "ngày 16 tuần này", "mùng 5"        

    # Cấu hình cho dateparser
    settings = {
        'PREFER_DATES_FROM': 'future',  # Ưu tiên ngày trong tương lai (VD: nói "thứ 2" là thứ 2 tới)
        'DATE_ORDER': 'DMY',            # Định dạng ngày/tháng/năm (kiểu Việt Nam)
        'STRICT_PARSING': False,         # Cho phép parse linh hoạt
        'RELATIVE_BASE': datetime.now()
    }
    
    # Parse chuỗi ngày (hỗ trợ tiếng Việt: 'vi')
    # dateparser sẽ tự xử lý: "mai", "mốt", "thứ 6", "20/11", "tuần sau"...
    date_obj = dateparser.parse(text, languages=['vi'], settings=settings)
    
    # Nếu parse thành công -> Trả về YYYY-MM-DD
    if date_obj:
        return date_obj.strftime("%Y-%m-%d")
    
    # Nếu không hiểu (VD: user nhập linh tinh), mặc định trả về hôm nay hoặc mai tùy logic
    # Ở đây trả về None để hàm gọi biết mà xử lý lỗi
    return None

# Hàm xử lý logic thực tế
def execute_check_schedule(doctor_id, date_text):

    # Logic parse ngày hard code hôm nay và mai (đơn giản)
    # today = datetime.now()
    # if "mai" in date_text.lower():
    #     query_date = (today + timedelta(days=1)).strftime("%Y-%m-%d")
    # else:
    #     query_date = today.strftime("%Y-%m-%d")

    # 1. Sử dụng hàm  parse_date_from_text 
    query_date = parse_date_from_text(date_text)
    print(f"DEBUG: User nói '{date_text}' -> Python hiểu là '{query_date}'") #xem Debug
    # Nếu không parse được ngày hợp lệ
    if not query_date:
        return f"Xin lỗi, tôi không hiểu '{date_text}' là ngày nào. Vui lòng nói rõ hơn (ví dụ: ngày mai, 20/10, thứ 6 tới)."

    # Gọi API Spring Boot
    try:
        url = "http://localhost:8080/ai/check-schedule"
        res = requests.post(url, json={"doctorId": doctor_id, "date": query_date})
        
        if res.status_code == 200:
            schedules = res.json()
            
            available_slots = []
            for item in schedules:
                # Code đọc DTO phẳng từ Java
                if item.get("isAvailable") == True:
                    time_str = item.get("timeSlot")
                    spots_left = item.get("maxNumber") - item.get("currentNumber")
                    
                    slot_info = f"- {time_str} (Còn {spots_left} chỗ)"
                    available_slots.append(slot_info)
            
            if available_slots:
                return f"Lịch khám ngày {query_date}: " + ", ".join(available_slots)
            return f"Ngày {query_date} bác sĩ đã hết lịch."
        else:
            return "Lỗi API Server."
    except Exception as e:
        return f"Lỗi kết nối: {e}"


# 2. Định nghĩa tool Langchain
# from langchain.tools import tool
# import requests
# import json
# from datetime import datetime, timedelta

# # Hàm phụ trợ: Chuyển đổi ngôn ngữ tự nhiên sang ngày YYYY-MM-DD
# def parse_date_from_text(text: str) -> str:
#     today = datetime.now()
#     text = text.lower()
    
#     if "hôm qua" in text:
#         return (today - timedelta(days=1)).strftime("%Y-%m-%d")
#     elif "mai" in text or "ngày mai" in text:
#         return (today + timedelta(days=1)).strftime("%Y-%m-%d")
#     elif "kia" in text or "ngày kia" in text:
#         return (today + timedelta(days=2)).strftime("%Y-%m-%d")
    
#     # Mặc định trả về hôm nay nếu không nhận diện được
#     return today.strftime("%Y-%m-%d")

# @tool
# def check_schedule_tool(doctor_id: int, date_text: str):
#     """
#     Tra cứu lịch khám cụ thể của bác sĩ dựa trên ID và Ngày mong muốn.
#     Luôn sử dụng công cụ này khi người dùng hỏi về thời gian rảnh, lịch trống, hoặc muốn đặt lịch.
    
#     Args:
#         doctor_id (int): ID của bác sĩ (Lấy từ ngữ cảnh hoặc metadata của RAG).
#         date_text (str): Ngày người dùng muốn khám (VD: "hôm nay", "ngày mai", "thứ 2").
#     """
    
#     # 1. Chuẩn hóa ngày gửi lên API
#     target_date = parse_date_from_text(date_text)
    
#     # 2. Cấu hình API Spring Boot (Sửa lại URL của bạn nếu cần)
#     # Giả sử API của bạn là POST nhận body JSON
#     api_url = "http://localhost:8080/api/internal/ai/check-schedule" 
#     payload = {
#         "doctorId": doctor_id,
#         "date": target_date
#     }
    
#     try:
#         # Gọi API Spring Boot
#         response = requests.post(api_url, json=payload, timeout=5)
        
#         if response.status_code == 200:
#             schedules = response.json() # Đây là mảng Array console.log từ api scheduleByDate ở Spring Boot
            
#             # --- XỬ LÝ JSON TRẢ VỀ ---
#             available_slots = []
            
#             if not schedules:
#                 return f"Không tìm thấy lịch khám nào vào ngày {target_date}."

#             for item in schedules:
#                 # Kiểm tra số lượng chỗ trống
#                 current = item.get("currentNumber", 0) # giá trị khởi tạo là 0 nếu không có
#                 maximum = item.get("maxNumber", 0)
                
#                 # Logic: Chỉ lấy lịch nếu còn chỗ (current < max)
#                 if current < maximum:
#                     # Lấy chuỗi giờ từ object lồng nhau: time -> value (Allcodes)
#                     time_obj = item.get("time", {})
#                     time_str = time_obj.get("value", "Không xác định")
                    
#                     spots_left = maximum - current
                    
#                     # Format dòng thông báo cho đẹp để AI đọc
#                     slot_info = f"- {time_str} (Còn {spots_left} chỗ)"
#                     available_slots.append(slot_info)
            
#             # --- TỔNG HỢP KẾT QUẢ ---
#             if available_slots:
#                 return (f"Lịch khám ngày {target_date} của bác sĩ (ID {doctor_id}):\n" + 
#                         "\n".join(available_slots))
#             else:
#                 return f"Ngày {target_date} bác sĩ có lịch nhưng ĐÃ HẾT CHỖ (Full)."
                
#         else:
#             return f"Lỗi từ hệ thống đặt lịch: {response.status_code}"
            
#     except Exception as e:
#         return f"Lỗi kết nối khi tra cứu lịch: {str(e)}"