from config.connectOpenai import client
# Function to generate embeddings using OpenAI API
def get_openai_embedding(text):
    response = client.embeddings.create(input=text, model="text-embedding-3-small") #Tạo liên kết với embedding api và embedding text
    embedding = response.data[0].embedding # truy cập vào đối tượng đã embedding 'response' và lưu vào biến embedding
    print("==== Generating embeddings... ====")
    return embedding
# Bước 6: Định nghĩa hàm: gửi dữ liệu text đã tiền xử lý(chunking) và gọi api openai => tạo embedding(vecto số) 
