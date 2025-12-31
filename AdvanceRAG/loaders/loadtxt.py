import os
# Function to load documents from a directory
def load_documents_from_directory(directory_path):
    print("==== Loading documents from directory ====")
    documents = []
    for filename in os.listdir(directory_path):
        if filename.endswith(".txt"): # Xác định file chứa dữ liệu trong thư mục
            with open( # with open () đảm bảo tệp được đóng sau khi hoàn thành
                os.path.join(directory_path, filename), "r", encoding="utf-8" # Tạo đường dẫn bằng cách kết hợp dir_path/filename, "r" để đọc
            ) as file: # with open () as file: mở tập tin để đọc
                documents.append({"id": filename, "text": file.read()}) # (?) Nghi vấn: id có thể trùng nhau do id => Nên đặt filename khác nhau
    return documents
# Bước 3: Hàm load file và lưu vào biến để làm việc với cấu trúc {"id": filename, "text": nội_dung_file}