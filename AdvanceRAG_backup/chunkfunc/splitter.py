# Function to split text into chunks
def split_text(text, chunk_size=1000, chunk_overlap=20):
    chunks = []
    start = 0 #theo dõi chỉ mục (index)
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end]) #Lấy một đoạn của chuỗi text đầu vào từ vị trí start đến end
        start = end - chunk_overlap #Cập nhật vị trí bắt đầu trừ đi đoạn chunk_overkap để 2 đoạn chunk có đoạn tương đồng là 20 ký tự
    return chunks
# Bước 4: Hàm tạo chunks thủ công (tiền xử lý)